import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaSpinner } from "react-icons/fa6";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Pen, Trash } from "lucide-react";
import { useDeleteCategoryMutation, useUpdateCategoryMutation } from "@/redux/features/category/categoryApi";
import { useState } from "react";
import { toast } from "sonner";

export const CategoryTable = ({ categories }: { categories: any }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();

  const handleOpenEditDialog = (category: any) => {
    setSelectedCategory(category);
    setIsEditOpen(true);
  };

  const handleOpenDeleteDialog = (category: any) => {
    setSelectedCategory(category);
    setIsDeleteOpen(true);
  };

  const handleSaveChanges = async () => {
    if (!selectedCategory) return;

    try {
      await updateCategory({
        categoryId: selectedCategory.id,
        payload: { name: selectedCategory.name },
      });
      setIsEditOpen(false);
      toast.success("Category updated successfully.");
    } catch (error) {
      console.error("Failed to update category:", error);
      toast.error("Failed to update category.");
    }
  };

  const handleChangeName = (name: string) => {
    setSelectedCategory((prev: any) => ({
      ...prev,
      name,
    }));
  };

  const handleDeleteCategory = async () => {
    if (!selectedCategory) return;

    try {
      console.log("Deleting category:", selectedCategory.id);
      const res = await deleteCategory(selectedCategory.id);
      toast.success("Category deleted successfully.");
      setIsDeleteOpen(false);
    } catch (error) {
      toast.error("Failed to delete category.");
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Category</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category: any) => (
          <TableRow key={category.id}>
            <TableCell className="font-medium">{category.name}</TableCell>
            <TableCell>
              {new Date(category.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell className="flex gap-2">
              {/* Edit Button */}
              <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="center gap-[5px]"
                    onClick={() => handleOpenEditDialog(category)}
                  >
                    <Pen className="w-[15px]" /> Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Category</DialogTitle>
                    <DialogDescription>
                      Update the category Name below.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        value={selectedCategory?.name || ""}
                        onChange={(e) => handleChangeName(e.target.value)}
                        id="name"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSaveChanges}
                      className="center gap-[5px]"
                    >
                      Save Changes
                      {isUpdating && <FaSpinner className="animate-spin ml-2" />}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Delete Button */}
              <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="center gap-[5px]"
                    onClick={() => handleOpenDeleteDialog(category)}
                  >
                    <Trash className="w-[15px]" />
                    Delete
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete the category{" "}
                      <span className="font-semibold">{selectedCategory?.name}</span>?
                      This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleDeleteCategory}
                      className="center gap-[5px]"
                    >
                      Confirm
                      {isDeleting && <FaSpinner className="animate-spin ml-2" />}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
