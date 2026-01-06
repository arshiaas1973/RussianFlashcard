'use server';

import { PanelSection } from "@/components/panel-section";
import { createFlashcard } from "@/lib/flashcards";


export default async function MainPage() {
    return (
        <div className="w-full min-h-screen h-screen flex flex-col justify-center items-center overflow-hidden">
            <PanelSection />
        </div>
    );
}