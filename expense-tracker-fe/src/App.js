import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import AddExpensesPage from './Components/AddExpensesPage';
import ProtectedRoute from './Components/ProtectedRoute';



function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <AddExpensesPage />
            </ProtectedRoute>
          }
        />
        </Routes>
      </Router>
  );
}

export default App;
