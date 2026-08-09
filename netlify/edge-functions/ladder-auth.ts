// HTTP Basic Auth for the internal /ladder page and its JS chunk.
// Fails closed: if LADDER_PASSWORD is not set, nothing is served.

export default async (request: Request, context: { next: () => Promise<Response> }) => {
  const expectedUser = Netlify.env.get('LADDER_USER') ?? 'sean';
  const expectedPass = Netlify.env.get('LADDER_PASSWORD');

  if (!expectedPass) {
    return new Response('Ladder auth is not configured.', {
      status: 503,
      headers: { 'Cache-Control': 'no-store' },
    });
  }

  const header = request.headers.get('authorization') ?? '';

  if (header.startsWith('Basic ')) {
    try {
      const decoded = atob(header.slice(6));
      const split = decoded.indexOf(':');
      const user = decoded.slice(0, split);
      const pass = decoded.slice(split + 1);
      if (user === expectedUser && pass === expectedPass) {
        return context.next();
      }
    } catch {
      // fall through to the challenge
    }
  }

  return new Response('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Authority Engine internal", charset="UTF-8"',
      'Cache-Control': 'no-store',
    },
  });
};
