// Hero banner section
// this is dumb component

import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroBanner({
  title = "Discover Amazing Movies",
  description = "Explore our collection of the best movies from around the world.",
}) {
  return (
    <section id="overview" className="relative overflow-hidden min-h-[91vh]">
      <div className="absolute inset-0 z-0">
        <div className="bg-linear-to-r absolute inset-0 z-10 from-black/70 via-black/50 to-black/70"></div>
        <div className="absolute inset-0 bg-[url('/images/hero-1.jpg')] bg-cover bg-center opacity-60 dark:opacity-40"></div>
      </div>
      <div className="container relative z-20 px-4 py-45 w-200 ">
       {/* <div className="flex flex-col relative z-20 px-4 py-40"> */}
        <h1 className="text-white text-7xl tracking-tight font-bold text-center py-5 sm:text-5xl md:text-6xl lg:text-7xl">
          {title}
        </h1>
        <p className="text-white/70 text-center text-xl mb-10">
          {description}
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button size="lg">
            <Play /> Browse Movies
          </Button>
          <Button
            size="lg"
            className=" bg-primary/10 backdrop-blur-sm border border-primary/50  hover:bg-primary/40"
          >
            Latest Releases
          </Button>
        </div>
      </div>
    </section>
  );
}
