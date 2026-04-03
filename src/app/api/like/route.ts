export async function GET(request: Request) {
  try {
    const response = await fetch(`https://api.github.com/gists/${process.env.GITHUB_GIST_ID}`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_PAT}`,
        Accept: 'application/vnd.github.v3+json',
      },
      next: { revalidate: 0 }, // no-cache
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`);
    }

    const gist = await response.json();
    const content = gist.files['likes.json']?.content;
    
    if (!content) {
      return Response.json({ likes: 0 });
    }

    const data = JSON.parse(content);
    return Response.json({ likes: data.likes || 0 });
  } catch (error) {
    console.error('Error fetching likes:', error);
    return Response.json({ likes: 0 }, { status: 500 });
  }
}

export async function POST(request: Request) {
  // Optional: Origin check to prevent spam
  const origin = request.headers.get('origin');
  // You could check `if (origin !== 'https://yourdomain.com') return ...`
  
  try {
    // 1. Get current likes
    const getRes = await fetch(`https://api.github.com/gists/${process.env.GITHUB_GIST_ID}`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_PAT}`,
        Accept: 'application/vnd.github.v3+json',
      },
      cache: 'no-store',
    });

    if (!getRes.ok) throw new Error('Failed to fetch gist');

    const gist = await getRes.json();
    const currentContent = gist.files['likes.json']?.content || '{"likes": 0}';
    let data;
    try {
      data = JSON.parse(currentContent);
    } catch {
      data = { likes: 0 };
    }

    // 2. Increment
    data.likes += 1;

    // 3. Update gist
    const updateRes = await fetch(`https://api.github.com/gists/${process.env.GITHUB_GIST_ID}`, {
      method: 'PATCH',
      headers: {
        Authorization: `token ${process.env.GITHUB_PAT}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        files: {
          'likes.json': {
            content: JSON.stringify(data)
          }
        }
      })
    });

    if (!updateRes.ok) throw new Error('Failed to update gist');

    return Response.json({ likes: data.likes });
  } catch (error) {
    console.error('Error incrementing likes:', error);
    return Response.json({ error: 'Failed to increment likes' }, { status: 500 });
  }
}
