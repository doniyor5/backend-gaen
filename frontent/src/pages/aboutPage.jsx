import React, { useEffect } from "react";
import Image1 from "../assets/img/Image1.png";
import Image2 from "../assets/img/Image2.png";
import Image3 from "../assets/img/Image3.png";
import Image4 from "../assets/img/Image4.png";
import AboutCard from "../components/cards/aboutCard";
import Footer from "../components/footer/footer";
import Navbar from "../components/navbar/navbar";

export default function MainPage() {
  return (
    <div className="main-container">
      <Navbar />
      <div className="mt-10 mb-32 md:mb-60">
        <div
          data-aos="fade-up"
          className="md:flex items-center gap-4 about_page_images"
        >
          <div>
            <img className="w-full" src={Image1} alt="" />
          </div>
          <div className="flex flex-col gap-6 mt-5 md:mt-0">
            <img className="mb-0" src={Image2} alt="" />
            <img src={Image3} alt="" />
          </div>
          <div className="mt-5 md:mt-0">
            <img className="w-full" src={Image4} alt="" />
          </div>
        </div>

        <div data-aos="fade-up" className="mt-12 px-7 md:px-24 text-white">
          <h2 className="text-2xl md:text-3xl font-[400]">Mission: </h2>
          <p className="text-xl md:text-2xl font-[400] mt-3">
            The Global Arts Education Network (GAEN) is dedicated to fostering a
            global community where artists, educators, and students come
            together to share knowledge, experiences, and creativity. Our
            mission is to bridge cultural gaps and promote artistic exchange
            across borders, empowering individuals through access to a diverse
            range of artistic perspectives and practices. By leveraging the
            power of digital connectivity, GAEN aims to provide a platform that
            nurtures creativity, facilitates collaboration, and supports the
            continuous development of artistic talents worldwide.
          </p>
        </div>

        <div>
          <h1
            data-aos="fade-down"
            className="text-center text-4xl text-white mt-10 mb-4"
          >
            Objectives
          </h1>
          <AboutCard />
        </div>
      </div>
      <Footer />
    </div>
  );
}
