
const FoodReducer = (state, action) => {

  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      }

    case "FOODS":
      return {
        ...state,
        isLoading: false,
        foods: action.payload
      }

    case "ORDERS":
      return{
        ...state,
        isLoading: false,
        orders: action.payload
      }

    case "ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
      }

    default:
      return {
        ...state,
      }
  }
}

export default FoodReducer;