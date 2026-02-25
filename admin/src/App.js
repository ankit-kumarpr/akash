import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import AddBlog from "./pages/AddBlog";
import BlogList from "./pages/BlogList";
import EditBlog from "./pages/EditBlog";
import AddPortfolio from "./pages/AddPortfolio";
import PortfolioList from "./pages/PortfolioList";
import EditPortfolio from "./pages/EditPortfolio";
import CareerList from "./pages/Career/CareerList";
import CareerForm from "./pages/Career/CareerForm";
import ContactForm from "./pages/ContactForm/ContactForm";
import ContactList from "./pages/ContactForm/ContactList";
import Navbar from "./components/Navbar";
import TeamForm from "./pages/team/TeamFrom";
import TeamList from "./pages/team/TeamList";

function AppLayout() {
  const location = useLocation();

  // hide navbar on login page
  const hideNavbar = location.pathname === "/";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

        <Route path="/add-blog" element={<PrivateRoute><AddBlog /></PrivateRoute>} />
        <Route path="/blogs" element={<PrivateRoute><BlogList /></PrivateRoute>} />
        <Route path="/edit-blog/:id" element={<PrivateRoute><EditBlog /></PrivateRoute>} />

        <Route path="/add-portfolio" element={<PrivateRoute><AddPortfolio /></PrivateRoute>} />
        <Route path="/portfolio" element={<PrivateRoute><PortfolioList /></PrivateRoute>} />
        <Route path="/edit-portfolio/:id" element={<PrivateRoute><EditPortfolio /></PrivateRoute>} />

        <Route path="/career-list" element={<PrivateRoute><CareerList /></PrivateRoute>} />
        <Route path="/career-form" element={<PrivateRoute><CareerForm /></PrivateRoute>} />
        <Route path="/career-form/:id" element={<PrivateRoute><CareerForm /></PrivateRoute>} />

        <Route path="/contact" element={<ContactForm />} />
        <Route path="/admin-contacts" element={<PrivateRoute><ContactList /></PrivateRoute>} />


        <Route path="/team-form" element={<TeamForm />} />
        <Route path="/team-form/:id" element={<TeamForm />} />
        <Route path="/team-list" element={<TeamList />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
