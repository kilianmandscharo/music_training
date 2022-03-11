import { IntervalMode } from "../interfaces/interfaces";

export const allIntervalNames = [
    "P1",
    "m2",
    "M2",
    "m3",
    "M3",
    "P4",
    "TT",
    "P5",
    "m6",
    "M6",
    "m7",
    "M7",
    "P8",
];

export const simpleIntervalNames = ["P1", "M3", "P5", "P8"];

export const diatonicIntervalNames = [
    "P1",
    "M2",
    "M3",
    "P4",
    "P5",
    "M6",
    "M7",
    "P8",
];

export const intervalFullNameMapping = {
    P1: "Prime",
    m2: "Kl. Sekunde",
    M2: "Gr. Sekunde",
    m3: "Kl. Terz",
    M3: "Gr. Terz",
    P4: "Quarte",
    TT: "Tritonus",
    P5: "Quinte",
    m6: "Kl. Sexte",
    M6: "Gr. Sexte",
    m7: "Kl. Septime",
    M7: "Gr. Septime",
    P8: "Oktave",
};

export const getShortIntervalFromFullName = (interval: string) => {
    return Object.keys(intervalFullNameMapping).find(
        (key) =>
            intervalFullNameMapping[
                key as keyof typeof intervalFullNameMapping
            ] === interval
    );
};

export const getIntervalNamesFromMode = (mode: IntervalMode) => {
    return mode === IntervalMode.simple
        ? simpleIntervalNames
        : mode === IntervalMode.diatonic
        ? diatonicIntervalNames
        : allIntervalNames;
};

export const intervalDistanceMapping = {
    P1: 0,
    m2: 1,
    M2: 2,
    m3: 3,
    M3: 4,
    P4: 5,
    TT: 6,
    P5: 7,
    m6: 8,
    M6: 9,
    m7: 10,
    M7: 11,
    P8: 12,
};
