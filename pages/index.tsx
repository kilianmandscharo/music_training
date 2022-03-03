import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Keypad from "../components/Keypad";
import {
    noteComponents,
    noteDistributionAll,
    noteDistributionSingle,
} from "../components/Notes";
import Stats from "../components/Stats";
import Welcome from "../components/Welcome";
import { KEYS } from "../constants/constants";
import { Guess, Mode } from "../interfaces/interfaces";

const Home: NextPage = () => {
    const [noteComponent, setNoteComponent] = useState(<div></div>);
    const [currentNote, setCurrentNote] = useState<string[]>([]);
    const [message, setMessage] = useState("Welche Note ist das?");
    const [round, setRound] = useState(1);
    const [guesses, setGuesses] = useState<Guess[]>([]);
    const [roundEnded, setRoundEnded] = useState(false);
    const [timeAtLastInput, setTimeAtLastInput] = useState(new Date());
    const [showWelcome, setShowWelcome] = useState(true);
    const [mode, setMode] = useState(Mode.treble);
    const [noteNames, setNoteNames] = useState<string[]>(
        Object.keys(noteComponents).slice(21)
    );
    const [started, setStarted] = useState(false);
    const [numberOfNotesPerRound, setNumberOfNotesPerRound] = useState(10);
    const [noInputAllowed, setNoInputAllowed] = useState(false);

    useEffect(() => {
        const names = Object.keys(noteComponents);
        if (mode === Mode.bass) {
            setNoteNames(names.slice(0, 21));
        }
        if (mode === Mode.treble) {
            setNoteNames(names.slice(21));
        }
        if (mode === Mode.both) {
            setNoteNames(names);
        }
    }, [mode]);

    useEffect(() => {
        nextNote();
    }, []);

    const handleKeyPress = (e: KeyboardEvent) => {
        const key = e.key.toUpperCase();
        if (KEYS.includes(key)) {
            handleInput(key);
        }
    };

    useEffect(() => {
        window.addEventListener("keypress", handleKeyPress);
        return () => {
            window.removeEventListener("keypress", handleKeyPress);
        };
    }, [handleKeyPress]);

    const nextNote = () => {
        const notes: any = noteComponents;
        const noteDistribution =
            mode === Mode.both ? noteDistributionAll : noteDistributionSingle;
        const noteNameIndex =
            noteDistribution[
                Math.floor(Math.random() * noteDistribution.length)
            ];
        const randomNoteName = noteNames[noteNameIndex];
        const randomNote = notes[randomNoteName];
        setNoteComponent(randomNote);
        setCurrentNote([
            randomNoteName.split("")[2].toUpperCase(),
            randomNoteName,
        ]);
    };

    const handleInput = (inputNote: string) => {
        if (noInputAllowed) {
            return;
        }
        const [current, fullNoteName] = currentNote;
        const correct = inputNote === current;
        const now = new Date().getTime();
        const time = (now - timeAtLastInput.getTime()) / 1000;
        setGuesses([
            ...guesses,
            {
                correct,
                time,
                correctNote: current,
                noteGuessed: inputNote,
                fullNoteName,
            },
        ]);
        setMessage(correct ? "Correct" : "False");
        setNoInputAllowed(true);
        setTimeout(() => {
            if (round === numberOfNotesPerRound) {
                setRoundEnded(true);
            } else {
                setNoInputAllowed(false);
                nextNote();
                setTimeAtLastInput(new Date());
                setMessage("Welche Note ist das?");
                setRound((prev) => prev + 1);
            }
        }, 1000);
    };

    const newRound = () => {
        nextNote();
        setRound(1);
        setGuesses([]);
        setTimeAtLastInput(new Date());
        setMessage("Welche Note ist das?");
        setRoundEnded(false);
        setNoInputAllowed(false);
    };

    const startRound = () => {
        setShowWelcome(false);
        setStarted(true);
    };

    const setupRound = () => {
        nextNote();
        setRound(1);
        setGuesses([]);
        setTimeAtLastInput(new Date());
        setMessage("Welche Note ist das?");
        setRoundEnded(false);
        setNoInputAllowed(false);
    };

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>Notenlernen</title>
                <meta name="author" content="Dominik Heller" />
                <meta
                    name="description"
                    content="Lerne die verschiedenen Noten im Bass- und Violinschlüssel zu identifizieren."
                />
                <meta
                    name="keywords"
                    content="noten, lernen, wiederholung, bassschlüssel, violinschlüssel"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <link rel="shortcut icon" href="favicon.ico" />
            </Head>
            <div className="base-black relative mx-auto max-w-4xl  min-w-[18rem] flex flex-col justify-around items-center px-2 py-8 text-white/90 font-body">
                <p className="text-xl">{message}</p>
                <div className="mx-auto flex justify-center items-center p-12 m-8 w-full bg-blue-300 rounded-md">
                    {noteComponent}
                </div>
                <Keypad
                    handleInput={handleInput}
                    disabled={showWelcome || roundEnded || noInputAllowed}
                />
                <p className="mx-auto my-4 text-xl">
                    Runde {round}/{numberOfNotesPerRound}
                </p>
                <Button
                    name="Zur Startseite"
                    handleClick={() => setShowWelcome(true)}
                />
                {roundEnded && (
                    <Stats
                        guesses={guesses}
                        newRound={newRound}
                        roundEnded={roundEnded}
                        numberOfNotesPerRound={numberOfNotesPerRound}
                    />
                )}
                {showWelcome && (
                    <Welcome
                        startRound={startRound}
                        setupRound={setupRound}
                        changeMode={setMode}
                        currentMode={mode}
                        started={started}
                        nextNote={nextNote}
                        changeTotalRounds={setNumberOfNotesPerRound}
                    />
                )}
            </div>
        </>
    );
};

export default Home;
