import type { Metadata } from 'next';
import { DM_Sans, Manrope } from 'next/font/google';
import './globals.css';
const body = DM_Sans({ variable: '--body', subsets: ['latin'], display: 'swap' });
const display = Manrope({ variable: '--display', subsets: ['latin'], display: 'swap' });
export const metadata: Metadata = {
  title: 'Arun K — AI Engineer & Full-Stack Developer',
  description: 'Portfolio of Arun K, an AI engineer and full-stack developer building LLM, RAG, mobile and web products.',
  keywords: ['Arun K', 'AI Engineer', 'Full-Stack Developer', 'LLM', 'RAG', 'MERN', 'Python', 'React'],
  openGraph: { title: 'Arun K — AI Engineer & Full-Stack Developer', description: 'Intelligent products, engineered from model to interface.', type: 'website' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className={`${body.variable} ${display.variable}`}>{children}</body></html>; }
