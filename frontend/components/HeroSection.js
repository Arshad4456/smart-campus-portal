import axios from "axios";
import React, { useEffect, useState } from "react";

const HeroSection = () => {

  const [hero, setHero] = useState(null);

   useEffect(() => {
    axios.get("http://localhost:5000/api/landing")
      .then((res) => setHero(res.data.landingPage.hero));
  }, []);

    if (!hero) return null;

  return (
    <section
      className="relative h-[100vh] flex flex-col justify-center items-center text-center text-white"
      style={{
        backgroundImage: `url(${hero.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      <div className="relative z-10 px-6">
        <h1 className="text-5xl font-bold mb-4 uppercase tracking-widest">
          {hero.title}
          {/* Welcome to Smart Campus Portal */}
        </h1>
        <p className="max-w-2xl mx-auto text-lg">
          {hero.subtitle}
          {/* A complete digital solution to manage your university efficiently. */}
        </p>
        <button className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-semibold">
          More About
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
