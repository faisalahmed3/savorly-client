import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import Loading from '../../Components/Loading/Loading';

const MyRecipes = () => {
    const { user } = useContext(AuthContext);
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchUserRecipes = async () => {
            try {
                const res = await fetch(`https://savorly-sever.vercel.app/my-recipes?email=${user.email}`);
                const data = await res.json();
                setRecipes(data);
            } catch (err) {
                console.error("Error fetching user recipes:", err);
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchUserRecipes();
        }
    }, [user]);

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'This recipe will be deleted permanently!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (confirm.isConfirmed) {
            try {
                const res = await fetch(`https://savorly-sever.vercel.app/recipes/${id}?email=${user.email}`, {
                    method: 'DELETE'
                });
                const result = await res.json();

                if (result.success) {
                    Swal.fire('Deleted!', result.message, 'success');
                    setRecipes(prev => prev.filter(r => r._id !== id));
                } else {
                    Swal.fire('Error', result.message, 'error');
                }
            } catch (err) {
                console.error("Delete error:", err);
                Swal.fire('Error', 'Something went wrong', 'error');
            }
        }
    };

    const handleUpdate = (recipe) => {
        setSelectedRecipe(recipe);
        setShowModal(true);
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const updatedRecipe = {
            title: form.title.value,
            image: form.image.value,
            ingredients: form.ingredients.value,
            instructions: form.instructions.value,
            cuisine: form.cuisine.value,
            prepTime: form.prepTime.value,
            category: form.category.value,
        };

        try {
            const res = await fetch(`https://savorly-sever.vercel.app/recipes/${selectedRecipe._id}?email=${user.email}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedRecipe)
            });
            const result = await res.json();

            if (result.success) {
                Swal.fire('Updated!', result.message, 'success');
                const updatedList = recipes.map(r => r._id === selectedRecipe._id ? { ...r, ...updatedRecipe } : r);
                setRecipes(updatedList);
                setShowModal(false);
            } else {
                Swal.fire('Error', result.message, 'error');
            }
        } catch (err) {
            console.error("Update error:", err);
            Swal.fire('Error', 'Something went wrong', 'error');
        }
    };

    if (loading) {
        return <Loading></Loading>;
    }

    return (
        <div className="ivory-bg pb-20 px-4 sm:px-8 lg:px-16 lato">
            <h1 className="green text-center font-bold text-3xl sm:text-4xl raleway pt-9 mb-10">My Recipes</h1>

            {recipes.length === 0 ? (
                <p className="text-center text-gray-600">You haven’t added any recipes yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recipes.map((recipe, index) => (
                        <div key={index} className="border-2 border-amber-600 rounded-2xl shadow-2xl p-6 space-y-3">
                            <img
                                src={recipe.image || "https://via.placeholder.com/300"}
                                alt={recipe.title}
                                className="w-full h-40 object-cover rounded-xl"
                            />
                            <h2 className="text-xl font-bold raleway">{recipe.title}</h2>
                            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                            <p><strong>Instructions:</strong> {recipe.instructions}</p>
                            <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
                            <p><strong>Prep Time:</strong> {recipe.prepTime} mins</p>
                            <p><strong>Category:</strong> {recipe.category}</p>
                            <p><strong>Likes:</strong> {recipe.likeCount || 0}</p>

                            <div className="flex justify-between">
                                <button
                                    className="btn bg-red-600 text-white px-4 py-1 rounded-full"
                                    onClick={() => handleDelete(recipe._id)}
                                >
                                    Delete
                                </button>
                                <button
                                    className="btn golden-bg text-white px-4 py-1 rounded-full"
                                    onClick={() => handleUpdate(recipe)}
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Update Modal */}
            {showModal && selectedRecipe && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-3xl shadow-2xl p-8 w-[90%] max-w-xl space-y-4 relative animate-fade-in-up">
                <h2 className="text-2xl font-bold text-center text-amber-600 mb-4">Update Recipe</h2>

                {/* Close Button */}
                <button
                    onClick={() => setShowModal(false)}
                    className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-xl font-bold"
                    aria-label="Close"
                >
                    ✕
                </button>

                <form onSubmit={handleUpdateSubmit} className="space-y-4">
                    <div>
                    <label className="block font-semibold mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        defaultValue={selectedRecipe.title}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                    </div>

                    <div>
                    <label className="block font-semibold mb-1">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        defaultValue={selectedRecipe.image}
                        className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                    </div>

                    <div>
                    <label className="block font-semibold mb-1">Ingredients</label>
                    <textarea
                        name="ingredients"
                        defaultValue={selectedRecipe.ingredients}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-amber-600"
                    ></textarea>
                    </div>

                    <div>
                    <label className="block font-semibold mb-1">Instructions</label>
                    <textarea
                        name="instructions"
                        defaultValue={selectedRecipe.instructions}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-amber-600"
                    ></textarea>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label className="block font-semibold mb-1">Cuisine</label>
                        <input
                        type="text"
                        name="cuisine"
                        defaultValue={selectedRecipe.cuisine}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-600"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Prep Time</label>
                        <input
                        type="number"
                        name="prepTime"
                        defaultValue={selectedRecipe.prepTime}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-600"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Category</label>
                        <input
                        type="text"
                        name="category"
                        defaultValue={selectedRecipe.category}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-600"
                        />
                    </div>
                    </div>

                    <div className="flex justify-center mt-6">
                    <button
                        type="submit"
                        className="px-6 py-2 golden-bg border text-white rounded-full btn-hv transition-all"
                    >
                        Save Changes
                    </button>
                    </div>
                </form>
                </div>
            </div>
            )}

        </div>
    );
};

export default MyRecipes;
