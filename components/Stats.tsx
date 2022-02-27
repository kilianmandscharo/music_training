import { useEffect, useState } from "react";
import { Guess } from "../interfaces/interfaces";
import { noteComponents } from "./Notes";

interface StatsProps {
    guesses: Guess[];
    newRound: () => void;
    roundEnded: boolean;
}

export default function Stats({ guesses, newRound, roundEnded }: StatsProps) {
    const [correctNotes, setCorrectNotes] = useState(0);
    const [averageTime, setAverageTime] = useState(0);
    const [note, setNote] = useState(<div></div>);
    const [hover, setHover] = useState(false);
    const [currentOffset, setCurrentOffset] = useState(0);

    useEffect(() => {
        if (roundEnded) {
            calculateStats();
        }
    }, [roundEnded]);

    const calculateStats = () => {
        setCorrectNotes(guesses.filter((guess) => guess.correct).length);
        const averageTimeUnrounded =
            guesses
                .map((guess) => guess.time)
                .reduce((prev, curr) => prev + curr) / guesses.length;
        setAverageTime(round(averageTimeUnrounded));
    };

    const round = (number: number) => {
        return Math.round((number + Number.EPSILON) * 10) / 10;
    };

    const handlePointerEnter = (e: any, noteName: string) => {
        setCurrentOffset(e.pageY);
        setNote(noteComponents[noteName as keyof typeof noteComponents]);
        setHover(true);
    };

    const handlePointerLeave = () => {
        setHover(false);
    };

    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-orange-200 flex flex-col gap-4 justify-center items-center">
            <p className="text-2xl">Round Ended</p>
            <p>
                Correct Notes: {correctNotes}/10 ––– {correctNotes * 10}%
            </p>
            <p>Average time per note: {averageTime}s</p>
            <div>
                {guesses.map((guess, i) => (
                    <p
                        key={i}
                        className={`text-sm mb-1 ${
                            guess.correct ? "bg-green-300" : "bg-red-300"
                        } hover:bg-cyan-300 transition-colors`}
                        onPointerEnter={(e) =>
                            handlePointerEnter(e, guess.fullNoteName)
                        }
                        onPointerLeave={handlePointerLeave}
                    >
                        Round {i}: guessed {guess.noteGuessed}, correct was{" "}
                        {guess.correctNote} ––– time: {round(guess.time)} s
                    </p>
                ))}
            </div>
            <button onClick={newRound} className="bg-blue-500 p-4 rounded-md">
                New Round
            </button>
            {hover && (
                <div
                    style={{ top: currentOffset - 100 }}
                    className={`absolute right-12 flex justify-center items-center px-2 h-40 bg-white animate-appear`}
                >
                    {note}
                </div>
            )}
        </div>
    );
}