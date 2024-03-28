import React, { useState } from "react";
import { Link } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { cilCart, cilSearch, cilUser } from "@coreui/icons";
import { cartItemQuantityAtom } from "../../store";
import { useAtomValue } from "jotai";
import { CBadge, CButton } from "@coreui/react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const bagCount = useAtomValue(cartItemQuantityAtom);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="navbar bg-body-tertiary shadow mb-3 sticky-top ">
      <div className="container-fluid d-flex justify-content-between">
        <Link
          to={"/"}
          className="text-decoration-none text-body heading  border-0"
        >
          Campus Crave
        </Link>
        <div
          className="d-flex justify-content-between"
          style={{ width: "23vw" }}
        >
          <Link to="/search" className="text-body mt-1">
            {" "}
            <CIcon icon={cilSearch} size="xxl" />{" "}
          </Link>

          <div
            className="dropdown"
            onMouseEnter={toggleDropdown}
            onMouseLeave={toggleDropdown}
          >
            <div type="button" id="dropdownMenuButton" aria-expanded="false" className="mt-1">
              <CIcon icon={cilUser} size="xxl" />
            </div>
            <ul
              className={`dropdown-menu ${isOpen ? "show" : ""}`}
              aria-labelledby="dropdownMenuButton"
            >
              <li>
                <a className="dropdown-item body-font" href="/my-account">
                  Profile
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item body-font"
                  href="/my-account/orders"
                >
                  Orders
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item body-font"
                  href="/my-account/favourites"
                >
                  Favourites
                </a>
              </li>
              <li>
                <a className="dropdown-item body-font" href="/logout">
                  Logout
                </a>
              </li>
            </ul>
          </div>
          <Link to="/checkout" className="text-body">
            <CButton className="border-0 bg-light text-black position-relative">
              <CIcon icon={cilCart} size="xxl" />
              {bagCount ? (
                <CBadge color="danger" position="top-end" shape="rounded-pill">
                   {bagCount} 
                </CBadge>
              ) : null}
            
            </CButton>
          </Link>
        </div>
      </div>
    </nav>
    // <div classNameName=' container-fluid border-bottom py-3 '>
    //   <div className=" row ">
    //     <div className="col-6">
    //     <Link to='/' className="text-3xl font-bold tracking-tight text-orange-500">
    //         CampusCrave
    //       </Link>
    //     </div>
    //     <div className='col-2 '>
    //     <CIcon icon={cilSearch} />
    //     <Link  to='/search'>

    //       Search
    //     </Link>
    //     </div>
    //       <div className="col-4 text-end ">
    //       <Link to='/checkout'>
    //       <CIcon  icon={cilCart}></CIcon>
    //       Cart

    //       </Link>
    //       </div>

    //   </div>
    // </div>
  );
}

export default Header;
