'use server';
import 'server-only';

import axios, { isAxiosError, AxiosResponse } from "axios";

export const createFlashcard = async (data: FormData) => {
    const formData = data;
    // server-only logic here
    console.log(process.env.NEXT_BACKEND_ORIGIN);
    try{
        const response: AxiosResponse & {
            data: {
                status: "success" | "failed",
                result: string
            }
        } = await axios.post(
            '/api/v1/flashcards',
            formData,
            {
                baseURL: process.env.NEXT_BACKEND_ORIGIN,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-API-Key': process.env.NEXT_API_KEY || '',
                },
            }
        );

        return response.data;
    }catch(ex){
        console.log(ex);
        // console.log((ex as any)?.response);
        // console.log((ex as any)?.request);
        if(isAxiosError(ex) && ex.response){
            return ex.response?.data;
        }
    }
};