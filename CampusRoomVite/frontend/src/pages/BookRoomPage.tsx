import NavBar from "../components/Navbar";

import BookingComponent from "../components/Booking";

import "../styles/HomePage.css";

function BookRoomPage() {
  return (
    <>
      <div className="main">
        <NavBar />
        <BookingComponent />
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
