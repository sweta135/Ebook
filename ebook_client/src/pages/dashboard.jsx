import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div id="adminDashboard">
      <h3>dashboard</h3>
      <Link to="./addBook">Add Book</Link>
      <Link to="./manageBooks">manage books</Link>
    </div>
  );
}
