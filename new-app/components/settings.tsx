import { createFlashcard } from "@/lib/flashcards";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import { useCallback, useState } from "react";

export const Settings = () => {
    const [word, setWord] = useState<string>("");
    const [description,setDescription] = useState<string>("");
    const [translations, setTranslations] = useState<{
        language: string,
        word: string,
    }[]>([]);


    const detectLang = (word: string) => {
        if (!word) return 2;
        if (/[\u0622-\u06CC]/.test(word)) return 0;
        if (/[\u0400-\u04FF]/.test(word)) return 1;
        return 2;
    };
    const resetForm = useCallback(()=>{
        setWord("");
        setDescription("");
        setTranslations([]);
    },[setWord,setDescription,setTranslations]);
    const submitForm = useCallback(async ()=>{
        if(word.trim().length <= 0 || translations.length <= 0){
            console.log("Invalid form data");
            return;
        }
        const form = new FormData();
        form.set("word", word);
        form.set("description",description);
        form.set("translations",JSON.stringify(translations));

        const result = await createFlashcard(form);
        console.log(result);

    },[word,description,translations]);

    return (
        <>
            <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-row gap-3">
                    <h2 className="font-general font-semibold text-[36px]">
                        Word:
                    </h2>
                    <input type="text" className="text-[36px] font-medium font-russian outline-none ring-0 focus:ring-0 focus:outline-white focus:outline-1 grow" placeholder="Введите здесь..." value={word} onChange={
                        (ev)=>{
                            setWord((ev?.target as HTMLInputElement).value);
                        }
                    }/>
                </div>
                <textarea className="text-xl min-h-40 max-h-80 font-medium font-general outline-none ring-0 focus:ring-0 focus:outline-white focus:outline-1 grow" placeholder="Description..." value={description} onChange={
                    (ev)=>{
                        setDescription((ev?.target as HTMLTextAreaElement).value);
                    }
                }></textarea>
                <div className="flex flex-row justify-between items-center">
                    <h2 className="font-general font-semibold text-[36px]">
                        Translations:
                    </h2>
                    <button className="cursor-pointer hover:text-sky-500 transition-colors duration-300 ease-linear" onClick={() => {
                        if (translations.length > 0) {
                            let translation = translations[translations.length - 1];
                            if (translation.word.trim().length <= 0 || translation.language.trim().length <= 0) return;
                        }
                        const newt = translations.slice();
                        newt.push({ language: "", word: "" });
                        setTranslations(newt);
                    }}>
                        <Icon icon="line-md:plus-circle-twotone" className="size-6" />
                    </button>
                </div>
                <div className="flex flex-col mb-4 px-6">
                    {
                        translations.map((value, index) => {
                            let currentLang = detectLang(value.word);

                            return (
                                <div className="flex flex-row gap-3">
                                    <div className="flex flex-row grow items-center" key={index}>
                                        <input type="text" className="text-[26px] font-medium font-russian outline-none ring-0 focus:ring-0 focus:outline-white focus:outline-1 w-1/3"
                                            placeholder="Language"
                                            value={value.language} onChange={(ev) => {
                                                setTranslations((translation) =>
                                                    translation.map((item, i) =>
                                                        i === index ? { ...item, language: ev.target.value } : item
                                                    )
                                                );
                                            }} />
                                        <input type="text" className={clsx(
                                            "text-[26px] font-medium outline-none ring-0 focus:ring-0 focus:outline-white focus:outline-1 w-2/3",
                                            (currentLang == 0) && "font-persian [direction:rtl]",
                                            (currentLang == 1) && "font-russian",
                                            (currentLang == 2) && "font-general",
                                        )} placeholder="Word" value={value.word} onChange={(ev) => {
                                            setTranslations((translation) =>
                                                translation.map((item, i) =>
                                                    i === index ? { ...item, word: ev.target.value } : item
                                                )
                                            )
                                            currentLang = detectLang(ev.target.value);
                                        }} />
                                    </div>
                                    <div className="flex flex-row items-center shrink-0 ">
                                        <button className="cursor-pointer hover:text-red-500 transition-colors duration-300 ease-linear"
                                            onClick={() => {
                                                setTranslations(translation => translation.filter((_, i) => i !== index));
                                            }}>
                                            <Icon icon="line-md:trash" className="size-6" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                <div className="flex flex-row justify-between items-center">
                    <button className="px-4 py-1.5 rounded-lg bg-sky-600/80 w-fit hover:bg-sky-600/55 cursor-pointer transition-colors duration-300 ease-linear" onClick={()=>{
                        submitForm();
                    }}>
                        Save it!
                    </button>
                    <button className="px-4 py-1.5 rounded-lg bg-red-600/80 w-fit hover:bg-red-600/55 cursor-pointer transition-colors duration-300 ease-linear" onClick={()=>{
                        resetForm();
                    }}>
                        Reset it!
                    </button>
                </div>
            </div>
        </>
    );
};