
import React from "react";
import { Github, Linkedin, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-12">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Personal Info and Links */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Ikhlas PV</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              AI Engineer specializing in Computer Vision, Machine Learning, and Full-Stack Development.
              Passionate about creating innovative solutions that make a real-world impact.
            </p>
            
            {/* Contact Links */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <a 
                href="mailto:ikhlas110@gmail.com" 
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 ease-out hover:scale-105 active:scale-95 group"
              >
                <Mail className="w-5 h-5 group-hover:text-pulse-400 transition-all duration-300 ease-out group-hover:scale-110" />
                <span>ikhlas110@gmail.com</span>
              </a>
              <a 
                href="tel:+918129624615" 
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 ease-out hover:scale-105 active:scale-95 group"
              >
                <Phone className="w-5 h-5 group-hover:text-pulse-400 transition-all duration-300 ease-out group-hover:scale-110" />
                <span>+91 8129624615</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/ikhlas-pv" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 ease-out hover:scale-105 active:scale-95 group"
              >
                <Linkedin className="w-5 h-5 group-hover:text-pulse-400 transition-all duration-300 ease-out group-hover:scale-110" />
                <span>linkedin.com/in/ikhlas-pv</span>
              </a>
              <a 
                href="https://github.com/ikhlasx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 ease-out hover:scale-105 active:scale-95 group"
              >
                <Github className="w-5 h-5 group-hover:text-pulse-400 transition-all duration-300 ease-out group-hover:scale-110" />
                <span>github.com/ikhlasx</span>
              </a>
            </div>
          </div>
          
          {/* Rights and Copyright */}
          <div className="border-t border-gray-700 pt-8 text-center">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Ikhlas PV. All rights reserved.
              </p>
              <p className="text-gray-400 text-sm">
                Built with React, TypeScript & Tailwind CSS
              </p>
            </div>
            <div className="mt-4">
              <p className="text-gray-500 text-xs">
                Designed and developed with ❤️ for showcasing innovative AI solutions
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
