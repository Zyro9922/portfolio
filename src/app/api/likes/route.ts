import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const GIST_ID = process.env.GITHUB_GIST_ID;
  const TOKEN = process.env.GITHUB_PAT;

  if (!GIST_ID || !TOKEN) {
    return NextResponse.json({ likes: 0, error: 'Missing credentials' }, { status: 500 });
  }

  try {
    const response = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
      next: { revalidate: 0 }, // Ensure no cache
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch gist: ${response.status} ${response.statusText}`);
    }

    const gist = await response.json();
    const content = gist.files['likes.json']?.content;
    const data = content ? JSON.parse(content) : { likes: 0 };

    return NextResponse.json({ likes: data.likes || 0 });
  } catch (error) {
    console.error('Error fetching likes:', error);
    return NextResponse.json({ likes: 0, error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function POST() {
  const GIST_ID = process.env.GITHUB_GIST_ID;
  const TOKEN = process.env.GITHUB_PAT;

  if (!GIST_ID || !TOKEN) {
    return NextResponse.json({ error: 'Missing credentials' }, { status: 500 });
  }

  try {
    // 1. Fetch current likes
    const getResponse = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
      next: { revalidate: 0 },
    });

    if (!getResponse.ok) {
      throw new Error('Failed to fetch gist for update');
    }

    const gist = await getResponse.json();
    const content = gist.files['likes.json']?.content;
    const data = content ? JSON.parse(content) : { likes: 0 };
    
    // 2. Increment likes
    const newLikes = (data.likes || 0) + 1;

    // 3. Update the Gist
    const updateResponse = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        files: {
          'likes.json': {
            content: JSON.stringify({ likes: newLikes }),
          },
        },
      }),
    });

    if (!updateResponse.ok) {
      throw new Error('Failed to update gist');
    }

    return NextResponse.json({ likes: newLikes });
  } catch (error) {
    console.error('Error updating likes:', error);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}
