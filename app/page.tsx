"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

const aiProjects = [
  { id:"04", status:"SHIPPED", category:"LOCAL AI", title:"Smart Resume Screener", kind:"LOCAL AI · RESPONSIBLE ML", description:"A privacy-first screening workspace that compares resumes with a job description, then surfaces ranked evidence and gaps for human review. Local Ollama inference adds structured fit analysis alongside an explainable deterministic score.", stack:["Ollama","Gemma 3","PDF.js","Node.js","SQLite","Structured output"], link:"https://github.com/arunkuttiyadan/Smart-resume-screener", note:"Resume text stays local by default. No cloud API or account required." },
  { id:"03", status:"BUILT", category:"LLM + RAG", title:"AI Code Assistant", kind:"LLM · DEVELOPER TOOLING", description:"A code intelligence assistant for C/C++, Java and Python that retrieves relevant context before explaining, debugging and optimizing code, with summaries, suggestions and unit tests.", stack:["Python","FastAPI","LangChain","Hugging Face","FAISS","Llama 3"], note:"Designed around retrieval quality and code-grounded responses." },
  { id:"02", status:"ITERATING", category:"LLM + RAG", title:"Document Intelligence", kind:"RAG · KNOWLEDGE SYSTEMS", description:"A PDF question-answering system that turns documents into cited, context-aware conversations using chunking, vector embeddings, semantic retrieval and persistent chat history.", stack:["Python","RAG","LangChain","FAISS / ChromaDB","Streamlit"], note:"Built to make answers traceable to source material." },
  { id:"01", status:"IN PROGRESS", category:"APPLIED AI", title:"DURGA — SafeConnect", kind:"APPLIED AI · MOBILE SAFETY", description:"A cross-platform safety product combining AI-assisted threat assessment with SOS workflows, live location, evidence capture and native Android services.", stack:["Flutter","Kotlin","Android services","Google Maps","Method Channels"], note:"Exploring AI where latency, reliability and safety matter." },
];

const fullStack = [
  ["Task Management Platform","JWT authentication, CRUD workflows, REST APIs and responsive task handling.","React · Node.js · Express · MongoDB Atlas"],
  ["DURGA Mobile Platform","Reusable Flutter UI integrated with GPS, maps, media capture, persistence and native services.","Flutter · Dart · Kotlin · Android"],
  ["LoCrypt","Long-range secure push-to-talk voice communication using ESP32 and LoRa.","ESP32 · LoRa · Embedded systems"],
];

const filters = ["ALL", "LOCAL AI", "LLM + RAG", "APPLIED AI"];
const commands = [
  { label:"Selected AI work", hint:"Go to section", href:"#work" },
  { label:"Engineering range", hint:"Go to section", href:"#stack" },
  { label:"About Arun", hint:"Go to section", href:"#about" },
  { label:"Start a conversation", hint:"Send an email", href:"mailto:arunkuttiyadan@gmail.com" },
  { label:"Download résumé", hint:"PDF", href:"/Arun-K-Resume.pdf" },
  { label:"GitHub profile", hint:"Open external", href:"https://github.com/arunkuttiyadan" },
];

const normalizeSearch = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

type ChatMessage = { role:"assistant" | "user"; text:string };

const starterQuestions = ["What does Arun build?", "Show me his AI skills", "How can I contact him?"];

function portfolioAnswer(question: string){
  const query = normalizeSearch(question);
  if (/contact|email|hire|reach|available/.test(query)) return "Arun is available for AI engineering and full-stack opportunities. You can reach him at arunkuttiyadan@gmail.com or use the contact section below.";
  if (/resume|cv|download/.test(query)) return "You can download Arun's résumé from the button in the hero section. It includes his education, technical skills and project experience.";
  if (/cgpa|education|college|university|degree|study/.test(query)) return "Arun is pursuing a B.Tech in Computer Science and Engineering with an AI specialization at VIT-AP University (2023–2027). His current CGPA is 8.01/10.";
  if (/resume screener|screening|ollama|local ai/.test(query)) return "The Smart Resume Screener is Arun's privacy-first local AI project. It uses Ollama and Gemma 3 to compare résumés with job descriptions while keeping documents local by default.";
  if (/project|build|work|portfolio/.test(query)) return "Arun builds applied AI systems, including a local Smart Resume Screener, an AI Code Assistant, a RAG-based document intelligence tool and DURGA SafeConnect.";
  if (/full.?stack|backend|frontend|web|mobile/.test(query)) return "His engineering stack includes Python, FastAPI, React, Node.js, Express, MongoDB, SQLite, Flutter, Dart, Kotlin and Android services.";
  if (/skill|ai|machine learning|llm|rag|langchain|vector/.test(query)) return "Arun focuses on LLM applications, RAG, semantic search and responsible AI. He works with LangChain, Hugging Face, Ollama, FAISS, ChromaDB, TensorFlow, PyTorch and scikit-learn.";
  if (/hello|hi|hey|who/.test(query)) return "Hi! I'm Arun's portfolio guide. Ask me about his AI work, engineering skills, education, résumé or availability.";
  return "I can help with Arun's AI projects, technical skills, education, résumé and contact details. Try asking what he builds or which tools he works with.";
}

