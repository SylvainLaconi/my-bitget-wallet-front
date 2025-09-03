import { createContext, useState, useEffect, useContext } from 'react';

type User = {
  id: string;
  email: string;
} | null;

interface MeContextType {
  me: User | null;
  setMe: (me: User | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  logout: () => Promise<void>;
}

export const MeContext = createContext<MeContextType | undefined>(undefined);

export const MeProvider = ({ children }: { children: React.ReactNode }) => {
  const [me, setMe] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMe = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
        credentials: 'include',
      });
      const json = await res.json();

      if (!res.ok || !json.id) {
        setMe(null);
        setIsLoading(false);
        return;
      }

      setMe(json);
      setIsLoading(false);
    };
    fetchMe();
  }, []);

  const logout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (e) {
      console.error('Erreur logout', e);
    } finally {
      setMe(null); // on vide l’état global
    }
  };

  return (
    <MeContext.Provider value={{ me, setMe, isLoading, setIsLoading, logout }}>
      {children}
    </MeContext.Provider>
  );
};

export const useMe = () => {
  const context = useContext(MeContext);
  if (!context) {
    throw new Error('useMe must be used within a MeProvider');
  }
  return context;
};
