// src/app/about/page.tsx
import React from "react";

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

// Server-side fetch function with error handling
async function getComments(): Promise<Comment[]> {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/1/comments", {
      cache: "no-store",       // ensures fresh data on every request
      next: { revalidate: 0 }, // server-side only fetch
    });

    if (!res.ok) throw new Error("Failed to fetch comments");

    return res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return []; // return empty array if fetch fails
  }
}

// Server Component
export default async function AboutPage() {
  const comments = await getComments(); // server-side fetching

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">Comments</h1>

      {comments.length === 0 ? (
        <p className="text-center text-red-500">Failed to load comments. Please try again later.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="font-semibold text-lg mb-1 text-gray-900">{comment.name}</h2>
              <p className="text-sm text-gray-500 mb-2">{comment.email}</p>
              <p className="text-gray-700">{comment.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
