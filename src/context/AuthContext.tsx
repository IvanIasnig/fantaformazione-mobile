import React, { createContext, useState, useContext, useEffect } from "react";

// TODO: SUPABASE INTEGRATION
// import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: any | null; // Replace 'any' with Supabase User type
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    data: { name: string },
  ) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    // TODO: SUPABASE INTEGRATION
    // supabase.auth.getSession().then(({ data: { session } }) => {
    //   setUser(session?.user ?? null);
    //   setIsLoading(false);
    // });
    // supabase.auth.onAuthStateChange((_event, session) => {
    //   setUser(session?.user ?? null);
    // });

    // Mock initial load
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const signIn = async (email: string, password: string) => {
    // TODO: SUPABASE INTEGRATION
    // const { error } = await supabase.auth.signInWithPassword({ email, password });
    // if (error) throw error;
    console.log("Mock SignIn", email);
    setUser({ email, id: "mock-id" });
  };

  const signUp = async (
    email: string,
    password: string,
    data: { name: string },
  ) => {
    // TODO: SUPABASE INTEGRATION
    // const { error } = await supabase.auth.signUp({
    //   email,
    //   password,
    //   options: { data }
    // });
    // if (error) throw error;
    console.log("Mock SignUp", email, data);
    setUser({ email, id: "mock-id", user_metadata: data });
  };

  const signOut = async () => {
    // TODO: SUPABASE INTEGRATION
    // const { error } = await supabase.auth.signOut();
    // if (error) throw error;
    console.log("Mock SignOut");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
