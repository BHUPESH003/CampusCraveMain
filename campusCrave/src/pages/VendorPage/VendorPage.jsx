import { cilClock, cilStar } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React, { useEffect, useState } from "react";
import { env } from "../../../env";
import axios from "axios";
import { useParams } from "react-router-dom";
import VendorDetails from "./VendorDetails";
import { getAllVendorsLoadableAtom } from "../../store";
import { useAtomValue } from "jotai";
import { dataService } from "../services/apiServices/dataService";

export default function VendorPage() {
  const [vendorDetails, setVendorDetails] = useState();
  const { vendorId } = useParams();

  useEffect(() => {
    // Fetch categories from the backend API
    axios
      .get(`${env.baseUrl}/vendor/${vendorId}/items`)
      .then((response) => setVendorDetails(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // console.log(vendorDetails);
  // const { vendorId } = useParams();
  // const [vendorDetails, setProduct] = useState();
  // const allVendors = useAtomValue(getAllVendorsLoadableAtom);
  // useEffect(() => {
  //   if (allVendors.state == "hasData" && allVendors.data) {
  //     console.log("here")
  //     dataService.getVendorById(vendorId).then((x) => {
  //       setProduct(x);
  //     });
  //   }
  // }, [allVendors.state]);
  // console.log(allVendors);

  return (
    <div className="container">
      <div className="row p-4 ">
        <div className="col-9">
          <span className="sub-heading fw-bold">
            {vendorDetails && vendorDetails[0] && vendorDetails[0].vendor_name}
          </span>
          <br />
          <span className="text-muted body-font">
            {vendorDetails && vendorDetails[0] && vendorDetails[0].vendor_desc}
          </span>
        </div>

        <div className="col-3 text-center align-self-center">
          <span className="body-font">
            🌟
            {vendorDetails &&
              vendorDetails[0] &&
              parseFloat(vendorDetails[0].vendor_avg_rating).toFixed(2)}
          </span>
        </div>
        <div className="border-success border-top pt-3 mt-3">
          <CIcon icon={cilClock} size="xl" />
          <span className="p-2 text-muted body-font">
            <b>
              {vendorDetails && vendorDetails[0] && vendorDetails[0].avg_time}
            </b>
          </span>
        </div>
      </div>
      <div className="container">
        {vendorDetails &&
          vendorDetails[0] &&
          vendorDetails.map((vendorDetails) => (
            <VendorDetails {...vendorDetails} />
          ))}
      </div>
    </div>
  );
}
