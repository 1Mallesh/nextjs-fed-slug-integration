// src/app/about/page.tsx
import React from "react";

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

// Server-side function to fetch comments
async function getComments(): Promise<Comment[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/comments", {
    cache: "no-store", // ensures server fetch, no caching
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch comments");
  }

  return res.json();
}

// Server Component
export default async function AboutPage() {
  const comments = await getComments();

  // Only take the first 8 comments
  const displayedComments = comments.slice(0, 12);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
        About Page
      </h1>
      <p className="text-center mb-10 text-gray-600">
        We fetch comments from a server-side API (showing only 8):
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedComments.map((comment) => (
          <div
            key={comment.id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-lg font-semibold mb-2 text-gray-900">
              {comment.name}
            </h2>
            <p className="text-sm text-gray-500 mb-3">{comment.email}</p>
            <p className="text-gray-700">{comment.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
