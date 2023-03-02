import "./styles/App.css";
import AppHeader, { AppHeaderProps } from "./components/AppHeader";
import Footer from "./components/Footer";
import Homepage from "./components/Homepage";

// build an instance of our AppHeaderProps to pass to the AppHeader component
const headerProps: AppHeaderProps = {
  title: "Cooking with Monkeys",
};

function App() {
  return (
    <div className="App">
      <AppHeader title={headerProps.title} />
      <Homepage />
      <div className="content"></div>
      <Footer />
    </div>
  );
}

export default App;
