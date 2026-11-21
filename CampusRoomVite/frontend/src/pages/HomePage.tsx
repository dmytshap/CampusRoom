import NavBar from "../components/Navbar";
import MainSection from "../components/FirstPage";
import "../styles/HomePage.css";

function HomePage() {
  return (
    <>
      <div className="main">
        <NavBar />
        <MainSection />
        <div className="endOfPage">
          <footer>
            <p>
              This is simple web page for our software engineering course
              project
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}


export default HomePage;