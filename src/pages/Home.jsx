import React, { useState, useEffect } from "react";
import {
  Input,
  TextInput,
  Select,
  Pagination,
  Drawer,
  Loader,
} from "@mantine/core";
import { fetchCategories, fetchPlaylist } from "../redux/actions/spotifyAction";
import { useDispatch, useSelector } from "react-redux";
import spotifyLogo from "../assets/spotify.png";
import { sideBar } from "../data/data";
import { useDisclosure } from "@mantine/hooks";
const Home = () => {
  const dispatch = useDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(true);
  const [categoriesList, setCategoriesList] = useState([]);
  const [search, setSearch] = useState("");
  const [randomColours, setRandomColours] = useState([]);
  const [category, setCategory] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [playlist, setPlaylist] = useState([]);
  const [categories, setCategories] = useState([]);
  const fetchPlaylist = async (search, category) => {
    try {
      const response = await fetch(
        `https://dot-click.github.io/spotify-json/playlist.json`
      );
      console.log("response......", response);

      if (response.ok) {
        const data = await response.json();
        console.log("data.........", data);

        const filteredData = data.filter((playlist) => {
          const categoryRegex = new RegExp(category, "i");
          const searchRegex = new RegExp(search, "i");
          return (
            categoryRegex.test(playlist.category) &&
            searchRegex.test(playlist.title)
          );
        });
        setPlaylist(filteredData);
        setLoading(false);
      } else {
        console.error("Failed to fetch playlist data");
      }
    } catch (error) {
      console.error("Error fetching playlist data:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `https://dot-click.github.io/spotify-json/category.json`
      );
      if (response.ok) {
        const data = await response.json();
        const categoriesWithAll = ["All", ...data];
        setCategories(categoriesWithAll);
        setLoading(false);
      } else {
        console.error("Failed to fetch playlist data");
      }
    } catch (error) {
      console.error("Error fetching playlist data:", error);
    }
  };
  useEffect(() => {
    fetchPlaylist();
    fetchCategories();
  }, []);

  console.log("fetchPlaylist", playlist);
  console.log("fetchCategories", categories);
  const paginationHandler = async (page) => {
    setCurrentPage(page);
    const res = await dispatch(fetchPlaylist(currentPage, search, category));
  };

  const handleCategoryFilter = (value, e) => {
    e.preventDefault();
    const categoryFilter = value === "All" ? "" : value;
    fetchPlaylist("", categoryFilter);
    setCategory(value);
  };
  const handleSearchFilter = (e) => {
    if (e.keyCode === 13) {
      fetchPlaylist(e.target.value, category);
    } else {
      fetchPlaylist(e.target.value, category);
    }
  };

  console.log(Math.round(Math.random() * categories?.length));
  useEffect(() => {
    if (categories?.length > 0) {
      const randomValues = categories?.map(
        () => Math.round(Math.random() * categories?.length) + 1
      );
      setRandomColours(randomValues);
    }
  }, [categories]);
  return (
    <div className="green-box py-3">
      <div className="container">
        <img src={spotifyLogo} />
        <div className="glass-box my-3">
          <div className="row">
            <div className="col-xl-9 col-lg-12">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex rounded-5 align-items-center px-3 py-2 search-box">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="#5E6E64"
                      fillRule="evenodd"
                      d="M8.5 0a8.5 8.5 0 105.261 15.176l3.652 3.652a1 1 0 001.414-1.414l-3.652-3.652A8.5 8.5 0 008.5 0zM2 8.5a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <input
                    className="search-input mx-3"
                    placeholder="What do you want to listen to?"
                    onKeyDown={handleSearchFilter}
                  />
                </div>
                <svg
                  className="bi bi-filter cursor-pointer filter-box"
                  onClick={open}
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="#fff"
                  viewBox="0 0 16 16"
                >
                  <path d="M6 10.5a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3a.5.5 0 01-.5-.5zm-2-3a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm-2-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z"></path>
                </svg>
              </div>
              <div className="playList-box px-2">
                {loading ? (
                  <div className="d-flex h-100 justify-content-center align-items-center">
                    <Loader color="white" type="bars" />
                  </div>
                ) : (
                  <div className="row mt-3">
                    {playlist?.length > 0 ? (
                      playlist.map((item, index) => (
                        <div className="col-md-12 col-lg-6 my-2" key={index}>
                          <iframe
                            style={{ borderRadius: "12px", width: "100%" }}
                            src={item?.embedLink}
                            width="35%"
                            height="100%"
                            frameBorder="0"
                            allowFullScreen=""
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                          ></iframe>
                        </div>
                      ))
                    ) : (
                      <div className="d-flex flex-column no-records justify-content-center align-items-center">
                        <p className="heading-notFound mb-0">
                          No Records Found
                        </p>
                        <p className="text-notFound">
                          There is no playlist based on your search
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="col-xl-3 col-lg-0 drawer-box">
              <div className="side-bar">
                <p className="sidebar-heading">Hot Categories List</p>
                {categories?.map((item, i) => {
                  const value = randomColours[i];
                  const isActive = item === activeCategory;
                  return (
                    <p
                      className={`sidebar-links  links${value} 
                      ${isActive ? "active" : ""}
                      `}
                      key={i}
                      onClick={(e) => {
                        e.preventDefault();
                        handleCategoryFilter(item, e);
                        setActiveCategory(item);
                      }}
                    >
                      {item}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
          <Drawer
            opened={opened}
            onClose={close}
            size={"sm"}
            title="Authentication"
          >
            {/* Drawer content */}
            <div className="">
              <div className="side-bar">
                <div className="d-flex mb-3 justify-content-between align-items-center">
                  <p className="sidebar-heading mb-0 text-start">
                    Hot Categories List
                  </p>

                  <svg
                    onClick={close}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="feather feather-x cursor-pointer"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 6L6 18"></path>
                    <path d="M6 6L18 18"></path>
                  </svg>
                </div>
                {categories?.map((item, i) => {
                  const value = randomColours[i];
                  return (
                    <p
                      className={`sidebar-links  links${value}`}
                      key={i}
                      onClick={(e) => {
                        e.preventDefault();
                        handleCategoryFilter(item, e);
                      }}
                    >
                      {item}
                    </p>
                  );
                })}
              </div>
            </div>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default Home;
