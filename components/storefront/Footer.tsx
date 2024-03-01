import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white p-4 mt-8">
      <div className="container mx-auto max-w-8xl"> {/* Boxed width with max width */}
        <div className="grid grid-cols-3 items-center font-bold"> {/* Single row, 3 columns, vertically aligned, font bold */}
          {/* Navigation Links */}
          <div className="flex justify-center space-x-2"> {/* Adjust as needed for alignment and spacing */}
            <Link href="/" legacyBehavior>
              <a className="hover:text-slate-400">About Us</a>
            </Link>
            <Link href="/" legacyBehavior>
              <a className="hover:text-slate-400">Contact</a>
            </Link>
            <Link href="/" legacyBehavior>
              <a className="hover:text-slate-400">Privacy Policy</a>
            </Link>
          </div>
          {/* Copyright Notice */}
          <div className="text-center">
            &copy; {new Date().getFullYear()} Antony Ecommerce Store. All rights reserved.
          </div>
          {/* Social Media Icons */}
          <div className="flex justify-center space-x-4 text-xl"> {/* Adjusted spacing for a more compact design */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
