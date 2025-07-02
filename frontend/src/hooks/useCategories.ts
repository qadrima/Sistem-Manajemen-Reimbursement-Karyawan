import { useState, useCallback, ChangeEvent, FormEvent } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

export interface CategoryModel {
    id: number;
    name: string;
    limit_per_month: number;
    created_at: string;
    updated_at: string;
}

export interface CategoryForm {
    name: string;
    limit_per_month: number;
}

export const useCategories = () => {
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string[]>>({});

    const fetchCategories = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.get("/categories");
            const data = res.data.data || res.data;
            setCategories(data);
            setError(null);
        } catch (err: any) {
            setError(err.message || "Failed to fetch categories");
        } finally {
            setLoading(false);
        }
    }, []);

    const [form, setForm] = useState<CategoryForm>({
        name: "",
        limit_per_month: 10000,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === "limit_per_month" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (onSuccess?: () => void) => {

        setLoading(true);
        try {
            const res = await api.post("/categories", form);

            console.log("Category created successfully:", res.data);

            setForm({ name: "", limit_per_month: 10000 });
            setError(null);
            setErrors({});

            if (onSuccess) {
                onSuccess();
            }

        } catch (err: any) {
            setError(err.message || "Failed to create category");

            if (err.response && err.response.data && err.response.data.errors) {
                setErrors(err.response.data.errors);
            } else {
                setErrors({});
            }

            if (err && err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message);
            }
            else {
                toast.error('Failed to create data.');
            }

        } finally {
            fetchCategories();
        }
    };

    const handleDelete = async (category: CategoryModel) => {

        const confirmed = window.confirm(`Are you sure you want to delete "${category.name}"?`);
        if (!confirmed) return;

        try {
            await api.delete(`/categories/${category.id}`);
            toast.success('Category deleted successfully!');
            fetchCategories();
        } catch (err: any) {

            if (err && err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message);
            }
            else {
                toast.error('Failed to delete.');
            }

            console.error('Failed to delete:', err);
        }
    };

    return { categories, loading, error, errors, fetchCategories, form, handleChange, handleSubmit, handleDelete };
};
