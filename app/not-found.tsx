import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#050505] text-white">
      <h1 className="text-8xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-8">Sorry, that page doesn’t exist.</p>

      {/* Link now renders the <a> for you */}
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 rounded hover:bg-blue-700"
      >
        Back to Home
      </Link>
    </div>
  );
}
