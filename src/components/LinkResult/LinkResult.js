import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaWhatsapp, FaCopy, FaArrowLeft } from "react-icons/fa";

const LinkResult = () => {
  const { state } = useLocation();
  const { link } = state || {};
  const [isCopied, setIsCopied] = useState(false);
  const navigate = useNavigate();

  const handleCopy = () => {
    if (link) {
      navigator.clipboard
        .writeText(link)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    }
  };

  const handleBack = () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to go back to the input screen?"
    );
    if (userConfirmed) {
      navigate(-1);
    }
  };

  const handleShareWhatsApp = () => {
    if (link) {
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
        "Check out this link: " + link
      )}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  return (
    <div className="link-result">
      <h2>Your Dynamic Link:</h2>
      {link ? (
        <>
          <a href={link} target="_blank" rel="noopener noreferrer" className="generated-link">
            {link}
          </a>
          <div className="button-group">
            <button className="copy-button" onClick={handleCopy}>
              <FaCopy /> {isCopied ? "Copied!" : "Copy Link"}
            </button>
            <button className="back-button" onClick={handleBack}>
              <FaArrowLeft /> Back
            </button>
          </div>
          <button className="whatsapp-button" onClick={handleShareWhatsApp}>
            <FaWhatsapp /> Share on WhatsApp
          </button>
        </>
      ) : (
        <p>Link generation failed. Try again later.</p>
      )}
    </div>
  );
};

export default LinkResult;
