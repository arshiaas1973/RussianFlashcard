'use client';
import { useEffect, useState } from "react";
import { getRandomFlashcard } from "@/lib/flashcards";
import { FlashCardLoading } from "./loading";

export const FlashCard = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<any>(null);
    useEffect(() => {
        // Fetch flashcard data here if needed
        getRandomFlashcard().then(d => {
            setData(d?.result);
            console.log(d);
            if(d?.status === "success" && d?.description !== ""){
                setLoading(false);
            }
        });
    }, []);
    useEffect(()=>{
        if(data !== null && data?.description === ""){
            
        }
    }, [data]);
    if(loading){
        return (
            <FlashCardLoading />
        );
    }
    return (
        <>
            <div className="flex flex-col items-center gap-4">
                <div className="flex flex-row gap-3 justify-center items-center flex-wrap">
                    <h2 className="text-[36px] font-medium font-russian leading-10">Идтй</h2>
                    <h2 className="text-[36px] font-medium font-russian-handwriting leading-10">/Идтй/</h2>
                </div>
                <h3 className="text-2xl font-medium font-general">To go</h3>
                <h3 className="text-xl font-medium font-persian">رفتن</h3>
                <p className="text-base font-general max-w-[min(1000px,(100%-100px))]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, dolores vero? Tenetur, quasi nostrum autem non illum exercitationem porro inventore repudiandae pariatur recusandae vitae quia. Illo dolore exercitationem id atque.</p>
            </div>
            <button className="px-4 py-1.5 rounded-lg bg-sky-600/80 w-fit hover:bg-sky-600/55 cursor-pointer transition-colors duration-300 ease-linear font-general font-medium">
                Learned it!
            </button>
        </>
    )
}