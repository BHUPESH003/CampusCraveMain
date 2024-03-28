// const { httpService } = require("./initilzehttpService");
import { vendorData } from "../../../store";
import { httpService } from "./initilzehttpService";

export const dataService = {
  getVendorById: (vendorId) => {
    return httpService.get(`/vendor/${vendorId}`).then((result) => {
      return result.data;
    });
  },
  // getAllOrder: () => {
  //   return httpService.get(`/getAllOrder`).then((result) => {
  //     return result.data;
  //   });
  // },
   getAllVendors : () => {
    return httpService.get(`/vendor/all`).then((result) => {
      return result;
    });
  },
  // saveProduct: (productData) => {
  //   return httpService.post(`/saveProduct`, productData).then((result) => {
  //     return result.data;
  //   });
  // },
  // getProductById: (productId) => {
  //   return httpService.get(`/getProductById/${productId}`).then((result) => {
  //     return result.data;
  //   });
  // },
  saveCartData: (checkOutOrder) => {
    return httpService.post(`/user/saveUserData`, checkOutOrder).then((result) => {
      return result.data;
    // console.log("check");
    });
  },
  getPaymentIntent: (checkOutOrder) => {
    return (
      httpService.post <
      any >
      (`/create-payment-intent`, checkOutOrder).then((result) => {
        return result.data;
      })
    );
  },
};
