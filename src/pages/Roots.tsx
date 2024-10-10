import * as API from '@src/apis';
import { Outlet, redirect, useLoaderData } from 'react-router-dom';

// import { AuthContext } from "@contexts/AuthContext";
export async function RootLoader() {
  try {
    const me = await API.user.getMe();
    localStorage.setItem('me', JSON.stringify(me.data));
    return { me: me.data };
  } catch (e: any) {
    return redirect('/login');
  }
}

export const Root = () => {
  const {} = useLoaderData() as any;
  // me
  return (
    // <AuthContext.Provider value={{ user: me }}>
    <Outlet />
    // </AuthContext.Provider>
  );
};
