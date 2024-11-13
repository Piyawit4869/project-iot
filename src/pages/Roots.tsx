import * as API from '@src/apis';
import { OrganizationContext } from '@src/contexts/OrganizationContext';
import React from 'react';
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
  const [organization, setOrganization] = React.useState({});

  return (
    <OrganizationContext.Provider
      value={{ organization, setOrganization } as any}
    >
      <Outlet context={[organization, setOrganization]} />
    </OrganizationContext.Provider>
  );
};
