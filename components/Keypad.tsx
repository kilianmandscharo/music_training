import { KEYS } from "../constants/constants";
import { KeypadProps } from "../interfaces/interfaces";

export default function Keypad({ handleInput, disabled }: KeypadProps) {
    return (
        <div className="flex flex-wrap justify-center items-center">
            {KEYS.map((letter, i) => (
                <button
                    disabled={disabled}
                    key={i}
                    onClick={() => handleInput(letter)}
                    className="m-2 bg-gray-700 w-16 p-2 rounded-lg hover:bg-pink-400 transition-colors"
                >
                    {letter}
                </button>
            ))}
        </div>
    );
}
