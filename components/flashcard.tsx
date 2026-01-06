export const FlashCard = () => {
    return (
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
    )
}