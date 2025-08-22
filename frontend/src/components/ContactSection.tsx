import React, { useState } from "react";
import { Mail, Linkedin, Send } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleEmailClick = () => {
    window.open('mailto:ikhlas110@gmail.com', '_blank');
  };

  const handleLinkedInClick = () => {
    window.open('https://www.linkedin.com/in/ikhlas-pv', '_blank');
  };

  return (
    <section id="details" className="py-12 bg-gray-50/50">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="pulse-chip mb-3 sm:mb-6 opacity-0 animate-on-scroll inline-block">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">08</span>
              <span>Contact</span>
            </div>
            <h2 className="section-title text-3xl sm:text-4xl leading-tight mb-4 opacity-0 animate-on-scroll">
              Let's Connect
            </h2>
            <p className="section-subtitle max-w-2xl mx-auto mb-8 opacity-0 animate-on-scroll">
              Ready to discuss opportunities or collaborate on exciting projects? Reach out through the form below or connect directly.
            </p>
          </div>

          {/* Contact Form and Buttons */}
          <div className="grid lg:grid-cols-2 gap-8 opacity-0 animate-on-scroll">
            {/* Contact Form */}
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-elegant bg-white">
              <div className="p-6 sm:p-8">
                <h3 className="text-2xl font-semibold mb-6 text-gray-900">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent transition-colors"
                      required
                    />
                  </div>
                  
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent transition-colors"
                      required
                    />
                  </div>
                  
                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your Message"
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent transition-colors resize-none"
                      required
                    />
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-pulse-500 hover:bg-pulse-600 text-white font-medium rounded-full transition-all duration-300 ease-out hover:scale-105 active:scale-95 hover:shadow-xl active:shadow-md flex items-center justify-center group"
                    >
                      Send Message
                      <Send className="ml-2 w-4 h-4 transition-all duration-300 ease-out group-hover:translate-x-2 group-hover:scale-110" />
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Direct Contact Options */}
            <div className="flex flex-col justify-center space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Direct Contact</h3>
                <p className="text-gray-600 mb-8">
                  Prefer direct contact? Connect with me through email or LinkedIn.
                </p>
              </div>

              {/* Center-aligned buttons */}
              <div className="flex flex-col items-center space-y-4">
                <button
                  onClick={handleEmailClick}
                  className="flex items-center justify-center px-8 py-4 bg-white border-2 border-pulse-500 text-pulse-500 hover:bg-pulse-500 hover:text-white font-medium rounded-full transition-all duration-300 ease-out hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl group w-full max-w-xs"
                >
                  <Mail className="mr-3 w-5 h-5 transition-all duration-300 ease-out group-hover:scale-110" />
                  Email Me
                </button>

                <button
                  onClick={handleLinkedInClick}
                  className="flex items-center justify-center px-8 py-4 bg-[#0077B5] hover:bg-[#005885] text-white font-medium rounded-full transition-all duration-300 ease-out hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl group w-full max-w-xs"
                >
                  <Linkedin className="mr-3 w-5 h-5 transition-all duration-300 ease-out group-hover:scale-110" />
                  LinkedIn
                </button>
              </div>

              {/* Contact Info */}
              <div className="text-center mt-8 p-6 bg-white rounded-2xl shadow-sm">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium text-gray-900">ikhlas110@gmail.com</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">LinkedIn</p>
                    <p className="font-medium text-gray-900">linkedin.com/in/ikhlas-pv</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;