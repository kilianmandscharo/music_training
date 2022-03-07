import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Keypad from "../components/Keypad";
import ModeButton from "../components/ModeButton";
import PageBody from "../components/PageBody";
import PageMenu from "../components/PageMenu";
import Stats from "../components/Stats";
import allIntervals from "../constants/allIntervals";
import {
    diatonicIntervalNames,
    simpleIntervalNames,
} from "../constants/intervalNames";
import { IntervalGuess, IntervalMode } from "../interfaces/interfaces";

const Intervalltraining: NextPage = () => {
    const [intervalClip, setIntervalClip] = useState(<div></div>);
    const [currentInterval, setCurrentInterval] = useState<string>();
    const [message, setMessage] = useState("Welches Intervall ist das?");
    const [round, setRound] = useState(1);
    const [guesses, setGuesses] = useState<IntervalGuess[]>([]);
    const [roundEnded, setRoundEnded] = useState(false);
    const [timeAtLastInput, setTimeAtLastInput] = useState(new Date());
    const [showPageMenu, setShowPageMenu] = useState(true);
    const [mode, setMode] = useState(IntervalMode.simple);
    const [intervalNames, setIntervalNames] = useState<string[]>(
        getSimpleIntervals()
    );
    const [started, setStarted] = useState(false);
    const [numberOfIntervalsPerRound, setNumberOfIntervalsPerRound] =
        useState(10);
    const [noInputAllowed, setNoInputAllowed] = useState(false);

    useEffect(() => {
        if (mode === IntervalMode.simple) {
            setIntervalNames(getSimpleIntervals());
        }
        if (mode === IntervalMode.diatonic) {
            setIntervalNames(getDiatonicIntervals());
        }
        if (mode === IntervalMode.all) {
            setIntervalNames(getAllIntervals());
        }
    }, [mode]);

    useEffect(() => {
        nextInterval();
    }, []);

    const nextInterval = () => {
        const randomIntervalIndex = Math.floor(
            Math.random() * intervalNames.length
        );
        const randomIntervalName = intervalNames[randomIntervalIndex];
        const interval = (
            <audio controls src={`/intervals/${randomIntervalName}.mp3`}>
                Your browser does not support the
                <code>audio</code> element.
            </audio>
        );
        setCurrentInterval(randomIntervalName);
        setIntervalClip(interval);
    };

    // const handleInput = (inputNote: string) => {
    //     if (noInputAllowed) {
    //         return;
    //     }
    //     const [current, fullNoteName] = currentNote;
    //     const correct = inputNote === current;
    //     const now = new Date().getTime();
    //     const time = (now - timeAtLastInput.getTime()) / 1000;
    //     setGuesses([
    //         ...guesses,
    //         {
    //             correct,
    //             time,
    //             correctNote: current,
    //             noteGuessed: inputNote,
    //             fullNoteName,
    //         },
    //     ]);
    //     setMessage(correct ? "Correct" : "False");
    //     setNoInputAllowed(true);
    //     setTimeout(() => {
    //         if (round === numberOfNotesPerRound) {
    //             setRoundEnded(true);
    //         } else {
    //             setNoInputAllowed(false);
    //             nextNote();
    //             setTimeAtLastInput(new Date());
    //             setMessage("Welche Note ist das?");
    //             setRound((prev) => prev + 1);
    //         }
    //     }, 1000);
    // };

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
    };

    const setupRound = () => {
        nextInterval();
        setRound(1);
        setGuesses([]);
        setTimeAtLastInput(new Date());
        setMessage("Welches Intervall ist das?");
        setRoundEnded(false);
        setNoInputAllowed(false);
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
                    {intervalClip}
                </div>
                {/* <Keypad
                    handleInput={handleInput}
                    disabled={showWelcome || roundEnded || noInputAllowed}
                /> */}
                <p className="mx-auto my-4 text-xl">
                    Runde {round}/{numberOfIntervalsPerRound}
                </p>
                <Button
                    name="Zurück"
                    handleClick={() => setShowPageMenu(true)}
                />
                {/* {roundEnded && (
                    <Stats
                        guesses={guesses}
                        newRound={newRound}
                        roundEnded={roundEnded}
                        numberOfNotesPerRound={numberOfNotesPerRound}
                    />
                )} */}
                {showPageMenu && (
                    <PageMenu
                        description="Lege die Anzahl der Intervalle pro Runde fest (1-99), die du identifizieren musst."
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
                            </>
                        }
                    />
                )}
            </PageBody>
        </>
    );
};

const getSimpleIntervals = () => {
    const simpleIntervals: string[] = [];
    for (const intervals of Object.values(allIntervals)) {
        for (const interval of intervals) {
            const intervalName = interval.slice(0, 2);
            if (simpleIntervalNames.includes(intervalName)) {
                simpleIntervals.push(interval);
            }
        }
    }
    return simpleIntervals;
};

const getDiatonicIntervals = () => {
    const diatonicIntervals: string[] = [];
    for (const intervals of Object.values(allIntervals)) {
        for (const interval of intervals) {
            const intervalName = interval.slice(0, 2);
            if (diatonicIntervalNames.includes(intervalName)) {
                diatonicIntervals.push(interval);
            }
        }
    }
    return diatonicIntervals;
};

const getAllIntervals = () => {
    const allIntervalNames: string[] = [];
    for (const intervals of Object.values(allIntervals)) {
        for (const interval of intervals) {
            allIntervalNames.push(interval);
        }
    }
    return allIntervalNames;
};

export default Intervalltraining;
