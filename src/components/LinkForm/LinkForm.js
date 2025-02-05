import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LinkForm = () => {
  const [appleUrl, setAppleUrl] = useState("");
  const [spotifyUrl, setSpotifyUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [error, setError] = useState(""); // State to store validation errors
  const navigate = useNavigate();

  // Regex patterns to validate URLs
  const applePodcastRegex = /^https?:\/\/(podcasts\.apple\.com|music\.apple\.com)/i;
  const spotifyRegex = /^https?:\/\/(open\.spotify\.com|spotify\.com)/i;
  const youtubeRegex = /^https?:\/\/(www\.youtube\.com|youtu\.be)/i;

  const validateUrls = () => {
    if (!appleUrl || !spotifyUrl || !youtubeUrl) {
      return "All three links (Apple Podcast, Spotify, YouTube) are required.";
    }
    if (appleUrl && !applePodcastRegex.test(appleUrl)) {
      return "Please enter a valid Apple Podcasts URL.";
    }
    if (spotifyUrl && !spotifyRegex.test(spotifyUrl)) {
      return "Please enter a valid Spotify URL.";
    }
    if (youtubeUrl && !youtubeRegex.test(youtubeUrl)) {
      return "Please enter a valid YouTube URL.";
    }
    return ""; // No errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate URLs
    const validationError = validateUrls();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(""); // Clear previous errors

    try {
      const apiUrl = `https://toolbox.boomlive.in/api_project/aditya_linkgenerator.php?links=${encodeURIComponent(
        JSON.stringify({ apple: appleUrl, spotify: spotifyUrl, youtube: youtubeUrl })
      )}`;

      const response = await axios.get(apiUrl);
      console.log(response.data);

      // Navigate to the result page with the generated link
      navigate("/result", { state: { link: response.data.url } });
    } catch (error) {
      console.error("Error generating link:", error);
      setError("An error occurred while generating the link. Please try again.");
    }
  };

  return (
    <div className="link-form">
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}

        <div className="input-group">
          <label htmlFor="appleUrl">Apple Podcast URL</label>
          <input
            id="appleUrl"
            type="url"
            placeholder="Enter Apple Podcast URL"
            value={appleUrl}
            onChange={(e) => setAppleUrl(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="spotifyUrl">Spotify URL</label>
          <input
            id="spotifyUrl"
            type="url"
            placeholder="Enter Spotify URL"
            value={spotifyUrl}
            onChange={(e) => setSpotifyUrl(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="youtubeUrl">YouTube URL</label>
          <input
            id="youtubeUrl"
            type="url"
            placeholder="Enter YouTube URL"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
          />
        </div>

        <button type="submit" disabled={!appleUrl || !spotifyUrl || !youtubeUrl}>
          Generate Link
        </button>
      </form>
    </div>
  );
};

export default LinkForm;
