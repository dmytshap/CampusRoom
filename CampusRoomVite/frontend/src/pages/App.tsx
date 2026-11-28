import { Routes, Route } from "react-router-dom";

import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import BookRoomPage from "./BookRoomPage";
import NotFoundPage from "./NotFoundPage";
import RegisterPage from "./RegisterPage";
import ProtectedRoute from "../components/ProtectedRoute";

function App() {
  return (
    <Routes>
      // Pages that are available public: // 1. Login page
      <Route path="/" element={<LoginPage />} />
      // 2. Register page
      <Route path="/register" element={<RegisterPage />} />
      // 3. Not Found page
      {/* if user tries to go on page that does not exist they will be redicted to login page */}
      <Route path="/notfoundpage" element={<NotFoundPage />} />
      {/* ProtectedRoute */}
      <Route element={<ProtectedRoute />}>
        <Route path="/homepage" element={<HomePage />} />

        <Route path="/book" element={<BookRoomPage />} />
      </Route>
    </Routes>
  );
}

export default App;
