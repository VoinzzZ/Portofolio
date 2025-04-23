import React from 'react';
import Squares from './components/Background/Squares.jsx';
// import Navbar from './components/Navbar/Navbar.jsx';
import Dock from './components/Navbar/Dock/Dock.jsx';
import Home from './pages/Home/Home.jsx';
import ClickSpark from './components/Animation/ClickSpark/ClickSpark.jsx';
import { IoHomeOutline } from "react-icons/io5";
import { GoProjectSymlink } from "react-icons/go";
import { IoIosContact } from "react-icons/io";
import { BsTelephonePlus } from "react-icons/bs";
import About from './pages/About/About .jsx';
import Projects from './pages/Projects/Projects.jsx';
import Contact from './pages/Contact/Contact.jsx';
import { SpeedInsights } from '@vercel/speed-insights/react';

const App = () => {
  const items = [
    { icon: <IoHomeOutline size={18} color="white" />, label: 'Home', onClick: () => document.getElementById('home').scrollIntoView({ behavior: 'smooth' }) },
    { icon: <IoIosContact size={18} color="white" />, label: 'About', onClick: () => document.getElementById('about').scrollIntoView({ behavior: 'smooth' }) },
    { icon: <GoProjectSymlink size={18} color="white" />, label: 'Poject', onClick: () => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' }) },
    { icon: <BsTelephonePlus size={18} color="white" />, label: 'Contact', onClick: () => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }) },
  ];

  return (
    <div className="relative w-full min-h-screen bg-black">
      <SpeedInsights />
      <ClickSpark
        sparkColor="#fff"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        {/* Background squares */}
        <div className="fixed inset-0">
          <Squares
            speed={0.5}
            squareSize={40}
            direction="diagonal"
            borderColor="rgba(255, 255, 255, 0.1)"
            hoverFillColor="rgba(255, 255, 255, 0.1)"
          />
        </div>

        {/* Navigation */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 mt-15 ml-33">
          <Dock
            className="dock-entrance"
            items={items}
            panelHeight={68}
            baseItemSize={50}
            magnification={70}
          />
        </div>

        {/* Main content */}
        <main className="relative z-10">
          <section id="home" className="h-screen w-full">
            <Home />
          </section>

          <section id="about" className="min-h-screen w-full">
            <About />
          </section>

          <section id="projects" className='min-h-screen w-full'>
            <Projects />
          </section>

          <section id="contact" className='min-h-screen w-full'>
            <Contact />
          </section>
        </main>
      </ClickSpark>
    </div>
  );
};

export default App;
