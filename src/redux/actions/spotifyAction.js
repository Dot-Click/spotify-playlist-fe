import { spotifyConstants } from "../constants/spotifyConstants";
import custAxios, { attachToken, formAxios } from "../../configs/axiosConfig";
import { errorMessage } from "../../services/helpers";
import { successMessage } from "../../services/helpers";

export const fetchCategories = () => async (dispatch) => {
  dispatch({
    type: spotifyConstants.FETCH_CATEGORIES_REQUEST,
  });
  attachToken();

  try {
    const res = await custAxios.get(`/spotify/categories`);
    if (res?.data?.success) {
      await dispatch({
        type: spotifyConstants.FETCH_CATEGORIES_SUCCESS,
        payload: res?.data?.data?.data,
      });
      return true;
    }
  } catch (error) {
    dispatch({
      type: spotifyConstants.FETCH_CATEGORIES_FAILURE,
      payload: error?.response?.data?.message || "Server Error",
    });
    errorMessage(error?.response?.data?.message);
  }
};

export const fetchPlaylist = (page, search, category) => async (dispatch) => {
  dispatch({
    type: spotifyConstants.FETCH_PLAYLIST_REQUEST,
  });
  attachToken();
  const pageSize = 10;

  try {
    const res = await custAxios.post(`/spotify/playlist`, {
      page: page,
      pageSize: pageSize,
      category: category,
    });
    if (res?.data?.success) {
      const pagesCount = Math.ceil(res?.data?.data?.playlistCount / pageSize);

      await dispatch({
        type: spotifyConstants.FETCH_PLAYLIST_SUCCESS,
        payload: {
          playlist: res?.data?.data?.data,
          pagesCount: pagesCount,
        },
      });
      return true;
    }
  } catch (error) {
    dispatch({
      type: spotifyConstants.FETCH_PLAYLIST_FAILURE,
      payload: error?.response?.data?.message || "Server Error",
    });
    errorMessage(error?.response?.data?.message);
  }
};
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: orderConstants.CLEAR_ERRORS,
  });
};
