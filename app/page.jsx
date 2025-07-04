import HeaderNav from "@/components/header-nav";  //Alias import

//SSR - Server side Rendered - Server Component 
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen ">
      
      <HeaderNav />
      <main className="bg-primary h-screen">
        main section
      </main>
      <footer className="bg-amber-400 h-72">
        this is footer
      </footer>
    </div>
  );
}
