import { dataService } from "../apiServices/dataService";

export const handleCartService = {
  emptyCartItem: (cartItems, itemId) => {
    let newCart = [];
    newCart = cartItems.filter((item) => item.productId !== itemId);
    if (localStorage.getItem("token")) {
      dataService.saveCartData({ cartProducts: newCart }).then((x) => {
        newCart = x.cartProducts;
      });
    }
    return newCart;
  },
  updateCartApi: (cartItems, data) => {
    const currentCartItem = cartItems.find((x) => {
      x.productId === data.item_id;
    });
    let newCart = [];
    if (currentCartItem) {
      console.log(cartItems);

      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem.productId === data.item_id) {
          return {
            ...cartItem,
            quantityOrdered: cartItem.quantityOrdered + 1,
            totalAmount: (
              parseFloat(data.price) *
              (cartItem.quantityOrdered + 1)
            ).toFixed(2),
          };
        }
        return cartItem;
      });
      newCart = updatedCartItems;
    } else {
      newCart = [
        ...cartItems,
        {
          productId: data.item_id,
          name: data.item_name,
          costPerUnit: data.price,
          quantityOrdered: 1,
          totalAmount: data.price,
          imageUrl: data.image_url,
        },
      ];
    }
    if (localStorage.getItem("token")) {
      dataService.saveCartData({ cartProducts: newCart }).then((x) => {
        newCart = x.cartProducts;
      });
    }
    return newCart;
  },
  increaseCartCount: (cartItem, data) => {
    let newCart = [];

    newCart = cartItem.map((item) =>
      item.productId === data.item_id
        ? {
            ...item,
            quantityOrdered: item.quantityOrdered + 1,
            totalAmount: (
              parseFloat(item.costPerUnit) *
              (item.quantityOrdered + 1)
            ).toFixed(2),
          }
        : item
    );
    if (localStorage.getItem("token"))
      dataService.saveCartData({ cartProducts: newCart }).then((x) => {
        newCart = x.cartProducts;
      });
    return newCart;
  },
  decreaseCartCount: (cartItem, data) => {
    let newCart = [];
    if (data.quantityOrdered > 1) {
      newCart = cartItem.map((item) =>
        item.productId === data.item_id
          ? {
              ...item,
              quantityOrdered: item.quantityOrdered - 1,
              totalAmount: (
                parseFloat(item.costPerUnit) *
                (item.quantityOrdered - 1)
              ).toFixed(2),
            }
          : item
      );
    }
    if (localStorage.getItem("token"))
      dataService.saveCartData({ cartProducts: newCart }).then((x) => {
        newCart = x.cartProducts;
      });
    return newCart;
  },
};
