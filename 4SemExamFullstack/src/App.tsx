import "./styles/App.css";
import AppHeader, { AppHeaderProps } from "./components/AppHeader";
import Footer from "./components/Footer";

// build an instance of our AppHeaderProps to pass to the AppHeader component
const headerProps: AppHeaderProps = {
  title: "Cooking with Monkeys",
};

function App() {
  return (
    <div className="App">
      <AppHeader title={headerProps.title} />
      <Footer />
    </div>
  );
}

export default App;
