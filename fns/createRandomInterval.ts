import {
    allIntervalNames,
    diatonicIntervalNames,
    intervalDistanceMapping,
    simpleIntervalNames,
} from "../constants/intervalNames";
import { IntervalMode } from "../interfaces/interfaces";

const ALL_NOTES = [
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
    "Bb2",
    "B2",
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
    "Bb3",
    "B3",
];

const ROOT_NOTES = [
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
    "Bb2",
    "B2",
];

class Interval {
    from: string;
    to: string;
    name: string;
    constructor(from: string, to: string, name: string) {
        this.from = from;
        this.to = to;
        this.name = name;
    }
}

export class IntervalGenerator {
    context: AudioContext;

    constructor() {
        this.context = new AudioContext();
    }

    play = (buffer: AudioBuffer) => {
        const source = this.context.createBufferSource();
        source.buffer = buffer;
        source.connect(this.context.destination);
        source.start();
    };

    createRandomIntervalBuffer = async (
        staticRootNote: boolean,
        mode: IntervalMode
    ): Promise<[AudioBuffer, string]> => {
        const interval = this.createRandomInterval(staticRootNote, mode);

        const intervalBuffer = await this.fetchNotes([
            `/notes_mp3/${interval.from}.mp3`,
            `/notes_mp3/${interval.to}.mp3`,
        ]).then((res) => {
            const [rootNoteBuffer, secondNoteBuffer] = res;
            return this.concatNotes([rootNoteBuffer, secondNoteBuffer]);
        });
        return [intervalBuffer, interval.name];
    };

    createRandomInterval = (staticRootNote: boolean, mode: IntervalMode) => {
        const [rootNote, rootNoteIndex] = staticRootNote
            ? ["C2", 0]
            : this.getRandomRootNoteAndIndex();
        const intervalNames =
            mode === IntervalMode.simple
                ? simpleIntervalNames
                : mode === IntervalMode.diatonic
                ? diatonicIntervalNames
                : allIntervalNames;
        const [intervalName, intervalDistance] =
            this.getRandomIntervalNameAndDistance(intervalNames);
        const secondNote = ALL_NOTES[rootNoteIndex + intervalDistance];
        return new Interval(rootNote, secondNote, intervalName);
    };

    getRandomRootNoteAndIndex = (): [string, number] => {
        const randomIndex = Math.floor(Math.random() * ROOT_NOTES.length);
        return [ROOT_NOTES[randomIndex], randomIndex];
    };

    getRandomIntervalNameAndDistance = (
        intervalNames: string[]
    ): [string, number] => {
        const randomIndex = Math.floor(Math.random() * intervalNames.length);
        const intervalName = intervalNames[randomIndex];
        const intervalDistance =
            intervalDistanceMapping[
                intervalName as keyof typeof intervalDistanceMapping
            ];
        return [intervalName, intervalDistance];
    };

    // The following two functions are stripped down versions from here: https://github.com/jackedgson/crunker/
    concatNotes = (noteBuffers: [AudioBuffer, AudioBuffer]) => {
        const interval = this.context.createBuffer(2, 48000 * 2, 48000);
        let offset = 0;
        for (const buffer of noteBuffers) {
            for (
                let channel = 0;
                channel < buffer.numberOfChannels;
                channel++
            ) {
                const intervalData = interval.getChannelData(channel);
                const bufferData = buffer.getChannelData(channel);
                intervalData.set(bufferData, offset);
            }
            offset += buffer.length;
        }
        return interval;
    };

    fetchNotes = async (paths: [string, string]) => {
        return await Promise.all(
            paths.map(async (path) => {
                const buffer = await fetch(path).then((res) => {
                    return res.arrayBuffer();
                });
                return await this.context.decodeAudioData(buffer);
            })
        );
    };
}
