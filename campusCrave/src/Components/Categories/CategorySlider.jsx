import React, { useState, useEffect, useRef } from "react";
import { Button, Carousel, Col, Row } from "react-bootstrap";
import CategoryOverview from "./CategoryOverview";
import CIcon from "@coreui/icons-react";
import { cilArrowLeft, cilArrowRight } from "@coreui/icons";

const CategorySlider = (props) => {
  const [sliderCount, setSliderCount] = useState([]);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [index, setIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (props.data && props.data.length <= 6) {
      setSliderCount([0]);
    } else if (props.data && props.data.length > 6 && props.data.length <= 12) {
      setSliderCount([0, 1]);
    } else if (props.data && props.data.length > 12 && props.data.length < 18) {
      setSliderCount([0, 1, 2]);
    } else {
      setSliderCount([0, 1, 2, 3]);
    }

    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const handlePrevSlide = () => {
    if (index > 0) {
      setIndex(index - 1);
      carouselRef.current.prev();
    }
  };

  const handleNextSlide = () => {
    if (index < sliderCount.length - 1) {
      setIndex(index + 1);
      carouselRef.current.next();
    }
  };

  return (
    <div className="container-fluid h-100">
      <h2 className="text-center mt-3 heading">
        {props.heading}
      </h2>
      {props ? (
        <>
          <Carousel
            ref={carouselRef}
            indicators={false}
            controls={false}
            onSelect={handleSelect}
            interval={null}
          >
            {sliderCount.map((index) => (
              <Carousel.Item key={index}>
                <Row key={index}>
                  {Array.isArray(props.data) ? (
                    windowSize < 768 ? (
                      props.data
                        .slice(index * 3, index * 3 + 3)
                        .map((product) => {
                          return (
                            <Col key={product._id} xs={4} sm={4} md={3} lg={2}>
                              <CategoryOverview data={product} />
                            </Col>
                          );
                        })
                    ) : windowSize >= 768 && windowSize < 992 ? (
                      props.data
                        .slice(index * 4, index * 4 + 4)
                        .map((product) => {
                          return (
                            <Col key={product._id} xs={3} sm={3} md={3} lg={2}>
                              <CategoryOverview data={product} />
                            </Col>
                          );
                        })
                    ) : windowSize >= 992 && windowSize < 1200 ? (
                      props.data
                        .slice(index * 6, index * 6 + 6)
                        .map((product) => {
                          return (
                            <Col key={product._id} xs={3} sm={3} md={3} lg={2}>
                              <CategoryOverview data={product} />
                            </Col>
                          );
                        })
                    ) : (
                      props.data
                        .slice(index * 6, index * 6 + 6)
                        .map((product) => {
                          return (
                            <Col key={product._id} xs={3} sm={3} md={3} lg={2}>
                              <CategoryOverview data={product} />
                            </Col>
                          );
                        })
                    )
                  ) : (
                    <p>Error: props.data is not an array</p>
                  )}
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            {sliderCount.map((_, idx) => (
              <span
                key={idx}
                style={{
                  display: "inline-block",
                  margin: "0 7px",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  border: "2px solid black",
                  backgroundColor: idx === index ? "black" : "",
                }}
              />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            {windowSize > 768 ? (
              <>
                <CIcon
                  onClick={handlePrevSlide}
                  icon={cilArrowLeft}
                  size="3xl"
                  style={{}}
                  className="rounded-circle bg-black text-white p-2 mx-2"
                />

                <CIcon
                  onClick={handleNextSlide}
                  icon={cilArrowRight}
                  size="3xl"
                  className="rounded-circle sub-heading bg-black text-white p-2 mx-2"
                />
              </>
            ) : (
              <>
                <CIcon
                  onClick={handlePrevSlide}
                  icon={cilArrowLeft}
                  size="xxl"
                  className="rounded-circle bg-secondary text-light p-2 mx-2"
                />

                <CIcon
                  onClick={handleNextSlide}
                  icon={cilArrowRight}
                  size="xxl"
                  className="rounded-circle bg-secondary text-light p-2 mx-2"
                />
              </>
            )}
          </div>
        </>
      ) : (
        "No Data Available"
      )}
    </div>
  );
};

export default CategorySlider;
