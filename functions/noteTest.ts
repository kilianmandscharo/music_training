import { noteComponents } from "../components/Notes";

export default function noteTest() {
    const notes: any = noteComponents;
    const noteNames = Object.keys(notes);
    const timesEachNoteWasGuessed: any = {};
    for (const note of noteNames) {
        timesEachNoteWasGuessed[note] = 0;
    }
    for (let i = 0; i < 10000; i++) {
        const randomNoteName =
            noteNames[Math.floor(Math.random() * noteNames.length)];
        timesEachNoteWasGuessed[randomNoteName] += 1;
    }
    console.log(timesEachNoteWasGuessed);
}
