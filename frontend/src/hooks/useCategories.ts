import { useEffect, useState } from "react";
import api from "../api/axios";

export interface CategoryModel {
    id: number;
    name: string;
    limit_per_month: number
    created_at: string;
    updated_at: string;
}

export const useCategories = () => {
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get("/categories");
                const data = res.data.data || res.data;
                setCategories(data);
            } catch (err: any) {
                setError(err.message || "Failed to fetch categories");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { categories, loading, error };
};
