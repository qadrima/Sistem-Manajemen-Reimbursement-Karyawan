import React from 'react';

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
}

const ReimbursementTable: React.FC<ReimbursementTableProps> = ({ data }) => {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 dark:bg-meta-4">
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
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {data.map((reimbursement) => (
                            <tr key={reimbursement.id}>
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
                                    <p className="text-gray-500 text-start text-theme-sm dark:text-gray-400">{reimbursement.proof_file}</p>
                                </td>
                                <td className=" px-4 py-5 ">
                                    <div className="flex items-center space-x-3.5">
                                        {/* Action buttons here */}
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
