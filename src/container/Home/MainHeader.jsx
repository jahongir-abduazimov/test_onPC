import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import Slider from "react-slick";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import request from "@/components/config";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MainHeader = () => {
  const [loading, setLoading] = useState(false);
  const PrevArrow = ({ onClick }) => (
    <div
      className={`slick-prev:before w-[50px] h-[50px] lg:w-[70px] lg:h-[70px] slick-arrow absolute top-[38%] bg-[#fff] -left-[25px] lg:-left-[35px] ${loading ? "hidden" : "flex"
        }`}
      onClick={onClick}
      style={{
        color: "#FF0000",
        borderRadius: "50%",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
        cursor: "pointer",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div>
        <GrFormPrevious className="text-[30px]" />
      </div>
    </div>
  );

  const NextArrow = ({ onClick }) => (
    <div
      className={`slick-next:before w-[50px] h-[50px] lg:w-[70px] lg:h-[70px] z-20 slick-arrow absolute top-[38%] bg-[#fff] -right-[25px] lg:-right-[35px] ${loading ? "hidden" : "flex"
        }`}
      onClick={onClick}
      style={{
        color: "#FF0000",
        borderRadius: "50%",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
        cursor: "pointer",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div>
        <GrFormNext className="text-[30px]" />
      </div>
    </div>
  );
  const settings = {
    dots: true,
    infinite: true,
    speed: 350,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    className: "main-slider-class",
    dotsClass: "main-dots-class",
    responsive: [
      {
        breakpoint: 639,
        settings: {
          nextArrow: false,
          prevArrow: false,
        },
      },
    ],
  };

  const [banners, setBanners] = useState([]);

  const getBanners = async () => {
    setLoading(true);
    try {
      const response = await request.get("/common/advertisement/");
      setBanners(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getBanners();
  }, []);
  return (
    <section className="pt-5 pb-[32px] md:pb-[60px] overflow-hidden">
      <Container>
        {loading ? (
          <div className="rounded-lg sm:rounded-[16px] h-[142px] sm:h-[220px] md:h-[280px] lg:h-[320px] xl:h-[360px] relative overflow-hidden">
            <Skeleton className="w-full h-full rounded-[16px]" />
          </div>
        ) : (
          <div className="rounded-lg sm:rounded-[16px] h-[142px] sm:h-[220px] md:h-[280px] lg:h-[320px] xl:h-[360px] relative overflow-hidden sm:overflow-visible">
            {banners.length > 1 && (
              <Slider {...settings}>
                {banners?.map((item) => (
                  <Link
                    href={item.link}
                    key={item.id}
                    className="overflow-hidden w-full h-[142px] sm:h-[220px] md:h-[280px] lg:h-[320px] xl:h-[360px] sm:rounded-[16px] outline-none"
                  >
                    <img
                      width={1000}
                      height={1000}
                      className="w-full h-full object-cover"
                      src={`https://pc.repid.uz${item.image}`}
                      alt="ads"
                    />
                  </Link>
                ))}
              </Slider>
            )}
            {banners.length == 1 &&
              banners?.map((item) => (
                <div
                  href={item.link}
                  key={item.id}
                  className="overflow-hidden w-full h-[142px] sm:h-[220px] md:h-[280px] lg:h-[320px] xl:h-[360px] sm:rounded-[16px] outline-none"
                >
                  <img
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover"
                    src={`https://pc.repid.uz${item.image}`}
                    alt="ads"
                  />
                </div>
              ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default MainHeader;
