import React from "react";
import { CButton } from "@coreui/react";
import { cilPlus } from "@coreui/icons";
import { useNavigate } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import CategoryGrid from "./CategoryGrid";

function Category() {
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/products/add/new");
  };

  return (
    <div className="container-fluid">
      <h3>All Products</h3>
      <div className="row">
        <div className="col-9">
          <CButton variant="ghost">SortBy</CButton>
          <CButton variant="ghost">Filter</CButton>
        </div>
        <div className="col-3">
          <CButton color="primary" onClick={handleAddClick}>
            <CIcon icon={cilPlus} /> Add New Product
          </CButton>
        </div>
      </div>
      <div className="col mt-5">
        <CategoryGrid />
      </div>
    </div>
  );
}

export default Category;