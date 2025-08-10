import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Mail, Phone, ExternalLink, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  updated_at: string;
  topics: string[];
}

interface GitHubUser {
  name: string;
  bio: string;
  avatar_url: string;
  location: string;
  company: string;
  blog: string;
  public_repos: number;
  followers: number;
  following: number;
}

const Portfolio = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchGitHubData();
  }, []);

  const fetchGitHubData = async () => {
    try {
      // Fetch user data
      const userResponse = await fetch('https://api.github.com/users/ikhlasx');
      const userData = await userResponse.json();
      setUser(userData);

      // Fetch repositories
      const reposResponse = await fetch('https://api.github.com/users/ikhlasx/repos?sort=updated&per_page=6');
      const reposData = await reposResponse.json();
      setRepos(reposData);
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch GitHub data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const skills = [
    { name: "Python", category: "ML & AI", icon: "🐍" },
    { name: "JavaScript", category: "Development", icon: "💻" },
    { name: "Java", category: "Development", icon: "☕" },
    { name: "TensorFlow", category: "ML & AI", icon: "🧠" },
    { name: "NLP", category: "ML & AI", icon: "📝" },
    { name: "Computer Vision", category: "ML & AI", icon: "👁️" },
    { name: "OpenCV", category: "ML & AI", icon: "📷" },
    { name: "Flask", category: "Development", icon: "🌶️" },
    { name: "Google Gemini", category: "ML & AI", icon: "💎" },
    { name: "Elasticsearch", category: "Development", icon: "🔍" },
    { name: "Figma", category: "Design", icon: "🎨" },
    { name: "UX Design", category: "Design", icon: "✨" }
  ];

  const projects = [
    {
      title: "Hospital Bystander Caller Web App",
      description: "A full-stack web application built with Flask to connect hospital patients with bystanders, featuring secure authentication and Twilio integration.",
      image: "/lovable-uploads/22d31f51-c174-40a7-bd95-00e4ad00eaf3.png",
      technologies: ["Flask", "Python", "Twilio", "Authentication"]
    },
    {
      title: "Real-Time Object Defect Detection",
      description: "Microservice architecture for scalable product monitoring system with real-time data processing and MQTT integration.",
      image: "/lovable-uploads/5663820f-6c97-4492-9210-9eaa1a8dc415.png",
      technologies: ["YOLO", "OpenCV", "Python", "MQTT"]
    },
    {
      title: "AI Assistant for Trainee Teachers",
      description: "A modular application using MVC architecture and OOP principles with robust backend services for helping trainee teachers.",
      image: "/lovable-uploads/af412c03-21e4-4856-82ff-d1a975dc84a9.png",
      technologies: ["AI", "Python", "MVC", "Education"]
    }
  ];

  const experiences = [
    {
      title: "AI Engineer Trainee",
      company: "Elkitch Pvt Ltd",
      location: "Mysore, India",
      period: "Aug 2024 - Feb 2025",
      achievements: [
        "Developed full-stack web applications using Python frameworks (Django, Flask)",
        "Implemented REST APIs for front-end and back-end integration",
        "Built automated testing suites that reduced bug detection time by 40%",
        "Engineered product detection system using YOLO with 94% accuracy"
      ]
    },
    {
      title: "Data Science Intern",
      company: "Dataspark",
      location: "Calicut, India",
      period: "Sep 2023 - Oct 2023",
      achievements: [
        "Developed ETL pipelines for efficient data processing using Python",
        "Created RESTful APIs to integrate ML models with web applications",
        "Contributed to codebase improvements through code reviews",
        "Streamlined data processing workflows, improving efficiency by 60%"
      ]
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for your message. I'll get back to you soon.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="text-cyan-400 text-sm uppercase tracking-wider mb-4">
            NEURAL SYSTEM ACTIVATED
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            IKHLAS PV
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-300 mb-6">
            AI Engineer & Full-Stack Developer
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            Welcome to my interactive portfolio. As a software engineer with expertise in artificial intelligence, 
            I build intelligent systems that combine cutting-edge AI models with intuitive user experiences.
          </p>
        </motion.div>

        {/* Skill Icons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          {["🤖 AI", "🧠 ML", "💻 Dev", "✨ UX", "📊 Data", "☁️ Cloud"].map((skill, index) => (
            <motion.div
              key={skill}
              whileHover={{ scale: 1.1 }}
              className="bg-slate-800/50 border border-cyan-400/30 rounded-lg px-4 py-3 backdrop-blur-sm"
            >
              <span className="text-sm">{skill}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white">
            <Download className="mr-2 h-4 w-4" />
            Download CV
          </Button>
          <Button size="lg" variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900">
            <Mail className="mr-2 h-4 w-4" />
            Contact Me
          </Button>
        </motion.div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Currently seeking Summer 2025 internship opportunities in AI & Data Engineering
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-4">SKILL MATRIX</h2>
          <p className="text-gray-400 text-center mb-12">
            A comprehensive overview of my technical capabilities and expertise across multiple domains
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center backdrop-blur-sm hover:border-cyan-400/50 transition-all"
              >
                <div className="text-2xl mb-2">{skill.icon}</div>
                <h3 className="font-semibold text-white">{skill.name}</h3>
                <p className="text-xs text-gray-400 mt-1">{skill.category}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-12">FEATURED PROJECTS</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-slate-800/50 border-slate-700 hover:border-cyan-400/50 transition-all group">
                  <CardHeader className="p-0">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                    />
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="text-white mb-3">{project.title}</CardTitle>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="bg-cyan-400/20 text-cyan-400">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900">
              <Github className="mr-2 h-4 w-4" />
              View More on GitHub
            </Button>
          </div>
        </motion.div>
      </section>

      {/* GitHub Repositories */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-12">GITHUB REPOSITORIES</h2>
          
          {loading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400 mx-auto"></div>
              <p className="mt-4 text-gray-400">Loading repositories...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.map((repo, index) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-slate-800/50 border-slate-700 hover:border-cyan-400/50 transition-all h-full">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-white truncate">{repo.name}</h3>
                        <a 
                          href={repo.html_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {repo.description || "No description available"}
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                          {repo.language && (
                            <Badge variant="outline" className="border-gray-600 text-gray-400">
                              {repo.language}
                            </Badge>
                          )}
                          <span>⭐ {repo.stargazers_count}</span>
                        </div>
                        <span>{new Date(repo.updated_at).toLocaleDateString()}</span>
                      </div>
                      {repo.topics.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {repo.topics.slice(0, 3).map((topic) => (
                            <Badge key={topic} variant="secondary" className="bg-cyan-400/20 text-cyan-400 text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </section>

      {/* Experience Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-12">PROFESSIONAL EXPERIENCE</h2>
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                        <p className="text-cyan-400">{exp.company} • {exp.location}</p>
                      </div>
                      <div className="flex items-center text-gray-400 mt-2 md:mt-0">
                        <Calendar className="h-4 w-4 mr-2" />
                        {exp.period}
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-gray-300 flex">
                          <span className="text-cyan-400 mr-2">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-4">CONTACT ME</h2>
          <p className="text-gray-400 text-center mb-12">
            Have a question or want to work together?
          </p>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              
              <div className="flex items-center space-x-4">
                <Mail className="h-5 w-5 text-cyan-400" />
                <div>
                  <p className="text-gray-400">Email</p>
                  <a href="mailto:ikhlas110@gmail.com" className="text-white hover:text-cyan-400">
                    ikhlas110@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Phone className="h-5 w-5 text-cyan-400" />
                <div>
                  <p className="text-gray-400">Phone</p>
                  <a href="tel:+918129624615" className="text-white hover:text-cyan-400">
                    +91 8129624615
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Github className="h-5 w-5 text-cyan-400" />
                <div>
                  <p className="text-gray-400">GitHub</p>
                  <a href="https://github.com/ikhlasx" target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan-400">
                    github.com/ikhlasx
                  </a>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-semibold mb-2">Working Hours</h4>
                <p className="text-gray-400">Monday - Friday: 9am - 6pm</p>
              </div>
            </div>
            
            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-2xl font-semibold mb-6">Send Me a Message</h3>
              
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-400"
              />
              
              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-400"
              />
              
              <Input
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
                className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-400"
              />
              
              <Textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-400"
              />
              
              <Button type="submit" size="lg" className="w-full bg-cyan-500 hover:bg-cyan-600">
                Send Message
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Portfolio;