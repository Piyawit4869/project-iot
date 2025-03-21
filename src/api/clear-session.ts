import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    res.setHeader(
      'Set-Cookie',
      serialize('session_token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: -1, // Expire the cookie
        sameSite: 'strict',
        path: '/',
      }),
    );

    res.status(200).json({ message: 'Session cleared' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
