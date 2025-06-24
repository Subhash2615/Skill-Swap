import { useAuth } from "../context/AuthContext.tsx";
import { useState } from "react";
import SkillForm from "../components/SkillForm.tsx";
import axios from "../utils/axios";
import type { FormEvent } from "react";
import type { User } from "../context/AuthContext";

export default function Dashboard() {
  const { user, login } = useAuth();
  const [skillsToTeach, setSkillsToTeach] = useState(user?.skills_to_teach || []);
  const [skillsToLearn, setSkillsToLearn] = useState(user?.skills_to_learn || []);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.put("/users/me", {
        skills_to_teach: skillsToTeach,
        skills_to_learn: skillsToLearn,
      });
      login(localStorage.getItem("token") || "", res.data as User); // update user in context
      setMessage("Profile updated!");
    } catch {
      setMessage("Update failed.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name}!</h1>
      <SkillForm
        skillsToTeach={skillsToTeach}
        skillsToLearn={skillsToLearn}
        setSkillsToTeach={setSkillsToTeach}
        setSkillsToLearn={setSkillsToLearn}
        onSubmit={handleSubmit}
      />
      {message && <div className="mt-4 text-center text-green-600">{message}</div>}
    </div>
  );
}