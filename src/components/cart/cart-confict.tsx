import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CartConfictProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onReplace: () => void;
  newVendor: string;
  currentVendor: string;
}

export const CartConfict = ({
  currentVendor,
  newVendor,
  isOpen,
  setIsOpen,
  onReplace,
}: CartConfictProps) => {
    const handleReplace = () => {
        onReplace();
        setIsOpen(false);
      };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Warning: Different Vendor</DialogTitle>
          <DialogDescription>
            You&apos;re attempting to add a product from{" "}
            <span className="font-[700]">{newVendor}</span>, but your cart
            currently contains items from{" "}
            <span className="font-[700]">{currentVendor}</span>.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Keep Current Cart
          </Button>
          <Button onClick={handleReplace}>Replace with New Product</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
};
