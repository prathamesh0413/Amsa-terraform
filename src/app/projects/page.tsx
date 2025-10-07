"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import Link from "next/link";
import styles from "./projects.module.css";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "GTAsterix",
    description: "A comprehensive cross-platform Learning Management System for coaching institutes, featuring interactive modules, real-time analytics, and secure parent-teacher communication.",
    tags: ["React", "Java Spring Boot", "MySQL", ],
    image: "/img/white--gta.png"
  },
  {
    id: 2,
    title: "Mooropan",
    description: "Developed a bespoke Shopify Plus theme and integrated custom apps for a luxury fashion brand, resulting in a 40% increase in conversion rates and a seamless user experience.",
    tags: ["React", "Java Spring Boot", "MySQL", ],
    image: "/img/moorpan.png"
  },
  {
    id: 3,
    title: "Flint Infotech",
    description: "An intuitive drag-and-drop website builder designed to empower small businesses. This no-code solution allows users to create stunning, responsive websites in minutes.",
    tags: ["React", "Java Spring Boot", "MySQL", ],
    image: "/img/Flint.png"
  },
  
  {
    id: 4,
    title: "Caryanams",
    description: "Built a secure, scalable Enterprise Resource Planning (ERP) system for a financial services client, automating complex invoicing, reporting, and compliance workflows.",
    tags: ["React", "Java Spring Boot", "MySQL", ],
    image: "/img/Caryanams.png"
  },
];

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void; }) => {
  if (!project) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
        <div className={styles.modalImageContainer}>
          {/* Image style is set to 'contain' to prevent cropping */}
          <Image src={project.image} alt={project.title} fill style={{ objectFit: 'contain' }} />
        </div>
        <div className={styles.modalTextContent}>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <div className={styles.modalTags}>
            {project.tags.map(tag => <span key={tag}>{tag}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className={styles.projectsPageWrapper}>
      <div className={styles.projectsBackground}>
        <video autoPlay muted loop playsInline className={styles.projectsVideo}>
          <source src="/video/bg3_Video.mp4" type="video/mp4" />
        </video>
        <div className={styles.projectsOverlay}></div>
      </div>

      <main className={styles.projectsContent}>
        <header className={styles.projectsHeader}>
          <h1>Our Work</h1>
          <p>
            We take pride in the solutions we've delivered. Here’s a glimpse into some of our successful projects and case studies.
          </p>
        </header>

        <section className={styles.projectsGrid}>
          {projectsData.map((project, index) => (
            <div
              key={project.id}
              className={styles.projectCard}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              onClick={() => handleProjectClick(project)}
            >
              <div className={styles.cardImageWrapper}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className={styles.cardImage}
                  style={{ objectFit: 'cover' }}
                />
              </div>
              
              <div className={styles.cardOverlay}></div>

              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDescription}>{project.description}</p>
                
                <div className={styles.cardTags}>
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className={styles.ctaSection} data-aos="fade-up" data-aos-delay="300">
          <h2 className={styles.ctaTitle}>Have a Project in Mind?</h2>
          <p className={styles.ctaDescription}>
            Let's build something great together. We're excited to hear your ideas and discuss how we can bring your vision to life.
          </p>
          <Link href="/contact" className={styles.ctaButton}>
            Get a Free Consultation
          </Link>
        </section>
      </main>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleCloseModal} />
      )}
    </div>
  );
}