import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import HomePageSection from "../components/HomePageSection";
import PageIcon from "../components/PageIcon";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>Musikgym</title>
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
            <main>
                <div className="text-white/90 mx-auto p-8 max-w-4xl font-body">
                    <header className="flex flex-col justify-around items-center gap-8">
                        <p className="font-body text-xl text-center mb-[-1rem]">
                            Herzlich Willkommen
                            <br />
                            im
                        </p>
                        <h1 className="text-6xl text-center font-header mb-2 text-shadow-blue">
                            Musikgym
                        </h1>
                        <PageIcon />
                    </header>
                    <p className="mb-10 mt-10 text-center text-lg">
                        Wähle im Folgenden aus, was du trainieren möchtest.
                    </p>
                    <div>
                        <HomePageSection
                            link="/notentraining"
                            title="Notentraining"
                            description="Beim Notentraining geht es darum, Noten im Violin- und Bassschlüssel so schnell wie möglich visuell zu identifizieren. Ersterer umfasst in diesem Fall die Noten von F3 bis E6, letzterer die Noten von A1 bis G4."
                        />
                        <HomePageSection
                            link="/intervalltraining"
                            title="Intervaltraining"
                            description="Beim Intervalltraining gilt es, verschiedene Intervalle mit dem Gehör zu bestimmen, mit gleichbleibendem oder wechselndem Grundton, auf- oder absteigend."
                        />
                    </div>
                </div>
            </main>
            <footer className="mb-2">
                <p className="text-white/90 text-center text-xs">
                    This is a private project. Code by{" "}
                    <a
                        href="https://github.com/kilianmandscharo"
                        target="_blank"
                        rel="norefferer noopener"
                        className="sm:hover:text-gray-500 text-orange-300 transition-colors"
                    >
                        Dominik Heller
                    </a>
                </p>
            </footer>
        </>
    );
};

export default Home;
