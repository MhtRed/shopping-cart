import { useContext, createContext, ReactNode, useState } from "react";
import { Prev } from "react-bootstrap/esm/PageItem";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";
// Defining Types:
type ShoppingCardProviderProps = {
  children: ReactNode;
};
export type CartItem = {
  id: number;
  quantity: number;
};
type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
  isOpen: boolean;
};

//Creating ShoppingCart Context
const ShoppingCartContext = createContext({} as ShoppingCartContext);

//Consuming the ShoppingCart Context
export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

//Providing the ShoppingCart Context
export function ShoppingCardProvider({ children }: ShoppingCardProviderProps) {
  const [cartItems, setCartitems] = useLocalStorage<CartItem[]>(
    "Shoppig-Cart",
    []
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };
  const increaseCartQuantity = (id: number) => {
    setCartitems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity++ };
          } else {
            return item;
          }
        });
      }
    });
  };
  const decreaseCartQuantity = (id: number) => {
    setCartitems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  const removeFromCart = (id: number) => {
    setCartitems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  };
  const openCart = () => {
    setIsOpen(true);
  };
  const closeCart = () => {
    setIsOpen(false);
  };
  const cartQuantity = cartItems.reduce(
    (quantity, item) => quantity + item.quantity,
    0
  );
  return (
    <ShoppingCartContext.Provider
      value={{
        openCart,
        closeCart,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartQuantity,
        cartItems,
        isOpen,
      }}
    >
      {children}
      <ShoppingCart />
    </ShoppingCartContext.Provider>
  );
}
