import { useEffect, useState } from "react";
import axios from "../utils/axios";

interface ConnectionRequest {
  _id: string;
  from: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    bio?: string;
  };
  message: string;
  createdAt: string;
}

export default function Requests() {
  const [requests, setRequests] = useState<ConnectionRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get<ConnectionRequest[]>("/users/requests");
      setRequests(response.data);
    } catch (error) {
      console.error("Failed to fetch requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = async (requestId: string, action: 'accept' | 'reject') => {
    try {
      const response = await axios.post<{ message: string }>(`/users/requests/${requestId}/${action}`);
      setMessage(response.data.message);
      
      // Remove the request from the list
      setRequests(prev => prev.filter(req => req._id !== requestId));
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (error: any) {
      setMessage(error.response?.data?.message || `Failed to ${action} request`);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto mt-10 text-center">
        <div className="text-gray-500">Loading requests...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Connection Requests</h1>
      
      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {message}
        </div>
      )}
      
      {requests.length === 0 ? (
        <div className="text-center text-gray-500 text-xl">
          No pending connection requests.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {requests.map(request => (
            <div key={request._id} className="bg-white rounded shadow p-6">
              <div className="flex items-center mb-4">
                <img 
                  src={request.from.avatar || `https://ui-avatars.com/api/?name=${request.from.name}`} 
                  alt="avatar" 
                  className="w-12 h-12 rounded-full mr-3" 
                />
                <div>
                  <h3 className="text-lg font-bold">{request.from.name}</h3>
                  <p className="text-gray-600 text-sm">{request.from.email}</p>
                </div>
              </div>
              
              {request.from.bio && (
                <p className="text-gray-700 mb-4">{request.from.bio}</p>
              )}
              
              <p className="text-gray-600 mb-4 italic">"{request.message}"</p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => handleRequest(request._id, 'accept')}
                  className="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRequest(request._id, 'reject')}
                  className="flex-1 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  Decline
                </button>
              </div>
              
              <p className="text-xs text-gray-500 mt-2">
                Sent {new Date(request.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 