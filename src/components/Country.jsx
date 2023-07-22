import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import Header from './Header';
import Loading from './Loading';

export default function Country() {
  const [mode, changeMode] = useState(localStorage.getItem('mode') != null ?
    localStorage.getItem('mode') : 'Light Mode')

  let queryName = window.location.pathname

  queryName = queryName.slice(9)
  let className = '';

    const alterMode = ()=> {
        if(mode === 'Dark Mode'){
          changeMode('Light Mode')
        }
        else{
        changeMode('Dark Mode')
        }
      }
      
      
      if(mode === 'Dark Mode'){
        className += 'background-dark'
      }
      else{
        className = 'background-light'
      }

  const [countryName, getCountryData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const getCountry = async () => {
    const url = `https://restcountries.com/v3.1/name/${queryName}` 
    const response = await fetch(url)
    const responseJson =await response.json()
    getCountryData(responseJson)
    setIsLoading(false)
    console.log(responseJson)
    }

    useEffect(()=> {
      getCountry()
      // localStorage.setItem('mode', mode)
    }, [])


  return (
    <div className={['container-fluid_', className].join(' ')}>
  
     <Header className={className} mode={mode} alterMode={alterMode}/>

    <Link to='/' 
        onClick={
          () => {
            localStorage.setItem('mode', mode)
          }}>
    <div className='goBack'>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
</svg>
      <p>Back</p>
    </div>
    </Link>
    {!isLoading ?
    <> 
      {countryName.map((countryName, index) => 
        <div className="row_" key={index}>

        <div className="col-5">
          <img src={countryName?.flags.png} alt={countryName?.flags.alt} />
        </div>
   
      <div className="col-5 content">
          <h3>{countryName?.name.common}</h3> 
        
        <div className="row_ row2">
          <div className="col_">
                {countryName?.name?.nativeName?.eng ? 
            (
                    <p>Native Name : <span>{countryName?.name?.nativeName?.eng?.common}</span></p>
            ) : 
              (
                <p></p>
              )}
            
                <p>Population : <span>{countryName?.population}</span> </p>
                <p>Region : <span>{countryName?.region}</span></p>
                <p>Sub Region : <span>{countryName?.subregion}</span></p>
                {/* <p>Capital : <span>{countryName?.capital[0]}</span></p> */}
          </div>
            <div className="col__">
                <p>Top Level Domain : <span>{countryName?.tld[0]}</span> </p>
                <p>Currencies : <span>{countryName?.currencies[Object.keys(countryName?.currencies)[0]]['name']}</span></p>
              <p>Language : <span>{countryName?.languages[Object.keys(countryName?.languages)[0]]}</span></p>
            </div>
        </div>

      </div>

    </div>
      )}
      </>
    : <Loading></Loading>
    }
    </div>
  );
}
