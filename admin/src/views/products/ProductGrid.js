import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "ag-grid-community/styles/ag-theme-quartz.css"; // Import Material theme
import { getAllProductsLoadableAtom } from "src/Context";
import { useNavigate } from "react-router-dom";
import { useAtomValue } from "jotai";

const ProductGrid = () => {
  const allOrders = useAtomValue(getAllProductsLoadableAtom);
  const [rowData, setRowData] = useState([]);
  console.log(rowData);

  useEffect(() => {
    if (allOrders.state === "hasData") {
      const ordersWithIndex = allOrders.data.map((order, index) => ({
        ...order,
        index: index + 1,
        actionTaken: false, // Initially, no action is taken on any order
      }));
      setRowData(ordersWithIndex);
    }
  }, [allOrders.state]);

  const navigate = useNavigate();
  const onRowClicked = (event) => {
    console.log(event);

    const orderId = event.data._id;
    console.log(orderId);
    navigate(`/products/details/${orderId}`);
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
