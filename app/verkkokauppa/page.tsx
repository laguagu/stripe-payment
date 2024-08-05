import CodeSnippet from "@/components/codesnipet";

function Page() {
  const exampleCode = `
function helloWorld() {
  console.log("Hello, World!");
}
  `;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Esimerkki koodista:</h2>
      <CodeSnippet code={exampleCode} language="javascript" />
    </div>
  );
}

export default Page;
