import { createContext, useState, ReactNode } from "react";

type AuthContextType = {
  isAuthorized: boolean;
  setIsAuthorized: (value: boolean) => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthorized, setIsAuthorized }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
