const ai = [
  ['AI Code Assistant', 'LLM developer tool', 'Conversational code intelligence for explaining, debugging, summarizing and optimizing C/C++, Java and Python, with semantic retrieval and Llama 3-powered test generation.', 'Python · FastAPI · LangChain · Hugging Face · FAISS · Llama 3'],
  ['Document Intelligence', 'Retrieval-augmented generation', 'A PDF question-answering workflow that delivers cited, context-aware responses through document chunking, vector embeddings, semantic search and conversational history.', 'Python · RAG · LangChain · FAISS / ChromaDB · Streamlit'],
  ['DURGA — SafeConnect', 'AI-assisted safety platform', 'A cross-platform safety application with AI-assisted threat assessment, live location sharing, SOS workflows and native Android services for real-time emergency response.', 'Flutter · Dart · Kotlin · Google Maps · Method Channels'],
];
const fullStack = [
  ['Task Management Platform', 'Full-stack web application', 'A responsive task platform with secure JWT authentication, CRUD workflows, REST APIs and cloud-hosted document storage for reliable task management.', 'React · Node.js · Express.js · MongoDB Atlas · JWT'],
  ['DURGA — Mobile Experience', 'Cross-platform product engineering', 'A reusable Flutter interface connected to GPS, Google Maps, media capture, local persistence and Kotlin services through a clean native bridge.', 'Flutter · Dart · Kotlin · Android · Local Storage'],
  ['LoCrypt', 'Embedded communication system', 'An affordable long-range, secure push-to-talk voice communication device built around ESP32 and LoRa for environments where connectivity is limited.', 'ESP32 · LoRa · Embedded Systems · Digital Voice'],
];
const skills = [
  ['AI & Machine Learning', 'LLMs, RAG, LangChain, Hugging Face Transformers, TensorFlow, PyTorch, scikit-learn, NumPy, Pandas'],
  ['Retrieval & Data', 'Vector embeddings, semantic search, FAISS, ChromaDB, SQL, MongoDB, document chunking'],
  ['Full-Stack Engineering', 'React, Node.js, Express.js, REST APIs, JWT authentication, HTML, CSS, JavaScript, PHP'],
  ['Languages & Platforms', 'Python, Java, C, C++, Dart, Flutter, Kotlin, Android, Git, GitHub'],
];

function Arrow() { return <span aria-hidden="true">↗</span>; }
function Projects({ items }: { items: string[][] }) {
  return <div className="projects">{items.map((p, i) => <article className="project" key={p[0]}>
    <span className="num">0{i + 1}</span><div><p className="eyebrow">{p[1]}</p><h3>{p[0]}</h3></div>
    <div><p className="desc">{p[2]}</p><p className="stack">{p[3]}</p></div>
  </article>)}</div>;
}

export default function Home() {
  return <>
    <a className="skip" href="#main">Skip to content</a>
    <header><a className="logo" href="#top">AK<span>.</span></a><nav><a href="#ai">AI</a><a href="#full-stack">Full-stack</a><a href="#about">About</a></nav><a href="mailto:arunkuttiyadan@gmail.com">Let&apos;s talk <Arrow /></a></header>
    <main id="main">
      <section className="hero" id="top"><div className="orbit"><i /></div><div className="hero-copy">
        <p className="status"><i /> Open to AI & software engineering opportunities</p>
        <h1>Engineering intelligent products <em>from model to interface.</em></h1>
        <p className="intro">I&apos;m <b>Arun K</b>, a Computer Science engineer specializing in AI. I build useful LLM systems, scalable APIs and polished full-stack experiences that turn complex ideas into dependable products.</p>
        <div className="actions"><a className="btn primary" href="#ai">Explore my work <Arrow /></a><a className="btn" href="/Arun-K-Resume.pdf" download>Download résumé ↓</a></div>
      </div><div className="hero-foot"><p><span>Based in</span>India</p><p><span>Focus</span>Applied AI + Product Engineering</p><a href="https://www.linkedin.com/in/arun-kuttiyadan/" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a></div></section>

      <section className="manifesto"><p>I care about the entire path from <b>retrieval quality</b> and API design to the final interaction a person sees.</p><div><span>01&nbsp; Grounded AI</span><span>02&nbsp; Reliable systems</span><span>03&nbsp; Human-centered UI</span></div></section>

      <section className="work ai" id="ai"><div className="heading"><div><p className="kicker">01 / AI Engineering</p><h2>Intelligence with an engineering backbone.</h2></div><p>I build LLM and retrieval systems around clear use cases: useful context, traceable answers and interfaces people can trust.</p></div><Projects items={ai} /></section>
      <section className="work dark" id="full-stack"><div className="heading"><div><p className="kicker">02 / Full-Stack Development</p><h2>Products that work end to end.</h2></div><p>From responsive interfaces to authentication, APIs and persistence, I shape the full product rather than one isolated layer.</p></div><Projects items={fullStack} /></section>

      <section className="toolkit" id="about"><span>03</span><div><p className="kicker">Technical toolkit</p><h2>Built to learn.<br />Ready to contribute.</h2></div><div className="skills">{skills.map(s => <article key={s[0]}><h3>{s[0]}</h3><p>{s[1]}</p></article>)}</div></section>
      <section className="profile"><div><p className="kicker">A little more</p><h2>Curious by default.<br />Practical by design.</h2></div><div className="bio"><p>I&apos;m pursuing a B.Tech in Computer Science and Engineering with an AI specialization at VIT-AP University. My work sits where machine intelligence, software engineering and thoughtful product design meet.</p><p>I also contributed design and digital content to the VIT-AP Machine Learning Club and completed hands-on MERN stack training with Blackbuck.</p></div><div className="facts"><p><span>Education</span><b>B.Tech CSE (AI)</b><small>VIT-AP · 2023–2027</small></p><p><span>Academic standing</span><b>8.18 / 10</b><small>CGPA through semester 5</small></p><p><span>Foundation</span><b>DSA & problem solving</b><small>Algorithms, APIs and databases</small></p></div></section>
      <section className="contact"><p className="kicker">Have a role, project or idea?</p><h2>Let&apos;s build something<br /><em>worth using.</em></h2><a className="email" href="mailto:arunkuttiyadan@gmail.com">arunkuttiyadan@gmail.com <Arrow /></a><div><a href="tel:+918086062055">+91 80860 62055</a><a href="https://www.linkedin.com/in/arun-kuttiyadan/" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a></div></section>
    </main><footer><a className="logo" href="#top">AK<span>.</span></a><p>AI Engineer · Full-Stack Developer</p><p>© 2026 Arun K</p></footer>
  </>;
}
