import { useState } from "react";
import { useNavigate } from "react-router";
import { login } from "../services/api";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(username, password);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 flex items-center justify-center" style={{ background: "#081A04" }}>
      <form onSubmit={handleSubmit} className="bg-[#1B3022] p-8 rounded-xl w-full max-w-sm">
        <h2 className="mb-6 text-2xl" style={{ color: "#F2F2F2", fontWeight: 600 }}>Login</h2>
        {error && <p className="mb-4 text-sm text-red-400">{error}</p>}
        <div className="mb-4">
          <label className="block mb-1 text-sm" style={{ color: "#9199A5" }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 rounded bg-[#081A04] border border-[#9199A5] text-white"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 text-sm" style={{ color: "#9199A5" }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded bg-[#081A04] border border-[#9199A5] text-white"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 rounded text-black"
          style={{ background: "#A4FBCC", fontWeight: 600 }}
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
