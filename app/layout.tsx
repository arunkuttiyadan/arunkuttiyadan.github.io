import type { Metadata } from 'next';
import { DM_Sans, Manrope } from 'next/font/google';
import './globals.css';
const body = DM_Sans({ variable: '--body', subsets: ['latin'], display: 'swap' });
const display = Manrope({ variable: '--display', subsets: ['latin'], display: 'swap' });
export const metadata: Metadata = {
  metadataBase: new URL('https://arunk.site'),
  title: 'Arun K — AI Engineer',
  description: 'AI engineer building responsible LLM applications, retrieval systems, local AI workflows and the full-stack products around them.',
  keywords: ['Arun K', 'AI Engineer', 'LLM Engineer', 'RAG', 'LangChain', 'FastAPI', 'Ollama', 'Vector Databases'],
  alternates: { canonical: '/' },
  openGraph: { title: 'Arun K — AI Engineer', description: 'Building AI that earns its output.', url: 'https://arunk.site', type: 'website' },
};
const themeScript = `(function(){try{var t=localStorage.getItem('ak-theme');var v=t==='light'?'light':'dark';document.documentElement.dataset.theme=v;document.documentElement.style.colorScheme=v;}catch(e){document.documentElement.dataset.theme='dark';document.documentElement.style.colorScheme='dark';}})();`;
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" data-theme="dark" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html:themeScript }}/></head><body className={`${body.variable} ${display.variable}`}>{children}</body></html>; }
