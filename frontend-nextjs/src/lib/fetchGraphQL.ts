"use client";

export const fetchGraphQL = async (query: string, variables = {}, token?: string) => {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001/graphql";
  
  console.log("######################################");
  console.log("Fetching GraphQL:", BACKEND_URL);
  console.log("Query:", query);
  console.log("Variables:", variables);
  console.log("######################################");
  
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  try {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (result.errors) {
      console.error("GraphQL errors:", result.errors);
      return { errors: result.errors, data: null };
    }

    return { data: result.data, errors: null };
  } catch (error) {
    console.error("Fetch error:", error);
    return { errors: [error], data: null };
  }
};

