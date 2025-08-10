import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PortfolioHero from "@/components/PortfolioHero";
import ContactSection from "@/components/ContactSection";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ExternalLink, Calendar, Code } from "lucide-react";

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  updated_at: string;
  topics?: string[];
}

const skills: string[] = [
  "Python (Advanced)", "JavaScript", "Java", "SQL", "C", 
  "TensorFlow", "PyTorch", "Keras", "Scikit-learn", "XGBoost",
  "OpenCV", "YOLOv11", "DeepSORT", "Computer Vision", "Object Detection",
  "Flask", "Django", "RESTful APIs", "HTML/CSS", "Bootstrap",
  "AWS", "Azure", "Docker", "Kubernetes", "Git",
  "MQTT", "Embedded Systems", "NVIDIA Jetson", "Raspberry Pi"
];

const experiences = [
  {
    role: "Vision Engineer – Foxconn Apple Project",
    org: "Luster Lighttech Pvt Ltd • Bangalore, India",
    period: "May 2025 - Jun 2025",
    points: [
      "Built vision systems for accurate object detection in Apple manufacturing workflows",
      "Debugged and optimized detection algorithms for real-time reliability",
      "Collaborated with hardware teams to design machine-integrated vision modules",
      "Developed software pipelines for automated object classification and inspection",
    ],
  },
  {
    role: "AI Engineer Trainee",
    org: "Elkitch Pvt Ltd • Mysore, India",
    period: "Sep 2024 - Feb 2025",
    points: [
      "Engineered real-time product detection system using YOLOv11 and DeepSORT achieving 96% accuracy",
      "Processed 120+ objects per minute on conveyor belts using optimized computer vision algorithms",
      "Integrated MQTT protocol for live product counting, enhancing inventory management by 65%",
      "Developed and deployed vision models for edge computing applications with scalable deployment",
      "Implemented image preprocessing techniques to enhance detection accuracy in challenging environments",
    ],
  },
  {
    role: "AI Project Intern",
    org: "Regional Technologies • Calicut, India",
    period: "Dec 2023 - May 2024",
    points: [
      "Developed AI-powered teaching assessment tool using computer vision (91% accuracy) and NLP",
      "Created CNN-based posture and gesture recognition system using MediaPipe for real-time feedback",
      "Trained and optimized multiple CV models (87-92% accuracy) reducing evaluation time by 70%",
      "Designed responsive dashboard to visualize computer vision analytics for 25+ educators",
      "Enhanced teaching effectiveness by 32% for 200+ users through automated analysis",
    ],
  },
  {
    role: "Data Science Intern",
    org: "Dataspark • Calicut, India",
    period: "Sep 2023",
    points: [
      "Built train delay prediction model with 90% accuracy using XGBoost algorithm and GPS data",
      "Developed responsive web interfaces with Flask to visualize real-time tracking information",
      "Performed feature engineering on temporal and spatial data to improve prediction accuracy",
      "Supported 2,000+ daily users with real-time tracking and 8-minute advance notifications",
    ],
  },
  {
    role: "Full Stack Web Development Intern",
    org: "STEM Robotics • Kochi, India",
    period: "May 2023",
    points: [
      "Developed full-stack web applications using Python frameworks (Django, Flask)",
      "Optimized page load times by 30% through database configuration",
      "Established secure authentication system and implemented 15 IoT devices for factory monitoring",
    ],
  },
];

