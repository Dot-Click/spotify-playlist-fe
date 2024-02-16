import React, { useState, useEffect } from "react";
import { Input, TextInput, Select, Pagination } from "@mantine/core";
import { fetchCategories, fetchPlaylist } from "../redux/actions/spotifyAction";
import { useDispatch, useSelector } from "react-redux";
const Home = () => {
  const dispatch = useDispatch();
  const [categoriesList, setCategoriesList] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { categories, loading, pagesCount, playlist } = useSelector(
    (state) => state.spotify
  );

  useEffect(() => {
    dispatch(fetchCategories());
    const categ = categories?.map((item) => ({
      value: item,
      label: item,
    }));
    setCategoriesList(categ);
    // console.log("purchasedItem===================", purchasedItem);
  }, [dispatch]);
  const paginationHandler = async (page) => {
    setCurrentPage(page);
    const res = await dispatch(fetchPlaylist(currentPage));
  };

  useEffect(() => {
    dispatch(fetchPlaylist(currentPage, search, category));
  }, [search, category]);

  console.log("categories===================", category);
  console.log("playlist===================", playlist);
  return (
    <>
      <div style={{ border: "1px solid blue", width: "100%" }}>
        <h1 className="text-3xl font-bold underline">Spotify playlist</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItem: "center",
          }}
        >
          <Input.Wrapper label="Input label">
            <Input radius={5} />
          </Input.Wrapper>
          <Select
            style={{ border: "1px solid red", width: "8rem" }}
            size="sm"
            placeholder="Pick value"
            data={categoriesList}
            dropdownWidth="max-content"
            onChange={(value) => setCategory(value)}
          />
        </div>
      </div>

      <div style={{ border: "1px solid black" }}>
        <div className="container">
          <div className="row flex-row ">
            {playlist &&
              playlist?.map((i) => (
                <div className="col-md-4 col-lg-4">
                  <iframe
                    style={{ borderRadius: "12px" }}
                    src={i?.embedLink}
                    width="35%"
                    height="350"
                    frameBorder="0"
                    allowfullscreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  ></iframe>
                </div>
              ))}
          </div>
        </div>
        {playlist.length > 0 && (
          <Pagination
            style={{ justifyContent: "center" }}
            className="mx-sm-2 mx-md-4"
            total={pagesCount}
            value={currentPage}
            onChange={(page) => {
              paginationHandler(page);
            }}
            boundaries={1}
          />
        )}
      </div>
    </>
  );
};

export default Home;
