const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const orderCake = () => {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
};

const restock = (qty = 1) => {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
};
const initialState = {
  numOfCakes: 10,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);
console.log("initial", store.getState());

const unsub = store.subscribe(() => {
  console.log("next state", store.getState());
});

// store.dispatch(orderCake());
// store.dispatch(restock(2));

const actions = bindActionCreators({orderCake,restock}, store.dispatch)
actions.orderCake();
actions.restock(2)
unsub();
