import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Mode, WelcomeProps } from "../interfaces/interfaces";
import Button from "./Button";
import ModeButton from "./ModeButton";

export default function Welcome({
    startRound,
    setupRound,
    changeMode,
    currentMode,
    started,
    nextNote,
    changeTotalRounds,
}: WelcomeProps) {
    const [animating, setAnimating] = useState(false);
    const [currentInput, setCurrentInput] = useState("10");
    const [noInputOnSubmit, setNoInputOnSubmit] = useState(false);

    const handleClick = () => {
        if (!currentInput.length) {
            setNoInputOnSubmit(true);
            setTimeout(() => {
                setNoInputOnSubmit(false);
            }, 1000);
            return;
        }
        changeTotalRounds(parseInt(currentInput));
        setAnimating(true);
        setupRound();
        setTimeout(() => {
            startRound();
        }, 200);
    };

    const handleInput = (e: React.ChangeEvent) => {
        const input = (e.target as HTMLInputElement).value;
        if (input.length > 2 || !checkIfNumberAndFirstNumberNotZero(input)) {
            return;
        }
        setCurrentInput(input ? input : "");
    };

    const checkIfNumberAndFirstNumberNotZero = (input: string) => {
        if (input[0] === "0") {
            return false;
        }
        for (const character of input) {
            const converted = parseInt(character);
            if (isNaN(converted)) {
                return false;
            }
        }
        return true;
    };

    return (
        <div
            className={`base-black absolute top-0 right-0 bottom-0 left-0 p-12 flex flex-col justify-around items-center gap-8 text-white/90  ${
                animating
                    ? "animate-welcomeFadeOut"
                    : started
                    ? "animate-welcomeFadeIn"
                    : ""
            }`}
        >
            <h1 className="text-center text-4xl font-header">
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
            <form className="flex flex-col justify-center items-center">
                <label
                    htmlFor="rounds"
                    className="text-center mb-4 text-sm w-72"
                >
                    Lege die Anzahl der Noten pro Runde fest (1-99), die du im
                    jeweiligen Notenschlüssel identifizieren musst.
                </label>
                <input
                    id="rounds"
                    type="text"
                    onChange={handleInput}
                    className={`text-gray-800 py-1 px-4 w-44 border-4 ${
                        noInputOnSubmit ? "border-red-500" : "border-white"
                    }`}
                    value={currentInput}
                />
            </form>
            <Button name="Start" handleClick={handleClick} />
        </div>
    );
}
