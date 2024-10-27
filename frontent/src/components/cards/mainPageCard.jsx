import React from "react";
import { Link } from "react-router-dom";
import IdCard from "../../assets/img/id.png";
import Location from "../../assets/img/location.png";
import MainPageImage from "../../assets/img/mainPageImage.png";
import { useEffect } from "react";
import axios from "axios";

export default function MainPageCard() {
  const GetArts = async () => {
    try {
      const res = await axios.get(
        "https://2dbe-195-158-9-110.ngrok-free.app/api/v1/article/user/art/"
      );
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GetArts();
  }, []);
  const data = [
    {
      image: MainPageImage,
      title: "Amazing shows, events",
      icon: IdCard,
      name: "Soliyev Mironshoh",
      locationIcon: Location,
      location: "Uzbekistan, Tashkent",
      content:
        "Write an amazing description in this dedicated card section. Each word counts.",
    },
    {
      image: MainPageImage,
      title: "Amazing shows, events",
      icon: IdCard,
      name: "Soliyev Mironshoh",
      locationIcon: Location,
      location: "Uzbekistan, Tashkent",
      content:
        "Write an amazing description in this dedicated card section. Each word counts.",
    },
    {
      image: MainPageImage,
      title: "Amazing shows, events",
      icon: IdCard,
      name: "Soliyev Mironshoh",
      locationIcon: Location,
      location: "Uzbekistan, Tashkent",
      content:
        "Write an amazing description in this dedicated card section. Each word counts.",
    },
    {
      image: MainPageImage,
      title: "Amazing shows, events",
      icon: IdCard,
      name: "Soliyev Mironshoh",
      locationIcon: Location,
      location: "Uzbekistan, Tashkent",
      content:
        "Write an amazing description in this dedicated card section. Each word counts.",
    },
    {
      image: MainPageImage,
      title: "Amazing shows, events",
      icon: IdCard,
      name: "Soliyev Mironshoh",
      locationIcon: Location,
      location: "Uzbekistan, Tashkent",
      content:
        "Write an amazing description in this dedicated card section. Each word counts.",
    },
    {
      image: MainPageImage,
      title: "Amazing shows, events",
      icon: IdCard,
      name: "Soliyev Mironshoh",
      locationIcon: Location,
      location: "Uzbekistan, Tashkent",
      content:
        "Write an amazing description in this dedicated card section. Each word counts.",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
      {data.map((d, i) => (
        <div
          data-aos="fade-up"
          key={i}
          className="md:w1/3 bg-white p-3 rounded-xl"
        >
          <img className="w-full" src={d.image} alt={d.title} />
          <div className="py-3 px-4">
            <h3 className="text-[#16192C] text-[16px] font-[600]">{d.title}</h3>

            <div className="flex gap-1 items-center my-3">
              <img className="w-4" src={d.icon} alt={d.title} />
              <p className="text-[#4D4D4D] font-[600] text-[12px]">{d.name}</p>
            </div>
            <div className="flex gap-1 items-center">
              <img className="w-3.5" src={d.locationIcon} alt={d.title} />
              <p className="text-[#4D4D4D] font-[600] text-[12px]">
                {d.location}
              </p>
            </div>

            <p className="mt-3 text-[#425466] font-[400]">{d.content}</p>
            <div className="mt-3">
              <Link to={"/details"}>
                <button className="bg-[#0A1F44] py-3 px-5 text-white w-fit font-[600] text-[12px] rounded-lg">
                  See more
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
