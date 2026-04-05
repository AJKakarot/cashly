'use client';

import { useState, useEffect, useCallback } from 'react';

export interface Transaction {
  _id: string;
  date: string;
  amount: number;
  currency: string;
  type: string;
  category: string;
  description: string;
  notes: string;
  tags: string;
  receiptUrl: string;
}

export interface Debt {
  _id: string;
  person: string;
  amount: number;
  type: 'Lent' | 'Borrowed';
  dueDate: string;
  status: 'Pending' | 'Settled';
  notes: string;
}

export interface Budget {
  _id: string;
  category: string;
  amount: number;
  month: string;
}

export interface Investment {
  _id: string;
  name: string;
  type: string;
  investedAmount: number;
  currentValue: number;
  dateAdded: string;
}

async function api<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(err.error || 'Request failed');
  }
  return res.json();
}

export function useFinance() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [debts, setDebts] = useState<Debt[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [txs, ds, bs, invs] = await Promise.all([
        api<Transaction[]>('/api/transactions'),
        api<Debt[]>('/api/debts'),
        api<Budget[]>('/api/budgets'),
        api<Investment[]>('/api/investments'),
      ]);
      setTransactions(txs);
      setDebts(ds);
      setBudgets(bs);
      setInvestments(invs);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // --- Transactions ---
  const addTransaction = async (data: Omit<Transaction, '_id'>) => {
    const created = await api<Transaction>('/api/transactions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    setTransactions(prev => [created, ...prev]);
    return created;
  };

  const editTransaction = async (id: string, updates: Partial<Omit<Transaction, '_id'>>) => {
    const updated = await api<Transaction>(`/api/transactions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    setTransactions(prev => prev.map(t => t._id === id ? updated : t));
  };

  const deleteTransaction = async (id: string) => {
    await api(`/api/transactions/${id}`, { method: 'DELETE' });
    setTransactions(prev => prev.filter(t => t._id !== id));
  };

  // --- Debts ---
  const addDebt = async (data: Omit<Debt, '_id'>) => {
    const created = await api<Debt>('/api/debts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    setDebts(prev => [created, ...prev]);
  };

  const editDebt = async (id: string, updates: Partial<Omit<Debt, '_id'>>) => {
    const updated = await api<Debt>(`/api/debts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    setDebts(prev => prev.map(d => d._id === id ? updated : d));
  };

  const deleteDebt = async (id: string) => {
    await api(`/api/debts/${id}`, { method: 'DELETE' });
    setDebts(prev => prev.filter(d => d._id !== id));
  };

  const settleDebt = async (id: string) => {
    await editDebt(id, { status: 'Settled' });
  };

  // --- Budgets ---
  const addBudget = async (data: Omit<Budget, '_id'>) => {
    const created = await api<Budget>('/api/budgets', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    // Replace existing budget for same category+month or add new
    setBudgets(prev => {
      const idx = prev.findIndex(b => b.category === data.category && b.month === data.month);
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx] = created;
        return updated;
      }
      return [...prev, created];
    });
  };

  const deleteBudget = async (id: string) => {
    await api(`/api/budgets/${id}`, { method: 'DELETE' });
    setBudgets(prev => prev.filter(b => b._id !== id));
  };

  // --- Investments ---
  const addInvestment = async (data: Omit<Investment, '_id'>) => {
    const created = await api<Investment>('/api/investments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    setInvestments(prev => [created, ...prev]);
  };

  const deleteInvestment = async (id: string) => {
    await api(`/api/investments/${id}`, { method: 'DELETE' });
    setInvestments(prev => prev.filter(i => i._id !== id));
  };

  const updateInvestmentValue = async (id: string, newValue: number) => {
    const updated = await api<Investment>(`/api/investments/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ currentValue: newValue }),
    });
    setInvestments(prev => prev.map(i => i._id === id ? updated : i));
  };

  return {
    transactions, debts, budgets, investments, loading,
    addTransaction, editTransaction, deleteTransaction,
    addDebt, editDebt, deleteDebt, settleDebt,
    addBudget, deleteBudget,
    addInvestment, deleteInvestment, updateInvestmentValue,
    refetch: fetchAll,
  };
}
