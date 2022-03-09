import next, { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import Keypad from "../components/Keypad";
import ModeButton from "../components/ModeButton";
import PageBody from "../components/PageBody";
import PageMenu from "../components/PageMenu";
import Stats from "../components/NoteStats";
import ToggleButton from "../components/ToggleButton";
import {
    allIntervals,
    allIntervalsByRootNote,
    diatonicIntervals,
    simpleIntervals,
} from "../constants/allIntervals";
import {
    diatonicIntervalNames,
    intervalMapping,
    simpleIntervalNames,
} from "../constants/intervalNames";
import { INTERVAL_KEYS } from "../constants/keys";
import { IntervalGuess, IntervalMode } from "../interfaces/interfaces";
import IntervalStats from "../components/IntervalStats";

const Intervalltraining: NextPage = () => {
    const [intervalClip, setIntervalClip] = useState<HTMLAudioElement>();
    const [currentInterval, setCurrentInterval] = useState<string>("");
    const [message, setMessage] = useState("Welches Intervall ist das?");
    const [round, setRound] = useState(1);
    const [guesses, setGuesses] = useState<IntervalGuess[]>([]);
    const [roundEnded, setRoundEnded] = useState(false);
    const [timeAtLastInput, setTimeAtLastInput] = useState(new Date());
    const [showPageMenu, setShowPageMenu] = useState(true);
    const [mode, setMode] = useState(IntervalMode.simple);
    const [intervalNames, setIntervalNames] =
        useState<string[]>(simpleIntervals);
    const [started, setStarted] = useState(false);
    const [numberOfIntervalsPerRound, setNumberOfIntervalsPerRound] =
        useState(10);
    const [noInputAllowed, setNoInputAllowed] = useState(false);
    const [keepRootNote, setKeepRootNote] = useState(false);
    const [rootNote, setRootNote] = useState("C");

    // useEffect(() => {
    //     console.log(intervalNames);
    // }, [intervalNames]);

    useEffect(() => {
        if (keepRootNote) {
            setIntervalNames(getIntervalsByRootNote());
        } else {
            if (mode === IntervalMode.simple) {
                setIntervalNames(simpleIntervals);
            }
            if (mode === IntervalMode.diatonic) {
                setIntervalNames(diatonicIntervals);
            }
            if (mode === IntervalMode.all) {
                setIntervalNames(allIntervals);
            }
        }
    }, [mode, keepRootNote]);

    const nextInterval = () => {
        const randomIntervalIndex = Math.floor(
            Math.random() * intervalNames.length
        );
        const randomIntervalName = intervalNames[randomIntervalIndex];
        const interval = new Audio(`/intervals/${randomIntervalName}.mp3`);
        setCurrentInterval(randomIntervalName.slice(0, 2));
        setIntervalClip(interval);
        interval.play();
    };

    const handleInput = (input: string) => {
        if (noInputAllowed) {
            return;
        }
        const correctInterval =
            intervalMapping[currentInterval as keyof typeof intervalMapping];
        const correct = input === correctInterval;
        const now = new Date().getTime();
        const time = (now - timeAtLastInput.getTime()) / 1000;
        if (intervalClip) {
            setGuesses([
                ...guesses,
                {
                    correct,
                    time,
                    correctInterval,
                    intervalGuessed: input,
                    intervalAudio: intervalClip,
                },
            ]);
        }
        setMessage(correct ? "Richtig" : "Falsch");
        setNoInputAllowed(true);
        setTimeout(() => {
            if (round === numberOfIntervalsPerRound) {
                setRoundEnded(true);
            } else {
                setNoInputAllowed(false);
                nextInterval();
                setTimeAtLastInput(new Date());
                setMessage("Welches Intervall ist das?");
                setRound((prev) => prev + 1);
            }
        }, 1000);
    };

    const newRound = () => {
        nextInterval();
        setRound(1);
        setGuesses([]);
        setTimeAtLastInput(new Date());
        setMessage("Welches Intervall ist das?");
        setRoundEnded(false);
        setNoInputAllowed(false);
    };

    const startRound = () => {
        setShowPageMenu(false);
        setStarted(true);
        if (intervalClip) {
            intervalClip.play();
        }
    };

    const setupRound = () => {
        setRound(1);
        nextInterval();
        setGuesses([]);
        setTimeAtLastInput(new Date());
        setMessage("Welches Intervall ist das?");
        setRoundEnded(false);
        setNoInputAllowed(false);
    };

    const getIntervalsByRootNote = () => {
        const intervalsByRootNote =
            allIntervalsByRootNote[
                rootNote as keyof typeof allIntervalsByRootNote
            ];
        if (mode === IntervalMode.simple) {
            return intervalsByRootNote.filter((interval) =>
                simpleIntervalNames.includes(interval.slice(0, 2))
            );
        }
        if (mode === IntervalMode.diatonic) {
            return intervalsByRootNote.filter((interval) =>
                diatonicIntervalNames.includes(interval.slice(0, 2))
            );
        }
        return intervalsByRootNote;
    };

    const playIntervalAgain = () => {
        if (intervalClip) {
            intervalClip.play();
        }
    };

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>Intervalltraining</title>
                <meta name="author" content="Dominik Heller" />
                <meta
                    name="description"
                    content="Trainiere deine Fähigkeit, verschiedene Intervalle mit dem Ohr zu identifizieren."
                />
                <meta name="keywords" content="noten, lernen, intervalle" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <link rel="shortcut icon" href="favicon.ico" />
            </Head>
            <PageBody>
                <p className="text-xl">{message}</p>
                <div className="mx-auto flex justify-center items-center p-12 m-8 w-full bg-blue-300 rounded-md">
                    <button
                        onClick={playIntervalAgain}
                        className="bg-orange-300 py-2 px-6 rounded-md sm:hover:bg-orange-400 text-gray-800 transition-colors"
                    >
                        Nochmal abspielen
                    </button>
                </div>
                <Keypad
                    handleInput={handleInput}
                    disabled={showPageMenu || roundEnded || noInputAllowed}
                    keys={INTERVAL_KEYS}
                />
                <p className="mx-auto my-4 text-xl">
                    Runde {round}/{numberOfIntervalsPerRound}
                </p>
                <Button
                    name="Zurück"
                    handleClick={() => setShowPageMenu(true)}
                />
                {roundEnded && (
                    <IntervalStats
                        guesses={guesses}
                        newRound={newRound}
                        roundEnded={roundEnded}
                        numberOfIntervalsPerRound={numberOfIntervalsPerRound}
                    />
                )}
                {showPageMenu && (
                    <PageMenu
                        description="Lege die Anzahl der Intervalle fest (1-99), die du pro Runde identifizieren musst."
                        title="Intervalltraining"
                        startRound={startRound}
                        setupRound={setupRound}
                        changeMode={setMode}
                        currentMode={mode}
                        started={started}
                        changeTotalRounds={setNumberOfIntervalsPerRound}
                        buttons={
                            <>
                                <ModeButton
                                    name="Einfache Intervalle"
                                    changeMode={() =>
                                        setMode(IntervalMode.simple)
                                    }
                                    highlighted={mode === IntervalMode.simple}
                                />
                                <ModeButton
                                    name="Diatonische Intervalle"
                                    changeMode={() =>
                                        setMode(IntervalMode.diatonic)
                                    }
                                    highlighted={mode === IntervalMode.diatonic}
                                />
                                <ModeButton
                                    name="Alle Intervalle"
                                    changeMode={() => setMode(IntervalMode.all)}
                                    highlighted={mode === IntervalMode.all}
                                />
                                <ToggleButton
                                    handleClick={() =>
                                        setKeepRootNote(!keepRootNote)
                                    }
                                />
                            </>
                        }
                    />
                )}
            </PageBody>
        </>
    );
};

export default Intervalltraining;