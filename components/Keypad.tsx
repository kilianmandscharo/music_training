import { KeypadProps } from "../interfaces/interfaces";

export default function Keypad({ handleInput, disabled, keys }: KeypadProps) {
    return (
        <div className="flex flex-wrap max-w-3xl justify-center items-center">
            {keys.map((letter, i) => (
                <button
                    disabled={disabled}
                    key={i}
                    onClick={() => handleInput(letter)}
                    className="m-2 bg-gray-700 min-w-[5rem] p-2 rounded-lg hover:bg-pink-400 transition-colors"
                >
                    {letter}
                </button>
            ))}
        </div>
    );
}
