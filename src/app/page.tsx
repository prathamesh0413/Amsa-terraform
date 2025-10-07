"use client";

import { useEffect, ReactNode } from "react"; 
import AOS from "aos";
import "aos/dist/aos.css";
import { TypeAnimation } from 'react-type-animation';
import Image from "next/image";
import Script from 'next/script';
import {
  FaBullseye, FaPencilRuler, FaCode, FaRocket, 
  FaCogs, FaLaptopCode, FaSyncAlt, 
  FaAward, FaTools, FaGlobeAmericas, FaHandshake, 
} from "react-icons/fa";
import Link from 'next/link';
import styles from './page.module.css';

interface Offering {
  icon: ReactNode;
  title: string;
  desc: string;
}

interface ProcessStep {
  icon: ReactNode;
  title: string;
  desc: string;
}

const offerings: Offering[] = [
  { icon: <FaCogs />, title: "SAP ERP Solutions", desc: "Streamline your business operations with scalable ERP systems." },
  { icon: <FaLaptopCode />, title: "Custom Software", desc: "Build intelligent and efficient applications tailored to your needs." },
  { icon: <FaSyncAlt />, title: "System Integration", desc: "Optimize your IT infrastructure with our expert consulting." },
];

const processSteps: ProcessStep[] = [ 
  { icon: <FaBullseye />, title: " Discovery", desc: "We start by understanding your vision, goals, and requirements." },
  { icon: <FaPencilRuler />, title: "Design & UX", desc: "We craft intuitive and beautiful user interfaces for the best experience." },
  { icon: <FaCode />, title: " Development", desc: "Our expert developers bring the designs to life with clean, efficient code." },
  { icon: <FaRocket />, title: "Deployment", desc: "We ensure a smooth launch and provide ongoing support for success." },
];

const reasons = [
  { icon: <FaAward />, text: "Client-Centric Approach" },
  { icon: <FaTools />, text: "Scalable tech stack" },
  { icon: <FaGlobeAmericas />, text: "Quality assurance" },
  { icon: <FaHandshake />, text: "Timely delivery" },
  { icon: <FaAward />, text: "Affordable pricing" },
];

const techLogos = [
  { src: "/img/react.svg", alt: "React" },
  { src: "/img/nodejs.svg", alt: "Node.js" },
  { src: "/img/flutter.svg", alt: "Flutter" },
  { src: "/img/sap.svg", alt: "SAP" },
  { src: "/img/mongodb.svg", alt: "MongoDB" },
  { src: "/img/aws.svg", alt: "AWS" },
  { src: "/img/python.svg", alt: "Python" },
  { src: "/img/figma.svg", alt: "Figma" },
];


export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }, []);

  return (
    <div className={styles.homePageWrapper}>
      {/* CHATBOT SCRIPT ADDED HERE */}
      <Script src='https://www.noupe.com/embed/01994cda179b7bb694892f5cf3290b943587.js' strategy="lazyOnload" />

      <div className={styles.backgroundVideoContainer}>
        <video autoPlay muted loop playsInline className={styles.backgroundVideo}>
          <source src="/video/bg_Video.mp4" type="video/mp4" />
        </video>
        <div className={styles.videoOverlay}></div>
      </div>
      
      <main className={styles.contentWrapper}>
        <section className={styles.heroSection}>
          <h1 data-aos="fade-up">Empowering Businesses Through</h1>
          <TypeAnimation
            sequence={[
              'Digital Innovation', 2000,
              'Custom Software', 2000,
              'Scalable IT Solutions', 2000,
              'Mobile App Development', 2000,
            ]}
            wrapper="span"
            speed={50}
            className={styles.typingAnimation}
            repeat={Infinity}
          />
          <p data-aos="fade-up" data-aos-delay="200">
            We build beautiful, functional, and scalable digital products that drive growth.
          </p>
          <Link href="/contact" className={styles.ctaButton} data-aos="fade-up" data-aos-delay="400">
            Get a Free Consultation
          </Link>
        </section>

        <section className={styles.section} data-aos="fade-up">
          <h2 className={styles.sectionTitle}>Our Core Offerings</h2>
          <div className={styles.offeringsGrid}>
            {offerings.map((item, idx) => (
              <div className={styles.glassCard} key={idx} data-aos="fade-up" data-aos-delay={idx * 100}>
                <div className={styles.cardIcon}>{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} data-aos="fade-up">
          <h2 className={styles.sectionTitle}>Our Process</h2>
          <div className={styles.processGrid}>
            {processSteps.map((step, idx) => (
              <div className={styles.processStep} key={idx} data-aos="fade-up" data-aos-delay={idx * 150}>
                <div className={styles.processIcon}>{step.icon}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} data-aos="fade-up">
          <h2 className={styles.sectionTitle}>Why Choose Amsa?</h2>
          <div className={styles.whyUsGrid}>
            <div className={styles.whyUsImage} data-aos="fade-right">
              <Image src="/img/home.jpg" alt="Team collaborating" width={500} height={500} />
            </div>
            <div className={styles.whyUsList} data-aos="fade-left">
              {reasons.map((reason, idx) => (
                <div className={styles.reasonItem} key={idx}>
                  <div className={styles.reasonIcon}>{reason.icon}</div>
                  <span>{reason.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.techSection}>
          <h2 className={styles.sectionTitle}>Technologies We Master</h2>
          <div className={styles.marquee}>
            <div className={styles.marqueeContent}>
              {techLogos.concat(techLogos).map((logo, idx) => (
                <div className={styles.techLogo} key={`${logo.alt}-${idx}`}>
                  <Image src={logo.src} alt={logo.alt} width={100} height={40} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}