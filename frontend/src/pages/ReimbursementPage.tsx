import { useEffect, useState, useRef } from "react";
import ComponentCard from "../components/common/ComponentCard";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import Button from "../components/ui/button/Button";
import { useModal } from "../hooks/useModal";
import { Modal } from "../components/ui/modal";
import Input from "../components/form/input/InputField";
import Label from "../components/form/Label";
import { toast } from 'react-hot-toast';
import api from '../api/axios';
import ReimbursementTable, { ReimbursementModel } from "../components/tables/BasicTables/ReimbursementTable";
import Select from "../components/form/Select";
import TextArea from "../components/form/input/TextArea";

interface SubmitReimbursementData {
    title: string;
    amount: number;
    category_id: number;
    description: string;
    proof_file: File | null;
}

interface CategoryOption {
    value: string;
    label: string;
}

export default function ReimbursementPage() {
    const { isOpen, openModal, closeModal } = useModal();
    const [loading, setLoading] = useState(true);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const [error, setError] = useState<string | null>(null);
    const hasFetched = useRef(false);

    const [reimbursements, setReimbursements] = useState<ReimbursementModel[]>([]);

    const [form, setForm] = useState<SubmitReimbursementData>({
        title: '',
        amount: 0,
        category_id: 0,
        description: '',
        proof_file: null,
    });

    const [categories, setCategories] = useState<CategoryOption[]>([]);
    const [errors, setErrors] = useState<Record<string, string[]>>({});

    const handleSave = async () => {
        try {
            setLoadingSubmit(true);
            const formData = new FormData();
            formData.append("title", form.title);
            formData.append("amount", String(form.amount));
            formData.append("category_id", String(form.category_id));
            formData.append("description", form.description);
            if (form.proof_file) {
                formData.append("proof_file", form.proof_file);
            }

            const response = await api.post("/reimbursements", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Reimbursement created:", response.data);

            toast.success("Reimbursement created successfully!");
            closeModal();

            setForm({
                title: "",
                amount: 0,
                category_id: 0,
                description: "",
                proof_file: null,
            });

            fetchReimbursements(); // refetch list
        } catch (err: any) {
            toast.error("Failed to create reimbursement.");

            if (err.response && err.response.data && err.response.data.errors) {
                setErrors(err.response.data.errors);
            } else {
                setErrors({});
            }

            console.log(err.response.data.errors);
        } finally {
            setLoadingSubmit(false);
        }
    };

    const fetchReimbursements = async () => {
        try {
            const response = await api.get('/reimbursements');
            if (response.data && response.data.data) {
                setReimbursements(response.data.data);
            } else {
                setReimbursements([]);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            console.error(err instanceof Error ? err.message : 'An error occurred');
            setReimbursements([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await api.get("/categories");
            const data = res.data.data || res.data;

            const formatted = data.map((cat: any) => ({
                value: String(cat.id),
                label: cat.name,
            }));

            setCategories(formatted);
        } catch (err) {
            console.error("Failed to fetch categories", err);
            setCategories([]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setForm({ ...form, ['proof_file']: file });
    };

    const handleSelectChange = (value: string) => {
        setForm({ ...form, ['category_id']: parseInt(value, 10) });
    };

    const handleDescChange = (value: string) => {
        setForm({ ...form, ['description']: value });
    };

    const handleApprove = async (reimbursement: ReimbursementModel) => {

        const confirmed = window.confirm(`Are you sure you want to approve "${reimbursement.title}"?`);
        if (!confirmed) return;

        try {
            await api.post(`/reimbursements/${reimbursement.id}/approve`);
            toast.success('Reimbursement approved successfully!');
            fetchReimbursements();
        } catch (err) {
            toast.error('Failed to approve reimbursement.');
            console.error('Failed to approve reimbursement:', err);
        }
    };

    const handleReject = async (reimbursement: ReimbursementModel) => {

        const confirmed = window.confirm(`Are you sure you want to reject "${reimbursement.title}"?`);
        if (!confirmed) return;

        try {
            await api.post(`/reimbursements/${reimbursement.id}/reject`);
            toast.success('Reimbursement rejected successfully!');
            fetchReimbursements();
        } catch (err) {
            toast.error(err instanceof Error ? err.message : 'Failed to reject reimbursement.');
            console.error('Failed to reject reimbursement:', err);
        }
    };

    const handleDelete = async (reimbursement: ReimbursementModel) => {

        const confirmed = window.confirm(`Are you sure you want to delete "${reimbursement.title}"?`);
        if (!confirmed) return;

        try {
            await api.delete(`/reimbursements/${reimbursement.id}`);
            toast.success('Reimbursement deleted successfully!');
            fetchReimbursements();
        } catch (err) {
            toast.error('Failed to delete reimbursement.');
            console.error('Failed to delete reimbursement:', err);
        }
    };

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        fetchReimbursements();
        fetchCategories();
    }, []);

    return (
        <div>
            <PageMeta
                title="Reimbursement"
                description="Reimbursement"
            />
            <PageBreadcrumb pageTitle="Reimbursement" />

            <div className="space-y-6">
                <ComponentCard
                    title="List of Reimbursements"
                    actions={
                        <Button size="sm" onClick={openModal}>
                            Create
                        </Button>
                    }
                >
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    {!loading && !error && (
                        <ReimbursementTable
                            data={reimbursements}
                            onApprove={handleApprove}
                            onReject={handleReject}
                            onDelete={handleDelete}
                        />
                    )}
                </ComponentCard>
            </div>

            <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
                <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                    <div className="px-2 pr-14">
                        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                            Create Reimbursement
                        </h4>
                    </div>

                    <div className="flex flex-col">
                        <div className="custom-scrollbar overflow-y-auto px-2 pb-3 pt-4">
                            <div className="mt-4">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-5">
                                    <div>
                                        <Label>Title</Label>
                                        <Input
                                            type="text"
                                            placeholder="Enter reimbursement title"
                                            name="title"
                                            onChange={handleChange}
                                            value={form.title}
                                        />
                                        {errors.title && (
                                            <p className="mt-1 text-sm text-red-500">{errors.title[0]}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Label>Amount</Label>
                                        <Input
                                            type="number"
                                            placeholder="Enter amount"
                                            name="amount"
                                            onChange={handleChange}
                                            value={form.amount}
                                        />
                                        {errors.amount && (
                                            <p className="mt-1 text-sm text-red-500">{errors.amount[0]}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Label>Category</Label>
                                        <Select
                                            options={categories}
                                            onChange={handleSelectChange}
                                            className="dark:bg-dark-900"
                                        />
                                        {errors.category_id && (
                                            <p className="mt-1 text-sm text-red-500">{errors.category_id[0]}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Label>Description</Label>
                                        <TextArea
                                            value={form.description}
                                            onChange={handleDescChange}
                                            rows={2}
                                            placeholder="Enter description"
                                        />
                                        {errors.description && (
                                            <p className="mt-1 text-sm text-red-500">{errors.description[0]}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Label>Proof File</Label>
                                        <Input
                                            type="file"
                                            name="proof_file"
                                            onChange={handleFileChange}
                                        />
                                        {errors.proof_file && (
                                            <p className="mt-1 text-sm text-red-500">{errors.proof_file[0]}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                            <Button size="sm" variant="outline" onClick={closeModal}>
                                Close
                            </Button>
                            <Button size="sm" onClick={handleSave} disabled={loadingSubmit}>
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal >

        </div >
    );
}
