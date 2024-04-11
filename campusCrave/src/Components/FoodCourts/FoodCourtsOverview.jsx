import { cilClock, cilStar } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import Vendor1 from "../../assets/Vendor1.jpg";
import { Link } from "react-router-dom";
import { s3 } from "../../../env";
function FoodCourtsOverview(props) {
  
  const slicedString=props.image_path.slice(2,props.image_path.length-2);
  return (
    <div className="col-6 col-md-3 my-4 ">
      <Link 
        to={`/vendor/${props.vendor_id}`}
        className="text-body text-decoration-none"
      >
        <img src={s3.baseUrl + slicedString} style={{width:"40vw" , height:"20vw"}} className="rounded img-fluid" alt="..." />
        <div className="">
          <span className="fw-bold sub-heading">{props.vendor_name}</span>

          <div className="d-flex justify-content-start ">
            <span className="w-50 fw-semibold">
              <span className="p-2 body-font text-body">
                🌟{props.overall_rating}
              </span>
            </span>
            <span className="w-50 fw-semibold">
              <CIcon icon={cilClock} size="xl" />
              <span className="p-2 body-font">{props.avg_time}</span>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default FoodCourtsOverview;
