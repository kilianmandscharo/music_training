import Head from "next/head";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Keypad from "../components/Keypad";
import {
    noteComponents,
    noteDistributionAll,
    noteDistributionSingle,
} from "../components/Notes";
import PageBody from "../components/PageBody";
import Stats from "../components/NoteStats";
import PageMenu from "../components/PageMenu";
import { NOTE_KEYS } from "../constants/keys";
import { NoteGuess, NoteMode } from "../interfaces/interfaces";
import ModeButton from "../components/ModeButton";

const Notentraining = () => {
    const [noteComponent, setNoteComponent] = useState(<div></div>);
    const [currentNote, setCurrentNote] = useState<string[]>([]);
    const [message, setMessage] = useState("Welche Note ist das?");
    const [round, setRound] = useState(1);
    const [guesses, setGuesses] = useState<NoteGuess[]>([]);
    const [roundEnded, setRoundEnded] = useState(false);
    const [timeAtLastInput, setTimeAtLastInput] = useState(new Date());
    const [showPageMenu, setShowPageMenu] = useState(true);
    const [mode, setMode] = useState(NoteMode.treble);
    const [noteNames, setNoteNames] = useState<string[]>(
        Object.keys(noteComponents).slice(21)
    );
    const [started, setStarted] = useState(false);
    const [numberOfNotesPerRound, setNumberOfNotesPerRound] = useState(10);
    const [noInputAllowed, setNoInputAllowed] = useState(false);

    useEffect(() => {
        const names = Object.keys(noteComponents);
        if (mode === NoteMode.bass) {
            setNoteNames(names.slice(0, 21));
        }
        if (mode === NoteMode.treble) {
            setNoteNames(names.slice(21));
        }
        if (mode === NoteMode.both) {
            setNoteNames(names);
        }
    }, [mode]);

    useEffect(() => {
        nextNote();
    }, []);

    const handleKeyPress = (e: KeyboardEvent) => {
        const key = e.key.toUpperCase();
        if (NOTE_KEYS.includes(key)) {
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
            mode === NoteMode.both
                ? noteDistributionAll
                : noteDistributionSingle;
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

    const handleInput = (input: string) => {
        if (noInputAllowed) {
            return;
        }
        const [current, fullNoteName] = currentNote;
        const correct = input === current;
        const now = new Date().getTime();
        const time = (now - timeAtLastInput.getTime()) / 1000;
        setGuesses([
            ...guesses,
            {
                correct,
                time,
                correctNote: current,
                noteGuessed: input,
                fullNoteName,
            },
        ]);
        setMessage(correct ? "Richtig" : "Falsch");
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
        setShowPageMenu(false);
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
                <title>Notentraining</title>
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
            <PageBody>
                {!showPageMenu && !roundEnded && (
                    <>
                        <p className="text-xl">{message}</p>
                        <div className="mx-auto flex justify-center items-center p-12 m-8 w-full bg-blue-300 rounded-md">
                            {noteComponent}
                        </div>
                        <Keypad
                            handleInput={handleInput}
                            disabled={
                                showPageMenu || roundEnded || noInputAllowed
                            }
                            keys={NOTE_KEYS}
                            mode={null}
                        />
                        <p className="mx-auto my-4 text-xl">
                            Runde {round}/{numberOfNotesPerRound}
                        </p>
                        <Button
                            name="Zurück"
                            handleClick={() => setShowPageMenu(true)}
                        />
                    </>
                )}
                {roundEnded && (
                    <Stats
                        guesses={guesses}
                        newRound={newRound}
                        roundEnded={roundEnded}
                        numberOfNotesPerRound={numberOfNotesPerRound}
                    />
                )}
                {showPageMenu && (
                    <PageMenu
                        description="Lege die Anzahl der Noten fest (1-99), die du im
                    jeweiligen Notenschlüssel pro Runde identifizieren musst."
                        title="Notentraining"
                        startRound={startRound}
                        setupRound={setupRound}
                        started={started}
                        changeTotalRounds={setNumberOfNotesPerRound}
                        buttons={
                            <>
                                <ModeButton
                                    name="Violinschlüssel"
                                    changeMode={() => setMode(NoteMode.treble)}
                                    highlighted={mode === NoteMode.treble}
                                />
                                <ModeButton
                                    name="Bassschlüssel"
                                    changeMode={() => setMode(NoteMode.bass)}
                                    highlighted={mode === NoteMode.bass}
                                />
                                <ModeButton
                                    name="Violin- und Bassschlüssel"
                                    changeMode={() => setMode(NoteMode.both)}
                                    highlighted={mode === NoteMode.both}
                                />
                            </>
                        }
                    />
                )}
            </PageBody>
        </>
    );
};

export default Notentraining;
