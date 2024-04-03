import React, { useState } from "react";
import {
  CButton,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CFormTextarea,
  CFormCheck,
} from "@coreui/react";
import { useNavigate } from "react-router-dom";
// import { dataService } from "../../services/apiServices/dataService";
// import AWS from "aws-sdk";
import { envKey } from "src/Url";
const AddNewCategory = () => {
  const navigate = useNavigate();
  //   AWS.config.update({
  //     accessKeyId: "YOUR_ACCESS_KEY_ID",
  //     secretAccessKey: "YOUR_SECRET_ACCESS_KEY",
  //     region: "YOUR_AWS_REGION",
  //   });

  //   const s3 = new AWS.S3();

  const [formData, setFormData] = useState({
    category: "",
    imageUrl: [],
  });

  const handleChange = (e, index) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      const imagesArray = Array.from(files);
      setFormData((prevData) => ({ ...prevData, [name]: imagesArray }));
    } else if (name.startsWith("coupon")) {
      // Handling changes for discount coupon codes
      const updatedData = [...formData.discountCouponCode];
      const property = name.split(index)[0];
      updatedData[index] = { ...updatedData[index], [property]: value };
      setFormData((prevData) => ({
        ...prevData,
        discountCouponCode: updatedData,
      }));
    } else {
      // If it's a regular input, update the state
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // Function to render image previews
  const renderImagePreviews = () => {
    if (formData.imagePreviews) {
      return (
        <CContainer>
          <CRow>
            {formData.imagePreviews.map((preview, index) => (
              <CCol key={index} className="my-3">
                <img
                  className="img-fluid"
                  src={preview}
                  alt={`Preview ${index}`}
                  style={{
                    width: "100px",
                    height: "auto",
                    marginRight: "10px",
                  }}
                />
              </CCol>
            ))}
          </CRow>
        </CContainer>
      );
    }
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const imagesArray = Array.from(files);

    // Read each image file and create a preview URL
    const newImagePreviews = imagesArray.map((image) =>
      URL.createObjectURL(image)
    );

    // Update the form state with the new image previews along with preserving existing ones
    setFormData((prevData) => ({
      ...prevData,
      imagePreviews: [...(prevData.imagePreviews || []), ...newImagePreviews],
    }));
  };

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
      const { category } = formData;
      const response = await fetch(`${envKey.BASE_URL}/vendor/${vendorId}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryName: category }),
      });

      if (response.ok) {
        console.log("Category added successfully");
        // Optionally, perform any additional actions after successful category addition
      } else {
        console.error("Failed to add category:", response.statusText);
        // Handle error
      }
    } catch (error) {
      console.error("Error adding category:", error);
      // Handle error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    verifyTokenAndProceedToCheckout();
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // Upload images to AWS S3
  //     const uploadedImageUrls = await Promise.all(
  //       formData.imageUrl.map(async (imageFile) => {
  //         const params = {
  //           Bucket: 'YOUR_BUCKET_NAME',
  //           Key: `images/${imageFile.name}`,
  //           Body: imageFile,
  //           ACL: 'public-read',
  //         };

  //         const uploadResult = await s3.upload(params).promise();
  //         return uploadResult.Location;
  //       })
  //     );

  //     // Update form data with AWS image URLs
  //     const updatedFormData = {
  //       ...formData,
  //       imageUrl: uploadedImageUrls,
  //     };

  //     // Call saveProduct function with updated form data
  //     const savedProduct = await dataService.saveProduct(updatedFormData);
  //     console.log("Product saved successfully:", savedProduct);
  //     // Optionally, perform any additional actions after successful product save
  //   } catch (error) {
  //     console.error("Failed to save product:", error);
  //     // Handle error
  //   }
  // };

  return (
    <CContainer>
      <h3>Add New Category</h3>
      <CForm onSubmit={handleSubmit}>
        <CRow>
          <CCol md="6">
            <CFormLabel htmlFor="keyWords" className="mt-4">
              Category Name
            </CFormLabel>
            <CFormInput
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </CCol>

          <CCol md="12">
            <CFormLabel htmlFor="imageUrl" className="mt-4">
              Category Images
            </CFormLabel>

            {renderImagePreviews()}
            <CFormInput
              type="file"
              id="imageUrl"
              multiple
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleImageChange}
              accept="image/*"
            />
          </CCol>

          {/* Add other form fields similarly */}
        </CRow>

        <CButton color="primary" type="submit" className="mt-4 mb-4">
          Add Product
        </CButton>
      </CForm>
    </CContainer>
  );
};

export default AddNewCategory;
