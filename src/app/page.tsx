import ValentineCreator from "@/components/ValentineCreator";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 to-red-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <ValentineCreator />
      </div>
    </main>
  );
}
