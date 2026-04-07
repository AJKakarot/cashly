'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Tone = 'positive' | 'negative';

const ToneContext = createContext<{ tone: Tone }>({ tone: 'positive' });

export const useTone = () => useContext(ToneContext);

export const ToneProvider = ({ children }: { children: React.ReactNode }) => {
  const [tone, setTone] = useState<Tone>('positive');

  useEffect(() => {
    let cancelled = false;

    const fetchTone = async () => {
      try {
        const res = await fetch('/api/transactions');
        if (!res.ok) return;
        const txs: Array<{ amount: number; type: string }> = await res.json();
        const net = txs.reduce((acc, t) => {
          if (t.type === 'Income') return acc + t.amount;
          if (t.type === 'Expense') return acc - t.amount;
          return acc;
        }, 0);
        if (!cancelled) setTone(net < 0 ? 'negative' : 'positive');
      } catch {
        // Keep default tone when unauthenticated/offline.
      }
    };

    fetchTone();
    const id = window.setInterval(fetchTone, 15000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  const value = useMemo(() => ({ tone }), [tone]);
  return <ToneContext.Provider value={value}>{children}</ToneContext.Provider>;
};

