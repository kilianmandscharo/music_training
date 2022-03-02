const keys = ["C", "D", "E", "F", "G", "A", "H"];

interface KeypadProps {
    handleInput: (inputNote: string) => void;
    disabled: boolean;
}

export default function Keypad({ handleInput, disabled }: KeypadProps) {
    return (
        <div className="flex flex-wrap justify-center items-center">
            {keys.map((letter, i) => (
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
