import { useState } from "react";
import { noteComponents } from "./Notes";

interface WelcomeProps {
    startFirstRound: () => void;
}

export default function Welcome({ startFirstRound }: WelcomeProps) {
    const [animating, setAnimating] = useState(false);
    const handleClick = () => {
        setAnimating(true);
        setTimeout(() => {
            setAnimating(false);
            startFirstRound();
        }, 300);
    };

    return (
        <div
            className={`base-black absolute top-0 right-0 bottom-0 left-0 p-12 flex flex-col justify-around items-center gap-4 text-white/90 ${
                animating ? "animate-animateStart" : ""
            }`}
        >
            <h1 className="text-center text-3xl font-header">
                Wilkommen zum Notentraining!
            </h1>
            <div className="bg-blue-300 rounded-md">
                {noteComponents["b-f3"]()}
            </div>
            <div className="bg-blue-300 rounded-md">
                {noteComponents["t-g4"]()}
            </div>
            <p className="text-center text-md">
                Identifiziere 10 Noten im Violin- und Bassschlüssel.
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
