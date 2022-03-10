import { useEffect, useState } from "react";
import { intervalMapping } from "../constants/intervalNames";
import { IntervalStatsProps } from "../interfaces/interfaces";
import AudioIcon from "./AudioIcon";
import Button from "./Button";

export default function IntervalStats({
    guesses,
    newRound,
    roundEnded,
    numberOfIntervalsPerRound,
    playInterval,
}: IntervalStatsProps) {
    const [correctIntervals, setCorrectIntervals] = useState(0);
    const [averageTime, setAverageTime] = useState(0);
    const [closing, setClosing] = useState(false);
    const [playing, setPlaying] = useState(false);

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
        setCorrectIntervals(guesses.filter((guess) => guess.correct).length);
        const averageTimeUnrounded =
            guesses
                .map((guess) => guess.time)
                .reduce((prev, curr) => prev + curr) / guesses.length;
        setAverageTime(roundOneDecimal(averageTimeUnrounded));
    };

    const roundOneDecimal = (number: number) => {
        return Math.round((number + Number.EPSILON) * 10) / 10;
    };

    const handleClick = (buffer: AudioBuffer) => {
        if (playing) {
            return;
        }
        playInterval(buffer);
        setPlaying(true);
        setTimeout(() => {
            setPlaying(false);
        }, 2300);
    };

    return (
        <div
            className={`absolute top-0 left-0 right-0 bg-base-black min-w-[21rem] flex flex-col gap-3 justify-around items-center py-4 animate-statsFadeIn ${
                closing ? "animate-statsFadeOut" : ""
            }`}
        >
            <p className="text-3xl font-header">Runde beendet</p>
            <div>
                <p className="text-center text-lg">
                    Richtige Intervalle: {correctIntervals}/
                    {numberOfIntervalsPerRound}
                </p>
                <p className="text-center text-lg">
                    Durchschnittliche Zeit pro Intervall: {averageTime}s
                </p>
            </div>
            <div className="mt-8 w-11/12 max-w-lg">
                <div className="stats-grid mb-2 text-sm px-2">
                    <p>Runde</p>
                    <p>Geraten</p>
                    <p>Richtig</p>
                    <p>Zeit</p>
                </div>
                <div className="h-4/6 overflow-scroll overflow-x-hidden">
                    {guesses.map((guess, i) => (
                        <div
                            key={i}
                            className={`stats-grid text-xs text-gray-800 py-2 px-2 mb-1 rounded-md ${
                                guess.correct ? "bg-green-400" : "bg-red-400"
                            } sm:hover:bg-blue-300 transition-colors relative`}
                            onClick={() => handleClick(guess.intervalBuffer)}
                        >
                            <p>{i + 1}</p>
                            <p>{guess.intervalGuessed}</p>
                            <p>{guess.correctInterval}</p>
                            <p>{roundOneDecimal(guess.time)}s</p>
                            <div className="absolute top-[0.45rem] right-[-0.2rem]">
                                <AudioIcon playing={false} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Button name="Neue Runde" handleClick={handleNewRound} />
        </div>
    );
}
