// src/app/blog/[slug]/page.tsx
import React from 'react';
import Slugcomp from '@/componets/slugcomp';

interface PageProps {
  params: { slug: string };
}

async function getSlugpageData(slug: string) {
  try {
    const res = await fetch(`https://cms.jaro.in/wp-json/api/courses-detail/${slug}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ exampleParam: 'value' }),
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`Failed to fetch API: ${res.status}`);
    const json = await res.json();
    return { title: json.data.seo.title };
  } catch (error) {
    console.error(error);
    return { title: 'Failed to load course details.' };
  }
}

export default async function SlugPage({ params }: PageProps) {
  const data = await getSlugpageData(params.slug);
  
  return <Slugcomp title={data.title} />;
}
