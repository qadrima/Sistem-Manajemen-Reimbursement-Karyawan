import { useEffect, useState, useRef } from "react";
import ComponentCard from "../components/common/ComponentCard";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import Button from "../components/ui/button/Button";
import { useModal } from "../hooks/useModal";
import { toast } from 'react-hot-toast';
import api from '../api/axios';
import UserTable, { UserModel } from "../components/tables/BasicTables/UserTable";
import Label from "../components/form/Label";
import Input from "../components/form/input/InputField";
import { Modal } from "../components/ui/modal";

interface SubmitUserData {
    name: string;
    email: string;
    password: string;
}

export default function UserPage() {
    const { isOpen, openModal, closeModal } = useModal();
    const [loading, setLoading] = useState(true);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const [error, setError] = useState<string | null>(null);
    const hasFetched = useRef(false);

    const [users, setUsers] = useState<UserModel[]>([]);
    const [errors, setErrors] = useState<Record<string, string[]>>({});

    const [availableRoles, setAvailableRoles] = useState<{ id: number; name: string; }[]>([]);

    const [form, setForm] = useState<SubmitUserData>({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            setLoadingSubmit(true);
            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("email", String(form.email));
            formData.append("password", String(form.password));

            const response = await api.post("/user", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("user created:", response.data);

            toast.success("User created successfully!");
            closeModal();

            setForm({
                name: '',
                email: '',
                password: '',
            });

            fetchUsers(); // refetch list
        } catch (err: any) {
            toast.error(err.response.data.message || 'An error occurred while creating the user');

            if (err.response && err.response.data && err.response.data.errors) {
                setErrors(err.response.data.errors);
            } else {
                setErrors({});
            }

        } finally {
            setLoadingSubmit(false);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await api.get('/users');
            if (response.data && response.data.data) {
                console.log('Fetched users:', response.data.data);
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

    const fetchRoles = async () => {
        try {
            const response = await api.get('/roles');
            if (response.data && response.data.data) {
                setAvailableRoles(response.data.data);
            } else {
                setAvailableRoles([]);
            }
        } catch (err) {
            console.error('Failed to fetch roles:', err);
            setAvailableRoles([]);
        }
    };

    const handleRoleChange = async (userId: number, newRole: string) => {
        try {
            await api.post(`/user/${userId}/assign-role`, { role: newRole });
            toast.success('User role updated successfully!');
            fetchUsers(); // Refresh the user list
        } catch (err: any) {

            if (err && err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message);
            }
            else {
                toast.error('Failed to update user role.');
            }

            console.error('Failed to update user role:', err);
        }
    };

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        fetchUsers();
        fetchRoles();
    }, []);

    return (
        <div>
            <PageMeta
                title="Users"
                description="Users"
            />
            <PageBreadcrumb pageTitle="Users" />

            <div className="space-y-6">
                <ComponentCard
                    title="List of Users"
                    actions={
                        <Button size="sm" onClick={openModal}>
                            Create
                        </Button>
                    }
                >
                    {loading && <p className="text-center text-gray-500 dark:text-white/90">Loading..</p>}
                    {!loading && !error && (
                        <UserTable
                            data={users}
                            availableRoles={availableRoles}
                            onRoleChange={handleRoleChange}
                        />
                    )}
                </ComponentCard>
            </div>

            <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
                <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                    <div className="px-2 pr-14">
                        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                            Create User
                        </h4>
                    </div>

                    <div className="flex flex-col">
                        <div className="custom-scrollbar overflow-y-auto px-2 pb-3 pt-4">
                            <div className="mt-4">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-5">
                                    <div>
                                        <Label>Name</Label>
                                        <Input
                                            type="text"
                                            placeholder="Enter name"
                                            name="name"
                                            onChange={handleChange}
                                            value={form.name}
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-sm text-red-500">{errors.name[0]}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Label>Email</Label>
                                        <Input
                                            type="email"
                                            placeholder="Enter email"
                                            name="email"
                                            onChange={handleChange}
                                            value={form.email}
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-red-500">{errors.email[0]}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Label>Password</Label>
                                        <Input
                                            type="password"
                                            placeholder="Enter password"
                                            name="password"
                                            onChange={handleChange}
                                            value={form.password}
                                        />
                                        {errors.password && (
                                            <p className="mt-1 text-sm text-red-500">{errors.password[0]}</p>
                                        )}
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
                </div>
            </Modal >

        </div >
    );
}
