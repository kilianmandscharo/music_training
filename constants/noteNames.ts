export const ALL_NOTES = [
    "C2",
    "Csharp2",
    "D2",
    "Dsharp2",
    "E2",
    "F2",
    "Fsharp2",
    "G2",
    "Gsharp2",
    "A2",
    "B2",
    "H2",
    "C3",
    "Csharp3",
    "D3",
    "Dsharp3",
    "E3",
    "F3",
    "Fsharp3",
    "G3",
    "Gsharp3",
    "A3",
    "B3",
    "H3",
];

export const ROOT_NOTES = [
    "C2",
    "Csharp2",
    "D2",
    "Dsharp2",
    "E2",
    "F2",
    "Fsharp2",
    "G2",
    "Gsharp2",
    "A2",
    "B2",
    "H2",
] as const;

export type RootNote = typeof ROOT_NOTES[number];

export const parseNoteName = (note: RootNote) => {
    return note.length < 7 ? note : note.replace("sharp", "#");
};
