import { useState } from "react";
import axios from "axios";
import { BrainIcon } from "../icons/Brain";
import { BACKEND_URL } from "../config";
import { Card } from "../components/Card";
import { useNavigate } from "react-router-dom";

interface Content {
  _id: string;
  title: string;
  link: string;
  type: string;
}

export default function FriendsSaveit() {
const navigate=useNavigate();
  const [key, setKey] = useState("");
  const [username, setUsername] = useState("");
  const [contents, setContents] = useState<Content[]>([]);
  const [error, setError] = useState("");

  async function handleFetch() {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/v1/brain/${key}`);
      setUsername(res.data.username);
      setContents(res.data.content); 
      setError("");
    } catch (err) {
      setError("Unable to find content with that key.");
      setContents([]);
      setUsername("");
    }
  }

  return (
    <div>
      <div className="bg-blue-900 h-[60px] flex items-center justify-between px-10">
        <div className="flex items-center gap-2 text-white cursor-pointer" onClick={()=>{navigate("/dashboard")}}>
          <BrainIcon />
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder="Enter share key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="border-2 w-[400px] p-2 border-black rounded-l"
          />
          <button
            onClick={handleFetch}
            className="bg-green-500 text-white px-4 rounded-r"
          >
            Fetch
          </button>
        </div>
      </div>

      <div className="p-6">
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {username && (
          <h2 className="text-2xl font-semibold text-center mb-6">
            Showing saved content of {username}
          </h2>
        )}
        <div className="flex flex-wrap justify-center gap-6">
          {contents.map((content) => (
            <Card
              key={content._id}
              id={content._id}
              title={content.title}
              link={content.link}
              type={content.type}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
