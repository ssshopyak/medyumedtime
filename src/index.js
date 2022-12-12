import React,{useState} from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import './index.css';
import Graph from './pages/graph';
import LoginForm from './pages/login'
import reportWebVitals from './reportWebVitals';
import TimeGraph from './components/TimeGraph';

const isAuthorizated = JSON.parse(localStorage.getItem('isAuthorizated'))
console.log(isAuthorizated)
const logined = createBrowserRouter([
  {
    path: "/",
    element: <Graph />,
  },
  {
    path: "test",
    element: <TimeGraph/>
  }
]);

const unLogined = createBrowserRouter([
  {
    path:"/",
    element: <LoginForm />
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={isAuthorizated ? logined : unLogined }/> 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
