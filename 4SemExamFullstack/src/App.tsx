import "./styles/App.css";
import AppHeader, { AppHeaderProps } from "./components/AppHeader";

// build an instance of our AppHeaderProps to pass to the AppHeader component
const headerProps: AppHeaderProps = {
  title: "Cooking with Monkeys",
};

function App() {
  return (
    <div className="App">
      <AppHeader title={headerProps.title} />
    </div>
  );
}

export default App;
