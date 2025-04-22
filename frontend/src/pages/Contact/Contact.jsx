import React from 'react';
import { BsInstagram } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-5xl text-white p-16 flex flex-col md:flex-row gap-16 bg-black/20 backdrop-blur-sm rounded-xl mx-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Enter your Name"
            className="w-full mb-8 p-3 bg-transparent border-b border-gray-400 placeholder-gray-400 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Enter a valid email address"
            className="w-full mb-8 p-3 bg-transparent border-b border-gray-400 placeholder-gray-400 focus:outline-none"
          />
          <textarea
            placeholder="Enter your message"
            className="w-full mb-8 p-3 bg-transparent border-b border-gray-400 placeholder-gray-400 focus:outline-none"
            rows="4"
          />
          <button className="bg-cyan-400 text-black px-8 py-3 font-semibold hover:bg-cyan-500 transition rounded-md">
            SUBMIT
          </button>
        </div>

        {/* Contact Info Section */}
        <div className="flex-1 space-y-6">
          <h4 className="uppercase text-sm text-gray-300">Join our newsletter</h4>
          <h2 className="text-2xl text-cyan-400 font-semibold mb-4">Contact me</h2>
          <p className="mb-2">Mon – Fri: 9:00 am – 8:00 pm,</p>
          <p className="mb-4">Sat – Sun: 9:00 am – 10 pm</p>
          <p className="mb-6 text-cyan-400">
            <a href="mailto:antonynugroho467@gmail.com">antonynugroho467@gmail.com</a>
          </p>

          <h3 className="text-xl font-semibold mb-5">Follow me</h3>
          <div className="flex gap-4 text-cyan-400 text-2xl ">
            <a href="#"><BsInstagram /></a>
            <a href="#"><FaDiscord/></a>
            <a href="#"><FaTiktok/></a>
            <a href="#"><FaLinkedin/></a>
          </div>

          <p className="text-sm text-gray-400 mt-6">©2021 Privacy policy</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
