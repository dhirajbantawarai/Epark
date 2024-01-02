import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Contact } from "./components/Contact";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Aboutus } from "./components/Aboutus";
import { Parking } from "./components/Parking";
import { Signup } from "./components/Signup";
function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />}/>
          <Route path="/parking" element={<Parking />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/footer" element={<Footer />}/>
          <Route path="/aboutus" element={<Aboutus />}/>
          <Route path="/signup" element={<Signup />}/>
        </Routes>
      </Router>
      <Footer/>
    </> 
  );
}
export default App;
