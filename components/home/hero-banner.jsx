export default function HeroBanner() {
  return (
    <section id="overview" className="relative overflow-hidden min-h-[70vh]">
      <div className="absolute inset-0 z-0">
        <div className="bg-linear-to-r absolute inset-0 z-10 from-black/70 via-black/50 to-black/70"></div>
        <div className="absolute inset-0 bg-[url('/images/hero-1.jpg')] bg-cover bg-center opacity-60 dark:opacity-40"></div>
      </div>
    </section>
  );
}
