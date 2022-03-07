import React, { Dispatch, SetStateAction } from "react";

// Component interfaces
export interface KeypadProps {
    handleInput: (inputNote: string) => void;
    disabled: boolean;
}

export interface PageMenuProps {
    title: string;
    description: string;
    startRound: () => void;
    setupRound: () => void;
    changeMode:
        | Dispatch<SetStateAction<NoteMode>>
        | Dispatch<SetStateAction<IntervalMode>>;
    currentMode: NoteMode | IntervalMode;
    started: boolean;
    changeTotalRounds: Dispatch<SetStateAction<number>>;
    buttons: React.ReactNode;
}

export interface StatsProps {
    guesses: NoteGuess[];
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

//Other
export interface NoteGuess {
    noteGuessed: string;
    correctNote: string;
    fullNoteName: string;
    correct: boolean;
    time: number;
}
export interface IntervalGuess {
    intervalGuessed: string;
    correctInterval: string;
    correct: boolean;
    time: number;
}

export enum NoteMode {
    treble,
    bass,
    both,
}

export enum IntervalMode {
    simple,
    diatonic,
    all,
}
