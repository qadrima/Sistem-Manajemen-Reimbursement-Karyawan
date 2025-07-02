import React from 'react';

export interface UserModel {
    id: number;
    name: string;
    email: string;
    roles: string[];
}

interface UserTableProps {
    data: UserModel[];
}

const UserTable: React.FC<UserTableProps> = ({ data }) => {

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
                                Email
                            </th>
                            <th className="px-4 py-4 font-medium text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                Roles
                            </th>
                            <th className="px-4 py-4 font-medium text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {data.map((user, key) => (
                            <tr key={user.id}>
                                <td className=" px-4 py-5">
                                    <p className="text-gray-500 text-start text-theme-sm dark:text-gray-400">{key + 1}</p>
                                </td>
                                <td className=" px-4 py-5">
                                    <p className="text-gray-500 text-start text-theme-sm dark:text-gray-400">{user.name}</p>
                                </td>
                                <td className=" px-4 py-5 ">
                                    <p className="text-gray-500 text-start text-theme-sm dark:text-gray-400">{user.email}</p>
                                </td>
                                <td className=" px-4 py-5 ">
                                    <p className="text-gray-500 text-start text-theme-sm dark:text-gray-400">{user.roles.join(',')}</p>
                                </td>
                                <td className=" px-4 py-5 ">
                                    <div className="flex items-center space-x-3.5">

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

export default UserTable;
