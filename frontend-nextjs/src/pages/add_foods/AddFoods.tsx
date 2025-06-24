"use client";

import React, { useState, useContext, useEffect } from "react";
import { StoreContext } from "@/context/StoreContext";
import { fetchGraphQL } from "@/lib/fetchGraphQL";
import { print } from "graphql";
import { gql } from "graphql-tag";
import Image from "next/image";

// GraphQL Mutations
const CREATE_FOOD_MUTATION = gql`
  mutation CreateFood($createFoodInput: CreateFoodInput!) {
    createFood(createFoodInput: $createFoodInput) {
      id
      name
      description
      price
      image
      category
    }
  }
`;

const UPDATE_FOOD_MUTATION = gql`
  mutation UpdateFood($updateFoodInput: UpdateFoodInput!) {
    updateFood(updateFoodInput: $updateFoodInput) {
      id
      name
      description
      price
      image
      category
    }
  }
`;

const REMOVE_FOOD_MUTATION = gql`
  mutation RemoveFood($id: Int!) {
    removeFood(id: $id) {
      id
      name
    }
  }
`;

interface FoodFormData {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface EditingFood extends FoodFormData {
  id: number;
}

const AddFoods: React.FC = () => {
  const context = useContext(StoreContext);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { food_list, token } = context;

  const [formData, setFormData] = useState<FoodFormData>({
    name: "",
    description: "",
    price: 0,
    image: "",
    category: "",
  });

  const [editingFood, setEditingFood] = useState<EditingFood | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (editingFood) {
      setEditingFood((prev) =>
        prev
          ? {
              ...prev,
              [name]: name === "price" ? parseFloat(value) || 0 : value,
            }
          : null
      );
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "price" ? parseFloat(value) || 0 : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setMessage({ type: "error", text: "Please login to manage foods" });
      return;
    }

    setIsLoading(true);
    try {
      if (editingFood) {
        // Update existing food
        const response = await fetchGraphQL(print(UPDATE_FOOD_MUTATION), {
          updateFoodInput: {
            id: editingFood.id,
            name: editingFood.name,
            description: editingFood.description,
            price: editingFood.price,
            image: editingFood.image,
            category: editingFood.category,
          },
        });

        if (response.data) {
          setMessage({ type: "success", text: "Food updated successfully!" });
          setEditingFood(null);
        }
      } else {
        // Create new food
        const response = await fetchGraphQL(print(CREATE_FOOD_MUTATION), {
          createFoodInput: formData,
        });

        if (response.data) {
          setMessage({ type: "success", text: "Food added successfully!" });
          setFormData({
            name: "",
            description: "",
            price: 0,
            image: "",
            category: "",
          });
        }
      }
    } catch (error) {
      console.error("Error saving food:", error);
      setMessage({
        type: "error",
        text: "Error saving food. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (food: any) => {
    setEditingFood({
      id: food.id || parseInt(food._id),
      name: food.name,
      description: food.description,
      price: food.price,
      image: food.image,
      category: food.category,
    });
  };

  const handleDelete = async (foodId: number) => {
    if (!token) {
      setMessage({ type: "error", text: "Please login to delete foods" });
      return;
    }

    if (!confirm("Are you sure you want to delete this food item?")) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetchGraphQL(print(REMOVE_FOOD_MUTATION), {
        id: foodId,
      });

      if (response.data) {
        setMessage({ type: "success", text: "Food deleted successfully!" });
      }
    } catch (error) {
      console.error("Error deleting food:", error);
      setMessage({
        type: "error",
        text: "Error deleting food. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditingFood(null);
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const currentData = editingFood || formData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {editingFood ? "Edit Food Item" : "Add New Food Item"}
          </h1>

          {message && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                message.type === "success"
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-red-100 text-red-700 border border-red-300"
              }`}
            >
              {message.text}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Food Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={currentData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter food name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={currentData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select Category</option>
                  <option value="Salad">Salad</option>
                  <option value="Rolls">Rolls</option>
                  <option value="Deserts">Deserts</option>
                  <option value="Sandwich">Sandwich</option>
                  <option value="Cake">Cake</option>
                  <option value="Pure Veg">Pure Veg</option>
                  <option value="Pasta">Pasta</option>
                  <option value="Noodles">Noodles</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  value={currentData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter price"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={currentData.image}
                  onChange={handleInputChange}
                  required
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter image URL"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={currentData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Enter food description"
                />
              </div>
            </div>

            <div className="md:col-span-2 flex gap-4 justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isLoading
                  ? "Saving..."
                  : editingFood
                  ? "Update Food"
                  : "Add Food"}
              </button>

              {editingFood && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-8 py-4 bg-gray-500 text-white font-semibold rounded-xl hover:bg-gray-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Food List */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Manage Food Items
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  <th className="p-4 text-left rounded-tl-lg">Image</th>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Category</th>
                  <th className="p-4 text-left">Price</th>
                  <th className="p-4 text-left">Description</th>
                  <th className="p-4 text-left rounded-tr-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {food_list
                  .filter((food) => food.id || food._id)
                  .map((food, index) => (
                    <tr
                      key={food.id || food._id}
                      className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? "bg-gray-25" : ""
                      }`}
                    >
                      <td className="p-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden">
                          <Image
                            src={
                              typeof food.image === "string"
                                ? food.image
                                : "/src/assets/food_1.png"
                            }
                            alt={food.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-gray-800">
                        {food.name}
                      </td>
                      <td className="p-4 text-gray-600">{food.category}</td>
                      <td className="p-4 font-semibold text-green-600">
                        ${food.price}
                      </td>
                      <td className="p-4 text-gray-600 max-w-xs truncate">
                        {food.description}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(food)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              handleDelete(food.id || parseInt(food._id))
                            }
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFoods;
