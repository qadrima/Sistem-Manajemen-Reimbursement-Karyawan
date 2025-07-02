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

export default function ReimbursementPage() {
    const { isOpen, openModal, closeModal } = useModal();
    const [loading, setLoading] = useState(true);
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

    const handleSave = async () => {
        try {

            // Close modal
            closeModal();

            console.log('Form data:', form);

            toast.success('Success');

        } catch (err: any) {
            console.log(err)
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const options = [
        { value: "1", label: "Marketing" },
        { value: "2", label: "Template" },
        { value: "3", label: "Development" },
    ];

    const handleSelectChange = (value: string) => {
        setForm({ ...form, ['category_id']: parseInt(value, 10) });
    };

    const handleDescChange = (value: string) => {
        setForm({ ...form, ['description']: value });
    };

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        fetchReimbursements();
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
                    {!loading && !error && <ReimbursementTable data={reimbursements} />}
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
                                    </div>
                                    <div>
                                        <Label>Category</Label>
                                        <Select
                                            options={options}
                                            placeholder="Select an option"
                                            onChange={handleSelectChange}
                                            className="dark:bg-dark-900"
                                        />
                                    </div>
                                    <div>
                                        <Label>Description</Label>
                                        <TextArea
                                            value={form.description}
                                            onChange={handleDescChange}
                                            rows={3}
                                            placeholder="Enter description"
                                        />
                                    </div>
                                    <div>
                                        <Label>Proof File</Label>
                                        <Input
                                            type="file"
                                            name="proof_file"
                                            onChange={handleChange}
                                            value={form.proof_file ? form.proof_file.name : ''}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                            <Button size="sm" variant="outline" onClick={closeModal}>
                                Close
                            </Button>
                            <Button size="sm" onClick={handleSave}>
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>

        </div>
    );
}
