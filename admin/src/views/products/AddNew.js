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
import { dataService } from "../../services/apiServices/dataService";
import AWS from "aws-sdk";
const AddNewOrder = () => {
  AWS.config.update({
    accessKeyId: "YOUR_ACCESS_KEY_ID",
    secretAccessKey: "YOUR_SECRET_ACCESS_KEY",
    region: "YOUR_AWS_REGION",
  });

  const s3 = new AWS.S3();

  const [formData, setFormData] = useState({
    item_name: "",
    description: "",
    price: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call saveProduct function with formData
      const savedProduct = await dataService.saveProduct(formData);
      console.log("Product saved successfully:", savedProduct);
      // Optionally, perform any additional actions after successful product save
    } catch (error) {
      console.error("Failed to save product:", error);
      // Handle error
    }
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
      <h3>Add New Product</h3>
      <CForm onSubmit={handleSubmit}>
        <CRow>
          <CCol md="6">
            <CFormLabel htmlFor="productName" className="mt-4">
              Item Name
            </CFormLabel>
            <CFormInput
              type="text"
              id="itemname"
              name="item_name"
              value={formData.item_name}
              onChange={handleChange}
              required
            />
          </CCol>
          <CCol md="6">
            <CFormLabel htmlFor="keyWords" className="mt-4">
              Category Id
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
            <CFormLabel htmlFor="description" className="mt-4">
              Item Description
            </CFormLabel>
            <CFormTextarea
              id="description"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </CCol>
          <CCol md="6">
            <CFormLabel htmlFor="price" className="mt-4">
              Price
            </CFormLabel>
            <CFormInput
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </CCol>

          <CCol md="12">
            <CFormLabel htmlFor="imageUrl" className="mt-4">
              Product Images
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

export default AddNewOrder;