const projects = [
  {
    title: "Hotel Customer Retention Analytics System",
    period: "2025",
    tech: "Computer Vision, Reinforcement Learning, Face Recognition",
    image: "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1",
    shortDescription: "Vision-based system to identify and track hotel customers using IP camera feeds with custom face recognition models.",
    fullDescription: [
      "Designed and implemented an end-to-end vision-based system to identify and track hotel customers using IP camera feeds.",
      "Developed custom face recognition models fine-tuned for hotel-specific lighting, angles, and environment noise.",
      "Integrated real-time visit counting with on-screen display to enhance guest engagement and create transparency.",
      "Applied reinforcement learning algorithms to dynamically adjust recognition thresholds, improving long-term performance.",
      "Built a centralized database to store visitor histories and generate analytics for customer retention strategies.",
      "Optimized tracking pipeline for low-latency performance on edge devices."
    ]
  },
  {
    title: "Hospital Bystander Caller Web App",
    period: "2025",
    tech: "Flask, Twilio, QR Code, Authentication",
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
    shortDescription: "Secure web application to automate calling patient companions during emergencies using Twilio's programmable voice API.",
    fullDescription: [
      "Created a secure web application to automate calling patient companions (bystanders) during emergencies.",
      "Implemented Twilio's programmable voice API for automated call initiation with customizable messages.",
      "Developed QR code-based patient registration for quick and error-free database entries.",
      "Built an authentication system to ensure that only authorized medical staff can initiate calls.",
      "Designed a real-time dashboard to monitor call statuses and manage ongoing notifications.",
      "Reduced average staff communication time by 70%, improving emergency response speed."
    ]
  },
  {
    title: "Real-Time Object Detection and Tracking System",
    period: "2024",
    tech: "YOLOv11, DeepSORT, OpenCV, MQTT",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    shortDescription: "High-performance vision system for detecting and tracking items on conveyor belts achieving 94% detection accuracy.",
    fullDescription: [
      "Engineered a high-performance vision system for detecting and tracking items on conveyor belts in manufacturing.",
      "Achieved 94% detection accuracy and 90% tracking stability using YOLOv11 and DeepSORT integration.",
      "Incorporated MQTT for real-time product counting, enabling live updates to inventory systems.",
      "Optimized inference time to maintain over 30 FPS performance on edge devices.",
      "Implemented robust object re-identification logic to handle occlusions and overlapping items.",
      "Designed deployment scripts for seamless integration into production environments."
    ]
  },
  {
    title: "AI Assistant for Trainee Teachers and Students (ATTS)",
    period: "2023-2024",
    tech: "Computer Vision, CNN, MediaPipe, NLP",
    image: "https://images.unsplash.com/photo-1601132359864-c974e79890ac",
    shortDescription: "Smart assistant to analyze teaching performance and provide AI-driven feedback with 95% emotion detection accuracy.",
    fullDescription: [
      "Built a smart assistant to analyze teaching performance and provide AI-driven feedback in real time.",
      "Implemented CNN-based facial recognition and emotion detection algorithms with 95% accuracy.",
      "Integrated MediaPipe for real-time gesture and posture recognition of teachers and students.",
      "Developed an NLP-based feedback generator that adapts its suggestions to the detected emotions and learning progress.",
      "Designed adaptive difficulty adjustment mechanisms to improve student engagement and learning outcomes.",
      "Created a responsive interface for both teachers and administrators to track performance analytics."
    ]
  },
  {
    title: "Train Delay Detection Using Machine Learning",
    period: "2023",
    tech: "XGBoost, Flask, Python, GPS Data",
    image: "https://images.unsplash.com/photo-1655696644743-972ed99b89f7",
    shortDescription: "Machine learning model using XGBoost to predict train delays with 90% accuracy serving 2,000+ daily users.",
    fullDescription: [
      "Developed a machine learning model using XGBoost to predict train delays with 90% accuracy.",
      "Integrated real-time GPS and schedule data for up-to-date predictions.",
      "Built a responsive web app (Flask + HTML/CSS/JS) to display live delay forecasts and tracking.",
      "Designed user-friendly visualization tools for commuters to check expected arrival times.",
      "Enabled notifications for delay alerts, reaching 2,000+ daily users.",
      "Optimized the feature engineering pipeline to improve prediction reliability across various train routes."
    ]
  },
  {
    title: "n8n Automation for Customer Service Voice Call Agents",
    period: "2024-2025",
    tech: "n8n, Twilio, OpenAI Whisper, Google Translate API",
    image: "https://images.pexels.com/photos/8728559/pexels-photo-8728559.jpeg",
    shortDescription: "Automated workflow for multilingual customer service with AI-driven voice transcription and translation capabilities.",
    fullDescription: [
      "Designed and implemented an automated n8n workflow for customer service voice agents, integrating Twilio for inbound/outbound calls.",
      "Enabled AI-driven voice-to-text transcription using OpenAI Whisper for accurate speech recognition in real time.",
      "Integrated translation modules to convert Malayalam speech into English and Chinese with minimal latency.",
      "Built automated response triggers to streamline customer service queries without human intervention.",
      "Created monitoring dashboards to track call metrics, translation accuracy, and agent performance.",
      "Reduced manual handling time by over 60% while improving response consistency."
    ]
  },
  {
    title: "AI-Personalized Chatbot for Communication Skill Improvement",
    period: "2024",
    tech: "NLP, Transformer Models, Dialogflow, Flask",
    image: "https://images.pexels.com/photos/7789851/pexels-photo-7789851.jpeg",
    shortDescription: "AI-powered chatbot with personalized learning modules for improving verbal and written communication skills.",
    fullDescription: [
      "Developed an AI-powered chatbot tailored for improving users' verbal and written communication skills.",
      "Integrated a personalized learning module that adapts difficulty levels based on the user's progress and feedback.",
      "Utilized transformer-based NLP models for contextual understanding and dynamic conversation flow.",
      "Designed scenarios for public speaking, interview preparation, and everyday conversation practice.",
      "Implemented analytics to track user engagement, vocabulary growth, and improvement over time.",
      "Deployed the chatbot via web and mobile platforms for wide accessibility."
    ]
  }
];

const education = {
  degree: "Bachelor of Technology in Computer Science and Engineering",
  institution: "APJ Abdul Kalam Technological University",
  location: "Kerala, India",
  period: "Aug 2020 - May 2024",
  cgpa: "7.0",
  coursework: [
    "Advanced Programming Languages", "Algorithms and Data Structures", 
    "Computer Architecture", "Operating Systems", "Machine Learning", "Network Security"
  ],
  finalProject: "AI-powered assistant for trainee teachers and students using Computer Vision, CNN, MediaPipe and NLP techniques"
};

