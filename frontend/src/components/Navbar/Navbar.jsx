import React from 'react'

const Navbar = () => {
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 mt-4">
      <div className="px-8 py-4 rounded-full border border-white/20 backdrop-blur-md bg-black/30">
        <ul className="flex items-center space-x-8">
          <li>
            <a href="#home" className="text-white/80 hover:text-white transition-colors duration-300">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="text-white/80 hover:text-white transition-colors duration-300">
              About
            </a>
          </li>
          <li>
            <a href="#projects" className="text-white/80 hover:text-white transition-colors duration-300">
              Projects
            </a>
          </li>
          <li>
            <a href="#contact" className="text-white/80 hover:text-white transition-colors duration-300">
              Contact
              I am a passionate Software Engineering student and Junior Frontend
                        Developer with a keen interest in creating beautiful, functional,
                        and user-friendly web applications. I am always eager to learn new technologies and improve my skills.
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar