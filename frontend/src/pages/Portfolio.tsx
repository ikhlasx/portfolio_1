import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PortfolioHero from "@/components/PortfolioHero";
import ContactSection from "@/components/ContactSection";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    description: [
      "Developed customer retention tracking system using IP cameras and custom face recognition models",
      "Implemented real-time customer visit counting with display screen integration",
      "Built custom face recognition and tracking models achieving high accuracy in hotel environments",
      "Applied reinforcement learning framework to optimize output performance and improve system learning",
    ]
  },
  {
    title: "Hospital Bystander Caller Web App",
    period: "2025",
    tech: "Flask, Twilio, QR Code, Authentication",
    description: [
      "Developed web application enabling medical staff to efficiently notify patient companions via automated voice calls",
      "Implemented secure user authentication, QR code registration, and call tracking features",
      "Created responsive admin dashboard with real-time status monitoring",
      "Decreased staff communication time by 70% and served 30+ staff members",
    ]
  },
  {
    title: "Real-Time Object Detection and Tracking System",
    period: "2024",
    tech: "YOLOv11, DeepSORT, OpenCV, MQTT",
    description: [
      "Designed real-time system for detecting and tracking conveyor belt products using YOLOv11 and DeepSORT",
      "Achieved 94% detection accuracy and 90% tracking consistency in production environment",
      "Integrated MQTT for live product counting, boosting stock analysis and streamlining product development",
      "Optimized inference speed for real-time processing (30+ FPS) with deployment-ready architecture",
    ]
  },
  {
    title: "Assistant for Trainee Teachers and Students (ATTS)",
    period: "2023-2024",
    tech: "Computer Vision, CNN, MediaPipe, NLP",
    description: [
      "Developed AI-powered assistant providing real-time feedback and personalized guidance to trainee teachers",
      "Implemented facial recognition and emotion detection algorithms (95% accuracy) for real-time analysis",
      "Created personalized response generation system adapting to detected emotions and learning patterns",
      "Built adaptive feedback mechanism adjusting difficulty based on student's emotional response",
    ]
  },
  {
    title: "Train Delay Detection Using Machine Learning",
    period: "2023",
    tech: "XGBoost, Flask, Python, GPS Data",
    description: [
      "Developed train delay prediction model with 90% accuracy using XGBoost algorithm",
      "Integrated real-time data like schedules and GPS for comprehensive delay forecasting",
      "Built responsive website with HTML, CSS, Bootstrap, and JavaScript with Flask backend",
      "Implemented real-time tracking system supporting 2,000+ daily users",
    ]
  },
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

        {/* GitHub Repositories */}
        <section id="projects" className="py-12">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="pulse-chip mb-3 sm:mb-6 opacity-0 animate-on-scroll">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">04</span>
              <span>Projects</span>
            </div>
            <h2 className="section-title text-3xl sm:text-4xl leading-tight mb-4 opacity-0 animate-on-scroll">
              GitHub Repositories
            </h2>
            <p className="section-subtitle max-w-2xl mb-8 opacity-0 animate-on-scroll">
              Live data fetched from GitHub and displayed in the site’s native style.
            </p>

            {loading ? (
              <p className="text-gray-600">Loading repositories…</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {repos.map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Card className="hover-scale">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold truncate pr-2">{repo.name}</h3>
                          <span className="text-xs text-gray-600">⭐ {repo.stargazers_count}</span>
                        </div>
                        <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                          {repo.description || "No description available"}
                        </p>
                        <div className="mt-3 flex items-center gap-2 flex-wrap">
                          {repo.language && (
                            <Badge variant="outline">{repo.language}</Badge>
                          )}
                          <span className="text-xs text-gray-500">
                            Updated {new Date(repo.updated_at).toLocaleDateString()}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
            )}
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
