// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// export const useCartStore = create(
//   persist(
//     (set, get) => ({
//       cart: {},
//       restaurant: null,

//       addToCart: (item) => {
//         const { cart, restaurant } = get();

//         // Check if item is from different restaurant
//         if (restaurant && restaurant !== item.restaurant) {
//           // Clear cart and set new restaurant
//           set({
//             cart: { [item._id]: { ...item, quantity: 1 } },
//             restaurant: item.restaurant
//           });
//         } else {
//           // Add to existing cart
//           set({
//             cart: {
//               ...cart,
//               [item._id]: cart[item._id] 
//                 ? { ...cart[item._id], quantity: cart[item._id].quantity + 1 }
//                 : { ...item, quantity: 1 }
//             },
//             restaurant: item.restaurant
//           });
//         }
//       },

//       removeFromCart: (itemId) => {
//         const { cart } = get();
//         const item = cart[itemId];

//         if (item && item.quantity > 1) {
//           set({
//             cart: {
//               ...cart,
//               [itemId]: { ...item, quantity: item.quantity - 1 }
//             }
//           });
//         } else {
//           const newCart = { ...cart };
//           delete newCart[itemId];

//           // If cart is empty, clear restaurant
//           if (Object.keys(newCart).length === 0) {
//             set({ cart: newCart, restaurant: null });
//           } else {
//             set({ cart: newCart });
//           }
//         }
//       },

//       clearCart: () => {
//         set({ cart: {}, restaurant: null });
//       },

//       getCartItemCount: () => {
//         const { cart } = get();
//         return Object.values(cart).reduce((total, item) => total + item.quantity, 0);
//       },

//       getCartTotal: () => {
//         const { cart } = get();
//         return Object.values(cart).reduce((total, item) => total + (item.price * item.quantity), 0);
//       },

//       getCartSubtotal: () => {
//         const { cart } = get();
//         return Object.values(cart).reduce((total, item) => total + (item.price * item.quantity), 0);
//       },

//       getCartItems: () => {
//         const { cart } = get();
//         return Object.values(cart);
//       },

//       isCartEmpty: () => {
//         const { cart } = get();
//         return Object.keys(cart).length === 0;
//       },

//       isInCart: (itemId) => {
//         const { cart } = get();
//         return cart[itemId] !== undefined;
//       },

//       getItemQuantity: (itemId) => {
//         const { cart } = get();
//         return cart[itemId] ? cart[itemId].quantity : 0;
//       }
//     }),
//     {
//       name: 'foodrush-cart',
//       partialize: (state) => ({
//         cart: state.cart,
//         restaurant: state.restaurant
//       })
//     }
//   )
// );
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      // State
      items: [],
      restaurantId: null,
      restaurantName: null,

      // Actions
      addToCart: (product) => {
        const { items, restaurantId } = get();

        // 1. Check for Restaurant Conflict
        if (restaurantId && restaurantId !== product.restaurantId) {
          const confirmSwitch = window.confirm(
            "Start a new basket? Adding items from a different restaurant will clear your current cart."
          );

          if (!confirmSwitch) return;

          set({
            items: [{ ...product, quantity: 1 }],
            restaurantId: product.restaurantId,
            restaurantName: product.restaurantName
          });
          return;
        }

        // 2. Add or Update Item
        const existingItemIndex = items.findIndex((item) => item.id === product.id);

        if (existingItemIndex > -1) {
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += 1;
          set({ items: updatedItems });
        } else {
          set({
            items: [...items, { ...product, quantity: 1 }],
            restaurantId: product.restaurantId,
            restaurantName: product.restaurantName
          });
        }
      },

      removeFromCart: (productId) => {
        const { items } = get();
        const updatedItems = items.filter((item) => item.id !== productId);

        if (updatedItems.length === 0) {
          set({ items: [], restaurantId: null, restaurantName: null });
        } else {
          set({ items: updatedItems });
        }
      },

      updateQuantity: (productId, quantity) => {
        const { items } = get();
        if (quantity < 1) {
          get().removeFromCart(productId);
          return;
        }

        const updatedItems = items.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        );
        set({ items: updatedItems });
      },

      clearCart: () => {
        set({ items: [], restaurantId: null, restaurantName: null });
      },

      getTotalPrice: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
    }),
    {
      name: 'foodrush-cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
