import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from '@/lib/supabaseClient';

const WalletContext = createContext();

export function WalletProvider({ children }) {
  const [balance, setBalance] = useState(0);

  const fetchWalletBalance = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("wallet")
      .select("balance")
      .eq("student_id", user.id)
      .single();

    if (!error && data) {
      setBalance(data.balance);
    }
  };

  useEffect(() => {
    fetchWalletBalance();
  }, []);

  return (
    <WalletContext.Provider value={{ balance, setBalance, fetchWalletBalance }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  return useContext(WalletContext);
}
