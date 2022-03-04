import { NextPage } from "next";
import Head from "next/head";

const Intervalltraining: NextPage = () => {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>Intervalltraining</title>
                <meta name="author" content="Dominik Heller" />
                <meta
                    name="description"
                    content="Trainiere deine Fähigkeit, verschiedene Intervalle mit dem Ohr zu identifizieren."
                />
                <meta name="keywords" content="noten, lernen, intervalle" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <link rel="shortcut icon" href="favicon.ico" />
            </Head>
            <div className="base-black relative mx-auto max-w-4xl  min-w-[18rem] flex flex-col justify-around items-center px-2 py-8 text-white/90 font-body">
                Intervalltraining
            </div>
        </>
    );
};

export default Intervalltraining;
