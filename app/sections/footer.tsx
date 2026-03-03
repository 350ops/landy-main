import { DynamicIcon } from "lucide-react/dynamic";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                <span className="text-white dark:text-black font-bold text-lg">G</span>
              </div>
              <span className="text-xl font-bold text-zinc-900 dark:text-white">GrowInsta</span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm">
              Affordable, organic Instagram growth. Real followers, real results, guaranteed.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {["twitter", "instagram", "linkedin"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full flex items-center justify-center  transition-colors"
                  aria-label={social}
                >
                  <DynamicIcon name={social as any} className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
              Product
            </h3>
            <ul className="space-y-3">
              {["Features", "Pricing", "How It Works", "Results"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-zinc-600 dark:text-zinc-400  transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-3">
              {["About Us", "Blog", "Careers", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-zinc-600 dark:text-zinc-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
              Support
            </h3>
            <ul className="space-y-3">
              {["Help Center", "Contact Us", "FAQ", "Terms of Service"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-zinc-600 dark:text-zinc-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            &copy; {currentYear} GrowInsta. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link
              href="/privacy-policy"
              className="text-zinc-600 dark:text-zinc-400 hover:text-lime-500 dark:hover:text-lime-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-zinc-600 dark:text-zinc-400 hover:text-lime-500 dark:hover:text-lime-400 transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
