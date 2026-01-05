import React, { useEffect } from "react";
import Lenis from "lenis";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Shared/Navbar";
import Footer from "./components/Shared/Footer";
import Projectdetail from "./pages/Projectdetail";
import AllProjects from "./pages/AllProjects";
import { useDispatch } from 'react-redux';
import { fetchProjects } from './store/slices/projectSlice';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  
  // Check if we're on a project detail page
  const isProjectDetailPage = location.pathname.startsWith('/project/');
  
  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <>
      {!isProjectDetailPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/projects" element={<AllProjects />} />
        <Route path="/project/:slug" element={<Projectdetail />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
