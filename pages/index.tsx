import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import IntervalIcon from "../components/IntervalIcon";

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
            <div className="text-white/90 mx-auto p-8 max-w-4xl">
                <header className="flex justify-around items-center gap-4">
                    <h1 className="text-5xl text-center font-header text-shadow-orange">
                        Musiktraining
                    </h1>
                </header>
                <p className="mb-20 mt-12">
                    Herzlich Willkommen zum Musiktraining! Wähle im folgenden
                    aus, was du trainieren möchtest. Beim Notentraining geht es
                    darum, Noten im Violin- oder Bassschlüssel zu
                    identifizieren. Beim Intervalltraining gilt es, verschiedene
                    Intervalle mit dem Gehör zu erkennen. Viel Spaß dabei!
                </p>
                <div>
                    <Link href="/notentraining">
                        <div className="bg-blue-300 sm:hover:bg-blue-400 border-4 border-orange-300 max-w-sm mx-auto flex justify-center p-4 rounded-md mt-10">
                            <a className="text-center text-xl font-body text-gray-800">
                                Notentraining
                            </a>
                        </div>
                    </Link>
                    <Link href="/intervalltraining">
                        <div className="bg-blue-300 sm:hover:bg-blue-400 border-4 border-orange-300 max-w-sm mx-auto flex justify-center p-4 rounded-md mt-10">
                            <a className="text-center text-xl font-body text-gray-800">
                                Intervalltraining
                            </a>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Home;
