export interface Guess {
    noteGuessed: string;
    correctNote: string;
    fullNoteName: string;
    correct: boolean;
    time: number;
}

export enum Mode {
    treble,
    bass,
    both,
}
