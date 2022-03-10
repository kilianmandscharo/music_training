import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Button from "../components/Button";
import Keypad from "../components/Keypad";
import ModeButton from "../components/ModeButton";
import PageBody from "../components/PageBody";
import PageMenu from "../components/PageMenu";
import ToggleButton from "../components/ToggleButton";
import { intervalFullNameMapping } from "../constants/intervalNames";
import { INTERVAL_KEYS } from "../constants/keys";
import { IntervalGuess, IntervalMode } from "../interfaces/interfaces";
import IntervalStats from "../components/IntervalStats";
import AudioIcon from "../components/AudioIcon";
import { IntervalGenerator } from "../fns/createRandomInterval";

const intervalGenerator = new IntervalGenerator();

const Intervalltraining: NextPage = () => {
    const [intervalBuffer, setIntervalBuffer] = useState<AudioBuffer>();
    const [currentInterval, setCurrentInterval] = useState<string>("");
    const [message, setMessage] = useState("Welches Intervall ist das?");
    const [round, setRound] = useState(1);
    const [guesses, setGuesses] = useState<IntervalGuess[]>([]);
    const [roundEnded, setRoundEnded] = useState(false);
    const [timeAtLastInput, setTimeAtLastInput] = useState(new Date());
    const [showPageMenu, setShowPageMenu] = useState(true);
    const [mode, setMode] = useState(IntervalMode.simple);
    const [started, setStarted] = useState(false);
    const [numberOfIntervalsPerRound, setNumberOfIntervalsPerRound] =
        useState(10);
    const [noInputAllowed, setNoInputAllowed] = useState(false);
    const [keepRootNote, setKeepRootNote] = useState(false);
    const [rootNote, setRootNote] = useState("C");
    const [playing, setPlaying] = useState(false);

    const nextInterval = async () => {
        const [intervalBuffer, intervalName] =
            await intervalGenerator.createRandomIntervalBuffer(
                keepRootNote,
                mode
            );
        setIntervalBuffer(intervalBuffer);
        setCurrentInterval(intervalName);
        return intervalBuffer;
    };

    const handleInput = (input: string) => {
        if (noInputAllowed) {
            return;
        }
        const correctInterval =
            intervalFullNameMapping[
                currentInterval as keyof typeof intervalFullNameMapping
            ];
        const correct = input === correctInterval;
        const now = new Date().getTime();
        const time = (now - timeAtLastInput.getTime()) / 1000;
        if (intervalBuffer) {
            setGuesses([
                ...guesses,
                {
                    correct,
                    time,
                    correctInterval,
                    intervalGuessed: input,
                    intervalBuffer,
                },
            ]);
        }
        setMessage(correct ? "Richtig" : "Falsch");
        setNoInputAllowed(true);
        setTimeout(async () => {
            if (round === numberOfIntervalsPerRound) {
                setRoundEnded(true);
            } else {
                const interval = await nextInterval();
                playInterval(interval);
                setNoInputAllowed(false);
                setTimeAtLastInput(new Date());
                setMessage("Welches Intervall ist das?");
                setRound((prev) => prev + 1);
            }
        }, 1000);
    };

    const newRound = async () => {
        const interval = await nextInterval();
        playInterval(interval);
        setRound(1);
        setGuesses([]);
        setTimeAtLastInput(new Date());
        setMessage("Welches Intervall ist das?");
        setRoundEnded(false);
        setNoInputAllowed(false);
    };

    const startRound = async () => {
        setShowPageMenu(false);
        setStarted(true);
        const interval = await nextInterval();
        playInterval(interval);
    };

    const setupRound = () => {
        setRound(1);
        setGuesses([]);
        setTimeAtLastInput(new Date());
        setMessage("Welches Intervall ist das?");
        setRoundEnded(false);
        setNoInputAllowed(false);
    };

    const playInterval = (interval: AudioBuffer | undefined) => {
        if (!interval) return;
        intervalGenerator.play(interval);
        setPlaying(true);
        setTimeout(() => {
            setPlaying(false);
        }, 2300);
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
                {!showPageMenu && !roundEnded && (
                    <>
                        <p className="text-xl">{message}</p>
                        <div className="relative mx-auto flex flex-col gap-4 justify-center items-center p-12 m-8 w-full bg-blue-300 rounded-md">
                            <AudioIcon playing={playing} />
                            <button
                                onClick={() => playInterval(intervalBuffer)}
                                className="bg-orange-300 py-2 px-6 rounded-md sm:hover:bg-orange-400 text-gray-800 transition-colors shadow-md"
                            >
                                Nochmal abspielen
                            </button>
                        </div>
                        <Keypad
                            handleInput={handleInput}
                            disabled={
                                showPageMenu || roundEnded || noInputAllowed
                            }
                            keys={INTERVAL_KEYS}
                        />
                        <p className="mx-auto my-4 text-xl">
                            Runde {round}/{numberOfIntervalsPerRound}
                        </p>
                        <Button
                            name="Zurück"
                            handleClick={() => setShowPageMenu(true)}
                        />
                    </>
                )}
                {roundEnded && (
                    <IntervalStats
                        guesses={guesses}
                        newRound={newRound}
                        roundEnded={roundEnded}
                        numberOfIntervalsPerRound={numberOfIntervalsPerRound}
                        playInterval={intervalGenerator.play}
                    />
                )}
                {showPageMenu && (
                    <PageMenu
                        description="Lege die Anzahl der Intervalle fest (1-99), die du pro Runde identifizieren musst."
                        title="Intervalltraining"
                        startRound={startRound}
                        setupRound={setupRound}
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
