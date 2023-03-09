import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Content from "./components/Content";

function App() {
  return (
    <div className="flex flex-col w-screen h-screen bg-background">
      <Navbar />
      <Hero />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
