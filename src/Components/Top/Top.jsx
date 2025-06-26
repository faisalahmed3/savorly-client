import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Loading from '../Loading/Loading';

const Top = () => {
  const [topRecipes, setTopRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopRecipes = async () => {
      try {
        const res = await fetch('https://savorly-sever.vercel.app/recipes/top');
        if (!res.ok) throw new Error('Failed to fetch top recipes');
        const data = await res.json();
        setTopRecipes(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTopRecipes();
  }, []);

  if (loading) return <Loading></Loading>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <div className="px-4 sm:px-12 md:px-24  raleway">
      <h1 className="text-4xl md:text-6xl text-center font-bold pt-20 pb-12 green">
        Top Recipes
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topRecipes.length === 0 ? (
          <p className="text-center col-span-3">No top recipes available.</p>
        ) : (
          topRecipes.map((recipe) => (
            <div
              key={recipe._id}
              className="border-2 border-amber-600 rounded-3xl p-6 space-y-4 text-center shadow-lg"
            >
              <img
                src={recipe.image || "https://via.placeholder.com/300x200.png?text=No+Image"}
                alt={recipe.title}
                className="w-full h-48 object-cover rounded-2xl"
              />
              <h2 className="text-2xl font-bold raleway">{recipe.title}</h2>
              <p className="text-lg font-semibold">Cuisine: {recipe.cuisine || 'N/A'}</p>
              <p className="text-md">❤️ {recipe.likeCount || 0} likes</p>
              <button
                onClick={() => navigate(`/recipe/${recipe._id}`)}
                className="bg-green-700 btn-hv text-white font-semibold px-4 py-2 rounded-full transition duration-200"
              >
                View Details
              </button>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-center mt-12">
        <button
          onClick={() => navigate('/all-recipes')}
          className="btn golden-bg text-white text-xs sm:text-sm md:text-base btn-hv px-4 py-1 rounded-full"
        >
          See All Recipes
        </button>
      </div>
    </div>
  );
};

export default Top;
