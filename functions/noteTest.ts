import { noteComponents, noteDistributionAll } from "../components/Notes";

export default function noteTest(iterations: number) {
    const notes: any = noteComponents;
    const noteNames = Object.keys(notes);
    const timesEachNoteWasGuessed: any = new Map();
    for (const note of noteNames) {
        timesEachNoteWasGuessed.set(note, 0);
    }
    for (let i = 0; i < iterations; i++) {
        const noteNameIndex =
            noteDistributionAll[
                Math.floor(Math.random() * noteDistributionAll.length)
            ];
        const randomNoteName = noteNames[noteNameIndex];
        const entry = timesEachNoteWasGuessed.get(randomNoteName);
        timesEachNoteWasGuessed.set(randomNoteName, entry + 1);
    }
    console.log(timesEachNoteWasGuessed);
}
