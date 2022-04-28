import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import { Link } from 'react-router-dom';

function Flags({country}) {

  let countryName = ''

  return (
    <div>
      {country.map((flag , index)=> <div className='row-items' key={index}>
        
        <Link to={`/country/${index}`} onClick={
        () => {
          countryName = flag.name.common
          console.log(countryName)
        }
        }> 
          <img src={flag.flags.png} alt="countryFlag"/>
          <div className="countryInfo">
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
