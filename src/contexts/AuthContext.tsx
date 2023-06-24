import * as React from "react";

interface AuthContextData {
  onResponse: (status: any, message: any) => void;
}

export const AuthContext = React.createContext<AuthContextData>({
  onResponse: () => {},
});
