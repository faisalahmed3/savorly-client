import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Loading from "../../Components/Loading/Loading";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`https://savorly-sever.vercel.app/recipes/${id}`);
        if (!res.ok) throw new Error("Failed to fetch recipe");
        const data = await res.json();
        setRecipe(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <Loading />;

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-600 font-semibold text-xl">
        Error: {error}
      </div>
    );

  if (!recipe)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 font-semibold text-xl">
        Recipe not found
      </div>
    );

  const ingredientsArray = Array.isArray(recipe.ingredients)
    ? recipe.ingredients
    : typeof recipe.ingredients === "string"
    ? recipe.ingredients.split(",").map((i) => i.trim()).filter(Boolean)
    : [];

  const extractYouTubeEmbedUrl = (url) => {
    try {
      const match = url.match(
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/
      );
      return match ? `https://www.youtube.com/embed/${match[1]}` : null;
    } catch {
      return null;
    }
  };

  const videoEmbedUrl = recipe.video ? extractYouTubeEmbedUrl(recipe.video) : null;

  return (
    <main className="max-w-4xl mx-auto p-6 bg-white rounded-3xl shadow-xl mt-10 mb-20">
      {/* Title */}
      <h1 className="text-5xl font-extrabold text-amber-600 mb-8 drop-shadow-md raleway">
        {recipe.title}
      </h1>

      {/* Image */}
      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full rounded-2xl mb-10 shadow-lg object-cover max-h-[400px]"
        />
      )}

      {/* Metadata */}
      <section className="flex flex-wrap gap-6 text-gray-700 mb-10">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-amber-600 lato">Cuisine:</span>{" "}
          {recipe.cuisine || "N/A"}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-amber-600 raleway">Prep Time:</span>{" "}
          {recipe.prepTime} min
        </div>
        <div className="flex items-center gap-2 max-w-full flex-wrap">
          <span className="font-semibold text-amber-600 raleway">Categories:</span>{" "}
          {recipe.categories && recipe.categories.length > 0
            ? recipe.categories.join(", ")
            : "N/A"}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-amber-600 raleway">Likes:</span>{" "}
          {recipe.likeCount || 0}
        </div>
      </section>

      {/* Ingredients */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-amber-700 mb-4 border-b-2 border-amber-600 pb-2 raleway">
          Ingredients
        </h2>
        {ingredientsArray.length > 0 ? (
          <ul className="list-disc list-inside space-y-2 text-gray-800 text-lg leading-relaxed lato">
            {ingredientsArray.map((ingredient, idx) => (
              <li key={idx}>{ingredient}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No ingredients listed.</p>
        )}
      </section>

      {/* Instructions */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-amber-700 mb-4 border-b-2 border-amber-600 pb-2 raleway">
          Instructions
        </h2>
        <p className="whitespace-pre-line text-gray-800 text-lg leading-relaxed lato">
          {recipe.instructions}
        </p>
      </section>

      {/* YouTube Video */}
      {videoEmbedUrl && (
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-amber-700 mb-4 border-b-2 border-amber-600 pb-2 raleway">
            Watch the Recipe Video
          </h2>
          <div className="aspect-w-16 aspect-h-9 w-full">
            <iframe
              className="w-full h-96 rounded-lg shadow-md"
              src={videoEmbedUrl}
              title="YouTube recipe video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </section>
      )}

      {/* Back Link */}
      <Link
        to={"/all-recipes"}
        className="mt-3 btn golden-bg text-white text-xs sm:text-sm md:text-base btn-hv px-4 py-1 rounded-full"
      >
        View More Recipes
      </Link>
    </main>
  );
};

export default RecipeDetails;
