import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

interface SkillFormProps {
  skillsToTeach: string[];
  skillsToLearn: string[];
  setSkillsToTeach: (skills: string[]) => void;
  setSkillsToLearn: (skills: string[]) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export default function SkillForm({ skillsToTeach, skillsToLearn, setSkillsToTeach, setSkillsToLearn, onSubmit }: SkillFormProps) {
  const [teachInput, setTeachInput] = useState<string>("");
  const [learnInput, setLearnInput] = useState<string>("");

  const addSkill = (type: "teach" | "learn") => {
    if (type === "teach" && teachInput && !skillsToTeach.includes(teachInput)) {
      setSkillsToTeach([...skillsToTeach, teachInput]);
      setTeachInput("");
    }
    if (type === "learn" && learnInput && !skillsToLearn.includes(learnInput)) {
      setSkillsToLearn([...skillsToLearn, learnInput]);
      setLearnInput("");
    }
  };

  const removeSkill = (type: "teach" | "learn", skill: string) => {
    if (type === "teach") setSkillsToTeach(skillsToTeach.filter(s => s !== skill));
    if (type === "learn") setSkillsToLearn(skillsToLearn.filter(s => s !== skill));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="block font-semibold mb-2">Skills to Teach</label>
        <div className="flex mb-2">
          <input
            className="flex-1 p-2 border rounded-l"
            value={teachInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTeachInput(e.target.value)}
            placeholder="Add skill"
          />
          <button type="button" className="bg-blue-500 text-white px-4 rounded-r" onClick={() => addSkill('teach')}>
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {skillsToTeach.map(skill => (
            <span key={skill} className="bg-blue-100 text-blue-700 px-2 py-1 rounded flex items-center">
              {skill}
              <button type="button" className="ml-2 text-red-500" onClick={() => removeSkill('teach', skill)}>×</button>
            </span>
          ))}
        </div>
      </div>
      <div>
        <label className="block font-semibold mb-2">Skills to Learn</label>
        <div className="flex mb-2">
          <input
            className="flex-1 p-2 border rounded-l"
            value={learnInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setLearnInput(e.target.value)}
            placeholder="Add skill"
          />
          <button type="button" className="bg-green-500 text-white px-4 rounded-r" onClick={() => addSkill('learn')}>
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {skillsToLearn.map(skill => (
            <span key={skill} className="bg-green-100 text-green-700 px-2 py-1 rounded flex items-center">
              {skill}
              <button type="button" className="ml-2 text-red-500" onClick={() => removeSkill('learn', skill)}>×</button>
            </span>
          ))}
        </div>
      </div>
      <button className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600" type="submit">
        Save Profile
      </button>
    </form>
  );
} 