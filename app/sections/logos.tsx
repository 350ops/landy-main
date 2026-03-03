import Image from "next/image";

export function Logos() {
    const logos = [
        { src: "/img/logo-1.svg", alt: "Trusted Brand 1" },
        { src: "/img/logo-2.svg", alt: "Trusted Brand 2" },
        { src: "/img/logo-3.svg", alt: "Trusted Brand 3" },
        { src: "/img/logo-4.svg", alt: "Trusted Brand 4" },
        { src: "/img/logo-5.svg", alt: "Trusted Brand 5" },
    ];

    return (
        <section id="logos" className="md:py-40 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <p className="text-center text-sm text-zinc-400 dark:text-zinc-600 mb-8 uppercase font-bold tracking-wider">Trusted by brands worldwide</p>
                <div className="grid grid-cols-2 md:grid-cols-5 justify-center items-center gap-y-20 gap-4 md:gap-8">
                    {logos.map((logo, index) => (
                        <div key={index} className="w-full flex items-center justify-center">
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                width={100}
                                height={100}
                                className="opacity-50 dark:invert hover:opacity-100 transition-opacity"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
