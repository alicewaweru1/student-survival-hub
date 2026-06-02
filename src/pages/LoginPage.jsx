import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStudentHub } from "../context/StudentHubContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { auth, login } = useStudentHub();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (auth?.isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [auth, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const success = login(form.username.trim(), form.password);

    if (!success) {
      setError("Enter a name and a password with at least 4 characters.");
      return;
    }

    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#e8f1e7_0%,#dfe7e3_100%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md rounded-[32px] bg-white/95 p-8 shadow-[0_30px_90px_-40px_rgba(74,46,37,0.5)]">
        <h1 className="text-3xl font-bold text-[#1f241d]">Welcome to Student Survival Hub</h1>
        <p className="mt-3 text-sm text-[#51614f]">Log in to access your dashboard, timetable, and personalized planning tools.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block text-sm font-semibold text-[#3f4b3d]">
            Your name
            <input
              type="text"
              className="input mt-2"
              value={form.username}
              onChange={(event) => setForm((prev) => ({ ...prev, username: event.target.value }))}
              placeholder="Enter your full name"
            />
          </label>

          <label className="block text-sm font-semibold text-[#3f4b3d]">
            Password
            <input
              type="password"
              className="input mt-2"
              value={form.password}
              onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
              placeholder="At least 4 characters"
            />
          </label>

          {error && <p className="text-sm font-semibold text-[#8a3c2e]">{error}</p>}

          <button type="submit" className="btn-primary w-full">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
