import React, { useEffect, useState } from 'react';
import { Link } from 'react-router'; 
import { AiOutlineHeart } from "react-icons/ai";

const AllRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cuisineFilter, setCuisineFilter] = useState("All");

    // Fetch all recipes
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const res = await fetch('https://savorly-sever.vercel.app/recipes');
                const data = await res.json();
                setRecipes(data);
                setFilteredRecipes(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching recipes:", err);
                setError("Failed to load recipes.");
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    // Get unique cuisine types
    const cuisineTypes = ["All", ...new Set(recipes.map(r => r.cuisine).filter(Boolean))];

    // Filter recipes by cuisine
    const handleFilterChange = (e) => {
        const selected = e.target.value;
        setCuisineFilter(selected);

        if (selected === "All") {
            setFilteredRecipes(recipes);
        } else {
            setFilteredRecipes(recipes.filter(recipe => recipe.cuisine === selected));
        }
    };

    // Handle Like
    const handleLike = async (id) => {
        try {
            const res = await fetch(`https://savorly-sever.vercel.app/recipes/${id}/like`, {
                method: "PATCH"
            });
            const result = await res.json();

            if (result.success) {
                const updated = recipes.map(r => 
                    r._id === id ? { ...r, likeCount: (r.likeCount || 0) + 1 } : r
                );
                setRecipes(updated);
                setFilteredRecipes(cuisineFilter === "All"
                    ? updated
                    : updated.filter(r => r.cuisine === cuisineFilter));
            }
        } catch (err) {
            console.error("Error liking recipe:", err);
        }
    };

    if (loading) return <p className="text-center text-lg text-amber-600 py-10">Loading recipes...</p>;
    if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

    return (
        <div className='ivory-bg raleway'>
            <h1 className='green text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-bold py-9'>
                All Recipes
            </h1>

            {/* Cuisine Filter Dropdown */}
            <div className="text-center mb-6">
                <label htmlFor="cuisine-filter" className="text-lg font-medium mr-2">Filter by Cuisine:</label>
                <select
                    id="cuisine-filter"
                    value={cuisineFilter}
                    onChange={handleFilterChange}
                    className="border border-amber-600 rounded-full px-4 py-2"
                >
                    {cuisineTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                    ))}
                </select>
            </div>

            {/* Recipe Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-8 md:px-12 lg:px-24 pb-12'>
                {filteredRecipes.map((recipe) => (
                    <div key={recipe._id} className='border-2 border-amber-600 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col items-center'>
                        <img
                            src={recipe.image || "https://via.placeholder.com/200x150.png?text=No+Image"}
                            alt={recipe.title}
                            className='w-36 sm:w-40 md:w-44 lg:w-48 rounded-2xl'
                        />
                        <div className='text-center space-y-1'>
                            <h1 className='text-xl sm:text-2xl font-bold'>{recipe.title}</h1>
                            <p className='text-sm sm:text-base text-gray-700'>
                                Cuisine: <span className='font-semibold'>{recipe.cuisine}</span>
                            </p>
                            <p className='text-sm sm:text-base text-gray-700'>
                                Prep Time: <span className='font-semibold'>{recipe.prepTime} mins</span>
                            </p>
                            <p className='text-sm sm:text-base text-gray-700'>
                                Category: <span className='font-semibold'>{recipe.categories?.join(', ')}</span>
                            </p>
                        </div>
                        <div className='flex gap-3 items-center justify-center'>
                            <button
                                onClick={() => handleLike(recipe._id)}
                                className='flex items-center gap-1 text-red-500 font-semibold'
                                title="Like Recipe"
                            >
                                <AiOutlineHeart className='text-2xl sm:text-3xl' />
                                {recipe.likeCount || 0}
                            </button>
                            <Link
                                to={`/recipe/${recipe._id}`}
                                className='btn golden-bg text-white text-xs sm:text-sm md:text-base btn-hv px-4 py-1 rounded-full'
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllRecipes;
