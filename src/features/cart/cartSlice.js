import { createSlice} from "@reduxjs/toolkit";

const initialState = {

  cart:[],
};

const cartSlice = createSlice({
  //name the reducer
  name:'cart',
  //initial state
  initialState,
//define reducers
reducers:{
  //addItem Reducer
  additem(state,action){
    state.cart.push(action.payload)
  },
  //deleteItem Reducer
  deleteItem(state,action){
   state.cart= state.cart.filter(item=> item.pizzaId !==action.payload)
  },
  //increaseQuantity Reducer
  increaseQuantity(state,action){
    //check if the pizza actually exists
    const pizza = state.cart.find(item => item.pizzaId ===action.payload);
    //add to the current quantity
    pizza.quantity++;
    pizza.totalPrice = pizza.unitPrice*pizza.quantity
  },
  //decrease Quantity Reducer
  decreaseQuantity(state,action){
    const pizza = state.cart.find(item => item.pizzaId === action.payload);
    pizza.quantity--;
    pizza.totalPrice = pizza.unitPrice * pizza.quantity;
    if(pizza.quantity===0) cartSlice.caseReducers.deleteItem(state,action)
  },
  //clear cart reducer
clearCart(state){
  state.cart=[];
}
}

})

export const {additem, deleteItem, increaseQuantity, decreaseQuantity, clearCart} = cartSlice.actions;
export default cartSlice.reducer;

export const getTotalPrice =state =>state.cart.cart.reduce((accu,item)=>accu+item.totalPrice,0);
export const getTotalQuantity =state =>state.cart.cart.reduce((accu,item)=>accu+item.quantity,0);
export const getCart =state =>state.cart.cart;
export const getcurrentPizzaQuantity= id => state => state.cart.cart?.find(item => item.pizzaId === id)?.quantity??0;
