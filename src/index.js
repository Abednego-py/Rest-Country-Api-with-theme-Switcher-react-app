import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Country from './components/Country';
import NotFound from './components/NotFound';


    const rootElement = document.getElementById("root");
    render(
      <Router>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/country/:id' element={<Country />} />
             <Route path="*" element={<NotFound />} />
        </Routes>
      </Router> , 
    
    rootElement);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

