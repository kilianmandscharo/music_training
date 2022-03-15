import { ToggleButtonProps } from "../interfaces/interfaces";

export default function ToggleButton({
    handleClick,
    currentState,
    description,
    left,
    right,
}: ToggleButtonProps) {
    return (
        <div className="flex flex-col w-64 mx-auto">
            <p className="text-center text-sm pb-2">{description}</p>
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
                        {left}
                    </p>
                    <p
                        className={`rounded-md ${
                            !currentState ? "text-orange-700" : ""
                        }`}
                    >
                        {right}
                    </p>
                </div>
            </button>
        </div>
    );
}
