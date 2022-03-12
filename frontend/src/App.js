import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from "./components/SignUp";
import Dashboard from "./components/dashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:id" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
