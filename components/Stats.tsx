import { useEffect, useState } from "react";
import useWindowWidth from "../hooks/useWindowWidth";
import { Guess } from "../interfaces/interfaces";
import Button from "./Button";
import { noteComponents } from "./Notes";

interface StatsProps {
    guesses: Guess[];
    newRound: () => void;
    roundEnded: boolean;
    numberOfNotesPerRound: number;
}

export default function Stats({
    guesses,
    newRound,
    roundEnded,
    numberOfNotesPerRound,
}: StatsProps) {
    const [correctNotes, setCorrectNotes] = useState(0);
    const [averageTime, setAverageTime] = useState(0);
    const [note, setNote] = useState(<div></div>);
    const [hover, setHover] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [currentOffset, setCurrentOffset] = useState(0);
    const [closing, setClosing] = useState(false);

    const width = useWindowWidth();

    useEffect(() => {
        if (roundEnded) {
            calculateStats();
        }
    }, [roundEnded]);

    const handleNewRound = () => {
        setClosing(true);
        setTimeout(() => {
            newRound();
        }, 200);
    };

    const calculateStats = () => {
        setCorrectNotes(guesses.filter((guess) => guess.correct).length);
        const averageTimeUnrounded =
            guesses
                .map((guess) => guess.time)
                .reduce((prev, curr) => prev + curr) / guesses.length;
        setAverageTime(roundOneDecimal(averageTimeUnrounded));
    };

    const roundOneDecimal = (number: number) => {
        return Math.round((number + Number.EPSILON) * 10) / 10;
    };

    const handleMouseEnter = (e: any, noteName: string) => {
        if (width < 640) {
            return;
        }
        setCurrentOffset(e.pageY);
        setNote(noteComponents[noteName as keyof typeof noteComponents]);
        setHover(true);
    };

    const handleMouseLeave = () => {
        if (width < 640) {
            return;
        }
        setHover(false);
    };

    const handleClick = (noteName: string) => {
        if (width >= 640) {
            return;
        }
        setNote(noteComponents[noteName as keyof typeof noteComponents]);
        setClicked(true);
    };

    return (
        <div
            className={`absolute top-0 left-0 right-0 bottom-0 base-black flex flex-col gap-3 justify-around items-center py-4 animate-statsFadeIn ${
                closing ? "animate-statsFadeOut" : ""
            }`}
        >
            <p className="text-3xl font-header">Runde beendet</p>
            <div>
                <p className="text-center text-lg">
                    Richtige Noten: {correctNotes}/{numberOfNotesPerRound}
                </p>
                <p className="text-center text-lg">
                    Durchschnittliche Zeit pro Note: {averageTime}s
                </p>
            </div>
            <div className="h-3/6 overflow-scroll overflow-x-hidden px-2">
                {guesses.map((guess, i) => (
                    <p
                        key={i}
                        className={`text-sm text-gray-800 py-2 px-4 rounded-full mb-2 ${
                            guess.correct ? "bg-green-400" : "bg-red-400"
                        } sm:hover:bg-blue-300 transition-colors`}
                        onMouseEnter={(e) =>
                            handleMouseEnter(e, guess.fullNoteName)
                        }
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(guess.fullNoteName)}
                    >
                        Runde {i + 1}:{" "}
                        {guess.correct
                            ? `${guess.correctNote} war richtig`
                            : `${guess.noteGuessed}, richtig war ${guess.correctNote}`}{" "}
                        ––– Zeit: {roundOneDecimal(guess.time)} s
                    </p>
                ))}
            </div>
            <Button name="Neue Runde" handleClick={handleNewRound} />
            {hover && width >= 640 && (
                <div
                    style={{ top: currentOffset - 100 }}
                    className={`absolute right-12 flex justify-center items-center px-2 h-40 bg-white animate-appear rounded-md shadow-md`}
                >
                    {note}
                </div>
            )}
            {clicked && width < 640 && (
                <div
                    className={`absolute flex justify-center items-center px-2 top-10 w-4/5 bg-white animate-appear rounded-md shadow-md`}
                    onClick={() => setClicked(false)}
                >
                    {note}
                </div>
            )}
        </div>
    );
}
