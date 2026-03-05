"use client";
import { DynamicIcon } from "lucide-react/dynamic";
import Image from "next/image";
import * as motion from "motion/react-client"
import { cubicBezier } from "motion/react";
export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Fashion Blogger",
      company: "@sarahstyles",
      image: "/img/user-1.jpg",
      content:
        "I went from 800 to 2,500 followers in just two weeks. The followers are real people who actually engage with my posts. Incredible service!",
      rating: 5,
    },
    {
      name: "Marcus Rivera",
      role: "Small Business Owner",
      company: "@riveras_bakery",
      image: "/img/user-2.jpg",
      content:
        "As a local bakery, Instagram presence matters. Reach974 helped us reach more customers in our area. Our orders have doubled since growing our following.",
      rating: 5,
    },
    {
      name: "Emma Chen",
      role: "Content Creator",
      company: "@emmacreates",
      image: "/img/user-3.jpg",
      content:
        "Super easy to use — I literally just typed my handle, picked my followers, and paid. The delivery was smooth and my engagement rate actually went up.",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div

        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.35, delay: 0, ease: cubicBezier(0.4, 0, 0.2, 1) }}
        className="text-center mb-16 space-y-3">
          <div className="inline-block px-4 py-1.5 bg-highlight rounded-full">
            <span className="text-xs uppercase font-bold text-black">Results</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white">
            Real people, real growth
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            See what our customers have to say about their Instagram growth
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div

        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{
          duration: 0.35,
          delay: 0.1,
          ease: cubicBezier(0.4, 0, 0.2, 1)
        }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white flex flex-col dark:bg-black rounded-3xl p-8 space-y-6 hover:shadow-xl dark:hover:shadow-lime-400/5 transition-shadow"
            >
              {/* Rating Stars */}
              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <DynamicIcon key={i} name="star" className="w-5 h-5 text-transparent fill-black dark:fill-white" />
                ))}
              </div>

              {/* Content */}
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800 mt-auto">
                <div className="w-12 h-12 bg-lime-400 rounded-full flex items-center justify-center text-2xl">
                  <Image className="size-full object-cover rounded-full" src={testimonial.image} alt={testimonial.name} width={48} height={48} />
                </div>
                <div>
                  <div className="font-semibold text-zinc-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-500">
                    {testimonial.role} · {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
