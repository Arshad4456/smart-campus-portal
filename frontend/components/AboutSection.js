import React, { useEffect, useState } from "react";
import axios from "axios";

const AboutSection = () => {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/landing")
      .then((res) => setAbout(res.data.landingPage.about))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="section-padding bg-white py-20" id="about">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/3">
          <img
            src="/assets/about.jpg"
            alt="About University"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="text-gray-800">
          <h2 className="text-4xl font-bold mb-4">
            {about?.title || "Loading..."}
          </h2>
          <p className="text-lg mb-4">
            {about?.description || "Loading description..."}
          </p>
          <p className="text-lg mb-4">
            With integrated data systems, online management tools, and real-time
            analytics, the Smart Campus Portal ensures your institution is always
            one step ahead.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
