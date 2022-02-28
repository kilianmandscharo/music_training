import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Keypad from "../components/Keypad";
import { noteComponents } from "../components/Notes";
import Stats from "../components/Stats";
import Welcome from "../components/Welcome";
import noteTest from "../functions/noteTest";
import { Guess } from "../interfaces/interfaces";

const Home: NextPage = () => {
    const [noteComponent, setNoteComponent] = useState(<div></div>);
    const [currentNote, setCurrentNote] = useState<string[]>([]);
    const [message, setMessage] = useState("Welche Note ist das?");
    const [round, setRound] = useState(1);
    const [guesses, setGuesses] = useState<Guess[]>([]);
    const [roundEnded, setRoundEnded] = useState(false);
    const [timeAtLastInput, setTimeAtLastInput] = useState(new Date());
    const [showWelcome, setShowWelcome] = useState(true);

    const nextNote = () => {
        const notes: any = noteComponents;
        const noteNames = Object.keys(notes);
        const randomNoteName =
            noteNames[Math.floor(Math.random() * noteNames.length)];
        const randomNote = notes[randomNoteName];
        setNoteComponent(randomNote);
        setCurrentNote([
            randomNoteName.split("")[2].toUpperCase(),
            randomNoteName,
        ]);
    };

    const handleInput = (inputNote: string) => {
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
        setTimeout(() => {
            if (round === 10) {
                setRoundEnded(true);
            } else {
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
    };

    const startFirstRound = () => {
        setShowWelcome(false);
        newRound();
    };

    return (
        <div className="base-black relative mx-auto max-w-4xl h-screen min-w-[18rem] flex flex-col justify-around items-center p-8 text-white/90">
            <div className="text-center text-2xl my-4">{message}</div>
            <div className="mx-auto flex justify-center items-center p-12 m-8 w-full bg-blue-300 rounded-md">
                {noteComponent}
            </div>
            <Keypad handleInput={handleInput} disabled={showWelcome} />
            {roundEnded && (
                <Stats
                    guesses={guesses}
                    newRound={newRound}
                    roundEnded={roundEnded}
                />
            )}
            <p className="mx-auto mt-12 text-xl">Runde {round}</p>
            {showWelcome && <Welcome startFirstRound={startFirstRound} />}
        </div>
    );
};

export default Home;
