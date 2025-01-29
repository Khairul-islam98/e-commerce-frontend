import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { useCreateShopBlacklistMutation } from "@/redux/features/user/useApi";
  import { FaSpinner } from "react-icons/fa6";
  import { IShopInfo } from "@/types";
  import { toast } from "sonner";
import { useState } from "react";

export const ShopStatusChange = ({shop}: {shop: IShopInfo}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedShop, setSelectedShop] = useState<IShopInfo | null>(null);
    const [isChangingStatus, setIsChangingStatus] = useState(false);
    const [createShopBlacklist, {isLoading}] = useCreateShopBlacklistMutation();

    const handleConfirm = async () => {
       
      
        try {
          const res =  await createShopBlacklist(shop?.id);
        
            toast.success("Shop status changed successfully");

        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsChangingStatus(false);
            setIsOpen(false);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant={shop.isBlacklist ? "outline" : "default"}
                    onClick={() => {
                      setSelectedShop(shop);
                      setIsOpen(true);
                    }}
                  >
                    {shop.isBlacklist
                      ? "Remove from Blacklist"
                      : "Add to Blacklist"}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      Confirm {shop.isBlacklist ? "Remove from" : "Add to"}{" "}
                      Blacklist
                    </DialogTitle>
                    <DialogDescription>
                      Are you sure you want to{" "}
                      {shop.isBlacklist ? "remove" : "add"} {shop.name}{" "}
                      {shop.isBlacklist ? "from" : "to"} the blacklist?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleConfirm}
                      
                      variant={shop.isBlacklist ? "default" : "destructive"}
                      className="flex items-center gap-2"
                    >
                      {shop.isBlacklist
                        ? "Remove Blacklist"
                        : "Add to Blacklist"}
                      {isLoading && (
                        <FaSpinner className="animate-spin" />
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
    );
};

