import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PortfolioHero from "@/components/PortfolioHero";
import ContactSection from "@/components/ContactSection";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  ArrowRight, Calendar, Code, ChevronDown, ChevronUp, type LucideIcon,
  Factory, MessageCircle, ScanFace, Bot, ClipboardCheck, ScanLine,
  UtensilsCrossed, Truck, Microscope, Users, PhoneCall, GraduationCap,
  TrainFront, Headphones, MessagesSquare,
} from "lucide-react";

const skills: string[] = [
  "Python (Advanced)", "JavaScript", "Java", "SQL", "C",
  "TensorFlow", "PyTorch", "Keras", "Scikit-learn", "XGBoost",
  "OpenCV", "YOLOv11", "DeepSORT", "Computer Vision", "Object Detection",
  "n8n", "AI Agents", "Workflow Automation", "WhatsApp Business API", "Telegram Bots",
  "Flask", "Django", "RESTful APIs", "HTML/CSS", "Bootstrap",
  "AWS", "Docker", "Kubernetes", "Git", "SQLite",
  "MQTT", "IoT Dashboards", "Embedded Systems", "NVIDIA Jetson", "Raspberry Pi"
];

// Technologies being evaluated rather than used in production
const exploringSkills: string[] = ["Azure", "Databricks", "SAP / Tally Integration"];

