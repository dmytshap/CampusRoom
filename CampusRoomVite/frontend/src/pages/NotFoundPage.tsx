import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main>
      <h1>404 – Page not found</h1>
      <p>The page you are looking for doesn't exist.</p>

      <Link to="/login">Go back to login</Link>
    </main>
  );
}

export default NotFoundPage;
