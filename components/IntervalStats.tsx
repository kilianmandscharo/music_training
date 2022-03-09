import { useEffect, useState } from "react";
import { intervalMapping } from "../constants/intervalNames";
import useWindowWidth from "../hooks/useWindowWidth";
import { IntervalStatsProps } from "../interfaces/interfaces";
import AudioIcon from "./AudioIcon";
import Button from "./Button";
import { noteComponents } from "./Notes";

export default function IntervalStats({
    guesses,
    newRound,
    roundEnded,
    numberOfIntervalsPerRound,
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

    const handleClick = (audio: HTMLAudioElement) => {
        if (playing) {
            return;
        }
        audio.play();
        setPlaying(true);
        setTimeout(() => {
            setPlaying(false);
        }, 2300);
    };

    return (
        <div
            className={`absolute top-0 left-0 right-0 bottom-0 bg-base-black flex flex-col gap-3 justify-around items-center py-4 animate-statsFadeIn ${
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
            {/* <table className="h-3/6 mt-8 overflow-scroll overflow-x-hidden px-2">
                <thead>
                    <tr>
                        <th scope="col">Runde</th>
                        <th scope="col">Geraten</th>
                        <th scope="col">Richtig</th>
                        <th scope="col">Zeit</th>
                    </tr>
                </thead>
                <tbody>
                    {guesses.map((guess, i) => (
                        <tr
                            key={i}
                            className={`text-sm text-gray-800 py-2 px-4 rounded-full ${
                                guess.correct ? "bg-green-400" : "bg-red-400"
                            } sm:hover:bg-blue-300 transition-colors`}
                            onClick={() => handleClick(guess.intervalAudio)}
                        >
                            <td>{i + 1}</td>
                            <td>{guess.intervalGuessed}</td>
                            <td>{guess.correctInterval}</td>
                            <td>{roundOneDecimal(guess.time)}s</td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
            <div className="mt-8 w-11/12">
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
                            onClick={() => handleClick(guess.intervalAudio)}
                        >
                            <p>{i + 1}</p>
                            <p>{guess.intervalGuessed}</p>
                            <p>{guess.correctInterval}</p>
                            <p>{roundOneDecimal(guess.time)}s</p>
                            <div className="absolute top-[0.45rem] right-[-0.2rem]">
                                <AudioIcon />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Button name="Neue Runde" handleClick={handleNewRound} />
        </div>
    );
}
