import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from 'react'

import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.social_list}>
        <li>
          <FaLinkedin />
        </li>
        <li>
          <FaInstagram/>
        </li>
        <span>Costs </span> &copy; 2025
      </ul>
    </footer>
  );
}

export default Footer;
