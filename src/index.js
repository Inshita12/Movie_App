import React from 'react';
import ReactDOM from 'react-dom';
import {  createStore , applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import './index.scss';
import App from './components/App';
import movies from './reducers';


// this is a currying form of this function (function logger(obj, next, action))
//logger(obj)(next)(action)  (obje={dispatch , getState})


// when we pass obj as a argument in a logger funct it logger(obj) it'll return a function and we call that function using argumemt ie.e next then logger(obj)(next) return a function which will be called using an argument called action logger(obj)(next)(action)
// const logger= function({dispatch , getState}){
//   return function(next){
//     return function (action){
//       //middleware

//       console.log('ACTION_TYPE is' ,action.type);
//       next(action); //if we multiple multiwares next will call the next multiware with action if there is no multiware then it will get next with dispatch argument
//     }
//   }
// }

//ANother way of writing middlewares
const logger=({dispatch,getState})=>(next)=>(action)=>{
  //logger code
  if( typeof action !== 'function'){
  console.log('ACTION_TYPE is' ,action.type);
  }

  next(action);
}


// const thunk=({dispatch,getState})=>(next)=>(action)=>{
//   //logger code
//   // console.log('ACTION_TYPE is' ,action.type);

//   if(typeof action==='function'){
//     action(dispatch);
//     return;
//   }
//   next(action);
// }
const store= createStore(movies, applyMiddleware(logger,thunk)); //this will expect an argument i.e. reducer so here movies is a reducer
console.log('store',store.getState());
// console.log('BEFORE_STATE',store.getState())

// store.dispatch({
//   type:'ADD_MOVIES',
//   movies:[{
//     name:'Superman'
//   }]

// })
// console.log('AFTER_STATE',store.getState())

ReactDOM.render(
  <React.StrictMode>
    <App store={store}/>
  </React.StrictMode>,
  document.getElementById('root')
);
