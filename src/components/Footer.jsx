import React from "react";
import Container from "./Container";
import Logo from "../../public/icons/footer-logo.svg";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { FaTelegramPlane } from "react-icons/fa";
import { RiPhoneFill } from "react-icons/ri";
import { IoMail } from "react-icons/io5";
import { FaTiktok } from "react-icons/fa";
import Map from "../../public/images/map.png";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="py-10 bg-[#191C1F]">
          <Container>
            <div className="flex justify-between flex-col md:flex-row items-center md:items-start gap-8 md:gap-0">
              <div className="flex flex-col items-center md:items-start gap-8 md:gap-0">
                <Link href={"/sdfjskdh"}>
                  <Image className="w-[190px] md:w-auto" src={Logo} alt="onepc logo" priority />
                </Link>
                <p className="max-w-[248px] hidden md:block my-5 text-[#ADB7BC]">
                  Yunusobod tumani, Kichik halqa yo’li 59
                </p>
                <p className="max-w-[248px] hidden md:block my-5 text-sm text-[#77878F]">
                  Ishtimoiy tarmoqlar
                </p>
                <div className="flex items-center gap-6">
                  <Link className="hover:scale-110 duration-150" href={"https://t.me/one_computers"} target="_blank">
                    <FaTelegramPlane size={24} color="white" />
                  </Link>
                  <Link className="hover:scale-110 duration-150" href={"https://www.instagram.com/one.computers/"} target="_blank">
                    <BiLogoInstagramAlt size={24} color="white" />
                  </Link>
                  <Link className="hover:scale-110 duration-150" href={"https://www.youtube.com/@onepcuz"} target="_blank">
                    <FaYoutube size={24} color="white" />
                  </Link>
                  <Link className="hover:scale-110 duration-150" href={"https://tiktok.com/@onepcuz"} target="_blank">
                    <FaTiktok size={24} color="white" />
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <p className="text-white font-medium mb-[18px]">BO’LIMLAR</p>
                <div className="flex flex-col gap-3">
                  <Link href={"/"} className="text-sm text-[#929FA5] hover:text-mainColor duration-150">
                    Yetkazib berish
                  </Link>
                  <Link href={"/"} className="text-sm text-[#929FA5] hover:text-mainColor duration-150">
                    Biz haqimizda
                  </Link>
                  <Link href={"/"} className="text-sm text-[#929FA5] hover:text-mainColor duration-150">
                    Savatcha
                  </Link>
                  <Link href={"/"} className="text-sm text-[#929FA5] hover:text-mainColor duration-150">
                    Kompyuter yig’ish
                  </Link>
                </div>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <p className="text-white font-medium mb-[18px]">
                  BIZ BILAN BOG’LANISH
                </p>
                <div className="flex flex-col gap-3">
                  <Link
                    href={"tel: +998995555050"}
                    className="text-sm text-[#929FA5] flex items-center gap-2 hover:text-mainColor duration-150"
                  >
                    <RiPhoneFill size={22} color="white" />
                    <span>+998 99 555 50 50</span>
                  </Link>
                  <Link
                    href={"tel: +998995555050"}
                    className="text-sm text-[#929FA5] flex items-center gap-2 hover:text-mainColor duration-150"
                  >
                    <RiPhoneFill size={22} color="white" />
                    <span>+998 99 555 50 50</span>
                  </Link>
                  <Link
                    href={"mailto:info@onepc.com"}
                    target="_blank"
                    className="text-sm text-[#929FA5] flex items-center gap-2 hover:text-mainColor duration-150"
                  >
                    <IoMail size={22} color="white" />
                    <span>info@onepc.com</span>
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block">
                <Image src={Map} alt="map image" />
              </div>
            </div>
          </Container>
        </div>
        <div className="bg-[#212427] h-10 md:h-[60px] flex items-center justify-center">
          <p className="text-center text-[#ADB7BC] text-xs md:text-sm">
            OnePC © 2024. Made by <Link href={"https://www.repid.uz/"} target="_blank">Repid agency</Link>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
