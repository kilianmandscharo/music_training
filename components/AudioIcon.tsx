import { AudioIconProps } from "../interfaces/interfaces";

export default function AudioIcon({ playing }: AudioIconProps) {
    const color = playing ? "white" : "black";
    return (
        <svg
            width="34"
            height="17"
            viewBox="0 0 122 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M5.84425 54.5949C3.00311 52.6042 3.00311 48.3958 5.84424 46.4051L69.3808 1.88708C72.6945 -0.434715 77.25 1.93581 77.25 5.98194V95.0181C77.25 99.0642 72.6945 101.435 69.3809 99.1129L5.84425 54.5949Z"
                fill={color}
            />
            <rect y="30" width="60" height="41" rx="5" fill={color} />
            <path
                d="M81 22C84.713 22 88.274 24.95 90.8995 30.201C93.525 35.452 95 42.5739 95 50C95 57.4261 93.525 64.548 90.8995 69.799C88.274 75.05 84.713 78 81 78"
                stroke={color}
                strokeWidth="5"
            />
            <path
                d="M89 15C93.7739 15 98.3523 18.6875 101.728 25.2513C105.104 31.815 107 40.7174 107 50C107 59.2826 105.104 68.185 101.728 74.7487C98.3523 81.3125 93.7739 85 89 85"
                stroke={color}
                strokeWidth="5"
            />
            <path
                d="M95 5C101.365 5 107.47 9.74106 111.971 18.1802C116.471 26.6193 119 38.0653 119 50C119 61.9347 116.471 73.3807 111.971 81.8198C107.47 90.2589 101.365 95 95 95"
                stroke={color}
                strokeWidth="5"
            />
        </svg>
    );
}
