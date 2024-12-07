import { ICheckout } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CheckoutReducerProps {
  items: ICheckout[];
}

const initialState: CheckoutReducerProps = {
  items: [],
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    addToCheckout(state, action: PayloadAction<ICheckout[]>) {
      state.items = action.payload;
    },
    removeFromCheckout(state, action) {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
    },
    clearCheckout(state) {
      state.items = [];
    },
  },
});

export const { addToCheckout, removeFromCheckout, clearCheckout } =
  checkoutSlice.actions;
export default checkoutSlice.reducer;
