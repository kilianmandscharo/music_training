import React, { Dispatch, SetStateAction } from "react";
import { RootNote, ROOT_NOTES } from "../constants/noteNames";

// Component interfaces
export interface KeypadProps {
    handleInput: (input: string) => void;
    disabled: boolean;
    keys: string[];
    intervalNames: string[] | null;
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
    currentState: boolean;
}

export interface ExtendableMenuProps {
    changeRootNote: Dispatch<SetStateAction<RootNote>>;
    changeRootNoteStatic: () => void;
    rootNoteStatic: boolean;
    currentRootNote: RootNote;
    currentIntervals: string[];
    changeIntervals: (interval: string) => void;
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
