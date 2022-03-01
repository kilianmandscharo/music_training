interface MenuButtonProps {
    goBack: () => void;
}

export default function MenuButton({ goBack }: MenuButtonProps) {
    return (
        <button onClick={goBack} className="absolute top-10 left-0 w-10 h-10">
            <svg
                width="49"
                height="23"
                viewBox="0 0 79 53"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect width="79" height="11" rx="5.5" fill="white" />
                <rect y="21" width="79" height="11" rx="5.5" fill="white" />
                <rect y="42" width="79" height="11" rx="5.5" fill="white" />
            </svg>
        </button>
    );
}
