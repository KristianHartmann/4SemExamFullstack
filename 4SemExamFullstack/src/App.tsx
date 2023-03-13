import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomePageContent from "./components/HomepageContent";
import SearchRecipes from "./components/SearchRecipes";

function App() {
  return (
    <div className="flex flex-col w-screen h-screen ">
      <Navbar />
      <HomePageContent />
      <SearchRecipes />

      <Footer />
    </div>
  );
}

export default App;
