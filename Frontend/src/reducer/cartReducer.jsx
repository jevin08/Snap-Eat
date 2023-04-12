
const cartReducer = (state, action) => {


  if (action.type === "ADD_TO_CART") {
    let { _id, quantity, curElement } = action.payload;

    //console.log(Quantity)
    if (!state.cart) {
      state.cart = [];
    }

    //quentity increse if same food select
    let existingfood = state.cart.find((curfood) => curfood.id == _id)
    //console.log(existingfood)

    if (existingfood) {
      let updatedFood = state.cart.map((curfood) => {
        if (curfood.id == _id) {
          let newQuantity = curfood.quantity + quantity;
          return { ...curfood, quantity: newQuantity }
        }
        else {
          return curfood
        }
      })
      return { ...state, cart: updatedFood }
    }
    else {
      let cartFood;
      cartFood = {
        id: _id,
        name: curElement.name,
        quantity,
        price: curElement.price,
      }
      return { ...state, cart: [...state.cart, cartFood] }
    }



  }

  if (action.type === "DECRESE") {
    let updateProduct = state.cart.map((curele) => {
      if (curele.id == action.payload) {
        let decQuantity = curele.quantity - 1;
        if (decQuantity <= 1) {
          decQuantity = 1;
        }
        return { ...curele, quantity: decQuantity }
      }
      else {
        return curele;
      }
    })
    return { ...state, cart: updateProduct }
  }

  if (action.type === "INCRESE") {
    let updateProduct = state.cart.map((curele) => {
      if (curele.id == action.payload) {
        let decQuantity = curele.quantity + 1;
        return { ...curele, quantity: decQuantity }
      }
      else {
        return curele;
      }
    })
    return { ...state, cart: updateProduct }
  }

  if (action.type === "REMOVE_FOOD") {

    let updateCart = state.cart.filter((curFood) => curFood.id !== action.payload)
    return { ...state, cart: updateCart }
  }

  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] }
  }

  return state;
}

export default cartReducer;