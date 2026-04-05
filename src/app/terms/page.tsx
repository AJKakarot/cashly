import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <div className="max-w-lg mx-auto px-5 py-12 space-y-8">
        <div>
          <Link href="/" className="text-[12px] font-semibold text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors">&larr; Back to app</Link>
          <h1 className="text-2xl font-bold tracking-tight mt-4">Terms of Service</h1>
          <p className="text-[13px] text-black/40 dark:text-white/40 mt-1">Last updated: April 4, 2026</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-[15px] font-bold">1. Acceptance of Terms</h2>
          <p className="text-[13px] text-black/60 dark:text-white/60 leading-relaxed">
            By using TalknTrack, you agree to these terms. If you do not agree, please do not use the app.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[15px] font-bold">2. What TalknTrack does</h2>
          <p className="text-[13px] text-black/60 dark:text-white/60 leading-relaxed">
            TalknTrack is a personal finance tracker that lets you log transactions via voice, text, or manual entry. AI features (powered by Google Gemini or Groq) help parse natural language inputs and generate financial insights. Your data is stored securely in our database.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[15px] font-bold">3. Your data</h2>
          <ul className="text-[13px] text-black/60 dark:text-white/60 leading-relaxed space-y-2 list-disc pl-5">
            <li>Your financial data is stored in a secure MongoDB database accessible only to your account.</li>
            <li>AI processing is handled server-side — you do not need to manage API keys.</li>
            <li>You are responsible for keeping your Google account credentials secure.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-[15px] font-bold">4. Third-party services</h2>
          <p className="text-[13px] text-black/60 dark:text-white/60 leading-relaxed">
            TalknTrack integrates with third-party services including Google OAuth, Google Gemini, Groq, and Cloudinary. Your use of these services is subject to their respective terms and privacy policies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[15px] font-bold">5. Open source</h2>
          <p className="text-[13px] text-black/60 dark:text-white/60 leading-relaxed">
            TalknTrack is fully open source. You can review the entire codebase to verify how the app works.
          </p>
          <a href="https://github.com/divyansharma001/TalknTrack" target="_blank" rel="noopener noreferrer"
            className="block bg-black/[0.03] dark:bg-white/[0.05] rounded-2xl p-4 text-[13px] font-semibold hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-colors">
            github.com/divyansharma001/TalknTrack
          </a>
        </section>

        <section className="space-y-3">
          <h2 className="text-[15px] font-bold">6. Disclaimer</h2>
          <p className="text-[13px] text-black/60 dark:text-white/60 leading-relaxed">
            TalknTrack is provided "as is" without warranties of any kind. We do not guarantee the accuracy of AI-generated insights or transaction parsing. This app is not a substitute for professional financial advice.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[15px] font-bold">7. Limitation of liability</h2>
          <p className="text-[13px] text-black/60 dark:text-white/60 leading-relaxed">
            We shall not be liable for any loss of data, financial loss, or damages arising from the use of TalknTrack.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[15px] font-bold">8. Changes to terms</h2>
          <p className="text-[13px] text-black/60 dark:text-white/60 leading-relaxed">
            We may update these terms from time to time. Continued use of the app after changes constitutes acceptance of the updated terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[15px] font-bold">9. Contact</h2>
          <p className="text-[13px] text-black/60 dark:text-white/60 leading-relaxed">For any questions regarding these terms:</p>
          <div className="bg-black/[0.03] dark:bg-white/[0.05] rounded-2xl p-4 space-y-1.5">
            <a href="https://divyanshsharma.com" target="_blank" rel="noopener noreferrer" className="text-[13px] font-semibold hover:underline">Divyansh Sharma</a>
            <p className="text-[13px] text-black/50 dark:text-white/50">connectwithdivyansharma@gmail.com</p>
          </div>
        </section>
      </div>
    </div>
  );
}
