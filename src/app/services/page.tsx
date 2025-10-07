

"use client";

import { useState, ReactNode } from "react"; 
import Image from 'next/image';
import {
  FaLaptopCode, FaMobileAlt, FaUsers, FaCogs, FaShoppingCart, FaDatabase,
  FaComments, FaPencilRuler, FaRocket, FaChevronDown
} from "react-icons/fa";
import styles from "./services.module.css";


type Service = {
    title: string;
    description: string;
    icon: ReactNode;
    image: string;
    features: string[];
};

const services: Service[] = [
  { 
    title: "Website Development", 
    description: "We build modern, responsive, and high-performing websites using cutting-edge technologies like React and WordPress, designed to engage your audience and convert visitors into customers.", 
    icon: <FaLaptopCode />,
    image: "/img/website.jpg",
    features: ["Custom UI/UX Design", "Responsive on all devices", "CMS Integration", "SEO Optimized Foundation"]
  },
  { 
    title: "Mobile App Development", 
    description: "From iOS to Android, we develop custom cross-platform mobile applications using Flutter and React Native that solve real-world problems and offer a seamless user experience.", 
    icon: <FaMobileAlt />,
    image: "/img/mobile.jpg",
    features: ["iOS & Android Compatible", "High Performance", "Secure & Scalable", "Post-launch Support"]
  },
  { 
    title: "SEO & Digital Marketing", 
    description: "Our data-driven SEO and digital marketing strategies are designed to boost your search rankings, increase organic traffic, and generate qualified leads for your business.", 
    icon: <FaUsers />,
    image: "/img/seo.jpg",
    features: ["Keyword Research & Strategy", "On-Page & Off-Page SEO", "Content Marketing", "Performance Analytics"]
  },
  { 
    title: "Full-Stack Development", 
    description: "We provide end-to-end development solutions, covering everything from frontend interfaces to backend logic (Node.js, Python) and database management (MySQL, MongoDB).", 
    icon: <FaCogs />,
    image: "/img/fullstack.jpg",
    features: ["Frontend & Backend Expertise", "API Development", "Database Architecture", "Cloud Deployment"]
  },
  { 
    title: "E-Commerce Development", 
    description: "Launch your online store with our custom e-commerce solutions, featuring secure payment gateways, intuitive product pages, and a streamlined checkout process.", 
    icon: <FaShoppingCart />,
    image: "/img/e-commerce.jpg",
    features: ["Custom Storefront Design", "Payment Gateway Integration", "Inventory Management", "Secure Checkout"]
  },
  { 
    title: "UI/UX Design", 
    description: "Our design process focuses on creating intuitive, accessible, and visually stunning interfaces through wireframes, prototypes, and user-centric design principles.", 
    icon: <FaPencilRuler />,
    image: "/img/ui.jpg",
    features: ["User Research & Analysis", "Wireframing & Prototyping", "Interactive Design", "Usability Testing"]
  },
];

const technologiesData = {
  frontend: ["React.js", "Vue.js", "Angular", "JavaScript", "TypeScript", "HTML5", "CSS3", "Bootstrap", "Tailwind CSS"],
  backend: ["Node.js", "Express.js", "Python", "Java", ".NET", "PHP", "Laravel"],
  mobile: ["React Native", "Flutter", "Swift", "Kotlin"],
  cloud: ["AWS", "Azure", "Google Cloud", "Docker", "DigitalOcean", "Firebase"],
  cms: ["WordPress", "Shopify"],
  database: ["MySQL", "PostgreSQL", "MongoDB", "Firebase"],
};


type ServiceAccordionItemProps = {
    service: Service;
    isOpen: boolean;
    onClick: () => void;
};


const ServiceAccordionItem = ({ service, isOpen, onClick }: ServiceAccordionItemProps) => {
  return (
    <div className={styles.accordionItem}>
      <button className={styles.accordionHeader} onClick={onClick}>
        <div className={styles.headerContent}>
          <span className={styles.headerIcon}>{service.icon}</span>
          <h3 className={styles.headerTitle}>{service.title}</h3>
        </div>
        <FaChevronDown className={`${styles.chevronIcon} ${isOpen ? styles.open : ''}`} />
      </button>
      <div className={`${styles.accordionContent} ${isOpen ? styles.open : ''}`}>
        <div className={styles.contentInner}>
          <div className={styles.contentDetails}>
            <p className={styles.contentDescription}>{service.description}</p>
            <h4 className={styles.featuresTitle}>Key Features</h4>
            <ul className={styles.featuresList}>
              {service.features.map((feature: string) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
          <div className={styles.contentImage}>
            <Image src={service.image} alt={service.title} width={400} height={300} style={{ objectFit: 'cover', borderRadius: '8px' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ServicesClientPage() { 
  const [activeTab, setActiveTab] = useState('frontend');
  const [openAccordion, setOpenAccordion] = useState(0);

  return (
    <div className={styles.servicesPageWrapper}>
      <div className={styles.backgroundVideoContainer}>
        <video autoPlay muted loop playsInline className={styles.backgroundVideo}>
          <source src="/video/bg3_Video.mp4" type="video/mp4" />
        </video>
        <div className={styles.videoOverlay}></div>
      </div>

      <main className={styles.mainContent}>
        <section className={styles.heroSection}>
          <p className={styles.heroSubtitle}>Our Expertise</p>
          <h1 className={styles.heroTitle}>Digital Solutions, <br />Engineered for Growth</h1>
          <p className={styles.heroDescription}>We combine strategy, design, and technology to build future-ready digital products that drive business forward.</p>
        </section>

        <section id="services-list" className={styles.section}>
          <div className={styles.accordionContainer}>
            {services.map((service, index) => (
              <ServiceAccordionItem 
                key={index}
                service={service}
                isOpen={openAccordion === index}
                onClick={() => setOpenAccordion(openAccordion === index ? -1 : index)}
              />
            ))}
          </div>
        </section>

        <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Our Approach</h2>
            <div className={styles.approachGrid}>
                <div className={styles.approachStep}>
                    <div className={styles.stepIcon}><FaComments /></div>
                    <h4>1. Consultation</h4>
                    <p>We begin by thoroughly understanding your goals and vision.</p>
                </div>
                <div className={styles.approachStep}>
                    <div className={styles.stepIcon}><FaPencilRuler /></div>
                    <h4>2. Design & Develop</h4>
                    <p>Our team designs and develops robust solutions with precision.</p>
                </div>
                <div className={styles.approachStep}>
                    <div className={styles.stepIcon}><FaRocket /></div>
                    <h4>3. Launch & Support</h4>
                    <p>We ensure a seamless launch and provide continuous support.</p>
                </div>
            </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Technologies We Use</h2>
          <div className={styles.techTabsContainer}>
            <div className={styles.tabButtons}>
              {Object.keys(technologiesData).map((key) => (
                <button
                  key={key}
                  className={`${styles.tabButton} ${activeTab === key ? styles.active : ''}`}
                  onClick={() => setActiveTab(key)}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
              ))}
            </div>
            <div className={styles.tabContent}>
              {technologiesData[activeTab as keyof typeof technologiesData].map((tech) => (
                <span key={tech} className={styles.techPill}>{tech}</span>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}