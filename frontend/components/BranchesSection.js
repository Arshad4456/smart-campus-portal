import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const BranchesSection = () => {

    const [branches, setBranches] = useState(null);
  
     useEffect(() => {
      axios.get("http://localhost:5000/api/landing")
        .then((res) => setBranches(res.data.landingPage.branches));
    }, []);
  
      if (!branches) return null;

  // const items = [
  //   { title: "Main Campus", img: "/assets/branch-1.jpg" },
  //   { title: "Peshawar", img: "/assets/branch-2.jpg" },
  //   { title: "Lahore", img: "/assets/branch-3.jpg" },
  // ];

  return (
    <section className="bg-white py-20" id="portfolio">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-12">Campuses</h2>
        <div className="grid md:grid-cols-3 gap-8 cursor-pointer">
          {branches.map((branches, i) => (
            <div
              key={i}
              className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
            >
              <img
                src={branches.img}
                alt={branches.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold">{branches.title}</h3>
              </div>
            </div>
          ))}
        </div>
       
      </div>
    </section>
  );
};

export default BranchesSection;
