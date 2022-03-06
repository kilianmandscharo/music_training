interface PageBodyProps {
    children: React.ReactNode;
}

export default function PageBody({ children }: PageBodyProps) {
    return (
        <div className="bg-base-black relative mx-auto max-w-4xl  min-w-[18rem] flex flex-col justify-around items-center px-2 py-8 text-white/90 font-body">
            {children}
        </div>
    );
}
