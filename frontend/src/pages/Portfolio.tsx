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
  "Python", "JavaScript", "Java", "TensorFlow", "NLP", "Computer Vision", "OpenCV", "Flask", "Google Gemini", "Elasticsearch", "Figma", "UX Design"
];

const experiences = [
  {
    role: "AI Engineer Trainee",
    org: "Elkitch Pvt Ltd • Mysore, India",
    period: "Aug 2024 - Feb 2025",
    points: [
      "Built full‑stack apps using Django/Flask",
      "Implemented REST APIs for FE/BE integration",
      "Automated testing to reduce bug detection time by 40%",
      "Engineered YOLO product detection with 94% accuracy",
    ],
  },
  {
    role: "Data Science Intern",
    org: "Dataspark • Calicut, India",
    period: "Sep 2023 - Oct 2023",
    points: [
      "Developed ETL pipelines for efficient data processing",
      "Created RESTful APIs to integrate ML models",
      "Improved workflows and contributed via code reviews",
    ],
  },
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
