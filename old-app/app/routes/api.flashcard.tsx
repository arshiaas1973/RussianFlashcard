import { data } from "@remix-run/node";
import axios, { isAxiosError, type AxiosResponse } from "axios";
import { createFlashcard } from "~/lib/flashcards";

export async function action({ request }) {
    const formData = await request.formData();
    // server-only logic here
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
                baseURL: process.env.BACKEND_ORIGIN
            }
        );

        return data(response.data,{
            status: response.status,
            statusText: response.statusText
        });
    }catch(ex){
        if(isAxiosError(ex) && ex.response){
            return data(ex.response?.data,{
                status: ex.response?.status ?? 500,
                statusText: ex.response?.statusText ?? "Internal Server Error"
            });
        }
    }
    
}