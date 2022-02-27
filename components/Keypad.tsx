const keys = ["C", "D", "E", "F", "G", "A", "H"];

interface KeypadProps {
    handleInput: (inputNote: string) => void;
}

export default function Keypad({ handleInput }: KeypadProps) {
    return (
        <div>
            {keys.map((letter, i) => (
                <button
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
