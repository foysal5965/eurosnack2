'use client';
import { deleteCookies } from '@/services/actions/deleteCookies';
import { decodedToken } from '@/utils/jwt/jwt';
import { strict } from 'assert';
import { JwtPayload } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  email: string;
  role: string;
  // Add any other properties your `decodedData` includes
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void; // Change login parameter to reflect token usage
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
const router = useRouter()
  useEffect(() => {
    // On initial load, check if user is already logged in
    const authToken = localStorage.getItem('accessToken');
    if (authToken) {
      //@ts-ignore
      const decodedData: JwtPayload & { role: string; email: string  } = decodedToken(authToken);
      const userInfo: User = {
         ...decodedData,
         role: decodedData.role?.toLowerCase() || '',
      };
      setUser(userInfo);
  }}, []);

  const login = (token: string) => {
    localStorage.setItem('accessToken', token);
    //@ts-ignore
    const decodedData: JwtPayload & { role: string; email: string } = decodedToken(token);
    const userInfo: User = {
      email: decodedData.email || '',
      role: decodedData.role?.toLowerCase() || '',
    };
    setUser(userInfo);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    deleteCookies(['accessToken', 'refreshToken'])
    setUser(null);
    router.push('/')
    
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
