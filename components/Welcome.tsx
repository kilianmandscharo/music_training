interface WelcomeProps {
    startFirstRound: () => void;
}

export default function Welcome({ startFirstRound }: WelcomeProps) {
    return (
        <div className="bg-cyan-500 absolute top-0 right-0 bottom-0 left-0 p-12 flex flex-col justify-center items-center gap-12">
            <p className="text-center text-2xl">Welcome to note training!</p>
            <p className="text-center text-2xl">
                Guess ten notes in treble and bass clef. After each round you
                get your average guessing time.
            </p>
            <button
                onClick={startFirstRound}
                className="bg-white rounded-md p-4"
            >
                Start
            </button>
        </div>
    );
}
