import React, { Dispatch, SetStateAction } from "react";

// Component interfaces
export interface KeypadProps {
    handleInput: (input: string) => void;
    disabled: boolean;
    keys: string[];
}

export interface PageMenuProps {
    title: string;
    description: string;
    startRound: () => void;
    setupRound: () => void;
    started: boolean;
    changeTotalRounds: Dispatch<SetStateAction<number>>;
    buttons: React.ReactNode;
}

export interface NoteStatsProps {
    guesses: NoteGuess[];
    newRound: () => void;
    roundEnded: boolean;
    numberOfNotesPerRound: number;
}

export interface IntervalStatsProps {
    guesses: IntervalGuess[];
    newRound: () => void;
    roundEnded: boolean;
    numberOfIntervalsPerRound: number;
    playInterval: (buffer: AudioBuffer) => void;
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

export interface ToggleButtonProps {
    handleClick: () => void;
}

export interface AudioIconProps {
    playing: boolean;
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
    intervalBuffer: AudioBuffer;
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
