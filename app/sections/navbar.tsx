"use client";

import { ThemeToggle } from "../components/theme-toggle";

export function Navbar() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-100/80 dark:bg-zinc-900/80 backdrop-blur-md ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div onClick={() => scrollToSection("hero")} className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
              <span className="text-white dark:text-black font-bold text-lg">R</span>
            </div>
            <span className="text-xl font-bold text-zinc-900 dark:text-white">Reach974</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            <button
              onClick={() => scrollToSection("features")}
              className="text-zinc-600 cursor-pointer dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-zinc-600 cursor-pointer dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-zinc-600 cursor-pointer dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Results
            </button>

            <button
              onClick={() => scrollToSection("faq")}
              className="text-zinc-600 cursor-pointer dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              FAQ
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button onClick={() => scrollToSection("hero")} className="px-4 cursor-pointer py-2 text-xs bg-black dark:bg-white text-white dark:text-black rounded-xl font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors">
              Get Followers
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
