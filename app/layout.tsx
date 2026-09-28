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
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className={`${body.variable} ${display.variable}`}>{children}</body></html>; }
