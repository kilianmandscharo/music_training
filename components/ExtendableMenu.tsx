import { useState } from "react";
import { allIntervalNames } from "../constants/intervalNames";
import { parseNoteName, ROOT_NOTES } from "../constants/noteNames";
import { ExtendableMenuProps } from "../interfaces/interfaces";
import ToggleButton from "./ToggleButton";

export default function ExtendableMenu({
    changeRootNote,
    changeRootNoteStatic,
    rootNoteStatic,
    currentRootNote,
    currentIntervals,
    changeIntervals,
    currentIntervalDirection,
    changeCurrentIntervalDirection,
}: ExtendableMenuProps) {
    const [extended, setExtended] = useState(false);
    const [extendedOnce, setExtendedOnce] = useState(false);

    const handleClick = () => {
        setExtended(!extended);
        setExtendedOnce(true);
    };

    const animation = !extendedOnce
        ? ""
        : extended
        ? "animate-rotateOpen"
        : "animate-rotateClose";

    return (
        <div className="border-y-2 border-y-white/70 flex flex-col py-3 gap-6 w-72">
            <div className="relative flex flex-col justify-center">
                <button
                    onClick={handleClick}
                    className="bg-orange-300 py-2 px-6 rounded-md sm:hover:bg-orange-400 text-gray-800 transition-colors"
                >
                    Erweiterte Optionen
                </button>
                <svg
                    width="15"
                    height="12"
                    viewBox="0 0 81 75"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`absolute top-[15px] right-2 ${animation}`}
                >
                    <path
                        d="M0 37.5L80.25 0.693924V74.3061L0 37.5Z"
                        fill="black"
                    />
                </svg>
            </div>
            {extended && (
                <>
                    <ToggleButton
                        description="Gleichen Grundton beibehalten"
                        handleClick={changeRootNoteStatic}
                        currentState={rootNoteStatic}
                        left="Ja"
                        right="Nein"
                    />
                    <div>
                        <p className="text-center text-sm pb-2">
                            Grundton festlegen
                        </p>
                        <div className="grid grid-cols-3">
                            {ROOT_NOTES.map((note) => (
                                <button
                                    key={note}
                                    disabled={!rootNoteStatic}
                                    className={`disabled:opacity-40 disabled:pointer-events-none p-2 m-1 text-sm rounded-md bg-blue-300 sm:hover:bg-blue-400 ${
                                        note === currentRootNote
                                            ? "text-orange-700"
                                            : "text-gray-800"
                                    }`}
                                    onClick={() => changeRootNote(note)}
                                >
                                    {parseNoteName(note)}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="text-center text-sm pb-2">
                            Intervalle festlegen
                        </p>
                        <div className="grid grid-cols-3">
                            {allIntervalNames.map((interval) => (
                                <button
                                    key={interval}
                                    className={`disabled:opacity-40 disabled:pointer-events-none p-2 m-1 text-sm rounded-md bg-blue-300 sm:hover:bg-blue-400 ${
                                        currentIntervals.includes(interval)
                                            ? "text-orange-700"
                                            : "text-gray-800"
                                    }`}
                                    onClick={() => changeIntervals(interval)}
                                >
                                    {interval}
                                </button>
                            ))}
                        </div>
                    </div>
                    <ToggleButton
                        description="Intervallrichtung"
                        currentState={
                            currentIntervalDirection === "asc" ? true : false
                        }
                        handleClick={changeCurrentIntervalDirection}
                        left="Aufsteigend"
                        right="Absteigend"
                    />
                </>
            )}
        </div>
    );
}
