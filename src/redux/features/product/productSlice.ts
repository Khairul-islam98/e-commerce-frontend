import { IProduct } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

interface ProductStateProps {
  products: IProduct[];
}

const initialState: ProductStateProps = {
  products: [],
};

const productComparison = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToComparison: (state, action: PayloadAction<IProduct>) => {
      const isExist = state.products.find(
        (product) => product.id === action.payload.id
      );

      if (isExist) {
        toast.error("Product already added to comparison");
        return;
      }
      state.products.push(action.payload);
      toast.success("Product added to comparison");
    },
    removeFromComparison: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      state.products = state.products.filter(
        (product) => product.id !== productId
      );
    },
    clearComparison: (state) => {
      state.products = [];
    },
  },
});

export const { addToComparison, clearComparison, removeFromComparison } =
  productComparison.actions;
export default productComparison.reducer;
