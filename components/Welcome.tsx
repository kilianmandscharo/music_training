interface WelcomeProps {
    startFirstRound: () => void;
}

export default function Welcome({ startFirstRound }: WelcomeProps) {
    return (
        <div className="bg-blue-300 absolute top-0 right-0 bottom-0 left-0 p-12 flex flex-col justify-center items-center gap-12">
            <p className="text-center text-3xl">Welcome to note training!</p>
            <p className="text-center text-xl">
                Guess ten notes in treble and bass clef. After each round check
                your average guessing time.
            </p>
            <button
                onClick={startFirstRound}
                className="bg-blue-500 rounded-md p-4 hover:text-white"
            >
                Start
            </button>
        </div>
    );
}
