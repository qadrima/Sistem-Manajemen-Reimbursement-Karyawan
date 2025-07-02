// import { Link } from "react-router-dom";

// interface UsersProps {
//     onCreateNew?: () => void;
// }

// export default function UserList({ content, onCreateNew }: UsersProps) {
//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
//             {content.map(d => (
//                 <Link
//                     key={d.id}
//                     to={`/gemini-ai/${d.id}`}
//                     className="block bg-white dark:bg-white/[0.03] rounded-xl border border-gray-200 dark:border-white/[0.05] overflow-hidden hover:shadow-md transition-all duration-200 hover:bg-gray-50 dark:hover:bg-white/[0.05]"
//                 >
//                     <div className="p-6 h-full max-h-[120px]">
//                         <div className="flex justify-between items-start mb-4">
//                             <div className="flex-1">
//                                 <div className="flex items-start gap-2 mb-2">
//                                     <h3 className="text-sm md:text-lg font-semibold text-gray-800 dark:text-gray-200 break-words">
//                                         {d.name}
//                                     </h3>
//                                 </div>
//                                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                                     {new Date(d.updatedAt).toLocaleString(undefined, {
//                                         year: 'numeric',
//                                         month: 'numeric',
//                                         day: 'numeric',
//                                         hour: '2-digit',
//                                         minute: '2-digit'
//                                     })}
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 </Link>
//             ))}

//             <button
//                 onClick={onCreateNew}
//                 className="block w-full bg-white dark:bg-white/[0.03] rounded-xl border border-gray-200 dark:border-white/[0.05] overflow-hidden hover:shadow-md transition-all duration-200 hover:bg-gray-50 dark:hover:bg-white/[0.05] cursor-pointer"
//             >
//                 <div className="p-6 flex flex-col items-center justify-center h-full max-h-[120px]">
//                     <span className="text-gray-500 dark:text-gray-300 text-sm font-medium">Create New</span>
//                 </div>
//             </button>
//         </div>
//     );
// }
