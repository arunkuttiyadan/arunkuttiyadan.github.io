const aiProjects = [
  { id:'04', status:'SHIPPED', title:'Smart Resume Screener', kind:'LOCAL AI · RESPONSIBLE ML', description:'A privacy-first screening workspace that compares resumes with a job description, then surfaces ranked evidence and gaps for human review. Local Ollama inference adds structured fit analysis alongside an explainable deterministic score.', stack:['Ollama','Gemma 3','PDF.js','Node.js','SQLite','Structured output'], link:'https://github.com/arunkuttiyadan/Smart-resume-screener', note:'Resume text stays local by default. No cloud API or account required.' },
  { id:'03', status:'BUILT', title:'AI Code Assistant', kind:'LLM · DEVELOPER TOOLING', description:'A code intelligence assistant for C/C++, Java and Python that retrieves relevant context before explaining, debugging and optimizing code, with summaries, suggestions and unit tests.', stack:['Python','FastAPI','LangChain','Hugging Face','FAISS','Llama 3'], note:'Designed around retrieval quality and code-grounded responses.' },
  { id:'02', status:'ITERATING', title:'Document Intelligence', kind:'RAG · KNOWLEDGE SYSTEMS', description:'A PDF question-answering system that turns documents into cited, context-aware conversations using chunking, vector embeddings, semantic retrieval and persistent chat history.', stack:['Python','RAG','LangChain','FAISS / ChromaDB','Streamlit'], note:'Built to make answers traceable to source material.' },
  { id:'01', status:'IN PROGRESS', title:'DURGA — SafeConnect', kind:'APPLIED AI · MOBILE SAFETY', description:'A cross-platform safety product combining AI-assisted threat assessment with SOS workflows, live location, evidence capture and native Android services.', stack:['Flutter','Kotlin','Android services','Google Maps','Method Channels'], note:'Exploring AI where latency, reliability and safety matter.' },
];
const fullStack = [
  ['Task Management Platform','JWT authentication, CRUD workflows, REST APIs and responsive task handling.','React · Node.js · Express · MongoDB Atlas'],
  ['DURGA Mobile Platform','Reusable Flutter UI integrated with GPS, maps, media capture, persistence and native services.','Flutter · Dart · Kotlin · Android'],
  ['LoCrypt','Long-range secure push-to-talk voice communication using ESP32 and LoRa.','ESP32 · LoRa · Embedded systems'],
];
function Arrow(){return <span aria-hidden="true">↗</span>}
export default function Home(){return <>
  <a className="skip" href="#main">Skip to content</a>
  <header><a className="brand" href="#top"><span>AK</span> / AI LAB</a><nav><a href="#work">01_WORK</a><a href="#stack">02_STACK</a><a href="#about">03_ABOUT</a></nav><a className="availability" href="mailto:arunkuttiyadan@gmail.com"><i/> AVAILABLE FOR WORK</a></header>
  <main id="main">
    <section className="hero" id="top"><div className="scan" aria-hidden="true"/><div className="hero-meta"><span>ARUN K</span><span>INDIA · IST</span><span>AI ENGINEER / FULL-STACK BUILDER</span></div><div className="hero-grid">
      <div className="hero-copy"><p className="prompt">arun@portfolio:~$ whoami<span className="cursor">_</span></p><h1>Building AI that<br/><em>earns its output.</em></h1><p className="lede">I engineer retrieval systems, local LLM workflows and AI-assisted products—then build the APIs and interfaces that make them genuinely useful.</p><div className="hero-actions"><a href="#work">VIEW SELECTED WORK <Arrow/></a><a href="/Arun-K-Resume.pdf" download>DOWNLOAD RÉSUMÉ ↓</a></div></div>
      <aside className="terminal"><div className="terminal-bar"><span><i/><i/><i/></span><b>profile.json</b><span>⌘ K</span></div><pre>{`{
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
}`}</pre><div className="terminal-foot"><span>● SYSTEM READY</span><span>v1.0.0</span></div></aside>
    </div><div className="timeline"><span>2023</span><i/><span>FOUNDATIONS</span><i/><span>FULL STACK</span><i/><span>LLM + RAG</span><i/><span>2026</span></div></section>
    <section className="intro-strip"><p>I&apos;m interested in the hard parts of applied AI: <b>how context is retrieved, how outputs are evaluated, how privacy is protected, and how a model becomes a dependable product.</b></p></section>
    <section className="work" id="work"><SectionHead label="01 / SELECTED AI WORK" title="Systems, not demos." copy="Experiments and products focused on grounded outputs, transparent reasoning and useful human control."/><div className="ai-projects">{aiProjects.map(p=><article className="ai-card" key={p.title}><div className="card-top"><span>{p.id}</span><span className="status-pill"><i/> {p.status}</span></div><p className="project-kind">{p.kind}</p><h3>{p.title}</h3><p className="project-copy">{p.description}</p><ul>{p.stack.map(s=><li key={s}>{s}</li>)}</ul><p className="project-note">{'// '}{p.note}</p>{p.link&&<a className="project-link" href={p.link} target="_blank" rel="noreferrer">VIEW SOURCE <Arrow/></a>}</article>)}</div></section>
    <section className="stack-section" id="stack"><SectionHead label="02 / ENGINEERING RANGE" title="Beyond the model." copy="Strong AI products still need well-shaped APIs, reliable persistence and interfaces that communicate clearly."/><div className="stack-grid"><div className="stack-list"><p><span>AI / ML</span>LangChain, Hugging Face, Ollama, TensorFlow, PyTorch, scikit-learn</p><p><span>RETRIEVAL</span>Embeddings, semantic search, FAISS, ChromaDB, chunking, citations</p><p><span>BACKEND</span>Python, FastAPI, Node.js, Express, REST, SQL, MongoDB, SQLite</p><p><span>PRODUCT</span>React, JavaScript, Flutter, Dart, Kotlin, Android, Git</p></div><div className="secondary-work">{fullStack.map((p,i)=><article key={p[0]}><span>0{i+1}</span><div><h3>{p[0]}</h3><p>{p[1]}</p><small>{p[2]}</small></div></article>)}</div></div></section>
    <section className="about" id="about"><p className="label">03 / OPERATING PRINCIPLES</p><div className="about-grid"><h2>Learning AI by<br/>building the whole loop.</h2><div><p>I&apos;m a Computer Science student specializing in AI at VIT-AP, focused on the full lifecycle of intelligent systems: preparing data, retrieving the right context, constraining model behavior, evaluating outputs, and shipping the experience behind a clean product interface.</p><p>My projects are how I test those ideas—local-first screening with human oversight, source-grounded document answers, code-aware retrieval and safety-focused mobile intelligence. Contributing to the VIT-AP Machine Learning Club also sharpened how I explain technical ideas to people.</p></div></div><div className="facts"><p><span>PROGRAM</span><b>B.Tech CSE · AI Specialization</b><small>VIT-AP University · 2023–2027</small></p><p><span>CGPA</span><b>8.01 / 10</b><small>Current academic record</small></p><p><span>APPROACH</span><b>Build · Evaluate · Iterate</b><small>Responsible, product-minded AI</small></p></div></section>
    <section className="contact"><p className="label">04 / START A CONVERSATION</p><h2>Have an AI problem<br/>worth solving?</h2><a className="mail" href="mailto:arunkuttiyadan@gmail.com">arunkuttiyadan@gmail.com <Arrow/></a><div><a href="tel:+918086062055">+91 80860 62055</a><a href="https://www.linkedin.com/in/arun-kuttiyadan/" target="_blank" rel="noreferrer">LINKEDIN <Arrow/></a><a href="https://github.com/arunkuttiyadan" target="_blank" rel="noreferrer">GITHUB <Arrow/></a></div></section>
  </main><footer><p>ARUN K / AI LAB</p><p>DESIGNED & ENGINEERED WITH INTENT</p><p>© 2026</p></footer>
</>}
function SectionHead({label,title,copy}:{label:string,title:string,copy:string}){return <div className="section-head"><div><p className="label">{label}</p><h2>{title}</h2></div><p>{copy}</p></div>}
