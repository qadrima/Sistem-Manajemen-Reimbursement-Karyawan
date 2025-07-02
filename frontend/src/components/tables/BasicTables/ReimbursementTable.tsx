import React from 'react';
import { useAuth } from '../../../context/AuthContext';

export interface CategoryModel {
    id: number;
    name: string;
    limit_per_month: string;
    created_at: string;
    updated_at: string;
}

export interface UserModel {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
}

export interface ReimbursementModel {
    id: number;
    title: string;
    description: string;
    amount: string;
    category_id: number;
    status: string;
    submitted_at: string;
    approved_at: string | null;
    proof_file: string;
    user_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    category: CategoryModel;
    user: UserModel;
}

interface ReimbursementTableProps {
    data: ReimbursementModel[];
    onApprove: (reimbursement: ReimbursementModel) => void;
    onReject: (reimbursement: ReimbursementModel) => void;
    onDelete: (reimbursement: ReimbursementModel) => void;
}

const ReimbursementTable: React.FC<ReimbursementTableProps> = ({ data, onApprove, onReject, onDelete }) => {

    const apiUrl = import.meta.env.VITE_API_URL;
    const formatFileUrl = (filePath: string) => {
        return `${apiUrl}/storage/${filePath}`;
    };

    const { user } = useAuth();
    // console.log("User from context:", user);

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 dark:bg-meta-4">
                            <th className="px-4 py-4 font-medium text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                No
                            </th>
                            <th className="px-4 py-4 font-medium text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                Title
                            </th>
                            <th className="px-4 py-4 font-medium text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                Amount
                            </th>
                            <th className="px-4 py-4 font-medium text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                Category
                            </th>
                            <th className="px-4 py-4 font-medium text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                User
                            </th>
                            <th className="px-4 py-4 font-medium text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                Status
                            </th>
                            <th className="px-4 py-4 font-medium text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                File
                            </th>
                            <th className="px-4 py-4 font-medium text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                Submitted At
                            </th>
                            {user?.permissions.includes("reimbursement.view_all_with_trashed") && (
                                <th className="px-4 py-4 font-medium text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                    Deleted At
                                </th>
                            )}
                            <th className="px-4 py-4 font-medium text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {data.map((reimbursement, key) => (
                            <tr key={reimbursement.id}>
                                <td className=" px-4 py-5">
                                    <p className="text-gray-500 text-start text-theme-sm dark:text-gray-400">{key + 1}</p>
                                </td>
                                <td className=" px-4 py-5">
                                    <p className="text-gray-500 text-start text-theme-sm dark:text-gray-400">{reimbursement.title}</p>
                                </td>
                                <td className=" px-4 py-5 ">
                                    <p className="text-gray-500 text-start text-theme-sm dark:text-gray-400">{reimbursement.amount}</p>
                                </td>
                                <td className=" px-4 py-5 ">
                                    <p className="text-gray-500 text-start text-theme-sm dark:text-gray-400">{reimbursement.category.name}</p>
                                </td>
                                <td className=" px-4 py-5 ">
                                    <p className="text-gray-500 text-start text-theme-sm dark:text-gray-400">{reimbursement.user.name}</p>
                                </td>
                                <td className=" px-4 py-5 ">
                                    <p className="text-gray-500 text-start text-theme-sm dark:text-gray-400">{reimbursement.status}</p>
                                </td>
                                <td className=" px-4 py-5 ">
                                    <p className="text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {reimbursement.proof_file ? (
                                            <a href={formatFileUrl(reimbursement.proof_file)} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-theme-sm dark:text-blue-400">
                                                View File
                                            </a>
                                        ) : (
                                            <span className="text-gray-500">No File</span>
                                        )}
                                    </p>
                                </td>
                                <td className=" px-4 py-5 ">
                                    <p className="text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {new Date(reimbursement.submitted_at).toLocaleString("id-ID", {
                                            dateStyle: "medium",
                                            timeStyle: "short",
                                        })}
                                    </p>
                                </td>
                                {user?.permissions.includes("reimbursement.view_all_with_trashed") && (
                                    <td className=" px-4 py-5 ">
                                        <p className="text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {reimbursement.deleted_at ? new Date(reimbursement.deleted_at).toLocaleString("id-ID", {
                                                dateStyle: "medium",
                                                timeStyle: "short",
                                            }) : ''}
                                        </p>
                                    </td>
                                )}
                                <td className=" px-4 py-5 ">
                                    <div className="flex items-center space-x-3.5">
                                        {reimbursement.status === 'pending' && user?.permissions.includes("reimbursement.approve") && (
                                            <button
                                                className="text-blue-500 hover:underline text-theme-sm dark:text-blue-400"
                                                onClick={() => onApprove(reimbursement)}
                                            >
                                                Approve
                                            </button>
                                        )}
                                        {reimbursement.status === 'pending' && user?.permissions.includes("reimbursement.reject") && (
                                            <button
                                                className="text-red-500 hover:underline text-theme-sm dark:text-red-400"
                                                onClick={() => onReject(reimbursement)}
                                            >
                                                Reject
                                            </button>
                                        )}
                                        {user?.permissions.includes("reimbursement.delete") && (
                                            <button
                                                className="text-red-500 hover:underline text-theme-sm dark:text-red-400"
                                                onClick={() => onDelete(reimbursement)}
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReimbursementTable;
