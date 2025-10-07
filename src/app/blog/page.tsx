"use client";

import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import styles from "./blog.module.css";
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-poppins',
});

interface BlogPost {
    id: number;
    title: string;
    description: string;
    image: string;
    author: string;
    date: string;
    tags: string[];
    readTime: string;
}

const allPosts: BlogPost[] = [
    { id: 1, title: "5 Emerging Trends in Software Development for 2025", description: "From AI-driven development to decentralized applications, we explore the latest practices reshaping how software is built. This includes a deeper look into the impact of quantum computing on cryptography and the rise of serverless architectures for scalable, cost-effective solutions.", image: "/img/first.jpg", author: "Tejas", date: "August 19, 2025", tags: ["Technology", "Future", "Dev"], readTime: "7 min read" },
    { "id": 2, "title": "Beyond the Cloud: How Edge Computing is Powering the Next-Gen IoT", "description": "We explore why processing data closer to its source is a game-changer. This post breaks down edge computing, its synergy with IoT devices, and real-world applications in smart cities, autonomous vehicles, and real-time analytics.", "image": "/img/Beyond-the-Cloud.png", "author": "Rohan Verma", "date": "August 28, 2025", "tags": ["Technology", "Infrastructure", "Future"], "readTime": "8 min read" },
    { "id": 3, "title": "The Post-Screen Era: Are We Ready for Brain-Computer Interfaces (BCIs)?", "description": "Imagine controlling devices with just your thoughts. We delve into the current state of BCI technology, from medical breakthroughs to potential consumer applications, and discuss the immense ethical and social questions they raise for our future.", "image": "/img/The-Post-Screen-Era.jpg", "author": "Dr. Alisha Ray", "date": "August 27, 2025", "tags": ["Future", "Technology", "UI/UX"], "readTime": "9 min read" },
    { "id": 4, "title": "The AI Co-pilot: How Generative AI is Transforming the Developer Workflow", "description": "From code generation with GitHub Copilot to automated testing and debugging, AI is no longer just a tool but a partner. This article explores how developers can leverage AI to boost productivity, learn faster, and focus on creative problem-solving.", "image": "/img/The-AI-Co-pilot.webp", "author": "Samir Khan", "date": "August 26, 2025", "tags": ["Dev", "Technology"], "readTime": "7 min read" },
    { "id": 5, "title": "Inclusive by Design: Why Accessibility is the Key to Great Product Design", "description": "Accessibility isn't just a compliance checkbox; it's a foundation for creating products that work for everyone. We cover practical tips on color contrast, semantic HTML, ARIA labels, and designing for neurodiversity to build truly inclusive experiences.", "image": "/img/Inclusive-by-Design.webp", "author": "Priya Sharma", "date": "August 25, 2025", "tags": ["Design", "UI/UX"], "readTime": "8 min read" },
    { "id": 6, "title": "A Guide to Microinteractions: The Small Details That Create Big UX Wins", "description": "What makes an app feel delightful to use? Often, it's the microinteractions. We break down the four key parts of a microinteraction and show examples of how subtle animations and feedback can drastically improve usability and user satisfaction.", "image": "/img/Microinteractions.avif", "author": "Ben Carter", "date": "August 24, 2025", "tags": ["UI/UX", "Design"], "readTime": "6 min read" },
    { "id": 7, "title": "Shift-Left Security: How to Integrate Security into Your DevOps Pipeline", "description": "DevSecOps is the future of building secure and robust applications. This post explains the 'shift-left' principle and provides a roadmap for integrating automated security tools (SAST, DAST, IAST) directly into your CI/CD pipeline.", "image": "/img/shift.png", "author": "Anya Petrova", "date": "August 23, 2025", "tags": ["DevOps", "CI/CD", "Infrastructure"], "readTime": "8 min read" },
    { "id": 8, "title": "GitOps Explained: The Next Evolution of CI/CD and Infrastructure", "description": "Using Git as the single source of truth for both application and infrastructure deployment. We explain what GitOps is, how it works with tools like Argo CD and Flux, and why it's becoming the standard for managing Kubernetes and cloud-native environments.", "image": "/img/gitops.png", "author": "Kenji Tanaka", "date": "August 22, 2025", "tags": ["CI/CD", "DevOps", "Infrastructure"], "readTime": "7 min read" },
    { "id": 9, "title": "Mastering Cloud Costs: An Introduction to FinOps for Engineers", "description": "Your cloud bill is skyrocketing, what do you do? This article introduces FinOps, a cultural practice that brings financial accountability to the variable spend model of cloud. Learn actionable strategies for cost optimization, budgeting, and forecasting.", "image": "/img/cloud.jpeg", "author": "Maria Garcia", "date": "August 21, 2025", "tags": ["Cloud", "DevOps", "Infrastructure"], "readTime": "7 min read" },
    { "id": 10, "title": "Terraform vs. Pulumi: Choosing the Right Infrastructure as Code Tool in 2025", "description": "A deep dive into the two giants of Infrastructure as Code. We compare Terraform's declarative HCL with Pulumi's use of general-purpose languages, helping you decide which tool is the best fit for your team's skillset and project complexity.", "image": "/img/terraform.png", "author": "David Chen", "date": "August 20, 2025", "tags": ["Infrastructure", "Cloud", "DevOps"], "readTime": "9 min read" },
];


