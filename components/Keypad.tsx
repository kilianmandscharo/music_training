import { getShortIntervalFromFullName } from "../constants/intervalNames";
import { KeypadProps } from "../interfaces/interfaces";

export default function Keypad({
    handleInput,
    disabled,
    keys,
    intervalNames,
}: KeypadProps) {
    const determineButtonState = (key: string) => {
        if (disabled) return true;
        if (intervalNames === null) return false;
        const interval = getShortIntervalFromFullName(key);
        if (interval) {
            return !intervalNames.includes(interval);
        }
    };

    return (
        <div className="flex flex-wrap max-w-3xl justify-center items-center">
            {keys.map((key, i) => (
                <button
                    disabled={determineButtonState(key)}
                    key={i}
                    onClick={() => handleInput(key)}
                    className="disabled:opacity-40 disabled:pointer-events-none m-2 bg-gray-700 min-w-[5rem] p-2 rounded-lg hover:bg-pink-400 transition-colors"
                >
                    {key}
                </button>
            ))}
        </div>
    );
}
