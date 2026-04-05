'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Key, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [keySaved, setKeySaved] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('groq_api_key');
  });

  const handleSaveKey = () => {
    if (!apiKey.trim()) return;
    localStorage.setItem('groq_api_key', apiKey.trim());
    setKeySaved(true);
  };

  if (!keySaved) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-screen px-6 text-center bg-white dark:bg-black text-black dark:text-white">
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold tracking-tight mb-1">TalknTrack</h1>
          <p className="text-[13px] text-black/40 dark:text-white/40 mb-8">Smart personal finance tracker with AI-powered voice and text input</p>
          <div className="w-16 h-16 bg-black/[0.04] dark:bg-white/[0.06] rounded-2xl flex items-center justify-center mb-6">
            <Key className="w-7 h-7 text-black dark:text-white" strokeWidth={1.5} />
          </div>
          <h2 className="text-xl font-bold tracking-tight mb-2">Setup AI</h2>
          <p className="text-[13px] text-black/50 dark:text-white/50 mb-6 max-w-[280px] leading-relaxed">Add your Groq API key to enable smart voice and text input.</p>
          <div className="w-full max-w-sm space-y-4">
            <p className="text-[11px] text-black/40 dark:text-white/40">Free key: console.groq.com — Llama 3.3 + Whisper</p>
            <div className="flex items-center gap-2">
              <input type={showKey ? 'text' : 'password'} value={apiKey} onChange={e => setApiKey(e.target.value)} placeholder="Paste Groq API key"
                className="flex-1 bg-black/[0.04] dark:bg-white/[0.06] rounded-xl px-4 py-3 text-[13px] font-medium font-mono focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 placeholder:text-black/25 dark:placeholder:text-white/25" />
              <button onClick={() => setShowKey(!showKey)} className="p-2 text-black/30 dark:text-white/30">{showKey ? <EyeOff size={16} /> : <Eye size={16} />}</button>
            </div>
            <button onClick={handleSaveKey} disabled={!apiKey.trim()} className="w-full bg-black dark:bg-white text-white dark:text-black py-3.5 rounded-xl font-semibold text-[15px] disabled:opacity-25 transition-opacity">Continue</button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-screen px-6 text-center bg-white dark:bg-black text-black dark:text-white">
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold tracking-tight mb-1">TalknTrack</h1>
        <p className="text-[13px] text-black/40 dark:text-white/40 mb-8">Smart personal finance tracker with AI-powered voice and text input</p>
        <div className="w-16 h-16 bg-black/[0.04] dark:bg-white/[0.06] rounded-2xl flex items-center justify-center mb-6">
          <svg className="w-7 h-7 text-black dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
        </div>
        <h2 className="text-xl font-bold tracking-tight mb-2">Sign In</h2>
        <p className="text-[13px] text-black/50 dark:text-white/50 mb-8 max-w-[280px] leading-relaxed">Sign in to sync your data across devices. Your finances, always in your pocket.</p>
        <button
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="w-full max-w-sm bg-black dark:bg-white text-white dark:text-black py-3.5 rounded-xl font-semibold text-[15px]"
        >
          Sign in with Google
        </button>
      </div>
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <div className="mt-auto pt-8 pb-4 text-center space-y-2">
      <div className="flex items-center justify-center gap-3 text-[11px] text-black/30 dark:text-white/30">
        <Link href="/privacy" className="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</Link>
        <span>·</span>
        <Link href="/terms" className="hover:text-black dark:hover:text-white transition-colors">Terms of Service</Link>
      </div>
      <p className="text-[10px] text-black/20 dark:text-white/20">© {new Date().getFullYear()} TalknTrack by <a href="https://divyanshsharma.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Divyansh Sharma</a></p>
    </div>
  );
}
