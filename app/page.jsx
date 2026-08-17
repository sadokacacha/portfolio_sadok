"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("@/components/scene"), { ssr: false });

const projects = [
  { number: "01", title: "CMS Dashboard", type: "Content management platform", description: "A considered workspace for creating, scheduling, and understanding content at scale.", stack: "Next.js · Node.js · MongoDB", tone: "blue" },
  { number: "02", title: "Field Notes", type: "Collaborative knowledge base", description: "A focused product experience for teams turning research into clear decisions.", stack: "React · PostgreSQL · Docker", tone: "stone" },
  { number: "03", title: "Clear Route", type: "Operations platform", description: "A responsive command center that brings people, data, and movement into one view.", stack: "Next.js · API · AWS", tone: "ice" },
];

const experience = [
  ["2026", "Full-stack developer", "Building clear, dependable digital products from the interface through to the infrastructure.", "React · Next.js · Node.js"],
  ["2025", "Independent product work", "Partnering with teams to shape useful web applications and improve existing systems.", "JavaScript · APIs · PostgreSQL"],
  ["2024", "Web development", "Developing responsive experiences with a focus on thoughtful details and performance.", "HTML · CSS · Git"],
];

const technologies = ["JavaScript", "React", "Next.js", "Node.js", "PostgreSQL", "MongoDB", "Docker", "AWS", "Git", "GitHub"];

function MagneticLink({ href, children, className = "" }) {
  return <a href={href} className={`magnetic-link ${className}`}>{children}<span aria-hidden="true">↗</span></a>;
}

export default function Home() {
  const [activeTech, setActiveTech] = useState("React");
  useEffect(() => {
    const onMove = (event) => {
      document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <main>
      <div className="scene-wrap" aria-hidden="true"><Scene /></div>
      <header className="site-header">
        <a href="#top" className="wordmark">SADOK<br />ACACHA</a>
        <nav aria-label="Primary navigation"><a href="#work">Work</a><a href="#about">About</a><a href="#experience">Experience</a><a href="#contact">Contact</a></nav>
        <a className="cv-link" href="/Sadok-Acacha-CV.pdf" download>Download CV <span>↓</span></a>
      </header>

      <section id="top" className="hero section-shell">
        <div className="eyebrow hero-index"><span className="pulse" /> Available for select work</div>
        <div className="hero-copy">
          <p className="eyebrow">Full-stack developer / Tunisia</p>
          <h1>Sadok<br /><em>Acacha</em></h1>
          <div className="hero-bottom"><p>I build modern web applications<br />and digital experiences.</p><a href="#work" className="round-cta">View work <span>↓</span></a></div>
        </div>
        <p className="scroll-note">Scroll to explore <span>↓</span></p>
      </section>

      <section className="intro section-shell" aria-labelledby="intro-heading">
        <p className="eyebrow">01 / An introduction</p>
        <h2 id="intro-heading">A thoughtful blend<br />of <em>logic</em> and feeling.</h2>
        <p className="intro-text">I make the systems behind a product feel as considered as the experience in front of it. From an early idea to a robust release, I care about the whole picture.</p>
      </section>

      <section id="work" className="work section-shell" aria-labelledby="work-heading">
        <div className="section-heading"><p className="eyebrow">02 / Selected work</p><h2 id="work-heading">Selected<br /><em>work.</em></h2><p>Selected explorations in product, systems, and the web.</p></div>
        <div className="projects">
          {projects.map((project) => <article className={`project-card ${project.tone}`} key={project.title}>
            <div className="project-art"><span className="project-no">{project.number}</span><div className="art-window"><i /><b /><i /></div><span className="project-mark">SA</span></div>
            <div className="project-info"><div><p className="eyebrow">{project.type}</p><h3>{project.title}</h3></div><p className="project-description">{project.description}</p><div className="project-meta"><span>{project.stack}</span><a href="#contact" aria-label={`View ${project.title}`}>View project <b>↗</b></a></div></div>
          </article>)}
        </div>
      </section>

      <section id="about" className="about section-shell" aria-labelledby="about-heading">
        <div className="portal"><div className="portal-inner" /></div>
        <div className="about-copy"><p className="eyebrow">03 / About Sadok</p><h2 id="about-heading">Built for people,<br />shaped by <em>systems.</em></h2><p>I’m a full-stack developer focused on modern web applications. I enjoy moving between frontend craft, reliable backend logic, APIs, databases, and the cloud—bringing every layer together into a calm, useful whole.</p><MagneticLink href="/Sadok-Acacha-CV.pdf" className="outline-button">Download CV</MagneticLink></div>
      </section>

      <section id="experience" className="experience section-shell" aria-labelledby="experience-heading">
        <div className="section-heading"><p className="eyebrow">04 / Experience</p><h2 id="experience-heading">The road<br />so <em>far.</em></h2></div>
        <div className="timeline">{experience.map(([year, role, text, stack]) => <article className="timeline-entry" key={year}><p className="year">{year}</p><div><h3>{role}</h3><p>{text}</p><span>{stack}</span></div><b>↗</b></article>)}</div>
      </section>

      <section className="technology section-shell" aria-labelledby="technology-heading">
        <div className="section-heading"><p className="eyebrow">05 / Technologies</p><h2 id="technology-heading">Tools I make<br /><em>things with.</em></h2></div>
        <div className="tech-stage"><div className="tech-orb" /><div className="tech-list">{technologies.map((tech, i) => <button onMouseEnter={() => setActiveTech(tech)} onFocus={() => setActiveTech(tech)} className={activeTech === tech ? "active" : ""} key={tech}><span>{String(i + 1).padStart(2, "0")}</span>{tech}</button>)}</div><div className="tech-detail"><p className="eyebrow">In focus</p><h3>{activeTech}</h3><p>{activeTech === "React" ? "A practical tool for composing responsive, human-centered interfaces." : "Part of a flexible toolkit for building robust web products."}</p></div></div>
      </section>

      <section className="approach section-shell" aria-labelledby="approach-heading"><p className="eyebrow">06 / My approach</p><h2 id="approach-heading">I like building<br />things that feel<br /><em>simple.</em></h2><p>Good technology should make the next step obvious. I work with care, curiosity, and a belief that clarity is a feature—not a compromise.</p></section>

      <section id="contact" className="contact section-shell" aria-labelledby="contact-heading"><p className="eyebrow">07 / Get in touch</p><h2 id="contact-heading">Let’s build<br /><em>something.</em></h2><div className="contact-links"><MagneticLink href="mailto:hello@sadokacacha.com">Email me</MagneticLink><MagneticLink href="https://github.com/">GitHub</MagneticLink><MagneticLink href="https://linkedin.com/">LinkedIn</MagneticLink></div><footer><span>Sadok Acacha / Full-stack developer</span><span>© 2026</span></footer></section>
    </main>
  );
}
