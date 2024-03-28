// import { dataService } from "./services/apiServices/dataService";
import { loadable } from "jotai/utils"; // Importing the `loadable` function from Jotai utilities
import { atom, createStore } from "jotai"; // Importing `atom` and `createStore` functions from Jotai
import { dataService } from "./pages/services/apiServices/dataService";

// Creating a Jotai store
export const barnshennStore = createStore();

// Atom for fetching all products asynchronously
// const getAllProducts = atom(async () => {
//   return dataService.getAllProducts().then((x) => x);
// });
// export const getAllProductsLoadableAtom = loadable(getAllProducts); // Creating a loadable atom using `loadable`

// Atom for user data
// export const userAtom = atom(data);

// Atom for fetching all orders
// export const getAllVendors = atom<Promise>(async () => {
//   return dataService.getAllVendors().then((x) => x);
// });
export class vendorData {
  vendorId;
  userId;
  vendorName;
  vendorDesc;
  imgPath;
}

export const getAllVendors = atom(async () => {
  try {
    const result = await dataService.getAllVendors();
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error fetching all vendors:", error);
    throw error; // Re-throw the error to handle it in the caller
  }
});
export const getAllVendorsLoadableAtom = loadable(getAllVendors);

// Atom for fetching user data asynchronously
// export const getUserData = atom(async () => {
//   return dataService.saveCartData({}).then((x) => x);
// });
// export const getUserLoadableAtom = loadable(getUserData);

// Atoms for orders, cart items, cart item quantity, wishlist, wishlist count, and item in wishlist status
// export const orders = atom([]);
export const cartAtomNew = atom([]);
export const cartItemQuantityAtom = atom((get) => {
  const cartItems = get(cartAtomNew);
  const totalQuantity = cartItems.reduce(
    (total, item) => +total.toString() + +item.bagCount.toString(),
    0
  );
  return totalQuantity;
});

// export const wishlistAtom = atom([]);
// export const wishlistCountAtom = atom((get) => {
//   const wishlistItems = get(wishlistAtom);
//   const totalQuantity = wishlistItems.length;
//   return totalQuantity;
// });
// export const isItemInWishlistAtom = atom((get) => (productName) => {
//   const wishlistItems = get(wishlistAtom);
//   return wishlistItems.some((item) => item.name === productName);
// });

// Atoms for bag payment, payment status, user authentication, checkout page, stripe secret, username, user data, and popup status
// export const BagPayment = atom(true);
// export const paymentStatus = atom(false);
// export const userAuth = atom(null);
// export const onCheckoutPage = atom(false);
// export const stripeSecretAtom = atom(undefined);
// export const usernameAtom = atom(localStorage.getItem("username"));
// export const userDataAtom = atom(localStorage.getItem("user"));
// export const showPopUp = atom(false);
