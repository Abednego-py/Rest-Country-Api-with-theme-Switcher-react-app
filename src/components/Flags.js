import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import { Link } from 'react-router-dom';

function Flags({country, mode}) {

  let textClass = '';
if(mode === 'Dark Mode'){
  textClass += 'text-light'
}
else{
  textClass = 'text-dark'
}
  return (
    <div className='flag-cont'>
      {country.map((flag , index)=> <div className='row-items' key={index}>
        
        <Link to={`/country/${flag.name.common}`} onClick={
        () => {
          localStorage.setItem('mode', mode)
        }
        }> 
          <img src={flag.flags.png} alt="countryFlag"/>
          <div className={['countryInfo', textClass].join(' ')}>
            <h5>{flag.name.common}</h5>
            <p> <span> Population:</span> {flag.population}</p>
            <p> <span> Region:</span> {flag.region}</p>
            <p> <span> Capital:</span> {flag.capital}</p>
          </div>
          </Link>
      </div>
      )}
    </div>
  );
}

export default Flags;
