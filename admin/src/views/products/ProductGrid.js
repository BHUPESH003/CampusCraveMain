import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "ag-grid-community/styles/ag-theme-quartz.css"; // Import Material theme
import { getAllProductsLoadableAtom } from "src/Context";
import { useNavigate } from "react-router-dom";
import { useAtomValue } from "jotai";
import { envKey } from "src/Url";

const ProductGrid = () => {
  // const allOrders = useAtomValue(getAllProductsLoadableAtom);
  const [rowData, setRowData] = useState([]);
  console.log(rowData);

  // useEffect(() => {
  //   if (allOrders.state === "hasData") {
  //     const ordersWithIndex = allOrders.data.map((order, index) => ({
  //       ...order,
  //       index: index + 1,
  //       actionTaken: false, // Initially, no action is taken on any order
  //     }));
  //     setRowData(ordersWithIndex);
  //   }
  // }, [allOrders.state]);
  const verifyTokenAndProceedToCheckout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        // Redirect to login page or display a message
        navigate("/login");
        return;
      }

      const response = await fetch(
        "http://localhost:3001/vendor/verify-token",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        // Handle unauthorized access or invalid token
        // Redirect to login page or display a message
        return;
      }
      const { vendorId } = await response.json();
      console.log({ vendorId });
      // console.log("here")
      fetchData(vendorId);
      // makePayment(userName);
    } catch (error) {
      console.error("Error verifying token and proceeding to checkout:", error);
    }
  };

  const fetchData = async (vendorId) => {
    console.log("Fetching", vendorId);
    try {
      // Fetch orders for a specific vendor (replace 'vendorId' with the actual vendor ID)
      // const vendorId = 6; // Replace 'vendorId' with the actual vendor ID

      const response = await fetch(
        `${envKey.BASE_URL}/vendor/${vendorId}/item`
      );
      const data = await response.json();

      setRowData(data); // Update state with fetched orders data
      console.log(data); // Log the fetched orders data
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  useEffect(() => {
    // Assuming you want to fetch orders when the component mounts
    verifyTokenAndProceedToCheckout();

    // Call the fetchData function
  }, []); // Empty dependency array to fetch data only once when the component mounts
  // Empty dependency array to fetch data only once when the component mounts


  const navigate = useNavigate();
  const onRowClicked = (event) => {
    console.log(event);

    const productId = event.data._id;
    console.log(productId);
    navigate(`/products/details/${productId}`);
  };

  const columnDefs = [
    // { headerName: "Serial No.", field: "index", sortable: true, filter: true },
    {
      headerName: "Product",
      field: "productName",
      sortable: true,
      filter: true,
      pinned: "left",
    },
    {
      headerName: "Price",
      field: "price",
      sortable: true,
      filter: true,
      //   valueFormatter: (params) => formatDate(params.value),
    },
    {
      headerName: "Inventory",
      field: "quantity",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Status",
      field: "visible",
      //   valueGetter: (params) => totalItemsCounts[params.node.rowIndex],
      sortable: true,
      filter: true,
    },
    {
      headerName: "Tags",
      field: "keyWords",
      sortable: true,
      filter: true,
    },
  ];

  return (
    <div
      className="ag-theme-quartz-dark"
      style={{ height: 400, width: "100%" }}
    >
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        onRowClicked={onRowClicked}
      />
    </div>
  );
};

export default ProductGrid;