const allCategories = ['All', ...new Set(allPosts.flatMap(post => post.tags))];

const BlogModal = ({ post, onClose }: { post: BlogPost; onClose: () => void; }) => {
    // ...Is component mein koi change nahi hai...
    if (!post) return null;
    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>&times;</button>
                <div className={styles.modalImageContainer}>
                    <Image src={post.image} alt={post.title} layout="fill" objectFit="contain" />
                </div>
                <div className={styles.modalTextContent}>
                    <div className={styles.modalTags}>{post.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                    <h2 className={styles.modalTitle}>{post.title}</h2>
                    <div className={styles.modalMeta}>
                        <span>By {post.author}</span><span>•</span><span>{post.date}</span><span>•</span><span>{post.readTime}</span>
                    </div>
                    <p className={styles.modalDescription}>{post.description}</p>
                </div>
            </div>
        </div>
    );
};


export default function BlogPage() {
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    const handlePostClick = (post: BlogPost) => setSelectedPost(post);
    const handleCloseModal = () => setSelectedPost(null);

    const filteredPosts = activeCategory === 'All'
        ? allPosts
        : allPosts.filter(post => post.tags.includes(activeCategory));

    const hasFeaturedPost = filteredPosts.length > 1;

    const featuredPost = hasFeaturedPost ? filteredPosts[0] : null;

    const otherPosts = hasFeaturedPost ? filteredPosts.slice(1) : filteredPosts;

    return (
        <div className={`${styles.blogPageWrapper} ${poppins.variable}`}>
            <div className={styles.blogVideoContainer}>
                <video autoPlay muted loop playsInline className={styles.blogVideo}>
                    <source src="/video/bg3_Video.mp4" type="video/mp4" />
                </video>
                <div className={styles.blogOverlay}></div>
            </div>

            <main className={styles.blogContent}>

                <div className={styles.heroSection}>

                    <div className={styles.heroLeft} data-aos="fade-right">
                        <header className={styles.blogHeader}>
                            <h1 className={styles.blogTitle}>From The Blog</h1>
                            <p className={styles.blogSubtitle}>Insights, stories, and updates to help you navigate the future of technology.</p>
                        </header>
                        <section className={styles.filterBar}>
                            {allCategories.map(category => (
                                <button
                                    key={category}
                                    className={`${styles.filterButton} ${activeCategory === category ? styles.activeFilter : ''}`}
                                    onClick={() => setActiveCategory(category)}
                                >
                                    {category}
                                </button>
                            ))}
                        </section>
                    </div>

                    {featuredPost && (
                        <section className={styles.fullPostSection} data-aos="fade-left" data-aos-delay="100">
                            <div className={styles.fullPostImageContainer}>
                                <Image src={featuredPost.image} alt={featuredPost.title} layout="fill" objectFit="contain" />
                            </div>
                            <div className={styles.fullPostTextContent}>
                                <div className={styles.fullPostTags}>
                                    {featuredPost.tags.map(tag => <span key={tag}>{tag}</span>)}
                                </div>
                                <h2 className={styles.fullPostTitle}>{featuredPost.title}</h2>
                                <p className={styles.fullPostDescription}>{featuredPost.description}</p>
                                <div className={styles.fullPostMeta}>
                                    <span>By {featuredPost.author}</span>
                                    <span>•</span>
                                    <span>{featuredPost.date}</span>
                                    <span>•</span>
                                    <span>{featuredPost.readTime}</span>
                                </div>
                            </div>
                        </section>
                    )}
                </div>

                <section id="posts-grid-section" className={styles.postsGrid}>
                    {otherPosts.map((post, index) => (
                        <div onClick={() => handlePostClick(post)} key={post.id} className={styles.blogCard} data-aos="fade-up" data-aos-delay={index * 100}>
                            <div className={styles.cardImageContainer}>
                                <Image src={post.image} alt={post.title} fill style={{ objectFit: 'contain' }} className={styles.cardImage} />
                            </div>
                            <div className={styles.cardContent}>
                                <div className={styles.cardTags}>{post.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                                <h3 className={styles.cardTitle}>{post.title}</h3>
                                <div className={styles.cardMeta}><span>{post.author}</span><span>•</span><span>{post.date}</span></div>
                            </div>
                        </div>
                    ))}
                </section>
            </main>

            {selectedPost && (
                <BlogModal post={selectedPost} onClose={handleCloseModal} />
            )}
        </div>
    );
}