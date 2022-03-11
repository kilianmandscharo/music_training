import { useState } from "react";
import { ToggleButtonProps } from "../interfaces/interfaces";

export default function ToggleButton({
    handleClick,
    currentState,
}: ToggleButtonProps) {
    return (
        <div className="flex flex-col max-w-[12rem] mx-auto">
            <p className="text-center text-sm pb-2">
                Gleichen Grundton beibehalten
            </p>
            <button
                onClick={handleClick}
                className="bg-blue-300 py-2 px-4 rounded-md sm:hover:bg-blue-400 text-gray-800 transition-colors"
            >
                <div className="flex justify-around items-center">
                    <p
                        className={`rounded-md px-2 ${
                            currentState ? "text-orange-700" : ""
                        }`}
                    >
                        Ja
                    </p>
                    <p
                        className={`rounded-md ${
                            !currentState ? "text-orange-700" : ""
                        }`}
                    >
                        Nein
                    </p>
                </div>
            </button>
        </div>
    );
}
