import { ICart } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { discountPrice } from "@/utils/discount";
import { v4 } from "uuid";
import { toast } from "sonner";

interface ICartProps {
  items: ICart[];
  total: number;
}

const initialState: ICartProps = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        payload: Omit<ICart, "cartId" | "isOutOfStock">;
        replace?: boolean;
      }>
    ) => {
      const payload = action.payload.payload;
      const isFromSameShop = state.items.find(
        (item) => item.shopId === payload.shopId
      );

      const price = payload.discount
        ? discountPrice(payload.price, payload.discount)
        : payload.price;

      if (action.payload.replace) {
        state.items = [
          {
            ...payload,
            isOutOfStock: false,
            cartId: v4(),
          },
        ];
        state.total = price * payload.quantity;
        return;
      }

      if (state.items.length > 0 && !isFromSameShop) {
        toast.error(
          "Products from different shops cannot be added to the cart"
        );
        return;
      }

      const isExist = state.items.find(
        (item) =>
          item.productId === payload.productId &&
          item.colorId === payload.colorId &&
          item.sizeId === payload.sizeId
      );

      if (isExist) {
        isExist.quantity += payload.quantity;
        state.total += price * payload.quantity;
      } else {
        state.items.push({
          ...payload,
          isOutOfStock: false,
          cartId: v4(),
        });

        state.total += price * payload.quantity;
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.cartId === action.payload);
      if (item) {
        state.items = state.items.filter(
          (item) => item.cartId !== action.payload
        );
        state.total -= discountPrice(item.price, item.discount) * item.quantity;
      }
    },

    updateCart: (
      state,
      action: PayloadAction<{
        cartId: string;
        payload: Partial<Pick<ICart, "quantity" | "isOutOfStock">>;
      }>
    ) => {
      const item = state.items.find(
        (item) => item.cartId === action.payload.cartId
      );
      const payload = action.payload.payload;
      if (!item) return;

      if (payload.quantity) {
        item.quantity = payload.quantity;
        state.total = state.items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
      }

      if (payload.isOutOfStock) {
        item.isOutOfStock = payload.isOutOfStock;
        state.total -= item.price * item.quantity;
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
