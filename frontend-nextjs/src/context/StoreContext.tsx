// context/StoreContext.tsx
"use client";

import React, { createContext, useEffect, useState, ReactNode } from "react";
import { fetchGraphQL } from "@/lib/fetchGraphQL";
import { print } from "graphql";
import { gql } from "graphql-tag";

// Import FoodItemType
import type { StaticImageData } from 'next/image';

// GraphQL Queries
const GET_FOODS_QUERY = gql`
  query GetFoods {
    foods {
      id
      name
      price
      description
      image
      category
    }
  }
`;

const GET_CART_ITEMS_QUERY = gql`
  query GetCartItems($userId: Int!) {
    cartItems(userId: $userId) {
      id
      foodId
      userId
      quantity
      food {
        id
        name
        price
        image
      }
    }
  }
`;

const CREATE_CART_ITEM_MUTATION = gql`
  mutation CreateCartItem($createCartItemInput: CreateCartItemInput!) {
    createCartItem(createCartItemInput: $createCartItemInput) {
      id
      foodId
      userId
      quantity
    }
  }
`;

const UPDATE_CART_ITEM_MUTATION = gql`
  mutation UpdateCartItem($updateCartItemInput: UpdateCartItemInput!) {
    updateCartItem(updateCartItemInput: $updateCartItemInput) {
      id
      foodId
      userId
      quantity
    }
  }
`;

const REMOVE_CART_ITEM_MUTATION = gql`
  mutation RemoveCartItem($id: Int!) {
    removeCartItem(id: $id) {
      id
    }
  }
`;

export interface FoodItemType {
  _id: string;
  id?: number;
  name: string;
  price: number;
  description: string;
  image: string | StaticImageData;
  category: string;
}

interface CartItemsType {
  [itemId: string]: number;
}

interface CartItemType {
  id: number;
  foodId: number;
  userId: number;
  quantity: number;
  food?: FoodItemType;
}

interface StoreContextType {
  food_list: FoodItemType[];
  cartItems: CartItemsType;
  setCartItems: React.Dispatch<React.SetStateAction<CartItemsType>>;
  addToCart: (itemId: string) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  getTotalCartAmount: () => number;
  url: string;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  loadCartData: () => Promise<void>;
  clearCart: () => void;
  cartItemsData: CartItemType[];
}

export const StoreContext = createContext<StoreContextType | null>(null);

interface StoreContextProviderProps {
  children: ReactNode;
}

const StoreContextProvider: React.FC<StoreContextProviderProps> = (props) => {
  const [cartItems, setCartItems] = useState<CartItemsType>({});
  const [cartItemsData, setCartItemsData] = useState<CartItemType[]>([]);
  const url: string = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001/graphql";
  const [token, setToken] = useState<string>("");
  const [food_list, setFoodList] = useState<FoodItemType[]>([]); // Initialize as empty array

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    // Dispatch custom event for cart updates
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  }, [cartItems]);

  // Load foods from backend
  const loadFoodData = async () => {
    try {
      const response = await fetchGraphQL(print(GET_FOODS_QUERY), {});
      if (response.data && response.data.foods) {
        const backendFoods = response.data.foods.map((food: any) => ({
          _id: food.id.toString(),
          id: food.id,
          name: food.name,
          price: food.price,
          description: food.description,
          image: food.image,
          category: food.category
        }));
        setFoodList(backendFoods); // Only use backend data
      }
    } catch (error) {
      console.error("Error loading food data:", error);
      // Optionally, handle error by setting an empty list or showing a message
      setFoodList([]);
    }
  };

  // Load cart data from backend
  const loadCartData = async () => {
    if (!token) return;
    
    try {
      // Get user ID from token (you might need to decode JWT)
      const userId = 1; // Placeholder - implement proper user ID extraction
      
      const response = await fetchGraphQL(print(GET_CART_ITEMS_QUERY), { userId });
      if (response.data && response.data.cartItems) {
        setCartItemsData(response.data.cartItems);
        
        // Convert to cartItems format
        const cartItemsMap: CartItemsType = {};
        response.data.cartItems.forEach((item: CartItemType) => {
          cartItemsMap[item.foodId.toString()] = item.quantity;
        });
        setCartItems(cartItemsMap);
      }
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };

  const addToCart = async (itemId: string) => {
    const newQuantity = (cartItems[itemId] || 0) + 1;
    setCartItems((prev) => ({ ...prev, [itemId]: newQuantity }));

    // If user is logged in, sync with backend
    if (token) {
      try {
        const userId = 1; // Placeholder - implement proper user ID extraction
        const foodId = parseInt(itemId);
        
        // Check if item already exists in cart
        const existingCartItem = cartItemsData.find(item => item.foodId === foodId);
        
        if (existingCartItem) {
          // Update existing cart item
          await fetchGraphQL(print(UPDATE_CART_ITEM_MUTATION), {
            updateCartItemInput: {
              id: existingCartItem.id,
              quantity: newQuantity
            }
          });
        } else {
          // Create new cart item
          await fetchGraphQL(print(CREATE_CART_ITEM_MUTATION), {
            createCartItemInput: {
              foodId,
              userId,
              quantity: newQuantity
            }
          });
        }
        
        // Reload cart data
        await loadCartData();
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  const removeFromCart = async (itemId: string) => {
    const currentQuantity = cartItems[itemId] || 0;
    if (currentQuantity <= 1) {
      // Remove item completely
      const newCartItems = { ...cartItems };
      delete newCartItems[itemId];
      setCartItems(newCartItems);
      
      // Remove from backend if user is logged in
      if (token) {
        try {
          const foodId = parseInt(itemId);
          const existingCartItem = cartItemsData.find(item => item.foodId === foodId);
          
          if (existingCartItem) {
            await fetchGraphQL(print(REMOVE_CART_ITEM_MUTATION), {
              id: existingCartItem.id
            });
            await loadCartData();
          }
        } catch (error) {
          console.error("Error removing from cart:", error);
        }
      }
    } else {
      // Decrease quantity
      const newQuantity = currentQuantity - 1;
      setCartItems((prev) => ({ ...prev, [itemId]: newQuantity }));
      
      // Update backend if user is logged in
      if (token) {
        try {
          const foodId = parseInt(itemId);
          const existingCartItem = cartItemsData.find(item => item.foodId === foodId);
          
          if (existingCartItem) {
            await fetchGraphQL(print(UPDATE_CART_ITEM_MUTATION), {
              updateCartItemInput: {
                id: existingCartItem.id,
                quantity: newQuantity
              }
            });
            await loadCartData();
          }
        } catch (error) {
          console.error("Error updating cart:", error);
        }
      }
    }
  };

  const getTotalCartAmount = (): number => {
    let totalAmount: number = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item || product.id?.toString() === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const clearCart = () => {
    setCartItems({});
    setCartItemsData([]);
    localStorage.removeItem("cartItems");
  };

  useEffect(() => {
    loadFoodData();
  }, []);

  useEffect(() => {
    if (token) {
      loadCartData();
    }
  }, [token]);

  const contextValue: StoreContextType = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    loadCartData,
    clearCart,
    cartItemsData,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;


