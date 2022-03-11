import { useEffect, useState } from "react";
import useWindowWidth from "../hooks/useWindowWidth";
import { NoteStatsProps } from "../interfaces/interfaces";
import Button from "./Button";
import { noteComponents } from "./Notes";

export default function Stats({
    guesses,
    newRound,
    roundEnded,
    numberOfNotesPerRound,
}: NoteStatsProps) {
    const [correctNotes, setCorrectNotes] = useState(0);
    const [averageTime, setAverageTime] = useState(0);
    const [note, setNote] = useState(<div></div>);
    const [currentNoteName, setCurrentNoteName] = useState("");
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
        if (noteName === currentNoteName && clicked) {
            setClicked(false);
        } else {
            setCurrentNoteName(noteName);
            setNote(noteComponents[noteName as keyof typeof noteComponents]);
            setClicked(true);
        }
    };

    return (
        <div
            className={`absolute top-0 left-0 right-0 bg-base-black flex flex-col min-w-[21rem] gap-3 justify-around items-center py-4 animate-statsFadeIn ${
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
            <div className="w-5/6 max-w-lg mt-8 mb-4">
                <div className="stats-grid mb-2 text-sm px-2">
                    <p>Runde</p>
                    <p>Geraten</p>
                    <p>Richtig</p>
                    <p>Zeit</p>
                </div>
                <div className="max-w-lg max-h-96 overflow-scroll overflow-x-hidden">
                    <div>
                        {guesses.map((guess, i) => (
                            <div
                                key={i}
                                className={`stats-grid text-xs text-gray-800 py-2 px-2 mb-1 rounded-md ${
                                    guess.correct
                                        ? "bg-green-400"
                                        : "bg-red-400"
                                } sm:hover:bg-blue-300 transition-colors relative`}
                                onClick={() => handleClick(guess.fullNoteName)}
                                onMouseEnter={(e) =>
                                    handleMouseEnter(e, guess.fullNoteName)
                                }
                                onMouseLeave={handleMouseLeave}
                            >
                                <p>{i + 1}</p>
                                <p>{guess.noteGuessed}</p>
                                <p>{guess.correctNote}</p>
                                <p>{roundOneDecimal(guess.time)}s</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Button name="Neue Runde" handleClick={handleNewRound} />
            {hover && width >= 640 && (
                <div
                    style={{ top: currentOffset - 100 }}
                    className={`absolute right-0 flex justify-cente w-60 items-center px-2 bg-white animate-appear rounded-md shadow-md border-4 border-blue-300`}
                >
                    {note}
                </div>
            )}
            {clicked && width < 640 && (
                <div
                    className={`absolute flex justify-center items-center px-2 top-6 w-3/5 bg-white animate-appear rounded-md shadow-lg border-4 border-blue-300`}
                    onClick={() => setClicked(false)}
                >
                    {note}
                </div>
            )}
        </div>
    );
}
