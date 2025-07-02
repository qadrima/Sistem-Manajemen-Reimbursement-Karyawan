import React from 'react';
import { CategoryModel } from '../../../hooks/useCategories';

interface CategoryTableProps {
    data: CategoryModel[];
}

const CategoryTable: React.FC<CategoryTableProps> = ({ data }) => {

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
                            <th className="px-4 py-4 font-medium text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                Limit Per Month
                            </th>
                            <th className="px-4 py-4 font-medium text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                Created At
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
                                <td className=" px-4 py-5 ">
                                    <p className="text-gray-500 text-start text-theme-sm dark:text-gray-400">{category.limit_per_month}</p>
                                </td>
                                <td className=" px-4 py-5 ">
                                    <p className="text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {new Date(category.created_at).toLocaleString("id-ID")}
                                    </p>
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