function Arrow(){ return <span aria-hidden="true">↗</span>; }

export default function Home(){
  const [projectFilter, setProjectFilter] = useState("ALL");
  const [commandOpen, setCommandOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState("");
  const [time, setTime] = useState("--:--:--");
  const [progress, setProgress] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatThinking, setChatThinking] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([{ role:"assistant", text:"Hi, I'm Arun's portfolio guide. Ask me about his AI work, technical stack or availability." }]);
  const heroRef = useRef<HTMLElement>(null);
  const companionRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const visibleProjects = useMemo(() => projectFilter === "ALL" ? aiProjects : aiProjects.filter(project => project.category === projectFilter), [projectFilter]);
  const visibleCommands = useMemo(() => commands.filter(command => normalizeSearch(`${command.label} ${command.hint}`).includes(normalizeSearch(commandQuery))), [commandQuery]);

  useEffect(() => {
    const updateTime = () => setTime(new Intl.DateTimeFormat("en-GB", { timeZone:"Asia/Kolkata", hour:"2-digit", minute:"2-digit", second:"2-digit", hour12:false }).format(new Date()));
    updateTime();
    const timer = window.setInterval(updateTime, 1000);
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(open => !open);
      }
      if (event.key === "Escape") setCommandOpen(false);
    };
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? (window.scrollY / height) * 100 : 0);
    };
    const onPointerMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - .5) * 10;
      const y = (event.clientY / window.innerHeight - .5) * -8;
      companionRef.current?.style.setProperty("--robot-x", `${x}deg`);
      companionRef.current?.style.setProperty("--robot-y", `${y}deg`);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScroll, { passive:true });
    window.addEventListener("pointermove", onPointerMove, { passive:true });
    onScroll();
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }), { threshold:0.12 });
    document.querySelectorAll("[data-reveal]").forEach(element => observer.observe(element));
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      observer.disconnect();
    };
  }, []);

  useEffect(() => { if (chatOpen) chatEndRef.current?.scrollIntoView({ behavior:"smooth" }); }, [chatMessages, chatOpen, chatThinking]);

  const onHeroMove = (event: React.MouseEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - bounds.top}px`);
  };

  const runCommand = (href: string) => {
    setCommandOpen(false);
    setCommandQuery("");
    if (href.startsWith("#")) document.querySelector(href)?.scrollIntoView({ behavior:"smooth" });
    else if (href.startsWith("http")) window.open(href, "_blank", "noopener,noreferrer");
    else window.location.assign(href);
  };

  const askPortfolio = (question: string) => {
    const cleanQuestion = question.trim();
    if (!cleanQuestion || chatThinking) return;
    setChatOpen(true);
    setChatInput("");
    setChatMessages(messages => [...messages, { role:"user", text:cleanQuestion }]);
    setChatThinking(true);
    window.setTimeout(() => {
      setChatMessages(messages => [...messages, { role:"assistant", text:portfolioAnswer(cleanQuestion) }]);
      setChatThinking(false);
    }, 650);
  };

  return <>
    <div className="scroll-progress" style={{ width:`${progress}%` }} aria-hidden="true" />
    <a className="skip" href="#main">Skip to content</a>
    <header>
      <a className="brand" href="#top"><span>AK</span> / AI LAB</a>
      <nav><a href="#work">01_WORK</a><a href="#stack">02_STACK</a><a href="#about">03_ABOUT</a></nav>
      <div className="header-actions"><button className="command-trigger" type="button" onClick={() => setCommandOpen(true)} aria-label="Open command menu">⌘ K</button><a className="availability" href="mailto:arunkuttiyadan@gmail.com"><i/> AVAILABLE FOR WORK</a></div>
    </header>
    <main id="main">
      <section className="hero" id="top" ref={heroRef} onMouseMove={onHeroMove}>
        <div className="scan" aria-hidden="true"/>
        <div className="hero-meta"><span>ARUN K</span><span>INDIA · IST · {time}</span><span>AI ENGINEER / FULL-STACK BUILDER</span></div>
        <div className="hero-grid">
          <div className="hero-copy"><p className="prompt">arun@portfolio:~$ whoami<span className="cursor">_</span></p><h1>Building AI that<br/><em>earns its output.</em></h1><p className="lede">I engineer retrieval systems, local LLM workflows and AI-assisted products—then build the APIs and interfaces that make them genuinely useful.</p><div className="hero-actions"><a href="#work">VIEW SELECTED WORK <Arrow/></a><a href="/Arun-K-Resume.pdf" download>DOWNLOAD RÉSUMÉ ↓</a></div></div>
          <aside className="terminal"><div className="terminal-bar"><span><i/><i/><i/></span><b>profile.json</b><button type="button" onClick={() => setCommandOpen(true)}>⌘ K</button></div><pre>{`{
  "role": "AI Engineer",
  "focus": [
    "LLM applications",
    "RAG & semantic search",
    "responsible AI systems"
  ],
  "engineering": [
    "Python / FastAPI",
    "React / Node.js",
    "Vector databases"
  ],
  "currently": "shipping"
}`}</pre><div className="terminal-foot"><span>● SYSTEM READY</span><span>v1.1.0 · LIVE</span></div></aside>
        </div>
        <div className="timeline"><span>2023</span><i/><span>FOUNDATIONS</span><i/><span>FULL STACK</span><i/><span>LLM + RAG</span><i/><span>2026</span></div>
      </section>
      <section className="intro-strip" data-reveal><p>I&apos;m interested in the hard parts of applied AI: <b>how context is retrieved, how outputs are evaluated, how privacy is protected, and how a model becomes a dependable product.</b></p></section>
      <section className="work" id="work" data-reveal>
        <SectionHead label="01 / SELECTED AI WORK" title="Systems, not demos." copy="Experiments and products focused on grounded outputs, transparent reasoning and useful human control."/>
        <div className="filter-row" role="group" aria-label="Filter AI projects">{filters.map(filter => <button className={projectFilter === filter ? "active" : ""} type="button" onClick={() => setProjectFilter(filter)} aria-pressed={projectFilter === filter} key={filter}>{filter}</button>)}</div>
        <div className="ai-projects">{visibleProjects.map(p => <article className="ai-card" key={p.title}><div className="card-top"><span>{p.id}</span><span className="status-pill"><i/> {p.status}</span></div><p className="project-kind">{p.kind}</p><h3>{p.title}</h3><p className="project-copy">{p.description}</p><ul>{p.stack.map(s => <li key={s}>{s}</li>)}</ul><p className="project-note">{'// '}{p.note}</p>{p.link && <a className="project-link" href={p.link} target="_blank" rel="noreferrer">VIEW SOURCE <Arrow/></a>}</article>)}</div>
      </section>
      <section className="stack-section" id="stack" data-reveal><SectionHead label="02 / ENGINEERING RANGE" title="Beyond the model." copy="Strong AI products still need well-shaped APIs, reliable persistence and interfaces that communicate clearly."/><div className="stack-grid"><div className="stack-list"><p><span>AI / ML</span>LangChain, Hugging Face, Ollama, TensorFlow, PyTorch, scikit-learn</p><p><span>RETRIEVAL</span>Embeddings, semantic search, FAISS, ChromaDB, chunking, citations</p><p><span>BACKEND</span>Python, FastAPI, Node.js, Express, REST, SQL, MongoDB, SQLite</p><p><span>PRODUCT</span>React, JavaScript, Flutter, Dart, Kotlin, Android, Git</p></div><div className="secondary-work">{fullStack.map((p,i) => <article key={p[0]}><span>0{i+1}</span><div><h3>{p[0]}</h3><p>{p[1]}</p><small>{p[2]}</small></div></article>)}</div></div></section>
      <section className="about" id="about" data-reveal><p className="label">03 / OPERATING PRINCIPLES</p><div className="about-grid"><h2>Learning AI by<br/>building the whole loop.</h2><div><p>I&apos;m a Computer Science student specializing in AI at VIT-AP, focused on the full lifecycle of intelligent systems: preparing data, retrieving the right context, constraining model behavior, evaluating outputs, and shipping the experience behind a clean product interface.</p><p>My projects are how I test those ideas—local-first screening with human oversight, source-grounded document answers, code-aware retrieval and safety-focused mobile intelligence. Contributing to the VIT-AP Machine Learning Club also sharpened how I explain technical ideas to people.</p></div></div><div className="facts"><p><span>PROGRAM</span><b>B.Tech CSE · AI Specialization</b><small>VIT-AP University · 2023–2027</small></p><p><span>CGPA</span><b>8.01 / 10</b><small>Current academic record</small></p><p><span>APPROACH</span><b>Build · Evaluate · Iterate</b><small>Responsible, product-minded AI</small></p></div></section>
      <section className="contact" data-reveal><p className="label">04 / START A CONVERSATION</p><h2>Have an AI problem<br/>worth solving?</h2><a className="mail" href="mailto:arunkuttiyadan@gmail.com">arunkuttiyadan@gmail.com <Arrow/></a><div><a href="tel:+918086062055">+91 80860 62055</a><a href="https://www.linkedin.com/in/arun-kuttiyadan/" target="_blank" rel="noreferrer">LINKEDIN <Arrow/></a><a href="https://github.com/arunkuttiyadan" target="_blank" rel="noreferrer">GITHUB <Arrow/></a></div></section>
    </main>
    <footer><p>ARUN K / AI LAB</p><p>DESIGNED & ENGINEERED WITH INTENT</p><p>© 2026</p></footer>
    <div className={`ai-companion ${chatOpen ? "is-open" : ""}`} ref={companionRef}>
      {!chatOpen && <span className="companion-callout">ASK ARUN.AI <i>●</i></span>}
      {chatOpen && <section className="chat-panel" aria-label="Arun portfolio assistant">
        <div className="chat-head"><div><span><i/> ARUN.AI</span><small>PORTFOLIO GUIDE · ONLINE</small></div><button type="button" onClick={() => setChatOpen(false)} aria-label="Close chat">×</button></div>
        <div className="chat-messages" aria-live="polite">{chatMessages.map((message,index) => <p className={message.role} key={`${message.role}-${index}`}><span>{message.role === "assistant" ? "AK" : "YOU"}</span>{message.text}</p>)}{chatThinking && <p className="assistant typing"><span>AK</span><i/><i/><i/></p>}<div ref={chatEndRef}/></div>
        {chatMessages.length < 3 && <div className="chat-suggestions">{starterQuestions.map(question => <button type="button" onClick={() => askPortfolio(question)} key={question}>{question}</button>)}</div>}
        <form className="chat-form" onSubmit={event => { event.preventDefault(); askPortfolio(chatInput); }}><input value={chatInput} onChange={event => setChatInput(event.target.value)} placeholder="Ask about Arun…" aria-label="Ask Arun's portfolio assistant"/><button type="submit" disabled={!chatInput.trim() || chatThinking} aria-label="Send message">↗</button></form>
      </section>}
      <button className="robot-trigger" type="button" onClick={() => setChatOpen(open => !open)} aria-label={chatOpen ? "Close portfolio assistant" : "Open portfolio assistant"} aria-expanded={chatOpen}><span className="robot-halo"/><Image src="/ai-companion.png" alt="" width={900} height={600} priority/><span className="robot-status"><i/> AI GUIDE</span></button>
    </div>
    {commandOpen && <div className="command-overlay" role="presentation" onMouseDown={() => setCommandOpen(false)}><section className="command-panel" role="dialog" aria-modal="true" aria-label="Command menu" onMouseDown={event => event.stopPropagation()}><div className="command-search"><span>›_</span><input autoFocus value={commandQuery} onChange={event => setCommandQuery(event.target.value)} placeholder="Navigate or search…" aria-label="Search commands"/><kbd>ESC</kbd></div><div className="command-list">{visibleCommands.length ? visibleCommands.map(command => <button type="button" onClick={() => runCommand(command.href)} key={command.label}><span>{command.label}<small>{command.hint}</small></span><Arrow/></button>) : <p>No matching command.</p>}</div><div className="command-help"><span>TYPE TO FILTER</span><span>CLICK TO SELECT</span><span>ESC CLOSE</span></div></section></div>}
  </>;
}

function SectionHead({label,title,copy}:{label:string,title:string,copy:string}){ return <div className="section-head"><div><p className="label">{label}</p><h2>{title}</h2></div><p>{copy}</p></div>; }
