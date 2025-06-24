import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "../context/AuthContext.tsx";
import MatchCard from "../components/MatchCard.tsx";

interface User {
  _id: string;
  name: string;
  avatar?: string;
  bio?: string;
  skills_to_teach: string[];
  skills_to_learn: string[];
}

export default function Matches() {
  const [matches, setMatches] = useState<User[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    axios.get<User[]>("/users/matches").then(res => setMatches(res.data));
  }, []);

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      {matches.length === 0 ? (
        <div className="col-span-2 text-center text-gray-500 text-xl">No matches found.</div>
      ) : (
        matches.map(match => {
          const sharedTeach = (user.skills_to_learn ?? []).filter((skill: string) => match.skills_to_teach.includes(skill));
          const sharedLearn = (user.skills_to_teach ?? []).filter((skill: string) => match.skills_to_learn.includes(skill));
          return (
            <MatchCard
              key={match._id}
              user={match}
              sharedTeach={sharedTeach}
              sharedLearn={sharedLearn}
            />
          );
        })
      )}
    </div>
  );
} 