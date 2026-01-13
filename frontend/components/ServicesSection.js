import axios from "axios";
// import Link from "next/link";
import React, { useEffect, useState } from "react";

const ServicesSection = () => {

   const [services, setServices] = useState(null);
  
     useEffect(() => {
      axios.get("http://localhost:5000/api/landing")
        .then((res) => setServices(res.data.landingPage.services));
    }, []);
  
      if (!services) return null;

  // const services = [
  //     {
  //       title: "Admissions",
  //       desc: "Know all about Admission",
  //       icon: "📚",
  //     },
  //   {
  //     title: "Programs Offered",
  //     desc: "Click to take information about programs that we offered.",
  //     icon: "🎓",
  //   },
  //   {
  //       title: "Faculty",
  //       desc: "Know about our Faculty members",
  //       icon: "👨‍🏫",
  //   },
  //   {
  //       title: "Student Management",
  //       desc: "Keep track of student data, attendance, and performance.",
  //       icon: "🎓",
  //   },
  //   {
  //       title: "Course Scheduling",
  //       desc: "Create, modify, and manage courses with ease.",
  //       icon: "📚",
  //   },
  //   {
  //       title: "LMS",
  //       desc: "Create, modify, and manage courses with ease.",
  //       icon: "📚",
  //   },
  //   {
  //       title: "Attendance",
  //       desc: "Create, modify, and manage courses with ease.",
  //       icon: "📚",
  //   },

  // ];

  return (
    <section className="bg-gray-100 py-20" id="services">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-12">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((services, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition"
            >
              <div className="text-5xl mb-4 flex justify-center items-center">
                <img className="w-40 h-40" src={services.icon}></img>
                </div>
              <h3 className="text-2xl font-bold mb-2">{services.title}</h3>
              <p>{services.desc}</p>
            </div>
          ))}
        </div>
       
      </div>
    </section>
  );
};

export default ServicesSection;
