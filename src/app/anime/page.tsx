"use client";

import { useEffect, useState } from "react";

interface CatgirlData {
  id: string;
  image: {
    original: {
      url: string;
    };
  };
  attribution: {
    artist: {
      username: string;
    };
  };
}

export default function AnimePage() {
  const [catgirls, setCatgirls] = useState<CatgirlData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCatgirls = async () => {
      try {
        const responses = await Promise.all(
          Array(3)
            .fill(null)
            .map(() =>
              fetch("https://api.nekosia.cat/api/v1/images/catgirl").then((res) =>
                res.json()
              )
            )
        );
        setCatgirls(responses);
      } catch (error) {
        console.error("Failed to fetch catgirl data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCatgirls();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {catgirls.map((catgirl) => (
        <div
          key={catgirl.id}
          className="border rounded-lg shadow-md overflow-hidden"
        >
          <img
            src={catgirl.image.original.url}
            alt={catgirl.attribution.artist.username}
            className="w-full h-64 object-cover object-center"
          />
          <div className="p-4">
            <h2 className="text-lg font-bold">
              {catgirl.attribution.artist.username}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
}
