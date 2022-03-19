import Head from "next/head";
import Footer from "../components/Footer";
import Generator from "../components/Generator";
import Header from "../components/Header";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Whatsapp Link Generator</title>
      </Head>
      <Header />
      <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
        <Generator />
      </div>
      <Footer />
    </div>
  );
}
