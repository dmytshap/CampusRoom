import { Routes, Route } from "react-router-dom";

import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import BookRoomPage from "./BookRoomPage";
import NotFoundPage from "./NotFoundPage";
import RegisterPage from "./RegisterPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route path="/homepage" element={<HomePage />} />

      <Route path="/book" element={<BookRoomPage />} />

      <Route path="/register" element={<RegisterPage />} />
      {/* if user tries to go on page that does not exist they will be redicted to login page */}
      <Route path="/notfoundpage" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
