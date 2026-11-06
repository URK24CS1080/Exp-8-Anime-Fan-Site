
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

function Home() {
  return (
    <div className="card">
      <h2>Welcome to AnimeVerse!</h2>
      <p>Explore your favourite anime, discover new characters and join our anime community.</p>
      <h3>Popular Anime</h3>
      <p>Naruto | One Piece | Demon Slayer | Attack on Titan</p>
      <Link className="button" to="/register">Join AnimeVerse</Link>
    </div>
  );
}

function Register() {
  const [form, setForm] = useState({
    name: "", email: "", password: "",
    age: "", mobile: "", gender: "", state: ""
  });

  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const update = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSubmitted(false);
  };

  const errors = {
    name: !/^[A-Za-z ]+$/.test(form.name.trim()),
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
    password: !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(form.password),
    age: !/^\d+$/.test(form.age) || Number(form.age) < 18 || Number(form.age) > 30,
    mobile: !/^\d{10}$/.test(form.mobile),
    gender: !form.gender,
    state: !form.state
  };

  const valid =
    form.name.trim() !== "" &&
    form.email !== "" &&
    form.password !== "" &&
    form.age !== "" &&
    form.mobile !== "" &&
    Object.values(errors).every(error => !error);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const fieldError = (field) => {
    if (!touched[field]) return null;
    if (!form[field]) return "This field is required.";

    const messages = {
      name: "Use letters and spaces only.",
      email: "Enter a valid email address.",
      password: "Use 8 characters with uppercase, lowercase and a number.",
      age: "Age must be between 18 and 30.",
      mobile: "Enter exactly 10 digits.",
      gender: "Please select your gender.",
      state: "Please select your state."
    };

    return errors[field] ? messages[field] : null;
  };

  const input = (name, label, type = "text", placeholder = "") => (
    <>
      <label>{label}</label>
      <input
        name={name}
        type={type}
        value={form[name]}
        onChange={update}
        onBlur={() => setTouched({ ...touched, [name]: true })}
        placeholder={placeholder}
      />
      {fieldError(name) && <small>{fieldError(name)}</small>}
    </>
  );

  return (
    <div className="card">
      <h2>Join AnimeVerse</h2>
      <form onSubmit={handleSubmit}>
        {input("name", "Full Name", "text", "Enter your name")}
        {input("email", "Email Address", "email", "Enter your email")}
        {input("password", "Password", "password", "Minimum 8 characters")}
        {input("age", "Age", "number", "Enter age (18-30)")}
        {input("mobile", "Mobile Number", "tel", "10-digit mobile number")}

        <label>Gender</label>
        <select name="gender" value={form.gender} onChange={update}
          onBlur={() => setTouched({ ...touched, gender: true })}>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        {fieldError("gender") && <small>{fieldError("gender")}</small>}

        <label>State</label>
        <select name="state" value={form.state} onChange={update}
          onBlur={() => setTouched({ ...touched, state: true })}>
          <option value="">Select State</option>
          <option>Tamil Nadu</option>
          <option>Kerala</option>
          <option>Karnataka</option>
          <option>Andhra Pradesh</option>
        </select>
        {fieldError("state") && <small>{fieldError("state")}</small>}

        <button type="submit" disabled={!valid}>Submit Registration</button>

        {submitted && (
          <p className="success">Registration completed successfully!</p>
        )}
      </form>
    </div>
  );
}

function About() {
  return <div className="card"><h2>About AnimeVerse</h2>
    <p>AnimeVerse is a fan community for anime lovers to explore popular anime and characters.</p>
  </div>;
}

function Contact() {
  return <div className="card"><h2>Contact Us</h2>
    <p>Email: animeverse@example.com</p>
    <p>Thank you for being part of AnimeVerse!</p>
  </div>;
}

function App() {
  return (
    <BrowserRouter>
      <header>
        <h1>AnimeVerse</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <footer>© 2026 AnimeVerse | Anime Fan Community</footer>
    </BrowserRouter>
  );
}

export default App;
