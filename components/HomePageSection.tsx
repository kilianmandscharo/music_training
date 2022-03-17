import Link from "next/link";
import { HomePageSectionProps } from "../interfaces/interfaces";

export default function HomePageSection({
    link,
    title,
    description,
}: HomePageSectionProps) {
    return (
        <div className="mb-8 border-t-2 border-orange-300 py-4 font-body">
            <h2 className="font-header mx-auto text-center text-4xl mb-4">
                {title}
            </h2>
            <p className="text-center mb-6 text-lg">{description}</p>
            <Link href={link}>
                <div className="bg-blue-300 sm:hover:bg-blue-400 cursor-pointer max-w-sm mx-auto flex justify-center p-4 rounded-md">
                    <a className="text-center text-xl font-body text-gray-800">
                        Zum {title}
                    </a>
                </div>
            </Link>
        </div>
    );
}
