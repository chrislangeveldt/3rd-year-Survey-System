import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Pages/App';
import reportWebVitals from './Pages/reportWebVitals';
import Survey from "./Pages/Survey";
import CodeGeneration from "./Pages/CodeGeneration";
import {Route, Router, Routes} from "react-router-dom";
import * as ReactDom from "react-dom";
import SurveySlider from "./Pages/SurveySlider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <React.StrictMode>
     <App />
 </React.StrictMode>
);
