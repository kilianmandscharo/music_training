import Link from "next/link";
import { useState } from "react";
import { PageMenuProps } from "../interfaces/interfaces";
import Button from "./Button";

export default function PageMenu({
    title,
    description,
    startRound,
    setupRound,
    started,
    changeTotalRounds,
    buttons,
}: PageMenuProps) {
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
            className={`bg-base-black absolute top-0 right-0 left-0 p-12 flex flex-col justify-around items-center gap-6 text-white/90  ${
                animating
                    ? "animate-welcomeFadeOut"
                    : started
                    ? "animate-welcomeFadeIn"
                    : ""
            }`}
        >
            <h1 className="text-center text-4xl sm:text-5xl font-header sm:mb-4">
                {title}
            </h1>
            <div className="w-72 flex flex-col gap-4">{buttons}</div>
            <form className="flex flex-col justify-center items-center">
                <label
                    htmlFor="rounds"
                    className="text-center mb-4 text-sm w-72"
                >
                    {description}
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
            <Link href="/">
                <a className="bg-blue-300 py-2 px-6 rounded-md sm:hover:bg-blue-400 text-gray-800 transition-colors">
                    Zur Startseite
                </a>
            </Link>
        </div>
    );
}
