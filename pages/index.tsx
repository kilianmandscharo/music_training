import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Keypad from "../components/Keypad";
import { noteComponents } from "../components/Notes";

const Home: NextPage = () => {
    const [noteComponent, setNoteComponent] = useState(<div></div>);
    const [currentNote, setCurrentNote] = useState("");
    const [message, setMessage] = useState("What's this note?");

    useEffect(() => {
        nextNote();
    }, []);

    const nextNote = () => {
        const notes: any = noteComponents;
        const noteNames = Object.keys(notes);
        const randomNoteName =
            noteNames[Math.floor(Math.random() * noteNames.length)];
        const randomNote = notes[randomNoteName];
        setNoteComponent(randomNote);
        setCurrentNote(randomNoteName.split("")[2].toUpperCase());
    };

    const handleInput = (inputNote: string) => {
        setMessage(inputNote === currentNote ? "Correct" : "False");
        setTimeout(() => {
            nextNote();
            setMessage("What's this note?");
        }, 1000);
    };

    return (
        <div className="mx-auto bg-blue-300 max-w-4xl grid justify-center p-8">
            <header>
                <h1 className="text-4xl text-center">Learn the notes</h1>
            </header>
            <div className="w-10/12 mx-auto flex justify-center items-center p-12 m-8 h-36">
                {noteComponent}
            </div>
            <div className="text-center">{message}</div>
            <Keypad handleInput={handleInput} />
        </div>
    );
};

export default Home;
