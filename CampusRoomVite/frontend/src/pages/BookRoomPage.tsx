import NavBar from "../components/Navbar";
import MainSection from "../components/FirstPage";
import "../styles/HomePage.css";

function BookRoomPage() {
  return (
    <>
      <div className="main">
        <NavBar />
        <MainSection />
        <div className="endOfPage">
          <footer>
            <p>Here you can book room</p>
          </footer>
        </div>
      </div>
    </>
  );
}

export default BookRoomPage;
