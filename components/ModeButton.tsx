import { ModeButtonProps } from "../interfaces/interfaces";

export default function ModeButton({
    name,
    changeMode,
    highlighted,
}: ModeButtonProps) {
    return (
        <button
            onClick={changeMode}
            className={`p-4 bg-blue-300 sm:hover:bg-blue-400 rounded-md text-gray-800 border-4 ${
                highlighted
                    ? "border-blue-600"
                    : "border-blue-300 sm:hover:border-blue-400"
            }`}
        >
            {name}
        </button>
    );
}
