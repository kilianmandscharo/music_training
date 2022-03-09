import { diatonicIntervalNames, simpleIntervalNames } from "./intervalNames";

export const allIntervalsByRootNote = {
    C: [
        "P1-C2-C2",
        "m2-C2-Csharp2",
        "M2-C2-D2",
        "m3-C2-Dsharp2",
        "M3-C2-E2",
        "P4-C2-F2",
        "TT-C2-Fsharp2",
        "P5-C2-G2",
        "m6-C2-Gsharp2",
        "M6-C2-A2",
        "m7-C2-Bb2",
        "M7-C2-B2",
        "P8-C2-C3",
    ],
    Csharp: [
        "P1-Csharp2-Csharp2",
        "m2-Csharp2-D2",
        "M2-Csharp2-Dsharp2",
        "m3-Csharp2-E2",
        "M3-Csharp2-F2",
        "P4-Csharp2-Fsharp2",
        "TT-Csharp2-G2",
        "P5-Csharp2-Gsharp2",
        "m6-Csharp2-A2",
        "M6-Csharp2-Bb2",
        "m7-Csharp2-B2",
        "M7-Csharp2-C3",
        "P8-Csharp2-Csharp3",
    ],
    D: [
        "P1-D2-D2",
        "m2-D2-Dsharp2",
        "M2-D2-E2",
        "m3-D2-F2",
        "M3-D2-Fsharp2",
        "P4-D2-G2",
        "TT-D2-Gsharp2",
        "P5-D2-A2",
        "m6-D2-Bb2",
        "M6-D2-B2",
        "m7-D2-C3",
        "M7-D2-Csharp3",
        "P8-D2-D3",
    ],
    Dsharp: [
        "P1-Dsharp2-Dsharp2",
        "m2-Dsharp2-E2",
        "M2-Dsharp2-F2",
        "m3-Dsharp2-Fsharp2",
        "M3-Dsharp2-G2",
        "P4-Dsharp2-Gsharp2",
        "TT-Dsharp2-A2",
        "P5-Dsharp2-Bb2",
        "m6-Dsharp2-B2",
        "M6-Dsharp2-C3",
        "m7-Dsharp2-Csharp3",
        "M7-Dsharp2-D3",
        "P8-Dsharp2-Dsharp3",
    ],
    E: [
        "P1-E2-E2",
        "m2-E2-F2",
        "M2-E2-Fsharp2",
        "m3-E2-G2",
        "M3-E2-Gsharp2",
        "P4-E2-A2",
        "TT-E2-Bb2",
        "P5-E2-B2",
        "m6-E2-C3",
        "M6-E2-Csharp3",
        "m7-E2-D3",
        "M7-E2-Dsharp3",
        "P8-E2-E3",
    ],
    F: [
        "P1-F2-F2",
        "m2-F2-Fsharp2",
        "M2-F2-G2",
        "m3-F2-Gsharp2",
        "M3-F2-A2",
        "P4-F2-Bb2",
        "TT-F2-B2",
        "P5-F2-C3",
        "m6-F2-Csharp3",
        "M6-F2-D3",
        "m7-F2-Dsharp3",
        "M7-F2-E3",
        "P8-F2-F3",
    ],
    Fsharp: [
        "P1-Fsharp2-Fsharp2",
        "m2-Fsharp2-G2",
        "M2-Fsharp2-Gsharp2",
        "m3-Fsharp2-A2",
        "M3-Fsharp2-Bb2",
        "P4-Fsharp2-B2",
        "TT-Fsharp2-C3",
        "P5-Fsharp2-Csharp3",
        "m6-Fsharp2-D3",
        "M6-Fsharp2-Dsharp3",
        "m7-Fsharp2-E3",
        "M7-Fsharp2-F3",
        "P8-Fsharp2-Fsharp3",
    ],
    G: [
        "P1-G2-G2",
        "m2-G2-Gsharp2",
        "M2-G2-A2",
        "m3-G2-Bb2",
        "M3-G2-B2",
        "P4-G2-C3",
        "TT-G2-Csharp3",
        "P5-G2-D3",
        "m6-G2-Dsharp3",
        "M6-G2-E3",
        "m7-G2-F3",
        "M7-G2-Fsharp3",
        "P8-G2-G3",
    ],
    Gsharp: [
        "P1-Gsharp2-Gsharp2",
        "m2-Gsharp2-A2",
        "M2-Gsharp2-Bb2",
        "m3-Gsharp2-B2",
        "M3-Gsharp2-C3",
        "P4-Gsharp2-Csharp3",
        "TT-Gsharp2-D3",
        "P5-Gsharp2-Dsharp3",
        "m6-Gsharp2-E3",
        "M6-Gsharp2-F3",
        "m7-Gsharp2-Fsharp3",
        "M7-Gsharp2-G3",
        "P8-Gsharp2-Gsharp3",
    ],
    A: [
        "P1-A2-A2",
        "m2-A2-Bb2",
        "M2-A2-B2",
        "m3-A2-C3",
        "M3-A2-Csharp3",
        "P4-A2-D3",
        "TT-A2-Dsharp3",
        "P5-A2-E3",
        "m6-A2-F3",
        "M6-A2-Fsharp3",
        "m7-A2-G3",
        "M7-A2-Gsharp3",
        "P8-A2-A3",
    ],
    Bflat: [
        "P1-Bb2-Bb2",
        "m2-Bb2-B2",
        "M2-Bb2-C3",
        "m3-Bb2-Csharp3",
        "M3-Bb2-D3",
        "P4-Bb2-Dsharp3",
        "TT-Bb2-E3",
        "P5-Bb2-F3",
        "m6-Bb2-Fsharp3",
        "M6-Bb2-G3",
        "m7-Bb2-Gsharp3",
        "M7-Bb2-A3",
        "P8-Bb2-Bb3",
    ],
    B: [
        "P1-B2-B2",
        "m2-B2-C3",
        "M2-B2-Csharp3",
        "m3-B2-D3",
        "M3-B2-Dsharp3",
        "P4-B2-E3",
        "TT-B2-F3",
        "P5-B2-Fsharp3",
        "m6-B2-G3",
        "M6-B2-Gsharp3",
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
