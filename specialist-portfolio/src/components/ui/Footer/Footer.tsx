// // specialist-portfolio/src/components/ui/Footer/Footer.tsx
// import React from 'react';
// import { footerNavigation } from '../../../config/navigation'; // adjust path as needed
// import { FooterProps } from './Footer.types';
// import styles from './Footer.module.css';

// /**
//  * Global footer component.
//  * Displays secondary navigation, brand info, social links, and copyright.
//  */
// const Footer: React.FC<FooterProps> = ({ className }) => {
//   const currentYear = new Date().getFullYear();

//   // Destructure navigation items (assuming footerNavigation exports object with sections)
//   const {
//     about,
//     github,
//     linkedin,
//     sitemap,
//     colophon,
//   } = footerNavigation || {};

//   return (
//     <footer className={`${styles.footer} ${className || ''}`}>
//       <div className={styles.footer__inner}>
//         <div className={styles.footer__grid}>
//           {/* Brand column */}
//           <div className={styles.footer__brand}>
//             <span>The Data Specialist</span>
//             <div className={styles.footer__tagline}>
//               Building intelligent systems. Designing digital impact.
//             </div>
//           </div>

//           {/* Navigation columns */}
//           <div className={styles.footer__nav}>
//             <h4 className={styles.footer__navTitle}>Explore</h4>
//             <a href="/about" className={styles.footer__link}>About</a>
//             <a href="/portfolio" className={styles.footer__link}>Portfolio</a>
//             <a href="/blog" className={styles.footer__link}>Blog</a>
//             <a href="/contact" className={styles.footer__link}>Contact</a>
//           </div>

//           <div className={styles.footer__nav}>
//             <h4 className={styles.footer__navTitle}>Resources</h4>
//             <a href="/tools" className={styles.footer__link}>Tools</a>
//             <a href="/documentation" className={styles.footer__link}>Documentation</a>
//             <a href="/resume" className={styles.footer__link}>Resume</a>
//           </div>

//           <div className={styles.footer__nav}>
//             <h4 className={styles.footer__navTitle}>Connect</h4>
//             <a href={github || 'https://github.com'} className={styles.footer__link} target="_blank" rel="noopener noreferrer">GitHub</a>
//             <a href={linkedin || 'https://linkedin.com'} className={styles.footer__link} target="_blank" rel="noopener noreferrer">LinkedIn</a>
//             <a href="/sitemap" className={styles.footer__link}>Sitemap</a>
//           </div>
//         </div>

//         {/* Bottom bar */}
//         <div className={styles.footer__bottom}>
//           <div className={styles.footer__copyright}>
//             <span>© {currentYear} The Data Specialist. All rights reserved.</span>
//             <a href="/colophon" className={styles.footer__colophonLink}>Colophon</a>
//           </div>
//           <div className={styles.footer__social}>
//             <a href={github || '#'} className={styles.footer__socialLink} aria-label="GitHub">
//               GitHub
//             </a>
//             <a href={linkedin || '#'} className={styles.footer__socialLink} aria-label="LinkedIn">
//               LinkedIn
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


















// src/components/ui/Footer/Footer.tsx
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__inner}>
        <p>© {new Date().getFullYear()} The Data Specialist</p>
        <nav>
          <Link to="/colophon">Colophon</Link>
          <Link to="/sitemap">Sitemap</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;