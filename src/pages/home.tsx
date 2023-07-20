import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

const Home = () => {
  const menu = [
    {
      title: "iron man giphy",
      path: "/gip-iron-man",
    },
    {
      title: "search your giphy",
      path: "/gip-search",
    },
  ];

  return (
    <section className="page-home">
      <h1>welcome to your giphy</h1>
      <figure>
        <img src={Logo} alt="Logo" />
      </figure>
      <div className="row">
        {menu
          ? menu.map((data, index) => (
              <Link className="menu" to={data.path} key={index}>
                {data.title}
              </Link>
            ))
          : null}
      </div>
    </section>
  );
};

export default Home;
