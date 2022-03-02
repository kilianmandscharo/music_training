import { Dispatch, SetStateAction } from "react";

// Component interfaces
export interface KeypadProps {
    handleInput: (inputNote: string) => void;
    disabled: boolean;
}

export interface WelcomeProps {
    startRound: () => void;
    setupRound: () => void;
    changeMode: Dispatch<SetStateAction<Mode>>;
    currentMode: Mode;
    started: boolean;
    nextNote: () => void;
    changeTotalRounds: Dispatch<SetStateAction<number>>;
}

export interface StatsProps {
    guesses: Guess[];
    newRound: () => void;
    roundEnded: boolean;
    numberOfNotesPerRound: number;
}

export interface ModeButtonProps {
    name: string;
    changeMode: () => void;
    highlighted: boolean;
}

export interface ButtonProps {
    name: string;
    handleClick: () => void;
}

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
