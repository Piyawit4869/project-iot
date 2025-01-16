'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export const Form = (csrfToken: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const result: any = await signIn('credentials', {
      redirect: false,
      user: 'owner@utotech.org',
      password: 'localpass',
      // csrfToken,
    });

    if (result) {
      router.push('/dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <input name="csrfToken" type="hidden" defaultValue={csrfToken} /> */}
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
};