const experiences = [
  {
    role: "AI Solution Architect",
    org: "Impex Appliances",
    period: "Nov 2025 - Present",
    points: [
      "Built bilingual WhatsApp support workflows and service dashboards for Saudi customers, covering complaints, dealer registration, feedback, and follow-ups.",
      "Improved face-recognition time from approximately 3 to 1.5 seconds; tested attendance workflows with 200+ employees, with Google Sheets reporting and n8n device alerts.",
      "Built smart factory dashboards for production, utilities, security, and fleet monitoring using MQTT and APIs.",
      "Developed canteen, driver, and gate workflows connecting operational records across factory systems.",
      "Built and tested procurement assistants for purchase-order tracking, overdue checks, and supplier follow-ups.",
      "Designing enterprise AI architecture using Azure and Databricks, with planned SAP and Tally integrations.",
    ],
  },
  {
    role: "Vision Engineer – Foxconn Apple Project",
    org: "Luster Lighttech Pvt Ltd • Bangalore, India",
    period: "May 2025 - Jun 2025",
    points: [
      "Configured machine-vision tools for manufacturing inspection, calibration, and geometric measurement.",
      "Troubleshot line detection and intersection issues using edge-polarity adjustments.",
      "Worked with Vision Assembly and LBAS Capture across production-line vision systems.",
      "Supported image capture, storage, and backup requirements for inspection workflows.",
    ],
  },
  {
    role: "AI Engineer Trainee",
    org: "Elkitch Pvt Ltd • Mysore, India",
    period: "Sep 2024 - Feb 2025",
    points: [
      "Built camera-based product counting for conveyor belts using YOLOv11 object detection and DeepSORT tracking.",
      "Published live counts over MQTT for real-time production and inventory monitoring.",
      "Applied image preprocessing to keep detection reliable under changing lighting and overlapping items.",
      "Prepared and tuned vision models for edge deployment on the production line.",
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

interface Project {
  title: string;
  period: string;
  status?: string;
  tech: string[];
  icon: LucideIcon;
  // Optional real screenshot; when absent the card shows an icon tile instead of a stock photo
  image?: string;
  shortDescription: string;
  fullDescription: string[];
}

const FEATURED_COUNT = 6;

const projects: Project[] = [
  {
    title: "Smart Factory Platform",
    period: "2025-26",
    tech: ["MQTT", "REST APIs", "IoT"],
    icon: Factory,
    shortDescription: "Connected production, utilities, security, and fleet dashboards for monitoring factory operations through live data.",
    fullDescription: [
      "Built live dashboards for production, utilities, security, and fleet monitoring across the factory.",
      "Streamed machine and sensor data over MQTT and connected other systems through REST APIs.",
      "Brought separate operational views together so teams can monitor the plant from one place.",
    ],
  },
  {
    title: "Saudi Customer Support Automation",
    period: "2025-26",
    tech: ["WhatsApp Business", "n8n", "Interakt"],
    icon: MessageCircle,
    shortDescription: "Built bilingual WhatsApp workflows for customer complaints, dealer registration, feedback, and service tracking.",
    fullDescription: [
      "Built bilingual (Arabic/English) WhatsApp workflows for Saudi customers using WhatsApp Business, Interakt, and n8n.",
      "Automated complaint registration, dealer registration, and customer feedback collection.",
      "Developed service dashboards for complaint tracking, follow-ups, customer records, and reporting.",
    ],
  },
  {
    title: "Face Recognition Attendance",
    period: "2025-26",
    tech: ["Computer Vision", "Google Sheets", "n8n"],
    icon: ScanFace,
    shortDescription: "Reduced recognition time from approximately 3 to 1.5 seconds and tested attendance workflows with 200+ employees.",
    fullDescription: [
      "Reduced face-recognition time from approximately 3 seconds to 1.5 seconds per person.",
      "Tested the attendance workflow with 200+ employees.",
      "Integrated attendance monitoring with Google Sheets reporting and n8n-based device alerts.",
    ],
  },
  {
    title: "Agentic AI Factory",
    period: "2026",
    status: "In Development",
    tech: ["Azure", "Databricks", "AI Agents"],
    icon: Bot,
    shortDescription: "Designing department-level AI agents and enterprise data pipelines for procurement, production, and factory operations.",
    fullDescription: [
      "Researching and planning department-level AI agents for procurement, production, and factory operations.",
      "Designing enterprise data pipelines on Azure and Databricks.",
      "Planning integrations with SAP and Tally so agents can work with live business data.",
      "Currently in research, planning, and testing — not yet a full enterprise deployment.",
    ],
  },
  {
    title: "Procurement AI Assistant",
    period: "2025-26",
    tech: ["Google Sheets", "Telegram", "AI Agents"],
    icon: ClipboardCheck,
    shortDescription: "Built and tested procurement workflows for purchase-order checks, overdue tracking, and supplier follow-ups.",
    fullDescription: [
      "Built an AI assistant that checks purchase orders stored in Google Sheets.",
      "Flags overdue orders and sends reminders through Telegram.",
      "Automates supplier follow-ups to reduce manual tracking by the procurement team.",
    ],
  },
  {
    title: "Conveyor Object Tracking",
    period: "2024",
    tech: ["YOLOv11", "DeepSORT", "MQTT"],
    icon: ScanLine,
    shortDescription: "Developed camera-based conveyor object detection and tracking with YOLOv11, DeepSORT, and MQTT-based live counting.",
    fullDescription: [
      "Built camera-based detection and tracking of products on conveyor belts at Elkitch.",
      "Combined YOLOv11 detection with DeepSORT tracking so each item is counted once, even when items overlap.",
      "Published live counts over MQTT for real-time production and inventory monitoring.",
      "Prepared models and deployment scripts for edge devices on the production line.",
    ],
  },
  {
    title: "Canteen Management System",
    period: "2025-26",
    tech: ["SQLite", "Bluetooth Printing", "Tailscale"],
    icon: UtensilsCrossed,
    shortDescription: "Built meal coupon printing, expense tracking, and reporting with synchronized tablet and mobile workflows.",
    fullDescription: [
      "Built meal coupon printing over Bluetooth printers.",
      "Added expense tracking and reporting backed by SQLite.",
      "Synchronized tablet and mobile workflows over a Tailscale network.",
    ],
  },
  {
    title: "Fleet & Gate Management",
    period: "2025-26",
    tech: ["Millitrack GPS", "Google Sheets", "Google Drive"],
    icon: Truck,
    shortDescription: "Connected live GPS tracking, driver trip records, fuel information, and gate logs across factory systems.",
    fullDescription: [
      "Connected live Millitrack GPS tracking with driver trip records.",
      "Recorded fuel information and gate logs in Google Sheets and Google Drive.",
      "Linked fleet and gate records with the wider factory dashboards.",
    ],
  },
  {
    title: "Industrial Machine Vision",
    period: "2025",
    tech: ["Vision Assembly", "LBAS Capture", "Calibration"],
    icon: Microscope,
    shortDescription: "Configured and troubleshot manufacturing vision tools for calibration, edge detection, geometry measurement, and image capture.",
    fullDescription: [
      "Configured machine-vision tools for inspection, calibration, and geometric measurement on a Foxconn Apple project.",
      "Troubleshot line detection and intersection issues using edge-polarity adjustments.",
      "Supported image capture, storage, and backup for inspection workflows using Vision Assembly and LBAS Capture.",
    ],
  },
  {
    title: "Hotel Customer Retention Analytics",
    period: "2025",
    tech: ["Computer Vision", "Reinforcement Learning", "Face Recognition"],
    icon: Users,
    shortDescription: "Vision system that recognizes returning hotel guests from IP camera feeds to support retention analytics.",
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
    title: "Hospital Bystander Caller",
    period: "2025",
    tech: ["Flask", "Twilio", "QR Code", "Authentication"],
    icon: PhoneCall,
    shortDescription: "Secure web app that automatically calls patient companions during emergencies using Twilio voice.",
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
    title: "AI Assistant for Trainee Teachers (ATTS)",
    period: "2023-24",
    tech: ["Computer Vision", "CNN", "MediaPipe", "NLP"],
    icon: GraduationCap,
    shortDescription: "Assistant that analyzes teaching sessions with vision and NLP and gives trainee teachers real-time feedback.",
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
    title: "Train Delay Prediction",
    period: "2023",
    tech: ["XGBoost", "Flask", "Python", "GPS Data"],
    icon: TrainFront,
    shortDescription: "XGBoost model that predicts train delays from GPS and schedule data, served through a Flask web app.",
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
    title: "Multilingual Voice Call Agent",
    period: "2024-25",
    tech: ["n8n", "Twilio", "OpenAI Whisper", "Google Translate API"],
    icon: Headphones,
    shortDescription: "n8n voice workflow that transcribes and translates Malayalam customer calls for automated service responses.",
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
    title: "Communication Skills Chatbot",
    period: "2024",
    tech: ["NLP", "Transformer Models", "Dialogflow", "Flask"],
    icon: MessagesSquare,
    shortDescription: "Personalized chatbot that helps users practice interviews, public speaking, and everyday conversation.",
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

interface Achievement {
  title: string;
  org: string;
  year?: string;
  description: string;
  points?: string[];
}

const achievements: Achievement[] = [
  {
    title: "AI Trainer & Project Mentor",
    org: "Speaking & Mentorship",
    description: "Conducted AI sessions for students and professionals on practical tools, careers, and emerging skills.",
    points: [
      "Delivered an alumni session at EKC on building a career in the AI era.",
      "Mentored approximately 15 student projects through IEDC.",
    ],
  },
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

const ProjectCard = ({ project }: { project: Project }) => {
  const Icon = project.icon;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="hover-scale cursor-pointer opacity-0 animate-on-scroll group flex flex-col">
          <div className="relative overflow-hidden rounded-t-lg">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-48 flex items-center justify-center bg-gradient-to-br from-pulse-100 via-pulse-50 to-white">
                <Icon className="w-16 h-16 text-pulse-500 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
              </div>
            )}
            <div className="absolute top-4 right-4 flex gap-2">
              {project.status && (
                <Badge className="bg-gray-900/90 text-white">{project.status}</Badge>
              )}
              <Badge className="bg-pulse-500/90 text-white">{project.period}</Badge>
            </div>
          </div>
          <CardContent className="p-5 flex flex-col flex-1">
            <h3 className="font-semibold text-lg leading-tight mb-3">{project.title}</h3>
            <p className="text-sm text-gray-700 mb-4">{project.shortDescription}</p>
            <div className="flex flex-wrap gap-1 mb-4">
              {project.tech.slice(0, 3).map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
            <span className="mt-auto inline-flex items-center text-sm font-medium text-pulse-600 group-hover:text-pulse-700">
              View Case Study
              <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-4">
            {project.image ? (
              <img src={project.image} alt={project.title} className="w-20 h-20 object-cover rounded-lg" />
            ) : (
              <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center rounded-lg bg-pulse-100">
                <Icon className="w-10 h-10 text-pulse-500" strokeWidth={1.5} />
              </div>
            )}
            <div className="flex-1">
              <DialogTitle className="text-xl font-bold mb-2">{project.title}</DialogTitle>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {project.period}
                </div>
                {project.status && (
                  <Badge className="bg-gray-900 text-white">{project.status}</Badge>
                )}
                <div className="flex items-center gap-1">
                  <Code className="w-4 h-4" />
                  {project.tech.join(", ")}
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>
        <div className="space-y-4">
          <div className="prose max-w-none">
            <h3 className="text-lg font-semibold mb-3">Project Overview</h3>
            <p className="text-gray-700 mb-6">{project.shortDescription}</p>

            <h3 className="text-lg font-semibold mb-3">What I Built</h3>
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
              {project.tech.map((tech) => (
                <Badge key={tech} className="bg-pulse-50 text-pulse-700 border-pulse-200">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Portfolio = () => {
  const [showAllProjects, setShowAllProjects] = useState(false);

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
    const elements = document.querySelectorAll(".animate-on-scroll:not(.animate-fade-in)");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [showAllProjects]);

  useEffect(() => {
    document.title = "Ikhlas PV | Portfolio";
  }, []);

  const visibleProjects = showAllProjects ? projects : projects.slice(0, FEATURED_COUNT);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="space-y-8">
        <PortfolioHero />

        {/* Projects Section */}
        <section id="projects" className="py-12 scroll-mt-20">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="pulse-chip mb-3 sm:mb-6 opacity-0 animate-on-scroll">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">02</span>
              <span>Projects</span>
            </div>
            <h2 className="section-title text-3xl sm:text-4xl leading-tight mb-4 opacity-0 animate-on-scroll">
              Featured Projects
            </h2>
            <p className="section-subtitle max-w-2xl mb-8 opacity-0 animate-on-scroll">
              Industrial AI, computer vision, and automation systems running in real factory and customer operations.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleProjects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>

            {projects.length > FEATURED_COUNT && (
              <div className="flex justify-center mt-8">
                <button
                  type="button"
                  onClick={() => setShowAllProjects((v) => !v)}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-900 px-6 py-3 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
                >
                  {showAllProjects ? "Show Fewer Projects" : `View All Projects (${projects.length})`}
                  {showAllProjects ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="py-8 scroll-mt-20">
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
                <Card key={exp.role + exp.org} className="opacity-0 animate-on-scroll">
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

        {/* Skills */}
        <section id="skills" className="py-12 scroll-mt-20">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="pulse-chip mb-3 sm:mb-6 opacity-0 animate-on-scroll">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">04</span>
              <span>Skills</span>
            </div>
            <h2 className="section-title text-3xl sm:text-4xl leading-tight mb-4 opacity-0 animate-on-scroll">
              Technical Skill Matrix
            </h2>
            <p className="section-subtitle max-w-2xl mb-8 opacity-0 animate-on-scroll">
              Hands-on strengths across computer vision, industrial automation, AI agents, and full-stack development.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {skills.map((s) => (
                <div
                  key={s}
                  className="rounded-xl border border-gray-200/70 bg-white/60 backdrop-blur-sm p-3 text-center text-sm font-medium hover-scale opacity-0 animate-on-scroll"
                >
                  {s}
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3 opacity-0 animate-on-scroll">
              <span className="text-sm font-semibold text-gray-700">Currently evaluating:</span>
              {exploringSkills.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-dashed border-pulse-300 bg-pulse-50 px-3 py-1 text-sm text-pulse-700"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-12 bg-gray-50/50">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="pulse-chip mb-3 sm:mb-6 opacity-0 animate-on-scroll">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">05</span>
              <span>Education</span>
            </div>
            <h2 className="section-title text-3xl sm:text-4xl leading-tight mb-6 opacity-0 animate-on-scroll">
              Academic Background
            </h2>

            <Card className="max-w-4xl mx-auto opacity-0 animate-on-scroll">
              <CardContent className="p-8">
                <div className="flex flex-col">
                  <h3 className="text-2xl font-semibold mb-2">{education.degree}</h3>
                  <p className="text-pulse-700 text-lg mb-2">{education.institution}</p>
                  <p className="text-gray-600 mb-4">{education.location} • {education.period}</p>
                  <div className="mb-6">
                    <span className="inline-block bg-pulse-100 text-pulse-800 px-3 py-1 rounded-full text-sm font-medium">
                      CGPA: {education.cgpa}
                    </span>
                  </div>
                </div>
                <div className="pt-6 border-t border-gray-200">
                  <h4 className="font-semibold mb-2">Final Year Project</h4>
                  <p className="text-gray-700">{education.finalProject}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="py-12">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="pulse-chip mb-3 sm:mb-6 opacity-0 animate-on-scroll">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">06</span>
              <span>Certifications</span>
            </div>
            <h2 className="section-title text-3xl sm:text-4xl leading-tight mb-4 opacity-0 animate-on-scroll">
              Professional Certifications
            </h2>
            <p className="section-subtitle max-w-2xl mb-8 opacity-0 animate-on-scroll">
              Continuous learning and professional development in AI, machine learning, and software engineering.
            </p>

            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {certifications.map((cert, index) => (
                <Card key={index} className="opacity-0 animate-on-scroll hover-scale">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-pulse-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="font-medium text-gray-900">{cert}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Speaking, Achievements & Leadership Section */}
        <section id="achievements" className="py-12 bg-gray-50/50">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="pulse-chip mb-3 sm:mb-6 opacity-0 animate-on-scroll">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">07</span>
              <span>Achievements</span>
            </div>
            <h2 className="section-title text-3xl sm:text-4xl leading-tight mb-4 opacity-0 animate-on-scroll">
              Speaking, Awards & Leadership
            </h2>
            <p className="section-subtitle max-w-2xl mb-8 opacity-0 animate-on-scroll">
              AI training, mentorship, and recognition for technical work and leadership.
            </p>

            <div className="grid gap-6 max-w-4xl mx-auto">
              {achievements.map((achievement) => (
                <Card key={achievement.title} className="opacity-0 animate-on-scroll hover-scale">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
                        <p className="text-pulse-700 mb-2">{achievement.org}</p>
                        <p className="text-gray-700">{achievement.description}</p>
                        {achievement.points && (
                          <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-700">
                            {achievement.points.map((p) => (
                              <li key={p}>{p}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                      {achievement.year && (
                        <div className="flex-shrink-0">
                          <span className="inline-block bg-pulse-100 text-pulse-800 px-3 py-1 rounded-full text-sm font-medium">
                            {achievement.year}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
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
