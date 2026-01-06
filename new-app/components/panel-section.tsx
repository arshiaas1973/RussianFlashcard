'use client';

import { Icon } from "@iconify/react";
import { useState } from "react";
import { FlashCard } from "@/components/flashcard";
import { Settings } from "@/components/settings";

export const PanelSection = () => {
    const [mode, setMode] = useState(0);
    return (
        <>
            <div className="flex flex-col gap-6 items-center overflow-y-auto py-8 px-8 w-205">
                {
                    {
                        0: (
                            <FlashCard />
                        ),
                        1: (
                            <Settings />
                        )
                    }[mode]
                }
            </div>
            <div className="flex flex-row items-center absolute top-4 start-4 w-fit h-fit">
                <button className="cursor-pointer hover:text-sky-500 transition-colors duration-300 ease-linear" onClick={()=>{
                    console.log("mode",mode)
                    if(mode < 1){
                        setMode((state) => state+1);
                        return;
                    }
                    console.log("mode",mode)

                    setMode(0);
                }}>
                    <Icon icon="line-md:cog-loop" className="size-6" />
                </button>
            </div>
        </>
    );
}