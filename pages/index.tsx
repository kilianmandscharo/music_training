import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>Musiktraining</title>
                <meta name="author" content="Dominik Heller" />
                <meta
                    name="description"
                    content="Trainiere Noten in Violin- und Bassschlüssel zu identifizieren und verschiedene Intervalle von einander zu unterscheiden."
                />
                <meta
                    name="keywords"
                    content="noten, lernen, intervalle, bassschlüssel, violinschlüssel"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <link rel="shortcut icon" href="favicon.ico" />
            </Head>
            <div className="text-white/90 mx-auto p-8 max-w-4xl grid justify-center">
                <h1 className="text-5xl text-center font-header mb-10">Home</h1>
                <Link href="/notentraining">
                    <a className="text-center text-3xl font-body">
                        Notentraining
                    </a>
                </Link>
                <Link href="/intervalltraining">
                    <a className="text-center text-3xl font-body">
                        Intervalltraining
                    </a>
                </Link>
            </div>
        </>
    );
};

export default Home;
