import React, { useState, useRef } from "react";

const SuggestionForm = () => {
  const [form, setForm] = useState({
    personality: "",
    homeSize: "",
    diet: "",
    petTypes: [],
  });

  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState("");
  const [images, setImages] = useState([]);
  const [toast, setToast] = useState(null);
  const [timestamp, setTimestamp] = useState("");
  const resultRef = useRef(null);

  const petTypeOptions = ["Dog", "Cat", "Rabbit", "Hamster", "Bird", "Fish"];

  const showToast = (msg, duration = 3000) => {
    setToast(msg);
    setTimeout(() => setToast(null), duration);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (type) => {
    setForm((prev) => {
      const updated = prev.petTypes.includes(type)
        ? prev.petTypes.filter((t) => t !== type)
        : [...prev.petTypes, type];
      return { ...prev, petTypes: updated };
    });
  };
// this is for image
  const fetchImages = async (keyword) => {
    try {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(keyword)}&per_page=1`,
        {
          headers: {
            Authorization: "ERRQ4JwKCfNUTVRPSiH4jbAw1GGmoxWCRwdMZJzI5Kb0WMYCu76Z9Pwb", 
          },
        }
      );
      const data = await response.json();
      return data.photos[0]?.src.medium || null;
    } catch (err) {
      console.error("Image fetch failed:", err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.petTypes.length === 0) {
      showToast("❗ Please select at least one pet type.");
      return;
    }

    setLoading(true);
    setSuggestions("");
    setImages([]);
    setTimestamp("");
    showToast("Fetching pet suggestions...");

    try {
      const res = await fetch(" https://petfinder-zswh.onrender.com/api/suggest-pet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.suggestions) {
        setSuggestions(data.suggestions);
        setTimestamp(new Date().toLocaleString());

        const imageUrls = await Promise.all(
          form.petTypes.map(async (type) => ({
            keyword: type,
            url: await fetchImages(type),
          }))
        );

        setImages(imageUrls.filter((img) => img.url));
        showToast("✅ Suggestions received!");
        setForm({ personality: "", homeSize: "", diet: "", petTypes: [] });

        setTimeout(() => {
          resultRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 500);
      } else {
        setSuggestions("❌ No suggestions received.");
        showToast("⚠️ No suggestions returned.");
      }
    } catch (error) {
      console.error(error);
      setSuggestions("❌ Something went wrong.");
      showToast("🚨 Failed to fetch suggestions.");
    }

    setLoading(false);
  };

  const handleClear = () => {
    setSuggestions("");
    setImages([]);
    setTimestamp("");
    showToast("Suggestions cleared.");
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 p-4 space-y-4">
      {toast && (
        <div className="fixed top-4 right-4 bg-red-200 text-rose-800 px-4 py-2 rounded shadow z-50 transition">
          {toast}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-lg rounded-2xl border border-rose-200 space-y-6"
      >
        <h2 className="text-2xl font-bold text-rose-600 text-center">
          🧠 AI-Based Pet Suggestion
        </h2>

        {/* Personality Dropdown */}
<div>
  <select
    name="personality"
    value={form.personality}
    onChange={handleChange}
    required
    className="w-full border border-rose-200 p-3 rounded-lg bg-rose-50 text-gray-700"
  >
    <option value="">Select Personality</option>
    <option value="Calm">Calm</option>
    <option value="Active">Active</option>
    <option value="Independent">Independent</option>
    <option value="Playful">Playful</option>
  </select>
</div>

{/* Home Size Dropdown */}
<div>
  <select
    name="homeSize"
    value={form.homeSize}
    onChange={handleChange}
    required
    className="w-full border border-rose-200 p-3 rounded-lg bg-rose-50 text-gray-700"
  >
    <option value="">Select Home Size</option>
    <option value="Small">Small</option>
    <option value="Medium">Medium</option>
    <option value="Large">Large</option>
  </select>
</div>

{/* Diet Dropdown */}
<div>
  <select
    name="diet"
    value={form.diet}
    onChange={handleChange}
    required
    className="w-full border border-rose-200 p-3 rounded-lg bg-rose-50 text-gray-700"
  >
    <option value="">Select Diet</option>
    <option value="Vegetarian">Vegetarian</option>
    <option value="Non-Vegetarian">Non-Vegetarian</option>
    <option value="Omnivore">Omnivore</option>
  </select>
</div>


        <div>
          <label className="block text-md font-medium text-rose-600 mb-2">
            Select Pet Types ({form.petTypes.length} selected)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {petTypeOptions.map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 bg-rose-50 px-3 py-2 rounded-lg border border-rose-100 hover:bg-rose-100 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={form.petTypes.includes(type)}
                  onChange={() => handleCheckbox(type)}
                  className="accent-rose-500"
                />
                <span className="text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-400 hover:bg-red-500 transition-colors text-white font-semibold py-2 rounded-lg shadow"
        >
          {loading ? "⏳ Getting Suggestions..." : "🎯 Get Pet Suggestions"}
        </button>
      </form>

      {suggestions && (
        <div ref={resultRef} className="mt-6 animate-fadeIn">
          <div className="flex justify-between items-center mb-2">
            <strong className="text-red-500 text-lg">🐾 AI Suggestions:</strong>
            <button
              onClick={handleClear}
              className="text-sm text-rose-500 hover:underline"
            >
              Clear Suggestions
            </button>
          </div>

          {timestamp && (
            <p className="text-xs text-right text-gray-400 mb-2">
              Suggested on: {timestamp}
            </p>
          )}

          <div className="bg-white border border-rose-200 p-6 rounded-xl whitespace-pre-wrap text-gray-800 shadow-inner mb-6 w-full max-w-5xl mx-auto">
            {suggestions}
          </div>

          {images.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((img, i) => (
                <div key={i} className="text-center">
                  <img
                    src={img.url}
                    alt={img.keyword}
                    className="rounded-lg w-full h-48 object-cover shadow hover:scale-105 transition"
                  />
                  <p className="mt-2 text-sm text-gray-600 italic">
                    {img.keyword}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SuggestionForm;
