import CheckoutPageWrapper from "@/components/CheckoutPageWrapper";
import Link from "next/link";

export default function Home() {
  const amount = 49.99;

  return (
    <div>
      <div className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-2">Matti</h1>
          <h2 className="text-2xl">
            On pyytänyt sinua maksamaan hänelle velkojaan:
            <span className="font-bold"> ${amount}</span>
          </h2>
        </div>
        <CheckoutPageWrapper amount={amount} />
      </div>
      <div className="flex justify-center align-middle items-center gap-2 flex-col">
        <p>Haluatko liittyä kuukausi tilaaja jäseneksi?</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <Link href={"/subscriber"}>Liity jäseneksi</Link>
        </button>
      </div>
    </div>
  );
}