const certifications = [
  "IBM AI Engineering Professional Certificate",
  "Career Essentials in Generative AI by Microsoft and LinkedIn",
  "Python for Data Science by IIT Madras (NPTEL)",
  "IBM Python for Data Science, AI & Development",
  "AI Engineering Specialization by Scrimba",
  "Computer Vision with TensorFlow and PyTorch"
];

const achievements = [
  {
    title: "First Prize, National Level Hackathon",
    org: "i5, Robotics and Automation Society",
    year: "2024",
    description: "Competed against 75+ teams"
  },
  {
    title: "Vice Chair, IEEE Student Branch EKCTC",
    org: "IEEE Kerala Section",
    year: "2023-2024",
    description: "Led 12 campus tech events and mentored 15 student projects through IEDC program"
  },
  {
    title: "Multiple Robotics Competitions",
    org: "Various Kerala Colleges",
    year: "2022-2024",
    description: "Top-3 placement in 6 robotics competitions including Robowars, Robosoccer, Line Follower, and Bomb Diffuser"
  }
];

const Portfolio = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  // Animate on scroll like Index
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    document.title = "Ikhlas PV | Portfolio - AI Engineer";
  }, []);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch(
          "https://api.github.com/users/ikhlasx/repos?sort=updated&per_page=9"
        );
        const data = await res.json();
        setRepos(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Failed to load repos", e);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="space-y-8">
        <PortfolioHero />

        {/* Skills */}
        <section id="skills" className="py-12">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="pulse-chip mb-3 sm:mb-6 opacity-0 animate-on-scroll">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">02</span>
              <span>Skills</span>
            </div>
            <h2 className="section-title text-3xl sm:text-4xl leading-tight mb-4 opacity-0 animate-on-scroll">
              Technical Skill Matrix
            </h2>
            <p className="section-subtitle max-w-2xl mb-8 opacity-0 animate-on-scroll">
              Core strengths across ML/AI, full‑stack development, and user‑centered engineering.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {skills.map((s) => (
                <div
                  key={s}
                  className="rounded-xl border border-gray-200/70 bg-white/60 backdrop-blur-sm p-3 text-center text-sm font-medium hover-scale opacity-0 animate-on-scroll"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="py-8">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="pulse-chip mb-3 sm:mb-6 opacity-0 animate-on-scroll">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">03</span>
              <span>Experience</span>
            </div>
            <h2 className="section-title text-3xl sm:text-4xl leading-tight mb-6 opacity-0 animate-on-scroll">
              Professional Experience
            </h2>
            <div className="grid gap-4">
              {experiences.map((exp) => (
                <Card key={exp.role} className="opacity-0 animate-on-scroll">
                  <CardContent className="p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <h3 className="text-xl font-semibold">{exp.role}</h3>
                      <span className="text-sm text-gray-600">{exp.period}</span>
                    </div>
                    <p className="text-pulse-700 mt-1">{exp.org}</p>
                    <ul className="mt-3 list-disc pl-5 space-y-1 text-sm">
                      {exp.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-12">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="pulse-chip mb-3 sm:mb-6 opacity-0 animate-on-scroll">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">04</span>
              <span>Projects</span>
            </div>
            <h2 className="section-title text-3xl sm:text-4xl leading-tight mb-4 opacity-0 animate-on-scroll">
              Featured Projects
            </h2>
            <p className="section-subtitle max-w-2xl mb-8 opacity-0 animate-on-scroll">
              Innovative AI and computer vision solutions built with cutting-edge technologies and proven results.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <Card className="hover-scale cursor-pointer opacity-0 animate-on-scroll group">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-pulse-500/90 text-white">
                            {project.period}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold text-lg leading-tight pr-2">{project.title}</h3>
                          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-pulse-500 transition-colors flex-shrink-0 mt-1" />
                        </div>
                        <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                          {project.shortDescription}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {project.tech.split(', ').slice(0, 3).map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {project.tech.split(', ').length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.tech.split(', ').length - 3} more
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <div className="flex items-center gap-4 mb-4">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <DialogTitle className="text-xl font-bold mb-2">{project.title}</DialogTitle>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {project.period}
                            </div>
                            <div className="flex items-center gap-1">
                              <Code className="w-4 h-4" />
                              {project.tech}
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="prose max-w-none">
                        <h3 className="text-lg font-semibold mb-3">Project Overview</h3>
                        <p className="text-gray-700 mb-6">{project.shortDescription}</p>
                        
                        <h3 className="text-lg font-semibold mb-3">Key Features & Achievements</h3>
                        <ul className="space-y-3">
                          {project.fullDescription.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-pulse-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="border-t pt-4 mt-6">
                        <h3 className="text-lg font-semibold mb-3">Technologies Used</h3>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.split(', ').map((tech) => (
                            <Badge key={tech} className="bg-pulse-50 text-pulse-700 border-pulse-200">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
