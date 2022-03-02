import { ButtonProps } from "../interfaces/interfaces";

export default function Button({ name, handleClick }: ButtonProps) {
    return (
        <button
            onClick={handleClick}
            className="bg-blue-300 py-2 px-6 rounded-md sm:hover:bg-blue-400 text-gray-800 transition-colors"
        >
            {name}
        </button>
    );
}
