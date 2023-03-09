import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import styles from "./style";
import Hero from "./components/Hero";

function App() {
  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}}`}>
          <Hero />
        </div>
      </div>
      <div className={`bg-primary ${styles.flexStart} ${styles.paddingX}`}>
        <div className={`${styles.boxWidth}}`}>{/* <Footer /> */}</div>
      </div>
    </div>
  );
}

export default App;
