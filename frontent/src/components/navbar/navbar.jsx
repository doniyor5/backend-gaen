import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavLogo from "../../assets/img/GAEN.png";
import NavbarButton from "../buttons/navbarButton";
import Mobile from "./mobile";

export default function Navbar() {
  const [name, setName] = useState("");

  const find = () => {
    const nameFinder = localStorage.getItem("user_full_name");
    setName(nameFinder);
  };

  useEffect(() => {
    find();
  }, []);

  return (
    <div className="left-0 flex justify-between w-full top-3 z-50">
      <div>
        <Link className="" to={"/"}>
          <img className="" src={NavLogo} alt="Logo" />
        </Link>
      </div>
      <div className="hidden md:block">
        <ul className="flex gap-10 text-white font-[300] text-[16px] items-center">
          <li>
            <Link to={"/main"}>Main</Link>
          </li>
          <li>
            <Link to={"/about"}>About</Link>
          </li>
          <li>
            <Link to={"/features"}>Features</Link>
          </li>

          {name ? (
            <h3>{name}</h3>
          ) : (
            <Link to={"/login"}>
              <NavbarButton buttonText={"Log in"} />
            </Link>
          )}
        </ul>
      </div>
      <Mobile />
    </div>
  );
}
