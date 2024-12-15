import React from "react";
import Container from "@/components/Container";

const About = () => {
  return (
    <>
      <section className="py-10 md:py-20">
        <Container>
          <div className="w-full flex flex-col items-center gap-2">
            <h1 className="text-[#1E242C] text-[28px] md:text-[40px] font-semibold md:font-bold text-center">
              Lorem ipsum
            </h1>
            <p className="text-[#8A8A8A] text-sm md:text-lg max-w-[780px] text-center mb-10 md:mb-[60px]">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.....
            </p>
          </div>
          <div className="w-full h-[300px] md:h-[500px] mb-6 md:mb-10 bg-no-repeat bg-cover bg-center bg-[url('/images/about-bg.jpg')]" />
          <div>
            <h2 className="text-xl md:text-[35px] font-semibold mb-[18px] md:mb-[25px]">
              Lorem ipsum dolor sit
            </h2>
            <p className="text-[#1C1D20] text-sm md:text-base">
              Sed ut perspiciatis, unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam eaque ipsa,
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas
              sit, aspernatur aut odit aut fugit, sed quia consequuntur magni
              dolores eos, qui ratione voluptatem sequi nesciunt, neque porro
              quisquam est, qui dolorem ipsum, quia dolor sit, amet,
              consectetur, adipisci velit, sed quia non numquam eius modi
              tempora incidunt, ut labore et dolore magnam aliquam quaerat
              voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem
              ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
              consequatur? Quis autem vel eum iure reprehenderit, qui in ea
              voluptate velit esse, quam nihil molestiae consequatur, vel illum,
              qui dolorem eum fugiat, quo voluptas nulla pariatur? At vero eos
              et accusamus et iusto odio dignissimos ducimus, qui blanditiis
              praesentium voluptatum deleniti atque corrupti, quos dolores et
              quas molestias excepturi sint, obcaecati cupiditate non provident,
              similique sunt in culpa, qui officia deserunt mollitia animi, id
              est laborum et dolorum fuga. Et harum quidem rerum facilis est et
              expedita distinctio.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
};

export default About;
