import React, { useState, useEffect }  from 'react';
import './App.css';
import Flags from './components/Flags';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Loading from './components/Loading';
import Pagination from './components/Pagination';

function App() {

  const ITEMS_PER_PAGE = 12;


 
const [currentPage, setCurrentPage] = useState(1);

const [country, setCountry] = useState([])
const [mode, changeMode] = useState(localStorage.getItem('mode') != null? 
localStorage.getItem('mode') : 'Light Mode')

const [searchValue, setSearchValue] = useState('')
let [filterValue, setFilterValue] = useState('')
const [isLoading, setIsLoading] = useState(false)
const region = ['Africa', 'America', 'Asia', 'Europe', 'Oceania']

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = country.slice(indexOfFirstItem, indexOfLastItem);

   const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

// calls to the API
const getCountryData = async () => {
    setIsLoading(true)
    const response = await fetch('https://restcountries.com/v3.1/all')
    const responseJson =await response.json();
    setCountry(responseJson)
    setIsLoading(false)
  } 

const getFilter = async (filter) => {
setIsLoading(true)
const url = `https://restcountries.com/v3.1/region/${filter}`
const response = await fetch(url)
const resJson = await response.json()
setCountry(resJson)
  setIsLoading(false)
}
const getCountry = async (searchValue) => {
setIsLoading(true)
const url = `https://restcountries.com/v3.1/name/${searchValue}` 
const response = await fetch(url)
const responseJson =await response.json()
setCountry(responseJson)
  setIsLoading(false)
}
useEffect(()=> {
  if(!searchValue && (!filterValue || filterValue=== '')){
  getCountryData()
  }
  if(searchValue){
  getCountry(searchValue)
  }
  if(filterValue){
    getFilter(filterValue)
  }
},[searchValue, filterValue])



const alterMode = ()=> {
  if(mode === 'Dark Mode'){
    changeMode('Light Mode')
  }
  else{
  changeMode('Dark Mode')
  }
}
let className = '';
let filterName = ''

if(mode === 'Dark Mode'){
className += 'background-dark'
filterName += 'filterName-light'
}
else{
  className = 'background-light'
  filterName += 'filterName-dark'
}
  return (
   <div className={['container-fluid', className].join(' ')}>
   
      <Header className={className} mode={mode} alterMode={alterMode} />
     
     <div className='row section-1'>

      <div className="search">
          <i class="fa fa-search" aria-hidden="true"></i>
          <input type="text" placeholder='Search for a country' className='col-3 search-input' value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value)
            }}>
          </input>
      </div>
     
<span className='col-4'></span>
       <select name="Filter by region" id="filter_" placeholder='Filter by Region' className={filterName} 
       value={filterValue} onChange={(e) => {
         setFilterValue(e.target.value)
       }} >Filter by Region
       <option value="">Filter by region</option>
         <option value={region[0]}>Africa</option>
         <option value={region[1]}>America</option>
         <option value={region[2]}>Asia</option>
         <option value={region[3]}>Europe</option>
         <option value={region[4]}>Oceania</option>
       </select>
     </div>
<div className='container pb-4'>
  <div className="row grid-cont">
    {isLoading? (
      <Loading></Loading>
    ) : (
      <Flags country={currentItems} mode={mode} />
    )}

</div>

  <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(country.length / ITEMS_PER_PAGE)}
        onPageChange={handlePageChange}
      />

</div>
   </div>

  );
}

export default App;
