import { useState } from "react";
import { ToggleButtonProps } from "../interfaces/interfaces";
import Button from "./Button";

export default function ToggleButton({ handleClick }: ToggleButtonProps) {
    const [toggleState, setToggleState] = useState(false);

    const toggle = () => {
        handleClick();
        setToggleState(!toggleState);
    };

    return (
        <div className="flex flex-col">
            <p className="text-center text-sm pb-2">
                Gleichen Grundton beibehalten
            </p>
            <button
                onClick={toggle}
                className="bg-blue-300 py-2 px-6 rounded-md sm:hover:bg-blue-400 text-gray-800 transition-colors"
            >
                <div className="flex justify-around items-center">
                    <p
                        className={`rounded-md ${
                            toggleState ? "text-orange-700" : ""
                        }`}
                    >
                        Ja
                    </p>
                    <p
                        className={`rounded-md ${
                            !toggleState ? "text-orange-700" : ""
                        }`}
                    >
                        Nein
                    </p>
                </div>
            </button>
        </div>
    );
}
