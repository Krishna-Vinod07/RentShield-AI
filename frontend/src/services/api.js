const API_BASE = "http://localhost:5000/api";

export const analyzeAgreement = async (agreementText) => {
  const response = await fetch(`${API_BASE}/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      agreementText
    })
  });

  return response.json();
};

export const verifyListing = async (listingText) => {
  const response = await fetch(`${API_BASE}/verify-listing`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      listingText
    })
  });

  return response.json();
};

export const askAI = async (message) => {
  const response = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message
    })
  });

  return response.json();
};