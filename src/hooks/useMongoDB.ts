import { useState, useCallback } from "react";

// MongoDB Atlas Data API configuration
// You need to enable Data API in MongoDB Atlas and get your endpoint and API key
const MONGODB_CONFIG = {
  // Get this from MongoDB Atlas -> Data API -> Endpoint URL
  dataApiUrl: import.meta.env.VITE_MONGODB_DATA_API_URL || "https://data.mongodb-api.com/api/data/v1/cluster0",
  // Get this from MongoDB Atlas -> Data API -> API Key
  apiKey: import.meta.env.VITE_MONGODB_DATA_API_KEY || "",
  // Your database and collection names
  database: "portfolio26",
};

// Types for MongoDB documents
export interface MongoDBDocument {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
}

// Generic API response type
interface DataAPIResponse<T> {
  documents?: T[];
  document?: T;
  insertedId?: string;
  modifiedCount?: number;
  deletedCount?: number;
}

/**
 * Custom hook for MongoDB Atlas Data API operations
 * This connects directly to MongoDB Atlas without a backend server
 */
export const useMongoDB = <T extends MongoDBDocument>() => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper function to make Data API requests
  const makeRequest = async <R>(
    action: string,
    collection: string,
    body: object = {}
  ): Promise<R> => {
    if (!MONGODB_CONFIG.apiKey) {
      throw new Error("MongoDB Data API key not configured. Set VITE_MONGODB_DATA_API_KEY in .env");
    }

    const response = await fetch(`${MONGODB_CONFIG.dataApiUrl}/action/${action}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": MONGODB_CONFIG.apiKey,
      },
      body: JSON.stringify({
        dataSource: "Cluster0",
        database: MONGODB_CONFIG.database,
        collection,
        ...body,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Data API error: ${response.status}`);
    }

    return response.json();
  };

  // Fetch all documents from a collection
  const fetchAll = useCallback(async (collection: string): Promise<T[]> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await makeRequest<DataAPIResponse<T>>(
        "find",
        collection,
        {}
      );
      return result.documents || [];
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch data";
      setError(errorMessage);
      console.error("MongoDB fetchAll error:", err);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch a single document by ID
  const fetchById = useCallback(async (collection: string, id: string): Promise<T | null> => {
    setIsLoading(true);
    setError(null);

    try {
      // Convert string ID to MongoDB ObjectId format if needed
      const objectId = id.match(/^[0-9a-fA-F]{24}$/) ? id : undefined;
      
      const result = await makeRequest<DataAPIResponse<T>>(
        "findOne",
        collection,
        objectId ? { filter: { _id: { $oid: id } } } : { filter: { _id: id } }
      );
      return result.document || null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch document";
      setError(errorMessage);
      console.error("MongoDB fetchById error:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Create a new document
  const create = useCallback(async (collection: string, data: Partial<T>): Promise<T | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await makeRequest<DataAPIResponse<T>>(
        "insertOne",
        collection,
        { document: { ...data, createdAt: new Date().toISOString() } }
      );

      if (result.insertedId) {
        // Fetch the created document
        return fetchById(collection, result.insertedId);
      }
      return null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create document";
      setError(errorMessage);
      console.error("MongoDB create error:", err);
      return null;
    }
  }, [fetchById]);

  // Update an existing document
  const update = useCallback(async (collection: string, id: string, data: Partial<T>): Promise<T | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const objectId = id.match(/^[0-9a-fA-F]{24}$/) ? { $oid: id } : id;

      await makeRequest<DataAPIResponse<T>>(
        "updateOne",
        collection,
        {
          filter: { _id: objectId },
          update: {
            $set: { ...data, updatedAt: new Date().toISOString() }
          },
        }
      );

      // Fetch the updated document
      return fetchById(collection, id);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update document";
      setError(errorMessage);
      console.error("MongoDB update error:", err);
      return null;
    }
  }, [fetchById]);

  // Delete a document
  const remove = useCallback(async (collection: string, id: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const objectId = id.match(/^[0-9a-fA-F]{24}$/) ? { $oid: id } : id;

      const result = await makeRequest<DataAPIResponse<T>>(
        "deleteOne",
        collection,
        { filter: { _id: objectId } }
      );

      return (result.deletedCount || 0) > 0;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete document";
      setError(errorMessage);
      console.error("MongoDB remove error:", err);
      return false;
    }
  }, []);

  return {
    fetchAll,
    fetchById,
    create,
    update,
    remove,
    isLoading,
    error,
  };
};

/**
 * Hook specifically for admin content management
 * Manages portfolio items, testimonials, clients, etc.
 */
export const useCMSContent = <T extends MongoDBDocument>(collection: string) => {
  const mongoDB = useMongoDB<T>();
  const [items, setItems] = useState<T[]>([]);

  const loadItems = useCallback(async () => {
    const fetchedItems = await mongoDB.fetchAll(collection);
    setItems(fetchedItems);
    return fetchedItems;
  }, [collection, mongoDB.fetchAll]);

  const addItem = useCallback(async (data: Partial<T>) => {
    const newItem = await mongoDB.create(collection, data);
    if (newItem) {
      setItems(prev => [...prev, newItem]);
    }
    return newItem;
  }, [collection, mongoDB.create]);

  const editItem = useCallback(async (id: string, data: Partial<T>) => {
    const updatedItem = await mongoDB.update(collection, id, data);
    if (updatedItem) {
      setItems(prev => prev.map(item => item._id === id ? updatedItem : item));
    }
    return updatedItem;
  }, [collection, mongoDB.update]);

  const deleteItem = useCallback(async (id: string) => {
    const success = await mongoDB.remove(collection, id);
    if (success) {
      setItems(prev => prev.filter(item => item._id !== id));
    }
    return success;
  }, [collection, mongoDB.remove]);

  return {
    items,
    setItems,
    loadItems,
    addItem,
    editItem,
    deleteItem,
    isLoading: mongoDB.isLoading,
    error: mongoDB.error,
  };
};

/**
 * Authentication using MongoDB Atlas Data API
 * Validates admin credentials against MongoDB
 */
export const useMongoDBAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verifyCredentials = useCallback(async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // Query the admins collection to verify credentials
      const result = await makeAdminRequest<DataAPIResponse<{ _id: string; email: string; name: string }>>(
        "findOne",
        "admins",
        { filter: { email, password } }
      );

      return !!result.document;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Authentication failed";
      setError(errorMessage);
      console.error("MongoDB auth error:", err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    verifyCredentials,
    isLoading,
    error,
  };
};

// Helper for admin authentication requests
const makeAdminRequest = async <R>(
  action: string,
  collection: string,
  body: object = {}
): Promise<R> => {
  if (!MONGODB_CONFIG.apiKey) {
    throw new Error("MongoDB Data API key not configured");
  }

  const response = await fetch(`${MONGODB_CONFIG.dataApiUrl}/action/${action}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": MONGODB_CONFIG.apiKey,
    },
    body: JSON.stringify({
      dataSource: "Cluster0",
      database: MONGODB_CONFIG.database,
      collection,
      ...body,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || `Data API error: ${response.status}`);
  }

  return response.json();
};

export default useMongoDB;
