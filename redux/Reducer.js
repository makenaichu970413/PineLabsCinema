// Reducer is how we dispatch the action to data layer and save in data layer

export const initialState = {
  user: null,
  message: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      // console.log("👥 SET USER >>> ", action.user);
      return { ...state, user: action.user };

    case "SET_MESSAGE":
      // console.log("✉️ SET MESSAGE >>> ", action.message);
      return { ...state, message: action.message };

    default:
      return { ...state };
  }
};

export default reducer;
