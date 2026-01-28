'use client';
import { useEffect, useState } from "react";
import { getRandomFlashcard } from "@/lib/flashcards";
import { FlashCardLoading } from "./loading";
import clsx from "clsx";

export const FlashCard = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<any>(null);
    const detectLang = (word: string) => {
        if (!word) return 2;
        if (/[\u0622-\u06CC]/.test(word)) return 0;
        if (/[\u0400-\u04FF]/.test(word)) return 1;
        return 2;
    };
    useEffect(() => {
        // Fetch flashcard data here if needed
        getRandomFlashcard().then(d => {
            const index = Math.floor(Math.random() * d?.result?.length);
            setData(d?.result[index]);
            console.log(d);
            setLoading(false);
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
                    <h2 className="text-[36px] font-medium font-russian leading-10">{data?.word}</h2>
                    <h2 className="text-[36px] font-medium font-russian-handwriting leading-10">/{data?.word}/</h2>
                </div>
                {
                    data?.translations?.map((item)=>{
                        const lang = detectLang(item.translation.word[0]);
                        return (
                            <h3 className={clsx(
                                "text-xl first:text-2xl font-medium",
                                
                            )}
                                style={{
                                    fontFamily:{
                                    0: "var(--persian-font)",
                                    1: "var(--russian-font)",
                                    2: "var(--general-font)",
                                }[lang]
                                }}>{item.translation.word}</h3>
                        );
                    })
                }
                <p className="text-base font-general max-w-[min(1000px,(100%-100px))]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, dolores vero? Tenetur, quasi nostrum autem non illum exercitationem porro inventore repudiandae pariatur recusandae vitae quia. Illo dolore exercitationem id atque.</p>
            </div>
            <button className="px-4 py-1.5 rounded-lg bg-sky-600/80 w-fit hover:bg-sky-600/55 cursor-pointer transition-colors duration-300 ease-linear font-general font-medium">
                Learned it!
            </button>
        </>
    )
}