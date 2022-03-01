import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Mode } from "../interfaces/interfaces";
import ModeButton from "./ModeButton";

interface WelcomeProps {
    startRound: () => void;
    changeMode: Dispatch<SetStateAction<Mode>>;
    currentMode: Mode;
    started: boolean;
    nextNote: () => void;
}

export default function Welcome({
    startRound,
    changeMode,
    currentMode,
    started,
    nextNote,
}: WelcomeProps) {
    const [animating, setAnimating] = useState(false);

    const handleClick = () => {
        setAnimating(true);
        nextNote();
        setTimeout(() => {
            startRound();
        }, 200);
    };

    return (
        <div
            className={`base-black absolute top-0 right-0 bottom-0 left-0 p-12 flex flex-col justify-around items-center gap-4 text-white/90  ${
                animating
                    ? "animate-welcomeFadeOut"
                    : started
                    ? "animate-welcomeFadeIn"
                    : ""
            }`}
        >
            <h1 className="text-center text-3xl font-header">
                Wilkommen zum Notentraining!
            </h1>
            <div className="flex flex-col gap-4">
                <ModeButton
                    name="Violinschlüssel"
                    changeMode={() => changeMode(Mode.treble)}
                    highlighted={currentMode === Mode.treble}
                />
                <ModeButton
                    name="Bassschlüssel"
                    changeMode={() => changeMode(Mode.bass)}
                    highlighted={currentMode === Mode.bass}
                />
                <ModeButton
                    name="Violin- und Bassschlüssel"
                    changeMode={() => changeMode(Mode.both)}
                    highlighted={currentMode === Mode.both}
                />
            </div>
            <p className="text-center text-md">
                Identifiziere 10 Noten im ausgewälten Notenschlüssel.
            </p>
            <button
                onClick={handleClick}
                className="bg-blue-300 text-gray-700 rounded-md py-2 px-6 hover:bg-blue-400 transition-colors"
            >
                Start
            </button>
        </div>
    );
}
