import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const GIST_ID = process.env.GITHUB_GIST_ID;
  const TOKEN = process.env.GITHUB_PAT;

  if (!GIST_ID || !TOKEN) {
    return NextResponse.json({ error: 'Missing credentials' }, { status: 500 });
  }

  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Fetch current gist to safely append
    const getResponse = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
      next: { revalidate: 0 },
    });

    if (!getResponse.ok) {
      throw new Error('Failed to fetch gist');
    }

    const gist = await getResponse.json();
    const content = gist.files['messages.json']?.content;
    
    let existingMessages = [];
    if (content) {
      try {
        existingMessages = JSON.parse(content);
        if (!Array.isArray(existingMessages)) {
           existingMessages = [];
        }
      } catch (e) {
        existingMessages = []; // fallback if it was somehow malformed
      }
    }

    // 2. Build the new payload
    const newMessage = {
      name,
      email,
      message,
      date: new Date().toISOString(),
    };

    existingMessages.push(newMessage);

    // 3. Save it back to the Gist (this creates messages.json if it didn't exist)
    const updateResponse = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        files: {
          'messages.json': {
            content: JSON.stringify(existingMessages, null, 2),
          },
        },
      }),
    });

    if (!updateResponse.ok) {
      throw new Error('Failed to update gist with new message');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving contact message:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
