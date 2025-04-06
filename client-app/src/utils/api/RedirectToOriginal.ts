export const handleRedirect = (url: string) => {
  try {
    window.open(`http://localhost:5000/api/shortUrl/${url}`, "_blank");
  } catch (error) {
    console.log("Error in redirect", error);
  }
};
