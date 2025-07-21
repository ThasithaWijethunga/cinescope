import Footer from "@/components/footer";
import HeaderNav from "@/components/header-nav"; // the way this has been import is called Alias import
import FeaturedMovies from "@/components/home/featured-movies";
import HeroBanner from "@/components/home/hero-banner";

// export const revalidate = 3600;  //Invalidate every hour

//SSR - Server side Rendered - Server Component
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen ">
      <HeaderNav />
      <main className="flex-1">
        <HeroBanner />
        <FeaturedMovies />
      </main>
      {/* <footer className="bg-amber-400 h-72">this is footer</footer> */}
      <Footer/>
    </div>
  );
}
