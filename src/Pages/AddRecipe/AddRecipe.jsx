import React, { useContext } from 'react';
import Swal from 'sweetalert2'; 
import { AuthContext } from '../../providers/AuthProvider'; 

const AddRecipe = () => {
    const { user } = useContext(AuthContext);

    const handleAddRecipe = async (e) => {
        e.preventDefault();

        const form = e.target;
        const image = form.image.value;
        const title = form.title.value;
        const ingredients = form.ingredients.value;
        const instructions = form.instructions.value;
        const cuisine = form.cuisine.value;
        const prepTime = form.prepTime.value;
        const video = form.video.value; // ✅ new video field
        const categories = Array.from(form.querySelectorAll('input[type=checkbox]:checked')).map(input => input.value);

        const newRecipe = {
            image,
            title,
            ingredients,
            instructions,
            cuisine,
            prepTime: parseInt(prepTime),
            categories,
            video,
            likeCount: 0,
            userEmail: user?.email || 'anonymous'
        };

        try {
            const res = await fetch('https://savorly-sever.vercel.app/recipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newRecipe)
            });

            const data = await res.json();
            if (data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Recipe added successfully!',
                    confirmButtonColor: '#d97706'
                });
                form.reset();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops!',
                    text: 'Failed to add recipe',
                    confirmButtonColor: '#dc2626'
                });
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Server Error',
                text: err.message || 'Something went wrong!',
                confirmButtonColor: '#dc2626'
            });
        }
    };

    return (
        <div className='px-4 sm:px-8 lg:px-20 ivory-bg py-10'>
            <h1 className='text-center font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl green mb-10'>
                Add Your Recipes
            </h1>

            <div className="ivory-bg p-6 sm:p-8 lg:p-10 w-full lg:w-2/3 mx-auto">
                <form onSubmit={handleAddRecipe} className='grid space-y-6 border-2 p-5 rounded-4xl border-amber-600 shadow-2xl'>

                    {/* Image URL */}
                    <div className='grid'>
                        <label className="text-xl font-bold text-amber-600 mb-2">Image URL</label>
                        <input type="text" name='image' required className="input w-full border border-amber-600 p-2 rounded" placeholder="Enter the image URL" />
                    </div>

                    {/* Title */}
                    <div className='grid'>
                        <label className="text-xl font-bold text-amber-600 mb-2">Recipe Title</label>
                        <input type="text" name='title' required className="input w-full border border-amber-600 p-2 rounded" placeholder="Enter the recipe title" />
                    </div>

                    {/* Ingredients */}
                    <div className='grid'>
                        <label className="text-xl font-bold text-amber-600 mb-2">Ingredients</label>
                        <textarea rows="3" name='ingredients' required className="textarea w-full border border-amber-600 p-2 rounded" placeholder="List ingredients separated by commas" />
                    </div>

                    {/* Instructions */}
                    <div className='grid'>
                        <label className="text-xl font-bold text-amber-600 mb-2">Instructions</label>
                        <textarea rows="4" name='instructions' required className="textarea w-full border border-amber-600 p-2 rounded" placeholder="Enter step-by-step instructions" />
                    </div>

                    {/* Cuisine + Prep Time */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                        <div className='grid'>
                            <label className="text-xl font-bold text-amber-600 mb-2">Cuisine Type</label>
                            <select name="cuisine" required className="select w-full border border-amber-600 p-2 rounded">
                                <option value="">Select Cuisine</option>
                                <option value="Italian">Italian</option>
                                <option value="Mexican">Mexican</option>
                                <option value="Indian">Indian</option>
                                <option value="Chinese">Chinese</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                        <div className='grid'>
                            <label className="text-xl font-bold text-amber-600 mb-2">Preparation Time (in minutes)</label>
                            <input type="number" name="prepTime" required className="input w-full border border-amber-600 p-2 rounded" placeholder="e.g., 30" />
                        </div>
                    </div>

                    {/* YouTube Video */}
                    <div className='grid'>
                        <label className="text-xl font-bold text-amber-600 mb-2">YouTube Video Link</label>
                        <input type="text" name="video" className="input w-full border border-amber-600 p-2 rounded" placeholder="e.g., https://www.youtube.com/watch?v=abc123" />
                    </div>

                    {/* Categories */}
                    <div className='grid'>
                        <label className="text-xl font-bold text-amber-600 mb-2">Categories</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Vegan'].map(category => (
                                <label key={category} className="flex items-center space-x-2 text-amber-700">
                                    <input type="checkbox" value={category} className="form-checkbox" />
                                    <span>{category}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Like Count */}
                    <div className='grid'>
                        <label className="text-xl font-bold text-amber-600 mb-2">Like Count</label>
                        <input type="number" value={0} readOnly className="input w-full border border-amber-600 p-2 rounded bg-gray-100 cursor-not-allowed text-gray-600" />
                    </div>

                    <button type='submit' className="btn golden-bg text-white btn-hv text-xl mt-4 w-full sm:w-auto px-8 py-2 rounded-full">
                        Add Recipe
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddRecipe;
