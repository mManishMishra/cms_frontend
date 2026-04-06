import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:9999";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const res = await fetch(`${API_BASE_URL}/robots-txt`, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    });

    if (res.ok) {
      const data = await res.json();
      return new NextResponse(data.content, {
        headers: {
          'Content-Type': 'text/plain',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        },
      });
    }

    // Fallback if the database hasn't been seeded or API is down
    const defaultRobots = `User-agent: *
Disallow: /dashboard
Disallow: /login
Disallow: .staging.
Disallow: /privacy-policy
Disallow: /term-and-condition
Disallow: /cancelletion-policy
Allow: /
Sitemap: https://hcinterior.in/sitemap.xml`;

    return new NextResponse(defaultRobots, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  } catch (error) {
    console.error('Failed to fetch robots.txt:', error);
    
    // Fallback content in case of fetch error
    const defaultRobots = `User-agent: *
Allow: /
Sitemap: https://hcinterior.in/sitemap.xml`;

    return new NextResponse(defaultRobots, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}
