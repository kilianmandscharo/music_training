interface MenuButtonProps {
    goBack: () => void;
}

export default function MenuButton({ goBack }: MenuButtonProps) {
    return (
        <button
            onClick={goBack}
            className="absolute top-[-5px] left-[-45px] w-10 h-10"
        >
            Zurück zur Startseite
        </button>
    );
}
