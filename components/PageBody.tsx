interface PageBodyProps {
    children: React.ReactNode;
}

export default function PageBody({ children }: PageBodyProps) {
    return (
        <div className="bg-base-black mx-auto max-w-5xl  min-w-[21rem] flex flex-col justify-around items-center px-2 py-8 text-white/90 font-body">
            {children}
        </div>
    );
}
