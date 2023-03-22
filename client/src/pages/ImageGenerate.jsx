import { useState, useEffect } from "react";

function ImageComponent() {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:1337/api/searchimage", {
        method: "POST",
      });
      const { image } = await response.json();
      const base64Image = `data:image/png;base64,${image}`;
      setImageUrl(base64Image);
    }
    fetchData();
  }, []);

  return (
    <div>
      {imageUrl && <img src={imageUrl} alt="Hugging Face API result" />}
    </div>
  );
}

export default ImageComponent;
