import { Icon } from "@iconify/react";
import { useState } from "react";

export default function MainPage() {
    const [mode, setMode] = useState(0);
    return (
        <div className="w-full min-h-screen h-screen flex flex-col justify-center items-center">
            <div className="flex flex-col gap-6 items-center">
                {
                    {
                        0: (
                            <>
                                <div className="flex flex-col items-center gap-3">
                                    <h2 className="text-[36px] font-medium font-russian">Идтй</h2>
                                    <h3 className="text-2xl font-medium font-general">To go</h3>
                                    <h3 className="text-xl font-medium font-persian">رفتن</h3>
                                    <p className="text-base font-general max-w-[min(1000px,(100%-100px))]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, dolores vero? Tenetur, quasi nostrum autem non illum exercitationem porro inventore repudiandae pariatur recusandae vitae quia. Illo dolore exercitationem id atque.</p>
                                </div>
                                <button className="px-4 py-1.5 rounded-lg bg-sky-600/80 w-fit hover:bg-sky-600/55 cursor-pointer transition-colors duration-300 ease-linear">
                                    Learned it!
                                </button>
                            </>
                        ),
                        1: (
                            <>
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-row gap-3">
                                        <h2 className="font-general font-semibold text-[36px]">
                                            Word :
                                        </h2>
                                        <input type="text" className="text-[36px] font-medium font-russian outline-none ring-0 focus:ring-0 focus:outline-white focus:outline-1" placeholder="Введите здесь..."/>
                                    </div>
                                </div>
                            </>
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
        </div>
    );
}