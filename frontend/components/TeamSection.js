import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const TeamSection = () => {

     const [team, setTeam] = useState(null);
  
     useEffect(() => {
      axios.get("http://localhost:5000/api/landing")
        .then((res) => setTeam(res.data.landingPage.team));
    }, []);
  
      if (!team) return null;

  // const team = [
  //   { name: "Muhammad Shayan", role: "Head of CS Department", img: "/assets/team-1.jpg" },
  //   { name: "Engr. Ahmed Raza", role: "Faculty Coordinator", img: "/assets/team-2.jpg" },
  //   { name: "Sara Ali", role: "System Administrator", img: "/assets/team-3.jpg" },
  //   { name: "Dr. Ayesha Khan", role: "System Administrator", img: "/assets/team-3.jpg" },
  // ];

  return (
    <section className="bg-gray-100 py-20" id="team">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-12">Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((team, i) => (
            <div
              key={i}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition"
            >
              <img
                src={team.img}
                alt={team.name}
                className="w-40 h-40 mx-auto rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-bold">{team.name}</h3>
              <p className="text-gray-600">{team.role}</p>
            </div>
          ))}
        </div>
         <div className="m-10">
       <Link className="text-white bg-blue-500 hover:bg-blue-600 font-bold px-4 py-2 rounded-lg cursor-pointer" href={'/moreServices'}>Show More</Link> </div>
      </div>
    </section>
  );
};

export default TeamSection;
