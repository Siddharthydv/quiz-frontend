import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#171717] to-gray-800 text-white px-6 text-center">
      <h1 className="text-4xl md:text-6xl font-bold">
        Create & Manage Quizzes <br /> with Ease
      </h1>
      <p className="mt-4 text-lg text-gray-400 max-w-2xl">
        Build engaging quizzes, track performance, and enhance learning
        outcomes with our powerful quiz management platform.
      </p>
      <div className="mt-6 flex gap-4">
        <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 text-lg">
          Start Creating
        </Button>
        <Button variant="outline" className="border-green-500 text-green-400 px-6 py-3 text-lg">
          Watch Demo
        </Button>
      </div>
    </section>
  );
}


