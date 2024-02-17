import React, { useState, useEffect } from "react";
import { Input, TextInput, Select, Pagination, Drawer } from "@mantine/core";
import { fetchCategories, fetchPlaylist } from "../redux/actions/spotifyAction";
import { useDispatch, useSelector } from "react-redux";
import spotifyLogo from "../assets/spotify.png";
import { sideBar } from "../data/data";
import { useDisclosure } from "@mantine/hooks";
const Home = () => {
  const dispatch = useDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const [categoriesList, setCategoriesList] = useState([]);
  const [search, setSearch] = useState("");
  const [randomColours, setRandomColours] = useState([]);
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { categories, loading, pagesCount, playlist } = useSelector(
    (state) => state.spotify
  );

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchPlaylist());

    // console.log("purchasedItem===================", purchasedItem);
  }, []);
  const paginationHandler = async (page) => {
    setCurrentPage(page);
    const res = await dispatch(fetchPlaylist(currentPage));
  };

  const handleCategoryFilter = (value, e) => {
    e.preventDefault();
    dispatch(fetchPlaylist({ category: value }));
  };
  const handleSearchFilter = (e) => {
    if (e.keyCode === 13) {
      dispatch(fetchPlaylist({ search: e.target.value }));
    }
  };

  console.log("categories===================", category);
  console.log("playlist===================", playlist);

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
    // <>
    //   <div style={{ border: "1px solid blue", width: "100%" }}>
    //     <h1 className="text-3xl font-bold underline">Spotify playlist</h1>
    //     <div
    //       style={{
    //         display: "flex",
    //         flexDirection: "row",
    //         justifyContent: "center",
    //         alignItem: "center",
    //       }}
    //     >
    //       <Input.Wrapper label="Input label">
    //         <Input radius={5} />
    //       </Input.Wrapper>
    //       <Select
    //         style={{ border: "1px solid red", width: "8rem" }}
    //         size="sm"
    //         placeholder="Pick value"
    //         data={categoriesList}
    //         dropdownWidth="max-content"
    //         onChange={(value) => setCategory(value)}
    //       />
    //     </div>
    //   </div>

    //   <div style={{ border: "1px solid black" }}>
    //     <div className="container">
    //       <div className="row flex-row ">
    //         {playlist &&
    //           playlist?.map((i) => (
    //             <div className="col-md-4 col-lg-4">
    //               <iframe
    //                 style={{ borderRadius: "12px" }}
    //                 src={i?.embedLink}
    //                 width="35%"
    //                 height="350"
    //                 frameBorder="0"
    //                 allowfullscreen=""
    //                 allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    //                 loading="lazy"
    //               ></iframe>
    //             </div>
    //           ))}
    //       </div>
    //     </div>
    //     {playlist.length > 0 && (
    //       <Pagination
    //         style={{ justifyContent: "center" }}
    //         className="mx-sm-2 mx-md-4"
    //         total={pagesCount}
    //         value={currentPage}
    //         onChange={(page) => {
    //           paginationHandler(page);
    //         }}
    //         boundaries={1}
    //       />
    //     )}
    //   </div>
    // </>
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
              <div className=" playList-box px-2">
                <div className="row mt-3 ">
                  {playlist &&
                    playlist?.map((i) => (
                      <div className="col-md-12 col-lg-6 my-2 ">
                        <iframe
                          style={{ borderRadius: "12px", width: "100%" }}
                          src={i?.embedLink}
                          width="35%"
                          height={"100%"}
                          frameBorder="0"
                          allowfullscreen=""
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                          loading="lazy"
                        ></iframe>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-0 drawer-box">
              <div className="side-bar">
                <p className="sidebar-heading">Hot Categories List</p>
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
                <p className="sidebar-heading">Hot Categories List</p>
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
