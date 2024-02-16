import { spotifyConstants } from "../constants/spotifyConstants";
export const spotifyReducer = (
  state = {
    categories: [],
    playlist: [],
    pagesCount: 0,
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case spotifyConstants.FETCH_CATEGORIES_REQUEST:
    case spotifyConstants.FETCH_PLAYLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case spotifyConstants.FETCH_PLAYLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        playlist: action.payload.playlist,
        pagesCount: action.payload.pagesCount,
      };
    case spotifyConstants.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        categories: action.payload,
      };

    case spotifyConstants.FETCH_CATEGORIES_FAILURE:
    case spotifyConstants.FETCH_PLAYLIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
