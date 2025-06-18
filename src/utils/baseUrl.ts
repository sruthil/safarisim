export const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return window.location.origin + "/frontend";
  }

  // Fallback to env var or default base
  return process.env.NEXT_PUBLIC_BASE_URL || "https://popam.com/frontend";
};