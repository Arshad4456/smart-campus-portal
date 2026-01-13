"use client";
import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/api/landing";

export default function LandingSettings() {
  const [landing, setLanding] = useState({
    navbar: { logo: "", loginButtonText: "Login", links: [] },
    hero: { title: "", subtitle: "", image: "" },
    about: { title: "", description: "" },
    services: [],
    branches: [],
    team: [],
  });

  const [loading, setLoading] = useState(true);

  // ===================== FETCH DATA =====================
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data.landingPage) {
          setLanding({
            navbar: data.landingPage.navbar || { links: [] },
            hero: data.landingPage.hero || {},
            about: data.landingPage.about || {},
            services: data.landingPage.services || [],
            branches: data.landingPage.branches || [],
            team: data.landingPage.team || [],
          });
        }
        setLoading(false);
      });
  }, []);

  // ===================== GENERAL FIELD UPDATE =====================
  const updateField = (section, field, value) => {
    setLanding((prev) => ({
      ...prev,
      [section]: field ? { ...prev[section], [field]: value } : value,
    }));
  };

  // ===================== ARRAY FUNCTIONS =====================
  const addItem = (section, item) => {
    setLanding((prev) => ({
      ...prev,
      [section]: [...(prev[section] || []), item],
    }));
  };

  const deleteItem = (section, index) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    setLanding((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  // ===================== NESTED ARRAY FUNCTIONS (navbar.links) =====================
  const addNavbarLink = () => {
    setLanding((prev) => ({
      ...prev,
      navbar: {
        ...prev.navbar,
        links: [...prev.navbar.links, { name: "", url: "" }],
      },
    }));
  };

  const deleteNavbarLink = (index) => {
    if (!confirm("Are you sure you want to delete this link?")) return;

    setLanding((prev) => ({
      ...prev,
      navbar: {
        ...prev.navbar,
        links: prev.navbar.links.filter((_, i) => i !== index),
      },
    }));
  };

  // ===================== SAVE CHANGES =====================
  const saveChanges = async () => {
    if (!confirm("Do you want to save your changes?")) return;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(landing),
    });

    const data = await response.json();
    alert(data.message || "Saved!");
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;

  return (
    <div className="p-5 bg-white rounded shadow">
      <h1 className="text-2xl mb-4 font-bold">Landing Page Settings</h1>

      {/* ===================== NAVBAR ===================== */}
      <h2 className="text-xl font-semibold mt-4">Navbar</h2>

      <label>Logo URL:</label>
      <input
        type="text"
        value={landing.navbar.logo}
        onChange={(e) => updateField("navbar", "logo", e.target.value)}
        className="border p-2 w-full mb-3"
      />
      
       <label className="block mt-2">Login Button Text</label>
       <input
          type="text"
          className="border w-full p-2 rounded"
          value={landing.navbar.loginButtonText}
          onChange={(e) => updateField("navbar", "loginButtonText", e.target.value)}
        />

      <h3 className="text-lg font-semibold mt-2">Navbar Links</h3>

      {landing.navbar.links.map((link, index) => (
        <div key={index} className="flex items-center gap-2 mb-2 border p-2 rounded">
          <input
            type="text"
            placeholder="Name"
            value={link.name}
            onChange={(e) => {
              const updated = [...landing.navbar.links];
              updated[index].name = e.target.value;
              updateField("navbar", "links", updated);
            }}
            className="border p-2 flex-1"
          />
          <input
            type="text"
            placeholder="URL"
            value={link.url}
            onChange={(e) => {
              const updated = [...landing.navbar.links];
              updated[index].url = e.target.value;
              updateField("navbar", "links", updated);
            }}
            className="border p-2 flex-1"
          />

          <button
            onClick={() => deleteNavbarLink(index)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}

      <button onClick={addNavbarLink} className="bg-blue-500 text-white px-4 py-1 rounded mt-2">
        + Add Link
      </button>

      {/*=========== HERO SECTION ================ */}
      <div className="bg-white p-4 rounded shadow mb-5">
       <h2 className="font-semibold text-lg mb-2">Hero Section</h2>

       <label className="block mt-2">Title</label>
        <input
          type="text"
          className="border w-full p-2 rounded"
          value={landing.hero.title}
          onChange={(e) => updateField("hero", "title", e.target.value)}
        />

        <label className="block mt-2">Subtitle</label>
        <input
          type="text"
          className="border w-full p-2 rounded"
          value={landing.hero.subtitle}
          onChange={(e) => updateField("hero", "subtitle", e.target.value)}
        />

        <label className="block mt-2">Image URL</label>
        <input
          type="text"
          className="border w-full p-2 rounded"
          value={landing.hero.image}
          onChange={(e) => updateField("hero", "image", e.target.value)}
        />
      </div>

      {/*===================== ABOUT SECTION ===================== */}
      <div className="bg-white p-4 rounded shadow mb-5">
        <h2 className="font-semibold text-lg mb-2">About Section</h2>

        <label className="block mt-2">Title</label>
        <input
          type="text"
          className="border w-full p-2 rounded"
          value={landing.about.title}
          onChange={(e) => updateField("about", "title", e.target.value)}
        />

        <label className="block mt-2">Description</label>
        <textarea
          className="border w-full p-2 rounded"
          rows="4"
          value={landing.about.description}
          onChange={(e) => updateField("about", "description", e.target.value)}
        />
      </div>

      {/* ===================== SERVICES ===================== */}
      <h2 className="text-xl font-semibold mt-6">Services</h2>

      {landing.services.map((service, index) => (
        <div key={index} className="border p-3 rounded mb-2">
          <input
            type="text"
            placeholder="Title"
            value={service.title}
            onChange={(e) => {
              const updated = [...landing.services];
              updated[index].title = e.target.value;
              updateField("services", null, updated);
            }}
            className="border p-2 w-full mb-2"
          />
          <input
            type="text"
            placeholder="Description"
            value={service.desc}
            onChange={(e) => {
              const updated = [...landing.services];
              updated[index].desc = e.target.value;
              updateField("services", null, updated);
            }}
            className="border p-2 w-full mb-2"
          />
          <input
            type="text"
            placeholder="Icon URL"
            value={service.icon}
            onChange={(e) => {
              const updated = [...landing.services];
              updated[index].icon = e.target.value;
              updateField("services", null, updated);
            }}
            className="border p-2 w-full mb-2"
          />

          <button
            onClick={() => deleteItem("services", index)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}

      <button
        onClick={() => addItem("services", { title: "", desc: "", icon: "" })}
        className="bg-blue-500 text-white px-4 py-1 rounded mt-2"
      >
        + Add Service
      </button>

      {/* ===================== BRANCHES ===================== */}
      <h2 className="text-xl font-semibold mt-6">Branches</h2>

      {landing.branches.map((branch, index) => (
        <div key={index} className="border p-3 rounded mb-2">
          <input
            type="text"
            placeholder="Image URL"
            value={branch.img}
            onChange={(e) => {
              const updated = [...landing.branches];
              updated[index].img = e.target.value;
              updateField("branches", null, updated);
            }}
            className="border p-2 w-full mb-2"
          />

          <input
            type="text"
            placeholder="Title"
            value={branch.title}
            onChange={(e) => {
              const updated = [...landing.branches];
              updated[index].title = e.target.value;
              updateField("branches", null, updated);
            }}
            className="border p-2 w-full mb-2"
          />

          <button
            onClick={() => deleteItem("branches", index)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}

      <button
        onClick={() => addItem("branches", { img: "", title: "" })}
        className="bg-blue-500 text-white px-4 py-1 rounded mt-2"
      >
        + Add Branch
      </button>

      {/* ===================== TEAM ===================== */}
      <h2 className="text-xl font-semibold mt-6">Team</h2>

      {landing.team.map((member, index) => (
        <div key={index} className="border p-3 rounded mb-2">
          <input
            type="text"
            placeholder="Image URL"
            value={member.img}
            onChange={(e) => {
              const updated = [...landing.team];
              updated[index].img = e.target.value;
              updateField("team", null, updated);
            }}
            className="border p-2 w-full mb-2"
          />
          <input
            type="text"
            placeholder="Name"
            value={member.name}
            onChange={(e) => {
              const updated = [...landing.team];
              updated[index].name = e.target.value;
              updateField("team", null, updated);
            }}
            className="border p-2 w-full mb-2"
          />
          <input
            type="text"
            placeholder="Role"
            value={member.role}
            onChange={(e) => {
              const updated = [...landing.team];
              updated[index].role = e.target.value;
              updateField("team", null, updated);
            }}
            className="border p-2 w-full mb-2"
          />

          <button
            onClick={() => deleteItem("team", index)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}

      <button
        onClick={() => addItem("team", { img: "", name: "", role: "" })}
        className="bg-blue-500 text-white px-4 py-1 rounded mt-2"
      >
        + Add Team Member
      </button>

      {/* ===================== SAVE BUTTON ===================== */}
      <button
        onClick={saveChanges}
        className="bg-green-600 text-white px-6 py-2 rounded mt-6 block"
      >
        Save Changes
      </button>
    </div>
  );
}