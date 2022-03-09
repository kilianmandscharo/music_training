import { diatonicIntervalNames, simpleIntervalNames } from "./intervalNames";

export const allIntervalsByRootNote = {
    C: [
        "P1-C2-C2",
        "m2-C2-C#2",
        "M2-C2-D2",
        "m3-C2-D#2",
        "M3-C2-E2",
        "P4-C2-F2",
        "TT-C2-F#2",
        "P5-C2-G2",
        "m6-C2-G#2",
        "M6-C2-A2",
        "m7-C2-Bb2",
        "M7-C2-B2",
        "P8-C2-C3",
    ],
    Csharp: [
        "P1-C#2-C#2",
        "m2-C#2-D2",
        "M2-C#2-D#2",
        "m3-C#2-E2",
        "M3-C#2-F2",
        "P4-C#2-F#2",
        "TT-C#2-G2",
        "P5-C#2-G#2",
        "m6-C#2-A2",
        "M6-C#2-Bb2",
        "m7-C#2-B2",
        "M7-C#2-C3",
        "P8-C#2-C#3",
    ],
    D: [
        "P1-D2-D2",
        "m2-D2-D#2",
        "M2-D2-E2",
        "m3-D2-F2",
        "M3-D2-F#2",
        "P4-D2-G2",
        "TT-D2-G#2",
        "P5-D2-A2",
        "m6-D2-Bb2",
        "M6-D2-B2",
        "m7-D2-C3",
        "M7-D2-C#3",
        "P8-D2-D3",
    ],
    Dsharp: [
        "P1-D#2-D#2",
        "m2-D#2-E2",
        "M2-D#2-F2",
        "m3-D#2-F#2",
        "M3-D#2-G2",
        "P4-D#2-G#2",
        "TT-D#2-A2",
        "P5-D#2-Bb2",
        "m6-D#2-B2",
        "M6-D#2-C3",
        "m7-D#2-C#3",
        "M7-D#2-D3",
        "P8-D#2-D#3",
    ],
    E: [
        "P1-E2-E2",
        "m2-E2-F2",
        "M2-E2-F#2",
        "m3-E2-G2",
        "M3-E2-G#2",
        "P4-E2-A2",
        "TT-E2-Bb2",
        "P5-E2-B2",
        "m6-E2-C3",
        "M6-E2-C#3",
        "m7-E2-D3",
        "M7-E2-D#3",
        "P8-E2-E3",
    ],
    F: [
        "P1-F2-F2",
        "m2-F2-F#2",
        "M2-F2-G2",
        "m3-F2-G#2",
        "M3-F2-A2",
        "P4-F2-Bb2",
        "TT-F2-B2",
        "P5-F2-C3",
        "m6-F2-C#3",
        "M6-F2-D3",
        "m7-F2-D#3",
        "M7-F2-E3",
        "P8-F2-F3",
    ],
    Fsharp: [
        "P1-F#2-F#2",
        "m2-F#2-G2",
        "M2-F#2-G#2",
        "m3-F#2-A2",
        "M3-F#2-Bb2",
        "P4-F#2-B2",
        "TT-F#2-C3",
        "P5-F#2-C#3",
        "m6-F#2-D3",
        "M6-F#2-D#3",
        "m7-F#2-E3",
        "M7-F#2-F3",
        "P8-F#2-F#3",
    ],
    G: [
        "P1-G2-G2",
        "m2-G2-G#2",
        "M2-G2-A2",
        "m3-G2-Bb2",
        "M3-G2-B2",
        "P4-G2-C3",
        "TT-G2-C#3",
        "P5-G2-D3",
        "m6-G2-D#3",
        "M6-G2-E3",
        "m7-G2-F3",
        "M7-G2-F#3",
        "P8-G2-G3",
    ],
    Gsharp: [
        "P1-G#2-G#2",
        "m2-G#2-A2",
        "M2-G#2-Bb2",
        "m3-G#2-B2",
        "M3-G#2-C3",
        "P4-G#2-C#3",
        "TT-G#2-D3",
        "P5-G#2-D#3",
        "m6-G#2-E3",
        "M6-G#2-F3",
        "m7-G#2-F#3",
        "M7-G#2-G3",
        "P8-G#2-G#3",
    ],
    A: [
        "P1-A2-A2",
        "m2-A2-Bb2",
        "M2-A2-B2",
        "m3-A2-C3",
        "M3-A2-C#3",
        "P4-A2-D3",
        "TT-A2-D#3",
        "P5-A2-E3",
        "m6-A2-F3",
        "M6-A2-F#3",
        "m7-A2-G3",
        "M7-A2-G#3",
        "P8-A2-A3",
    ],
    Bflat: [
        "P1-Bb2-Bb2",
        "m2-Bb2-B2",
        "M2-Bb2-C3",
        "m3-Bb2-C#3",
        "M3-Bb2-D3",
        "P4-Bb2-D#3",
        "TT-Bb2-E3",
        "P5-Bb2-F3",
        "m6-Bb2-F#3",
        "M6-Bb2-G3",
        "m7-Bb2-G#3",
        "M7-Bb2-A3",
        "P8-Bb2-Bb3",
    ],
    B: [
        "P1-B2-B2",
        "m2-B2-C3",
        "M2-B2-C#3",
        "m3-B2-D3",
        "M3-B2-D#3",
        "P4-B2-E3",
        "TT-B2-F3",
        "P5-B2-F#3",
        "m6-B2-G3",
        "M6-B2-G#3",
        "m7-B2-A3",
        "M7-B2-Bb3",
        "P8-B2-B3",
    ],
};

export const simpleIntervals: string[] = [];
for (const intervals of Object.values(allIntervalsByRootNote)) {
    for (const interval of intervals) {
        const intervalName = interval.slice(0, 2);
        if (simpleIntervalNames.includes(intervalName)) {
            simpleIntervals.push(interval);
        }
    }
}

export const diatonicIntervals: string[] = [];
for (const intervals of Object.values(allIntervalsByRootNote)) {
    for (const interval of intervals) {
        const intervalName = interval.slice(0, 2);
        if (diatonicIntervalNames.includes(intervalName)) {
            diatonicIntervals.push(interval);
        }
    }
}

export const allIntervals: string[] = [];
for (const intervals of Object.values(allIntervalsByRootNote)) {
    for (const interval of intervals) {
        allIntervals.push(interval);
    }
}
