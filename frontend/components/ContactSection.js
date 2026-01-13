import React from "react";

const ContactSection = () => {
  return (
    <section className="bg-white py-20" id="contact">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
        <p className="mb-8 max-w-2xl mx-auto">
          Have questions or need support? We’re here to help you connect with the Smart Campus team.
        </p>
        <form className="max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full mb-4 p-3 border rounded-md"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full mb-4 p-3 border rounded-md"
          />
          <textarea
            rows="4"
            placeholder="Your Message"
            className="w-full mb-4 p-3 border rounded-md"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
