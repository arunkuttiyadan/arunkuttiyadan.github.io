import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feedback received — Arun K",
  description: "Thank you for sharing feedback with Arun K.",
};

export default function FeedbackThanks(){
  return <main className="thanks-page">
    <section className="thanks-card">
      <p className="label">FEEDBACK TRANSMITTED</p>
      <span aria-hidden="true">✓</span>
      <h1>Thank you for helping<br/><em>me grow.</em></h1>
      <p>I&apos;ve received your suggestion and will consider it carefully as I plan what to learn and build next.</p>
      <Link href="/#work">RETURN TO THE PORTFOLIO <b aria-hidden="true">↗</b></Link>
    </section>
  </main>;
}
