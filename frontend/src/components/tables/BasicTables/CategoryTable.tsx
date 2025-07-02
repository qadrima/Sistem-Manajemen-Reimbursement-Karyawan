import React from 'react';
import { CategoryModel } from '../../../hooks/useCategories';
import { formatRupiah } from '../../../helpers/formatRupiah';

interface CategoryTableProps {
    data: CategoryModel[];
    onDelete: (category: CategoryModel) => void;
}

const CategoryTable: React.FC<CategoryTableProps> = ({ data, onDelete }) => {

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
                                Name
                            </th>
                            <th className="px-4 py-4 font-medium text-gray-500 text-right text-theme-sm dark:text-gray-400">
                                Limit Per Month
                            </th>
                            <th className="px-4 py-4 font-medium text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                Created At
                            </th>
                            <th className="px-4 py-4 font-medium text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {data.map((category, key) => (
                            <tr key={category.id}>
                                <td className=" px-4 py-5">
                                    <p className="text-gray-500 text-start text-theme-sm dark:text-gray-400">{key + 1}</p>
                                </td>
                                <td className=" px-4 py-5">
                                    <p className="text-gray-500 text-start text-theme-sm dark:text-gray-400">{category.name}</p>
                                </td>
                                <td className="px-4 py-5 text-right">
                                    <p className="text-gray-500 text-theme-sm dark:text-gray-400">{formatRupiah(category.limit_per_month)}</p>
                                </td>
                                <td className=" px-4 py-5 ">
                                    <p className="text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {new Date(category.created_at).toLocaleString("id-ID", {
                                            dateStyle: "medium",
                                            timeStyle: "short",
                                        })}
                                    </p>
                                </td>
                                <td className=" px-4 py-5 ">
                                    <div className="flex items-center gap-2">
                                        {/* <button className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                                            Edit
                                        </button> */}
                                        <button
                                            className="text-red-500 hover:underline text-theme-sm dark:text-red-400"
                                            onClick={() => onDelete(category)}
                                        >
                                            Delete
                                        </button>
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

export default CategoryTable;
