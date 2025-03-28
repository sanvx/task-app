import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "@/pages/types/productsTypes";

interface ProductsState {
  products: ProductType[];
  likedProducts: ProductType[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  likedProducts: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      return data.map((product: ProductType) => ({
        ...product,
        liked: false,
      }));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      state.likedProducts = state.likedProducts.filter(
        (product) => product.id !== action.payload
      );
    },
    toggleLike: (state, action: PayloadAction<ProductType>) => {
      const product = state.products.find((p) => p.id === action.payload.id);
      if (product) {
        product.liked = !product.liked;
        if (product.liked) {
          state.likedProducts.push({ ...product, liked: true });
        } else {
          state.likedProducts = state.likedProducts.filter(
            (p) => p.id !== product.id
          );
        }
      }
    },
    addProduct: (state, action: PayloadAction<ProductType>) => {
      const newProduct = {
        ...action.payload,
        id: Date.now(),
        liked: false,
      };
      state.products.push(newProduct);
    },
    updateProduct: (state, action: PayloadAction<ProductType>) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );

      if (index !== -1) {
        state.products[index] = {
          ...state.products[index],
          ...action.payload,
        };

        const likedIndex = state.likedProducts.findIndex(
          (product) => product.id === action.payload.id
        );
        if (likedIndex !== -1) {
          state.likedProducts[likedIndex] = {
            ...state.likedProducts[likedIndex],
            ...action.payload,
          };
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { deleteProduct, toggleLike, addProduct, updateProduct } = productsSlice.actions;
export default productsSlice.reducer;
