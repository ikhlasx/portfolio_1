import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-16 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Contact</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              Name
            </label>
            <Input id="name" placeholder="Your name" />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email
            </label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div>
            <label htmlFor="message" className="block mb-2 text-sm font-medium">
              What you need
            </label>
            <Textarea id="message" placeholder="Tell me what you need" />
          </div>
          <Button type="submit" className="w-full">
            Send
          </Button>
        </form>

        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold mb-4">
            Other ways to connect
          </h2>
          <div className="flex justify-center gap-4">
            <Button asChild variant="outline">
              <a
                href="https://www.linkedin.com/in/ikhlas-pv"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="mailto:pvikhlas@gmail.com">Email</a>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;

