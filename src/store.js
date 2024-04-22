import { createStore } from "redux";
import { categories, item } from "./lists";


const initialState = {
   filter:item,
   filtered:item,
   cart:[],
}



const reducer = (state = initialState,action) =>{
   if (action.type === 'FILTER') {
      const filteredItems = item.filter(item => item.category == action.payload);
      return { ...state, filtered: filteredItems };
  }
  if (action.type === 'HIGH_TO_LOW') {
   const isSorted = state.filtered.slice().sort((a, b) => b.price - a.price);
   return { ...state, filtered: isSorted };
 } 
 if (action.type === 'LOW_TO_HIGH') {
   const isSorted = state.filtered.slice().sort((a, b) => a.price - b.price);
   return { ...state, filtered: isSorted };
 } 
 if(action.type == 'ADD_CART') {
   return {...state, cart : [...state.cart, action.payload]}
 }
 if(action.type == 'REMOVE_CART') {
   if(!action.payload.name){
      return {...state, cart : [...state.cart.filter(item => item.name !== action.payload.name)]}
   }
 }
   return state; 
}

export const store = createStore(reducer);