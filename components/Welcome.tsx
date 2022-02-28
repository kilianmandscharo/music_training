import { noteComponents } from "./Notes";

interface WelcomeProps {
    startFirstRound: () => void;
}

export default function Welcome({ startFirstRound }: WelcomeProps) {
    return (
        <div className="base-black absolute top-0 right-0 bottom-0 left-0 p-12 flex flex-col justify-around items-center gap-4 text-white/90">
            <p className="text-center text-3xl">Wilkommen zum Notentraining!</p>
            <div className="bg-blue-300 rounded-md">
                {noteComponents["b-f3"]()}
            </div>
            <div className="bg-blue-300 rounded-md">
                {noteComponents["t-g4"]()}
            </div>
            <p className="text-center text-xl">
                Identifiziere 10 Noten im Violin- und Bassschlüssel.
            </p>
            <button
                onClick={startFirstRound}
                className="bg-blue-300 text-gray-700 rounded-md py-2 px-6 hover:bg-blue-400 transition-colors"
            >
                Start
            </button>
        </div>
    );
}
