const keys = ["C", "D", "E", "F", "G", "A", "H"];

interface KeypadProps {
    handleInput: (inputNote: string) => void;
    disabled: boolean;
}

export default function Keypad({ handleInput, disabled }: KeypadProps) {
    return (
        <div>
            {keys.map((letter, i) => (
                <button
                    disabled={disabled}
                    key={i}
                    onClick={() => handleInput(letter)}
                    className="m-8 bg-orange-300 w-10 rounded-lg"
                >
                    {letter}
                </button>
            ))}
        </div>
    );
}
