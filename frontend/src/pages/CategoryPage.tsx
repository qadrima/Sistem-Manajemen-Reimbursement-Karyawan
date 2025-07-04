import { useCategories } from "../hooks/useCategories";
import ComponentCard from "../components/common/ComponentCard";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import CategoryTable from "../components/tables/BasicTables/CategoryTable";
import Button from "../components/ui/button/Button";
import { useModal } from "../hooks/useModal";
import { Modal } from "../components/ui/modal";
import Label from "../components/form/Label";
import Input from "../components/form/input/InputField";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function CategoryPage() {

    const { categories, loading, error, errors, fetchCategories, form, handleChange, handleSubmit, handleDelete } = useCategories();
    const { isOpen, openModal, closeModal } = useModal();
    const hasFetched = useRef(false);

    const onSuccessSubmit = () => {
        closeModal();
        toast.success("Successfully created category");
    };

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        fetchCategories();
    }, []);

    return (
        <div>
            <PageMeta title="Categories" description="List of categories" />
            <PageBreadcrumb pageTitle="Categories" />

            <div className="space-y-6">
                <ComponentCard
                    title="Category List"
                    actions={
                        <Button size="sm" onClick={openModal}>
                            Create
                        </Button>
                    }
                >
                    {loading && <p className="text-center text-gray-500 dark:text-white/90">Loading..</p>}
                    {!loading && !error && (
                        <CategoryTable data={categories} onDelete={handleDelete} />
                    )}
                </ComponentCard>
            </div>

            <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
                <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                    <div className="px-2 pr-14">
                        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                            Create Category
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
                                            value={form.name}
                                            onChange={handleChange}
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-sm text-red-500">{errors.name[0]}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label>Limit Per Month</Label>
                                        <Input
                                            type="number"
                                            placeholder="Enter limit per month"
                                            name="limit_per_month"
                                            value={form.limit_per_month}
                                            onChange={handleChange}
                                        />
                                        {errors.limit_per_month && (
                                            <p className="mt-1 text-sm text-red-500">{errors.limit_per_month[0]}</p>
                                        )}
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                            <Button size="sm" variant="outline" onClick={closeModal}>
                                Close
                            </Button>
                            <Button size="sm" onClick={() => handleSubmit(onSuccessSubmit)} disabled={loading}>
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal >

        </div>
    );
}
