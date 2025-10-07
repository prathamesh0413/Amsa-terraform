

"use client";

import { useState, useEffect, ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaLightbulb, FaUsers, FaChartLine, FaLaptopCode, FaArrowRight } from "react-icons/fa";
import styles from "./career.module.css";

interface WhyJoinUsItem {
    icon: ReactNode;
    title: string;
    description: string;
}

const whyJoinUsData: WhyJoinUsItem[] = [
    { icon: <FaLightbulb />, title: "Innovate & Create", description: "Work on cutting-edge technologies and projects that make a real-world impact." },
    { icon: <FaChartLine />, title: "Accelerated Growth", description: "We provide continuous learning opportunities and a clear path for your professional growth." },
    { icon: <FaUsers />, title: "Vibrant Culture", description: "Be a part of a supportive and diverse team that values collaboration and mutual respect." },
    { icon: <FaLaptopCode />, title: "Flexibility & Balance", description: "We believe in a healthy work-life balance with flexible timings and a friendly environment." },
];

interface TeamMember {
    name: string;
    role: string;
    image: string;
    quote: string;
}

// const teamData: TeamMember[] = [
//     { name: "Priya Sharma", role: "Lead Engineer", image: "/img/model1.jpg", quote: "The best part about working here is the freedom to innovate and the supportive team." },
//     { name: "Rahul Verma", role: "Product Designer", image: "/img/model1.jpg", quote: "We're constantly pushing boundaries. It's an exciting place to be for any creative professional." },
//     { name: "Anjali Mehta", role: "Marketing Head", image: "/img/model1.jpg", quote: "The collaborative spirit is amazing. We celebrate every win together." },
// ];

type JobPosition = {
    title: string;
    location: string;
    type: string;
};

const openPositions: JobPosition[] = [];
const animatedWords = ["Innovators", "Creators", "Builders", "Dreamers"];

export default function CareerClientPage() {
    const [wordIndex, setWordIndex] = useState(0);
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const type = () => {
            const currentWord = animatedWords[wordIndex];
            const updatedText = isDeleting
                ? currentWord.substring(0, text.length - 1)
                : currentWord.substring(0, text.length + 1);

            setText(updatedText);

            if (!isDeleting && updatedText === currentWord) {
                setTimeout(() => setIsDeleting(true), 1500);
            } else if (isDeleting && updatedText === '') {
                setIsDeleting(false);
                setWordIndex((prevIndex) => (prevIndex + 1) % animatedWords.length);
            }
        };

        const typingSpeed = isDeleting ? 100 : 150;
        const timeout = setTimeout(type, typingSpeed);
        return () => clearTimeout(timeout);
    }, [text, isDeleting, wordIndex]);

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.videoBackground}>
                <video autoPlay muted loop playsInline>
                    <source src="/video/bg3_Video.mp4" type="video/mp4" />
                </video>
                <div className={styles.videoOverlay}></div>
            </div>

            <main className={styles.mainContent}>
                <section className={styles.heroSection}>
                    <div className={styles.container}>
                        <h1 className={styles.heroTitle}>
                            Join a Team of&nbsp;
                            <span className={styles.animatedWord}>{text}</span>
                            <span className={styles.caret}>|</span>
                        </h1>
                        <p className={styles.heroDescription}>
                            At AMSA Overseas, we're not just building software—we're building the future. We're looking for passionate individuals to join our mission.
                        </p>
                        <Link href="#open-positions" className={styles.ctaButton}>See Open Roles</Link>
                    </div>
                </section>

                <section className={styles.whyJoinUsSection}>
                    <div className={styles.container}>
                        <div className={styles.featuresGrid}>
                            {whyJoinUsData.map((item, index) => (
                                <div className={styles.featureCard} key={index}>
                                    <div className={styles.featureIcon}>{item.icon}</div>
                                    <h3 className={styles.featureTitle}>{item.title}</h3>
                                    <p className={styles.featureDescription}>{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* <section className={styles.teamSection}>
                    <div className={styles.container}>
                        <h2 className={styles.sectionTitle}>The People Behind the Progress</h2>
                        <div className={styles.teamGrid}>
                            {teamData.map((member, index) => (
                                <div className={styles.teamCard} key={index}>
                                    <Image src={member.image} alt={member.name} width={100} height={100} className={styles.teamImage} />
                                    <p className={styles.teamQuote}>"{member.quote}"</p>
                                    <div className={styles.teamMemberInfo}>
                                        <h4 className={styles.teamMemberName}>{member.name}</h4>
                                        <p className={styles.teamMemberRole}>{member.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section> */}

                <section id="open-positions" className={styles.positionsSection}>
                    <div className={styles.container}>
                        <h2 className={styles.sectionTitle}>Current Openings</h2>
                        <div className={styles.positionsContainer}>
                            {openPositions.length > 0 ? (
                                openPositions.map((job, index) => (
                                    <div className={styles.jobRow} key={index}>
                                        <div className={styles.jobInfo}>
                                            <h3 className={styles.jobTitle}>{job.title}</h3>
                                            <p className={styles.jobDetails}>{job.location} • {job.type}</p>
                                        </div>
                                        <Link href="/contact" className={styles.applyLink}>
                                            Apply Now <FaArrowRight />
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <div className={styles.noOpenings}>
                                    <h3>We're Always Looking for Talent</h3>
                                    <p>There are no specific roles open at the moment, but we’d love to hear from you. Send your resume to <a href="mailto:hr@amsaoverseas.com">hr@amsaoverseas.com</a>.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}