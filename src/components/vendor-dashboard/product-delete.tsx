import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";

  
  import { Trash2 } from "lucide-react";
  import React from "react";
  import { FaSpinner } from "react-icons/fa6";
  import { toast } from "sonner";
  import { Button } from "../ui/button";
import { useDeleteProductByIdMutation } from "@/redux/features/product/productApi";
  
  interface IProps {
    productId: string;
    productName: string;
  }

  const trimText = (text: string, toTrim: number) => {
    const isLarger = text.length > toTrim;
    return isLarger ? text.substring(0, toTrim) + "..." : text;
  };
  
 export  const ProductDelete: React.FC<IProps> = ({ productId, productName }) => {
    const [open, setOpen] = React.useState(false);
  
    const [deleteProduct, { isLoading }] = useDeleteProductByIdMutation();
  
    const handleDelete = async () => {
      
      try {
        const res = await deleteProduct(productId);
        const error = res.error as any;
  
        if (error) {
          toast.error(error?.data?.message || "Something went wrong");
          setOpen(false);
          return;
        }
  
        toast.success("Product deleted successfully");
        setOpen(false);
      } catch (error) {
        toast.error("Something went wrong");
        setOpen(false);
      }
    };
  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="items-center flex justify-center bg-red-600 hover:bg-red-700 text-white rounded-full w-[40px] h-[40px]">
            <Trash2 className="h-4 w-4" />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the product &quot;
              {trimText(productName, 25)}
              &quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={isLoading}
              className="center gap-[10px]"
            >
              Delete
              {isLoading ? <FaSpinner className="animate-spin" /> : null}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  
 
  