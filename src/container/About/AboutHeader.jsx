import React from "react";

const About = () => {
  return (
    <>
      <section className="h-[300px] md:h-[400px] bg-no-repeat bg-cover bg-center bg-[url('/images/about-header-bg2.png'),url('/images/about-header-bg.jpg')]">
        <div className="w-full h-full flex flex-col items-center justify-center px-4">
          <h1 className="text-white text-[28px] md:text-[60px] font-bold mb-3">Biz haqimizda</h1>
          <p className="max-w-[710px] text-center text-sm md:text-lg text-white">Lorem ipsum dolor sit amet consectetur. Velit sagittis nec vulputate aliquet at suspendisse dui semper feugiat.</p>
        </div>
      </section>
    </>
  );
};

export default About;
