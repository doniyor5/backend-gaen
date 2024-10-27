import React from "react";
import SearchImage from "../assets/img/search.png";
import FilterSvg from "../assets/img/tune.svg";
import DarkButton from "../components/buttons/darkButton";
import NavbarButton from "../components/buttons/navbarButton";
import MainPageCard from "../components/cards/mainPageCard";
import Footer from "../components/footer/footer";
import Navbar from "../components/navbar/navbar";

export default function MainPage2() {
  return (
    <>
      <div className="mb-20">
        <div className="main-container">
          <Navbar />
          <div className="mt-10">
            <div
              data-aos="fade-down"
              className="flex bg-[#D9D9D9] items-center rounded-2xl px-1.5 justify-between mb-5"
            >
              <div className="flex items-center w-[50%] md:w-[80%] pl-3 md:pl-5">
                <img className="mr-1" src={SearchImage} alt="" />
                <input
                  className="w-full  p-3.5  bg-transparent outline-none text-[#181818]"
                  type="text"
                  placeholder="Artist’s name"
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-white py-3 px-5 rounded-xl cursor-pointer">
                  <img className="w-5 h-5" src={FilterSvg} alt="" />
                </div>
                <DarkButton buttonText={"Search"} />
              </div>
            </div>
            <MainPageCard />
          </div>
          <div data-aos="fade-up" className="flex justify-center mt-6">
            <NavbarButton buttonText={"See more artworks"} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
