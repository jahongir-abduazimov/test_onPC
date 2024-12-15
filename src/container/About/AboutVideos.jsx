import React from "react";
import Container from "@/components/Container";
import { Player, BigPlayButton } from "video-react";
import Slider from "react-slick";
import "video-react/dist/video-react.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AboutVideos = () => {
  const settings = {
    dots: false,
    infinite: true,
    centerMode: true,
    slidesToScroll: 1,
    speed: 350,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <>
      <section className="pb-[80px] md:pb-[160px]">
        <Container>
          <div className="w-full flex flex-col items-center gap-2 mb-10">
            <h1 className="text-[#1E242C] text-[28px] md:text-[40px] font-bold text-center">
              Lorem ipsum
            </h1>
            <p className="text-[#8A8A8A] text-sm md:text-lg max-w-[780px] text-center">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s...
            </p>
          </div>
          <div className="md:hidden">
            <Slider {...settings}>
              <div className="flex flex-col gap-2 max-w-[93%]">
                <div className="rounded-[20px] lg:rounded-[30px] overflow-hidden">
                  <Player
                    playsInline
                    poster="/images/about-bg.jpg"
                    src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                  >
                    <BigPlayButton position="center" />
                  </Player>
                </div>
                <h2 className="mb-1 md:mb-2 text-[#111D15] font-medium text-lg md:text-[24px] text-center md:text-start px-2">Lorem, ipsum dolor.</h2>
                <p className="text-[#666666] text-[12px] md:text-base text-center md:text-start px-4">Lorem ipsum dolor sit amet consectetur. Id purus imperdiet rhoncus sociis pulvinar eu. Sem sit volutpat nisl lorem lacinia faucibus sed vitae.</p>
              </div>
              <div className="flex flex-col gap-2 max-w-[93%]">
                <div className="rounded-[20px] lg:rounded-[30px] overflow-hidden">
                  <Player
                    playsInline
                    poster="/images/about-bg.jpg"
                    src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                  >
                    <BigPlayButton position="center" />
                  </Player>
                </div>
                <h2 className="mb-1 md:mb-2 text-[#111D15] font-medium text-lg md:text-[24px] text-center md:text-start px-2">Lorem, ipsum dolor.</h2>
                <p className="text-[#666666] text-[12px] md:text-base text-center md:text-start px-4">Lorem ipsum dolor sit amet consectetur. Id purus imperdiet rhoncus sociis pulvinar eu. Sem sit volutpat nisl lorem lacinia faucibus sed vitae.</p>
              </div>
              <div className="flex flex-col gap-2 max-w-[93%]">
                <div className="rounded-[20px] lg:rounded-[30px] overflow-hidden">
                  <Player
                    playsInline
                    poster="/images/about-bg.jpg"
                    src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                  >
                    <BigPlayButton position="center" />
                  </Player>
                </div>
                <h2 className="mb-1 md:mb-2 text-[#111D15] font-medium text-lg md:text-[24px] text-center md:text-start px-2">Lorem, ipsum dolor.</h2>
                <p className="text-[#666666] text-[12px] md:text-base text-center md:text-start px-4">Lorem ipsum dolor sit amet consectetur. Id purus imperdiet rhoncus sociis pulvinar eu. Sem sit volutpat nisl lorem lacinia faucibus sed vitae.</p>
              </div>
            </Slider>
          </div>
          <div className="hidden w-full lg:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-start gap-10">
            <div className="flex flex-col gap-2">
              <div className="rounded-[20px] lg:rounded-[30px] overflow-hidden">
                <Player
                  playsInline
                  poster="/images/about-bg.jpg"
                  src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                >
                  <BigPlayButton position="center" />
                </Player>
              </div>
              <h2 className="mb-1 md:mb-2 text-[#111D15] font-medium text-lg md:text-[24px] text-center md:text-start">Lorem, ipsum dolor.</h2>
              <p className="text-[#666666] text-[12px] md:text-base text-center md:text-start">Lorem ipsum dolor sit amet consectetur. Id purus imperdiet rhoncus sociis pulvinar eu. Sem sit volutpat nisl lorem lacinia faucibus sed vitae.</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="rounded-[20px] lg:rounded-[30px] overflow-hidden">
                <Player
                  playsInline
                  poster="/images/about-bg.jpg"
                  src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                >
                  <BigPlayButton position="center" />
                </Player>
              </div>
              <h2 className="mb-1 md:mb-2 text-[#111D15] font-medium text-lg md:text-[24px] text-center md:text-start">Lorem, ipsum dolor.</h2>
              <p className="text-[#666666] text-[12px] md:text-base text-center md:text-start">Lorem ipsum dolor sit amet consectetur. Id purus imperdiet rhoncus sociis pulvinar eu. Sem sit volutpat nisl lorem lacinia faucibus sed vitae.</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="rounded-[20px] lg:rounded-[30px] overflow-hidden">
                <Player
                  playsInline
                  poster="/images/about-bg.jpg"
                  src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                >
                  <BigPlayButton position="center" />
                </Player>
              </div>
              <h2 className="mb-1 md:mb-2 text-[#111D15] font-medium text-lg md:text-[24px] text-center md:text-start">Lorem, ipsum dolor.</h2>
              <p className="text-[#666666] text-[12px] md:text-base text-center md:text-start">Lorem ipsum dolor sit amet consectetur. Id purus imperdiet rhoncus sociis pulvinar eu. Sem sit volutpat nisl lorem lacinia faucibus sed vitae.</p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default AboutVideos;
