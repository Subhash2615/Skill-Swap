import { useState } from "react";
import axios from "../utils/axios";

interface MatchCardProps {
  user: {
    _id: string;
    name: string;
    avatar?: string;
    bio?: string;
  };
  sharedTeach: string[];
  sharedLearn: string[];
}

export default function MatchCard({ user, sharedTeach, sharedLearn }: MatchCardProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [message, setMessage] = useState("");
  const [requestSent, setRequestSent] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    setMessage("");
    
    try {
      const response = await axios.post<{ message: string; emailSent: boolean }>(`/users/connect/${user._id}`);
      setMessage(response.data.message);
      setRequestSent(true);
      
      if (response.data.emailSent) {
        setTimeout(() => {
          setMessage(prev => prev + " Email notification sent!");
        }, 1000);
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Failed to send request");
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="bg-white rounded shadow p-4 flex flex-col items-center">
      <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`} alt="avatar" className="w-16 h-16 rounded-full mb-2" />
      <h3 className="text-lg font-bold">{user.name}</h3>
      <p className="text-gray-600 mb-2">{user.bio}</p>
      <div className="mb-2">
        <span className="font-semibold">Shared Skills:</span>
        <div className="flex flex-wrap gap-1 mt-1">
          {sharedTeach.map(skill => (
            <span key={skill} className="bg-blue-100 text-blue-700 px-2 py-1 rounded">{skill}</span>
          ))}
          {sharedLearn.map(skill => (
            <span key={skill} className="bg-green-100 text-green-700 px-2 py-1 rounded">{skill}</span>
          ))}
        </div>
      </div>
      {requestSent ? (
        <div className="mt-2 text-green-600 font-medium">Request Sent ✓</div>
      ) : (
        <button 
          onClick={handleConnect}
          disabled={isConnecting}
          className="mt-2 bg-indigo-500 text-white px-4 py-1 rounded hover:bg-indigo-600 disabled:bg-gray-400"
        >
          {isConnecting ? "Sending..." : "Send Request"}
        </button>
      )}
      {message && (
        <div className={`mt-2 text-sm ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </div>
      )}
    </div>
  );
} 