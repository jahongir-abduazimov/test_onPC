import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Container from "./Container";
import { RiHeart3Line } from "react-icons/ri";
import { GoChevronDown } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { GoChevronRight } from "react-icons/go";
import { BiCategory } from "react-icons/bi";
import Logo from "../../public/icons/logo.svg";
import Logo2 from "../../public/icons/footer-logo.svg";
import SearchIcon from "../../public/icons/search.svg";
import ComparisonIcon from "../../public/icons/comparison.svg";
import CartIcon from "../../public/icons/cart.svg";
import CollectionIcon from "../../public/icons/bx_collection.svg";
import PhoneIcon from "../../public/icons/header-phone.svg";
import TruckIcon from "../../public/icons/truck.svg";
import DiscountIcon from "../../public/icons/discount.svg";
import AboutIcon from "../../public/icons/about.svg";
import LanguageIcon from "../../public/icons/language.svg";
import HamburgerMenu from "../../public/icons/hamburger-menu.svg";
import UzIcon from "../../public/images/uz-icon.webp";
import EnIcon from "../../public/images/en-icon.png";
import RuIcon from "../../public/images/ru-icon.png";
import Link from "next/link";
import Image from "next/image";
import request from "../components/config/index";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";

const Header = () => {
  const navigate = useRouter();
  const [searchText, setSearchText] = useState("");
  const [menu, setMenu] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [langMenu, setLangMenu] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchMenu, setSearchMenu] = useState(false);
  const langMenuRef = useRef(null);
  const { t } = useTranslation('header');

  const router = useRouter();
  const { locale, locales } = router;

  const changeLanguage = (newLocale) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  console.log(locale);

  const search = async () => {
    const newData = {
      search: searchText,
    };
    try {
      const response = await request.post("/product/search/", newData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      console.log(response);
      setSearchResult(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (searchText) {
      search();
    }
  }, [searchText]);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menu]);

  useEffect(() => {
    if (searchText) {
      setSearchMenu(true);
    } else {
      setSearchMenu(false);
    }
  }, [searchText]);

  const getCategories = async () => {
    setCategoryLoading(true);
    try {
      const response = await request.get("/product/category/list/");
      setCategories(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setCategoryLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText) {
      navigate.push(`/search/${searchText}`);
      setSearchMenu(false);
      setSearchText("");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setLangMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact-section");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const closeMenu = () => setMenu(false);
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-[99] transition-opacity duration-150 ${
          menu
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      <div
        className={`w-[80%] h-full bg-[#fff] fixed z-[100] overflow-hidden transition-transform duration-150 ${
          menu ? "translate-x-0" : "-translate-x-[100%]"
        }`}
      >
        <div className="h-[50px] bg-[#071B3B] px-5 flex items-center justify-between">
          <Link onClick={() => setMenu(false)} href={"/"}>
            <Image width={91} src={Logo2} alt="onepc logo" priority />
          </Link>
          <button onClick={() => setMenu(false)}>
            <IoMdClose size={20} color="white" />
          </button>
        </div>
        <div className="pt-5 pb-6 px-5">
          <div className="flex w-auto items-center gap-10 overflow-auto scrollbar-none">
            <button
              onClick={() => {
                setMenu(false);
                navigate.push("/compare");
              }}
              className="flex items-center gap-2.5  rounded-lg"
            >
              <Image src={ComparisonIcon} alt="comparison icon" />
              <span className="text-xs text-[#222222]">Taqqoslash</span>
            </button>
            <button
              onClick={() => {
                setMenu(false);
                navigate.push("/cart");
              }}
              className="flex items-center gap-2.5  rounded-lg"
            >
              <Image width={16} src={CartIcon} alt="cart icon" />
              <span className="text-xs text-[#222222]">Savatcha</span>
            </button>
            <button
              onClick={() => {
                setMenu(false);
                navigate.push("/wishlist");
              }}
              className="flex items-center gap-2.5  rounded-lg"
            >
              <RiHeart3Line color="#FF0000" />
              <span className="text-xs text-[#222222]">Sevimlilar</span>
            </button>
            <button
              onClick={() => {
                setMenu(false);
                navigate.push("/setup/2");
              }}
              className="flex items-center gap-2.5  rounded-lg"
            >
              <Image width={16} src={CollectionIcon} alt="collection icon" />
              <span className="text-xs text-[#222222]">Kompyuter yig’ish</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-y-6 px-5 overflow-y-auto h-full">
          {categories.map((item) => (
            <Link
              key={item.id}
              href={{
                pathname: `/categories/${item.name_en
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`,
                query: { query: item.id },
              }}
            >
              <button
                onClick={() => setMenu(false)}
                className="w-full flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-[24px] h-[24px]">
                    <Image
                      width={24}
                      height={24}
                      src={
                        item?.icon.slice(0, 4) == "http"
                          ? item.icon || null
                          : `https://pc.repid.uz${item?.icon}` || null
                      }
                      alt={item?.name_uz}
                    />
                  </div>
                  <span className="text-[#242E42]">{item.name_uz}</span>
                </div>
                <GoChevronRight size={16} color="#C1C0C9" />
              </button>
            </Link>
          ))}
        </div>
      </div>
      <header>
        <div
          className="h-[60px] items-center bg-no-repeat bg-cover hidden min-[950px]:flex"
          style={{ backgroundImage: "url('/icons/banner.svg')" }}
        />
        <div className="bg-[#F5F5F5] hidden min-[950px]:flex">
          <Container>
            <div className="flex items-center justify-between h-[35px]">
              <p className="text-sm text-[#666666]">OnePC ga xush kelibsiz!</p>
              <div className="flex items-center gap-3">
                <Link
                  className="flex items-center gap-[6px] pr-3 border-r border-r-[#D9D9D9]"
                  href={"tel: +998959041111"}
                >
                  <Image src={PhoneIcon} alt="search icon" />
                  <span className="text-sm text-[#666666]">
                    +998 95 904 11 11
                  </span>
                </Link>
                <Link
                  className="flex items-center gap-[6px] pr-3 border-r border-r-[#D9D9D9]"
                  href={"/"}
                >
                  <Image src={TruckIcon} alt="search icon" />
                  <span className="text-sm text-[#666666]">
                    Yetkazib berish
                  </span>
                </Link>
                <button
                  className="flex items-center gap-[6px] pr-3 border-r border-r-[#D9D9D9]"
                  onClick={scrollToContact}
                >
                  <Image src={DiscountIcon} alt="search icon" />
                  <span className="text-sm text-[#666666]">
                    Biz bilan bog’lanish
                  </span>
                </button>
                <Link
                  className="flex items-center gap-[6px] pr-3 border-r border-r-[#D9D9D9]"
                  href={"/about"}
                >
                  <Image src={AboutIcon} alt="search icon" />
                  <span className="text-sm text-[#666666]">Biz haqimizda</span>
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setLangMenu(!langMenu)}
                    className="flex items-center gap-[6px]"
                    href={"/"}
                  >
                    <Image src={LanguageIcon} alt="search icon" />
                    <span className="text-sm text-[#666666]">Uz</span>
                    <GoChevronDown color="#6F6F6F" />
                  </button>
                  <div
                    className={`absolute right-0 w-[130px] flex-col gap-1 bg-white z-20 border shadow-lg rounded-md overflow-hidden p-2 ${
                      langMenu ? "flex" : "hidden"
                    }`}
                  >
                    <button
                      onClick={() => changeLanguage("uz")}
                      className="w-full rounded-md flex items-center gap-2 px-2 py-1 hover:bg-black/10 duration-150"
                    >
                      <Image
                        width={25}
                        height={25}
                        src={UzIcon}
                        alt="uz icon"
                        className="scale-110"
                      />
                      <span className="font-medium">UZ</span>
                    </button>
                    <button
                      onClick={() => changeLanguage("en")}
                      className="w-full rounded-md flex items-center gap-2 px-2 py-1 hover:bg-black/10 duration-150"
                    >
                      <Image
                        width={25}
                        height={25}
                        src={EnIcon}
                        alt="uz icon"
                      />
                      <span className="font-medium">EN</span>
                    </button>
                    <button
                      onClick={() => changeLanguage("ru")}
                      className="w-full rounded-md flex items-center gap-2 px-2 py-1 hover:bg-black/10 duration-150"
                    >
                      <Image
                        width={25}
                        height={25}
                        src={RuIcon}
                        alt="uz icon"
                      />
                      <span className="font-medium">Ру</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <Container>
          <nav className="w-full min-[950px]:h-[84px] block gap-5 items-center py-3 justify-between min-[950px]:flex min-[950px]:py-0">
            <div className="flex items-center justify-between gap-[25px] xl:gap-[40px]">
              <Link href={"/"}>
                <Image
                  className="w-[119px] min-[950px]:w-auto"
                  src={Logo}
                  alt="onepc logo"
                  priority
                />
              </Link>
              <div className="relative min-[950px]:hidden" ref={langMenuRef}>
                <button
                  onClick={() => setLangMenu(!langMenu)}
                  className="flex items-center gap-[6px]"
                  href={"/"}
                >
                  <Image src={LanguageIcon} alt="search icon" />
                  <span className="text-sm text-[#666666]">Uz</span>
                  <GoChevronDown color="#6F6F6F" />
                </button>
                <div
                  className={`absolute right-0 w-[130px] flex-col gap-1 bg-white z-20 border shadow-lg rounded-md overflow-hidden p-2 ${
                    langMenu ? "flex" : "hidden"
                  }`}
                >
                  <button className="w-full rounded-md flex items-center gap-2 px-2 py-1 hover:bg-black/10 duration-150">
                    <Image
                      width={25}
                      height={25}
                      src={UzIcon}
                      alt="uz icon"
                      className="scale-110"
                    />
                    <span className="font-medium">UZ</span>
                  </button>
                  <button className="w-full rounded-md flex items-center gap-2 px-2 py-1 hover:bg-black/10 duration-150">
                    <Image width={25} height={25} src={EnIcon} alt="uz icon" />
                    <span className="font-medium">EN</span>
                  </button>
                  <button className="w-full rounded-md flex items-center gap-2 px-2 py-1 hover:bg-black/10 duration-150">
                    <Image width={25} height={25} src={RuIcon} alt="uz icon" />
                    <span className="font-medium">Ру</span>
                  </button>
                </div>
              </div>
              <form
                className="hidden min-[950px]:block"
                onSubmit={handleSearch}
              >
                <div className="relative">
                  <input
                    className="w-auto lg:w-[270px] xl:w-[450px] bg-[#D9D9D933] outline-none ring-1 ring-[#EDEDED] focus:ring-mainColor duration-200 h-11 pl-11 pr-4 rounded-[8px]"
                    type="text"
                    placeholder="Qidiruv..."
                    value={searchText}
                    onChange={(e) => {
                      setSearchText(e.target.value);
                    }}
                  />
                  <Image
                    className="absolute top-[13px] left-[15px]"
                    src={SearchIcon}
                    alt="search icon"
                  />
                  <div
                    className={`w-full max-h-[400px] overflow-y-auto absolute top-12 bg-white flex-col gap-1 shadow-xl p-4 rounded-lg z-20 ${
                      searchMenu ? "flex" : "hidden"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        navigate.push(
                          `/search/${searchText.replace(/\s+/g, "-")}`
                        );
                        setSearchMenu(false);
                        setSearchText("");
                      }}
                      className="px-3 min-h-10 hover:bg-black/5 w-full duration-150 font-medium flex items-center gap-3 text-start rounded-md"
                    >
                      <Image src={SearchIcon} alt="search icon" />
                      <span className="line-clamp-1">{searchText}</span>
                    </button>
                    {searchResult.categories?.map((item) => (
                      <button
                        type="button"
                        onClick={() => {
                          navigate.push(
                            `/categories/${item.name_en
                              .replace(/\s+/g, "-")
                              .toLowerCase()}?query=${item.id}`
                          );
                          setSearchMenu(false);
                          setSearchText("");
                        }}
                        key={item.id}
                        className="px-3 min-h-10 hover:bg-black/5 w-full font-medium duration-150 flex items-center gap-3 text-start rounded-md text-black/60"
                      >
                        <BiCategory size={24} className="text-black/60" />
                        <span className="line-clamp-1">{item.name_uz}</span>
                      </button>
                    ))}
                    {searchResult.products?.map((item) => (
                      <button
                        type="button"
                        onClick={() => {
                          navigate.push(`/product/${item.id}`);
                          setSearchMenu(false);
                          setSearchText("");
                        }}
                        key={item.id}
                        className="px-3 min-h-20 hover:bg-black/5 w-full font-medium duration-150 flex items-center gap-3 text-start rounded-md text-black/60"
                      >
                        <div className="min-w-12 min-h-12 max-w-12 max-h-12 flex items-center justify-center">
                          <Image
                            width={300}
                            height={300}
                            src={
                              item?.main_image.slice(0, 4) == "http"
                                ? item.main_image || null
                                : `https://pc.repid.uz${item?.main_image}` ||
                                  null
                            }
                            alt={item.name_uz}
                          />
                        </div>
                        <span className="line-clamp-2">{item.name_uz}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </form>
            </div>
            <div className="items-center gap-[16px] hidden min-[950px]:flex">
              <button
                onClick={() => navigate.push("/compare")}
                className="flex items-center gap-[6px]"
              >
                <Image
                  src={ComparisonIcon}
                  alt="comparison icon"
                  className="w-[20px] lg:w-[24px]"
                />
                <span className="text-[#666666] text-sm lg:text-base">
                  Taqqoslash
                </span>
              </button>
              <button
                onClick={() => navigate.push("/cart")}
                className="flex items-center gap-[6px]"
              >
                <Image
                  src={CartIcon}
                  alt="cart icon"
                  className="w-[20px] lg:w-[24px]"
                />
                <span className="text-[#666666] text-sm lg:text-base">
                  Savatcha
                </span>
              </button>
              <button
                onClick={() => navigate.push("/wishlist")}
                className="flex items-center gap-[6px]"
              >
                <RiHeart3Line
                  size={24}
                  color="#ff0000"
                  className="w-[20px] lg:w-[24px]"
                />
                <span className="text-[#666666] text-sm lg:text-base">
                  Sevimlilar
                </span>
              </button>
              <button
                onClick={() => navigate.push(`/setup/2`)}
                className="flex items-center gap-[6px]"
              >
                <Image
                  src={CollectionIcon}
                  alt="collection icon"
                  className="w-[20px] lg:w-[24px]"
                />
                <span className="text-[#666666] text-sm lg:text-base">
                  Kompyuter yig’ish
                </span>
              </button>
            </div>
          </nav>
          <div className="flex justify-between gap-5 min-[950px]:hidden py-3">
            <div className="relative w-full">
              <input
                className="w-full bg-[#D9D9D933] text-sm outline-none ring-1 ring-[#EDEDED] focus:ring-mainColor duration-200 h-10 pl-11 pr-4 rounded-lg"
                type="text"
                placeholder="Qidiruv..."
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
              <Image
                className="absolute top-[10px] left-[15px]"
                src={SearchIcon}
                alt="search icon"
              />
              <div
                className={`w-full max-h-[400px] overflow-y-auto absolute top-12 bg-white flex-col gap-1 shadow-xl p-4 rounded-lg z-20 ${
                  searchMenu ? "flex" : "hidden"
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    navigate.push(`/search/${searchText.replace(/\s+/g, "-")}`);
                    setSearchMenu(false);
                    setSearchText("");
                  }}
                  className="px-3 min-h-10 hover:bg-black/5 w-full duration-150 font-medium flex items-center gap-3 text-start rounded-md"
                >
                  <Image src={SearchIcon} alt="search icon" />
                  <span className="line-clamp-1">{searchText}</span>
                </button>
                {searchResult.categories?.map((item) => (
                  <button
                    type="button"
                    onClick={() => {
                      navigate.push(
                        `/categories/${item.name_en
                          .replace(/\s+/g, "-")
                          .toLowerCase()}?query=${item.id}`
                      );
                      setSearchMenu(false);
                      setSearchText("");
                    }}
                    key={item.id}
                    className="px-3 min-h-10 hover:bg-black/5 w-full font-medium duration-150 flex items-center gap-3 text-start rounded-md text-black/60"
                  >
                    <BiCategory size={24} className="text-black/60" />
                    <span className="line-clamp-1">{item.name_uz}</span>
                  </button>
                ))}
                {searchResult.products?.map((item) => (
                  <button
                    type="button"
                    onClick={() => {
                      navigate.push(`/product/${item.id}`);
                      setSearchMenu(false);
                      setSearchText("");
                    }}
                    key={item.id}
                    className="px-3 min-h-20 hover:bg-black/5 w-full font-medium duration-150 flex items-center gap-3 text-start rounded-md text-black/60"
                  >
                    <div className="min-w-12 min-h-12 max-w-12 max-h-12 flex items-center justify-center">
                      <Image
                        width={300}
                        height={300}
                        src={
                          item?.main_image.slice(0, 4) == "http"
                            ? item.main_image || null
                            : `https://pc.repid.uz${item?.main_image}` || null
                        }
                        alt={item.name_uz}
                      />
                    </div>
                    <span className="line-clamp-2">{item.name_uz}</span>
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => setMenu(true)}
              className="min-w-10 h-10 rounded-[10px] bg-[#F7F7F7] flex items-center justify-center"
            >
              <Image src={HamburgerMenu} alt="hamburger menu" />
            </button>
          </div>
        </Container>
        <div className="w-full border-b border-b-[#EDEDED] hidden min-[950px]:block">
          <Container>
            {categoryLoading ? (
              <div className="flex items-center justify-between gap-4 py-3 h-[60px]">
                <div className="overflow-hidden">
                  <Skeleton width={110} height={30} />
                </div>
                <div className="overflow-hidden">
                  <Skeleton width={110} height={30} />
                </div>
                <div className="overflow-hidden">
                  <Skeleton width={110} height={30} />
                </div>
                <div className="overflow-hidden">
                  <Skeleton width={110} height={30} />
                </div>
                <div className="overflow-hidden">
                  <Skeleton width={110} height={30} />
                </div>
                <div className="overflow-hidden">
                  <Skeleton width={110} height={30} />
                </div>
                <div className="overflow-hidden">
                  <Skeleton width={110} height={30} />
                </div>
                <div className="overflow-hidden">
                  <Skeleton width={110} height={30} />
                </div>
                <div className="overflow-hidden">
                  <Skeleton width={110} height={30} />
                </div>
              </div>
            ) : (
              <div
                className={`flex items-center gap-4 h-[60px] overflow-auto scrollbar-none ${
                  categories.length >= 9 && "justify-between"
                }`}
              >
                {categories.map((item) => (
                  <Link
                    key={item.id}
                    href={{
                      pathname: `/categories/${item.name_en
                        .replace(/\s+/g, "-")
                        .toLowerCase()}`,
                      query: { query: item.id },
                    }}
                  >
                    <button
                      className="px-[14px] py-[9px] rounded-[18px] bg-[#F7F7F7] hover:bg-mainColor duration-200 text-[#222222] text-sm hover:text-white"
                      aria-label={item.name_uz}
                    >
                      {item.name_uz}
                    </button>
                  </Link>
                ))}
              </div>
            )}
          </Container>
        </div>
      </header>
    </>
  );
};

export default Header;
