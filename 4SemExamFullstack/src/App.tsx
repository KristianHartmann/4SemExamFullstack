import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

function App() {
  return (
    <div className="bg-primary w-screen h-full overflow-hidden">
      <div className="sm:px-16 px-6 flex justify-center items-center">
        <div className="xl:max-w-[1280px] w-full">
          <Navbar />
        </div>
      </div>

      <div className="bg-secondary flex justify-center">
        <Hero />
      </div>

      <div className="bg-primary flex justify-center items-start sm:px-16 px-6">
        <div className="xl:max-w-[1280px] w-full">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
