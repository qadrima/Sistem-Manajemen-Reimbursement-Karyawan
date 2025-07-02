import React from 'react';

export interface UserModel {
    id: number;
    name: string;
    email: string;
    roles: {
        name: string;
        permissions: string[];
    }[];
}

interface UserTableProps {
    data: UserModel[];
    availableRoles: { id: number; name: string; }[];
    onRoleChange: (userId: number, newRole: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ data, availableRoles, onRoleChange }) => {

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
                                Role & Permissions
                            </th>
                            <th className="px-4 py-4 font-medium text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                Change Role
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {data.map((user, key) => (
                            <tr key={user.id}>
                                <td className="align-top px-4 py-5">
                                    <p className="text-gray-500 text-start text-theme-sm dark:text-gray-400">{key + 1}</p>
                                </td>
                                <td className="align-top px-4 py-5">
                                    <p className="text-gray-500 text-start text-theme-sm dark:text-gray-400">{user.name}</p>
                                </td>
                                <td className="align-top px-4 py-5 ">
                                    <p className="text-gray-500 text-start text-theme-sm dark:text-gray-400">{user.email}</p>
                                </td>

                                <td className="align-top px-4 py-5">
                                    <ul className="text-gray-500 text-start text-theme-sm dark:text-gray-400 list-disc ps-5">
                                        {user.roles.map((role) => (
                                            <li key={role.name}>
                                                <strong>{role.name}</strong>
                                                <ul className="list-[circle] ps-5">
                                                    {role.permissions.map((perm) => (
                                                        <li key={perm}>{perm}</li>
                                                    ))}
                                                </ul>
                                            </li>
                                        ))}
                                    </ul>
                                </td>

                                <td className="align-top px-4 py-5 ">
                                    <select
                                        className="p-1 text-gray-500 text-start text-theme-sm dark:text-gray-400 dark:bg-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        value={user.roles.length > 0 ? user.roles[0].name : ''}
                                        onChange={(e) => onRoleChange(user.id, e.target.value)}
                                    >
                                        <option value="" disabled>Select Role</option>
                                        {availableRoles.map(role => (
                                            <option key={role.id} value={role.name}>
                                                {role.name}
                                            </option>
                                        ))}
                                    </select>
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
