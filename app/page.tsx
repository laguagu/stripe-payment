import CheckoutPageWrapper from "@/components/CheckoutPageWrapper";

export default function Home() {
  const amount = 49.99;

  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Matti</h1>
        <h2 className="text-2xl">
          On pyytänyt sinua maksamaan hänelle velkojaan:
          <span className="font-bold"> ${amount}</span>
        </h2>
      </div>

      <CheckoutPageWrapper amount={amount} />
    </main>
  );
}