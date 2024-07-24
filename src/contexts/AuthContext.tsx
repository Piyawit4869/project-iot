import * as React from 'react';

interface AuthContextData {
  user?: any;
}

export const AuthContext = React.createContext<AuthContextData>({
  user: {},
});
