const StoreReducer = (state, action) => {
    // if (action.type === "SET_LOADING") {
    //   return {
    //     ...state,
    //     isLoading: true,
    //   };
    // }
  
    // if (action.type === "API_ERROR") {
    //   return {
    //     ...state,
    //     isLoading: false,
    //     isError: true,
    //   };
    // }
  
    switch (action.type) {
      case "SET_LOADING":
        return {
          ...state,
          isLoading: true,
        };

      case "SET_USER":
        return {
            ...state,
            user: action.payload.username,
            userid: action.payload.userid
        };
    
      default:
        return state;
    }
  };
  
  export default StoreReducer;