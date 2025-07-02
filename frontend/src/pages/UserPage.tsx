import { useEffect, useState, useRef } from "react";
import ComponentCard from "../components/common/ComponentCard";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import Button from "../components/ui/button/Button";
import { useModal } from "../hooks/useModal";
import { toast } from 'react-hot-toast';
import api from '../api/axios';
import UserTable, { UserModel } from "../components/tables/BasicTables/UserTable";

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

export default function UserPage() {
    const { isOpen, openModal, closeModal } = useModal();
    const [loading, setLoading] = useState(true);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const [error, setError] = useState<string | null>(null);
    const hasFetched = useRef(false);

    const [users, setUsers] = useState<UserModel[]>([]);

    const fetchUsers = async () => {
        try {
            const response = await api.get('/users');
            if (response.data && response.data.data) {
                setUsers(response.data.data);
            } else {
                setUsers([]);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            console.error(err instanceof Error ? err.message : 'An error occurred');
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        fetchUsers();
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
                    {!loading && !error && <UserTable data={users} />}
                </ComponentCard>
            </div>

        </div >
    );
}
