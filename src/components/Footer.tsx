
import Image from 'next/image';
import Link from 'next/link';
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About ' },
    { href: '/services', label: 'Services' },
    { href: '/projects', label: 'Projects' },
  ];

  const legalLinks = [
    { href: '/career', label: 'Career' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        <div className={styles.footerGrid}>
          
          <div className={styles.footerColumn}>
            <Link href="/" className={styles.footerLogo}>
              <Image
                src="/img/logowhite.png"
                alt="AMSA Overseas Logo"
                width={120}
                height={45}
              />
            </Link>
            <p className={styles.footerDescription}>
              Empowering businesses through digital innovation and scalable IT
              solutions with precision and expertise.
            </p>
            <div className={styles.socialIcons}>
              <a
                href="https://www.instagram.com/amsa_overseas?igsh=MTFob3JpczJtYWowMg%3D%3D&utm_source=qr"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              
              <a
                href="https://www.linkedin.com/company/amsa-overseas-private-ltd/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          
          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>Quick Links</h4>
            <ul className={styles.linkList}>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

         
          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>Support</h4>
            <ul className={styles.linkList}>
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          
          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>Contact Us</h4>
            <ul className={styles.contactList}>
              <li>
                <FaMapMarkerAlt />
                <span>
                  Gera's Imperium Rise, Hinjewadi, Pune, Maharashtra 411057
                </span>
              </li>
              <li>
                <FaPhoneAlt />
                <a href="tel:+917222029111">+91 7222029111</a>
              </li>
              <li>
                <FaEnvelope />
                <a href="mailto:info@amsaoverseas.com">
                  info@amsaoverseas.com
                </a>
              </li>
            </ul>
          </div>
        </div>

    
        <div className={styles.footerBottom}>
          <p>
            &copy; {new Date().getFullYear()} AMSA Overseas. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
