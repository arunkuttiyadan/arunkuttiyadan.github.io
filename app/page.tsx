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
  { label:"Give feedback", hint:"Help Arun grow", href:"#feedback" },
  { label:"Start a conversation", hint:"Send an email", href:"mailto:arunkuttiyadan@gmail.com" },
  { label:"Download résumé", hint:"PDF", href:"/Arun-K-Resume.pdf" },
  { label:"GitHub profile", hint:"Open external", href:"https://github.com/arunkuttiyadan" },
];

const normalizeSearch = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

type ChatMessage = { role:"assistant" | "user"; text:string };

const auraEndpoint = process.env.NEXT_PUBLIC_AURA_ENDPOINT?.trim();

const starterQuestions = ["What does Arun build?", "What is RAG?", "Explain LLMs simply", "How can I contact him?"];

function portfolioAnswer(question: string){
  const query = normalizeSearch(question);
  if (/\bllms?\b|large language model/.test(query)) return "An LLM, or large language model, learns patterns from large amounts of text so it can understand and generate language. Applications use LLMs for tasks such as answering questions, summarizing documents, writing code and extracting information.";
  if (/\brag\b|retrieval.?augmented/.test(query)) return "RAG stands for retrieval-augmented generation. It retrieves relevant information from a trusted knowledge source and gives that context to an LLM before it answers, helping responses stay more grounded, specific and traceable.";
  if (/embedding|vector database|semantic search/.test(query)) return "An embedding represents text as a list of numbers that captures meaning. A vector database stores those representations and quickly finds semantically similar content, which is useful for search and RAG systems.";
  if (/machine learning|\bml\b/.test(query)) return "Machine learning is a branch of AI where systems learn patterns from data to make predictions or decisions instead of following only hand-written rules.";
  if (/what is ai|artificial intelligence/.test(query)) return "Artificial intelligence is the field of building systems that perform tasks associated with human intelligence, such as understanding language, recognizing patterns, reasoning and making decisions.";
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
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([{ role:"assistant", text:"Hi, I'm AURA—Arun's AI portfolio guide. Ask me about his work, technical stack or availability." }]);
  const [feedbackPrepared, setFeedbackPrepared] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const companionRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const feedbackFormRef = useRef<HTMLFormElement>(null);

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
    let scrollFrame = 0;
    const renderScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const pageProgress = height > 0 ? window.scrollY / height : 0;
      const heroProgress = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
      setProgress(pageProgress * 100);
      document.documentElement.style.setProperty("--page-progress", pageProgress.toFixed(4));
      document.documentElement.style.setProperty("--hero-progress", heroProgress.toFixed(4));
      document.querySelectorAll<HTMLElement>("[data-depth]").forEach(element => {
        const bounds = element.getBoundingClientRect();
        const offset = (bounds.top + bounds.height / 2 - window.innerHeight / 2) / window.innerHeight;
        element.style.setProperty("--depth-shift", `${Math.max(-42, Math.min(42, offset * -42)).toFixed(1)}px`);
      });
      scrollFrame = 0;
    };
    const onScroll = () => { if (!scrollFrame) scrollFrame = window.requestAnimationFrame(renderScroll); };
    const onPointerMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - .5) * 10;
      const y = (event.clientY / window.innerHeight - .5) * -8;
      companionRef.current?.style.setProperty("--robot-x", `${x}deg`);
      companionRef.current?.style.setProperty("--robot-y", `${y}deg`);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScroll, { passive:true });
    window.addEventListener("resize", onScroll, { passive:true });
    window.addEventListener("pointermove", onPointerMove, { passive:true });
    renderScroll();
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }), { threshold:0.12 });
    document.querySelectorAll("[data-reveal]").forEach(element => observer.observe(element));
    return () => {
      window.clearInterval(timer);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
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

  const onCardMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    event.currentTarget.style.setProperty("--tilt-x", `${(-y * 5).toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${(x * 6).toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--glow-x", `${((x + .5) * 100).toFixed(1)}%`);
    event.currentTarget.style.setProperty("--glow-y", `${((y + .5) * 100).toFixed(1)}%`);
  };

  const resetCard = (event: React.PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  };

  const runCommand = (href: string) => {
    setCommandOpen(false);
    setCommandQuery("");
    if (href.startsWith("#")) document.querySelector(href)?.scrollIntoView({ behavior:"smooth" });
    else if (href.startsWith("http")) window.open(href, "_blank", "noopener,noreferrer");
    else window.location.assign(href);
  };

  const askPortfolio = async (question: string) => {
    const cleanQuestion = question.trim();
    if (!cleanQuestion || chatThinking) return;
    const conversation = [...chatMessages, { role:"user" as const, text:cleanQuestion }];
    setChatOpen(true);
    setChatInput("");
    setChatMessages(conversation);
    setChatThinking(true);
    try {
      if (!auraEndpoint) throw new Error("AURA endpoint is not configured");
      const response = await fetch(auraEndpoint, {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body:JSON.stringify({
          question:cleanQuestion,
          history:conversation.slice(-8).map(message => ({ role:message.role, text:message.text.slice(0, 1200) })),
        }),
      });
      if (!response.ok) throw new Error(`AURA request failed (${response.status})`);
      const data = await response.json() as { answer?:unknown };
      const answer = typeof data.answer === "string" ? data.answer.trim() : "";
      if (!answer) throw new Error("AURA returned an empty answer");
      setChatMessages(messages => [...messages, { role:"assistant", text:answer }]);
    } catch {
      setChatMessages(messages => [...messages, { role:"assistant", text:portfolioAnswer(cleanQuestion) }]);
    } finally {
      setChatThinking(false);
    }
  };

  const prepareFeedback = (form: HTMLFormElement, destination:"email" | "gmail") => {
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const perspective = String(data.get("Perspective") || "Not specified");
    const area = String(data.get("Feedback area") || "General feedback");
    const suggestion = String(data.get("Suggestion") || "");
    const name = String(data.get("Name") || "Anonymous visitor");
    const email = String(data.get("email") || "Not provided");
    const subject = `Portfolio feedback: ${area}`;
    const body = `Hi Arun,\n\nHere is my feedback to help you grow as an AI engineer.\n\nPerspective: ${perspective}\nFeedback area: ${area}\n\nSuggestion:\n${suggestion}\n\nFrom: ${name}\nReply email: ${email}\n\nSent from arunk.site`;
    if (destination === "gmail") {
      const params = new URLSearchParams({ view:"cm", fs:"1", to:"arunkuttiyadan@gmail.com", su:subject, body });
      window.open(`https://mail.google.com/mail/?${params.toString()}`, "_blank", "noopener,noreferrer");
    } else {
      window.location.assign(`mailto:arunkuttiyadan@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    }
    setFeedbackPrepared(true);
  };

  return <>
    <div className="scroll-progress" style={{ width:`${progress}%` }} aria-hidden="true" />
    <div className="scroll-scene" aria-hidden="true"><i/><i/><i/></div>
    <a className="skip" href="#main">Skip to content</a>
    <header>
      <a className="brand" href="#top"><span className="brand-mark">AK</span><b>Arun K</b></a>
      <nav><a href="#work">Projects</a><a href="#stack">Capabilities</a><a href="#about">About</a><a href="#feedback">Feedback</a></nav>
      <div className="header-actions"><button className="command-trigger" type="button" onClick={() => setCommandOpen(true)} aria-label="Open command menu">⌘ K</button><a className="availability" href="mailto:arunkuttiyadan@gmail.com"><i/> MEET ARUN</a></div>
    </header>
    <main id="main">
      <section className="hero" id="top" ref={heroRef} onMouseMove={onHeroMove}>
        <div className="scan" aria-hidden="true"/>
        <div className="hero-meta"><span>AUTONOMOUS INTELLIGENCE <i/></span><span>INDIA · IST · {time}</span><span>AI ENGINEER / PRODUCT BUILDER</span></div>
        <div className="hero-grid">
          <div className="hero-copy"><p className="prompt">AI ENGINEER · LLM SYSTEMS · RAG</p><h1>RETRIEVE.<br/>REASON.<br/><em>SHIP.</em></h1><p className="lede">I build grounded AI systems that understand context, connect to useful tools, and turn model intelligence into dependable products.</p><div className="hero-actions"><a href="#work">EXPLORE MY SYSTEMS <Arrow/></a><a href="/Arun-K-Resume.pdf" download>GET MY RÉSUMÉ ↓</a></div></div>
          <aside className="agent-stage" aria-label="Arun's AI engineering capabilities">
            <div className="agent-orbit orbit-one"/><div className="agent-orbit orbit-two"/>
            <div className="agent-beam"/><div className="agent-particles"><i/><i/><i/><i/><i/><i/></div>
            <Image className="agent-visual" src="/ai-companion.png" alt="AURA, Arun's AI portfolio assistant" width={900} height={600} priority/>
            <div className="agent-module module-memory"><span>▦</span><p><b>MEMORY</b>Vector retrieval</p></div>
            <div className="agent-module module-reason"><span>◉</span><p><b>REASONING</b>Context online</p></div>
            <div className="agent-module module-tools"><span>⌘</span><p><b>TOOLS</b>Full stack</p></div>
            <div className="agent-module module-trust"><span>◇</span><p><b>TRUST</b>Human review</p></div>
            <div className="agent-platform"><i/><i/><i/></div>
          </aside>
        </div>
        <div className="timeline"><span><b>01</b> INGEST</span><i/><span><b>02</b> RETRIEVE</span><i/><span><b>03</b> REASON</span><i/><span><b>04</b> EVALUATE</span><i/><span><b>05</b> SHIP</span></div>
      </section>
      <section className="intro-strip" data-reveal><p data-depth>I&apos;m interested in the hard parts of applied AI: <b>how context is retrieved, how outputs are evaluated, how privacy is protected, and how a model becomes a dependable product.</b></p></section>
      <section className="work" id="work" data-reveal>
        <SectionHead label="01 / SELECTED AI WORK" title="Systems, not demos." copy="Experiments and products focused on grounded outputs, transparent reasoning and useful human control."/>
        <div className="filter-row" role="group" aria-label="Filter AI projects">{filters.map(filter => <button className={projectFilter === filter ? "active" : ""} type="button" onClick={() => setProjectFilter(filter)} aria-pressed={projectFilter === filter} key={filter}>{filter}</button>)}</div>
        <div className="ai-projects">{visibleProjects.map(p => <article className="ai-card" onPointerMove={onCardMove} onPointerLeave={resetCard} key={p.title}><div className="card-top"><span>{p.id}</span><span className="status-pill"><i/> {p.status}</span></div><p className="project-kind">{p.kind}</p><h3>{p.title}</h3><p className="project-copy">{p.description}</p><ul>{p.stack.map(s => <li key={s}>{s}</li>)}</ul><p className="project-note">{'// '}{p.note}</p>{p.link && <a className="project-link" href={p.link} target="_blank" rel="noreferrer">VIEW SOURCE <Arrow/></a>}</article>)}</div>
      </section>
      <section className="stack-section" id="stack" data-reveal><SectionHead label="02 / ENGINEERING RANGE" title="Beyond the model." copy="Strong AI products still need well-shaped APIs, reliable persistence and interfaces that communicate clearly."/><div className="stack-grid"><div className="stack-list"><p><span>AI / ML</span>LangChain, Hugging Face, Ollama, TensorFlow, PyTorch, scikit-learn</p><p><span>RETRIEVAL</span>Embeddings, semantic search, FAISS, ChromaDB, chunking, citations</p><p><span>BACKEND</span>Python, FastAPI, Node.js, Express, REST, SQL, MongoDB, SQLite</p><p><span>PRODUCT</span>React, JavaScript, Flutter, Dart, Kotlin, Android, Git</p></div><div className="secondary-work">{fullStack.map((p,i) => <article key={p[0]}><span>0{i+1}</span><div><h3>{p[0]}</h3><p>{p[1]}</p><small>{p[2]}</small></div></article>)}</div></div></section>
      <section className="about" id="about" data-reveal><p className="label">03 / OPERATING PRINCIPLES</p><div className="about-grid"><h2>Learning AI by<br/>building the whole loop.</h2><div><p>I&apos;m a Computer Science student specializing in AI at VIT-AP, focused on the full lifecycle of intelligent systems: preparing data, retrieving the right context, constraining model behavior, evaluating outputs, and shipping the experience behind a clean product interface.</p><p>My projects are how I test those ideas—local-first screening with human oversight, source-grounded document answers, code-aware retrieval and safety-focused mobile intelligence. Contributing to the VIT-AP Machine Learning Club also sharpened how I explain technical ideas to people.</p></div></div><div className="facts"><p><span>PROGRAM</span><b>B.Tech CSE · AI Specialization</b><small>VIT-AP University · 2023–2027</small></p><p><span>CGPA</span><b>8.01 / 10</b><small>Current academic record</small></p><p><span>APPROACH</span><b>Build · Evaluate · Iterate</b><small>Responsible, product-minded AI</small></p></div></section>
      <section className="feedback" id="feedback" data-reveal>
        <div className="feedback-copy" data-depth><p className="label">04 / OPEN FEEDBACK LOOP</p><h2>Help me become a<br/><em>better AI engineer.</em></h2><p>If you see a skill gap, a stronger project direction or an engineering habit I should develop, I&apos;d value your honest perspective.</p><div className="feedback-signals"><span>SKILLS TO LEARN</span><span>PROJECT IDEAS</span><span>AI ENGINEERING</span><span>PORTFOLIO REVIEW</span></div></div>
        <div className="feedback-card">
          <form ref={feedbackFormRef} onSubmit={event => { event.preventDefault(); prepareFeedback(event.currentTarget, "email"); }}>
            <div className="form-row"><label><span>YOUR PERSPECTIVE</span><select name="Perspective" defaultValue="" required><option value="" disabled>Select one</option><option>AI / ML engineer</option><option>Software engineer</option><option>Recruiter</option><option>Student or peer</option><option>Educator or mentor</option><option>Other</option></select></label><label><span>FEEDBACK AREA</span><select name="Feedback area" defaultValue="" required><option value="" disabled>Choose a focus</option><option>Skills I should learn next</option><option>AI / ML depth</option><option>Project ideas</option><option>Software engineering practices</option><option>Portfolio and presentation</option><option>Career direction</option></select></label></div>
            <label><span>YOUR SUGGESTION</span><textarea name="Suggestion" rows={6} maxLength={1500} required placeholder="What should I learn, build or improve next—and why?"/></label>
            <div className="form-row"><label><span>NAME <small>OPTIONAL</small></span><input type="text" name="Name" maxLength={80} autoComplete="name" placeholder="Your name"/></label><label><span>EMAIL <small>OPTIONAL</small></span><input type="email" name="email" maxLength={120} autoComplete="email" placeholder="If you'd like a reply"/></label></div>
            {feedbackPrepared && <p className="feedback-ready" role="status">Your message is prepared. Review it in the email window and press Send.</p>}
            <div className="feedback-submit"><p>Nothing is uploaded or stored here. Your chosen email service handles delivery.</p><div><button type="submit">OPEN EMAIL APP <Arrow/></button><button type="button" className="gmail-button" onClick={() => feedbackFormRef.current && prepareFeedback(feedbackFormRef.current, "gmail")}>SEND WITH GMAIL <Arrow/></button></div></div>
          </form>
        </div>
      </section>
      <section className="contact" data-reveal><p className="label">05 / START A CONVERSATION</p><h2>Have an AI problem<br/>worth solving?</h2><a className="mail" href="mailto:arunkuttiyadan@gmail.com">arunkuttiyadan@gmail.com <Arrow/></a><div><a href="tel:+918086062055">+91 80860 62055</a><a href="https://www.linkedin.com/in/arun-kuttiyadan/" target="_blank" rel="noreferrer">LINKEDIN <Arrow/></a><a href="https://github.com/arunkuttiyadan" target="_blank" rel="noreferrer">GITHUB <Arrow/></a></div></section>
    </main>
    <footer><p>ARUN K / AI LAB</p><p>DESIGNED & ENGINEERED WITH INTENT</p><p>© 2026</p></footer>
    <div className={`ai-companion ${chatOpen ? "is-open" : ""}`} ref={companionRef}>
      {!chatOpen && <span className="companion-callout">ASK AURA <i>●</i></span>}
      {chatOpen && <section className="chat-panel" aria-label="Arun portfolio assistant">
        <div className="chat-head"><div><span><i/> AURA</span><small>{auraEndpoint ? "GEMINI · PORTFOLIO GUIDE" : "PORTFOLIO GUIDE · ONLINE"}</small></div><button type="button" onClick={() => setChatOpen(false)} aria-label="Close chat">×</button></div>
        <div className="chat-messages" aria-live="polite">{chatMessages.map((message,index) => <p className={message.role} key={`${message.role}-${index}`}><span>{message.role === "assistant" ? "AK" : "YOU"}</span>{message.text}</p>)}{chatThinking && <p className="assistant typing"><span>AK</span><i/><i/><i/></p>}<div ref={chatEndRef}/></div>
        {chatMessages.length < 3 && <div className="chat-suggestions">{starterQuestions.map(question => <button type="button" onClick={() => askPortfolio(question)} key={question}>{question}</button>)}</div>}
        <form className="chat-form" onSubmit={event => { event.preventDefault(); askPortfolio(chatInput); }}><input value={chatInput} onChange={event => setChatInput(event.target.value)} maxLength={500} placeholder="Ask about Arun…" aria-label="Ask Arun's portfolio assistant"/><button type="submit" disabled={!chatInput.trim() || chatThinking} aria-label="Send message">↗</button></form>
      </section>}
      <button className="robot-trigger" type="button" onClick={() => setChatOpen(open => !open)} aria-label={chatOpen ? "Close AURA" : "Open AURA portfolio assistant"} aria-expanded={chatOpen}><span className="robot-halo"/><Image src="/ai-companion.png" alt="" width={900} height={600} priority/><span className="robot-status"><i/> AURA AI</span></button>
    </div>
    {commandOpen && <div className="command-overlay" role="presentation" onMouseDown={() => setCommandOpen(false)}><section className="command-panel" role="dialog" aria-modal="true" aria-label="Command menu" onMouseDown={event => event.stopPropagation()}><div className="command-search"><span>›_</span><input autoFocus value={commandQuery} onChange={event => setCommandQuery(event.target.value)} placeholder="Navigate or search…" aria-label="Search commands"/><kbd>ESC</kbd></div><div className="command-list">{visibleCommands.length ? visibleCommands.map(command => <button type="button" onClick={() => runCommand(command.href)} key={command.label}><span>{command.label}<small>{command.hint}</small></span><Arrow/></button>) : <p>No matching command.</p>}</div><div className="command-help"><span>TYPE TO FILTER</span><span>CLICK TO SELECT</span><span>ESC CLOSE</span></div></section></div>}
  </>;
}

function SectionHead({label,title,copy}:{label:string,title:string,copy:string}){ return <div className="section-head" data-depth><div><p className="label">{label}</p><h2>{title}</h2></div><p>{copy}</p></div>; }
