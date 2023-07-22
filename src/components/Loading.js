import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Loading() {
  return (
   <div class="spinner-border" role="status">
  <span class="visually-hidden" style={{
    'textAlign' : 'center',
    'marginLeft' : '40%',
    'fontSize' : '2em'
  }}>Loading...</span>
  </div>
  )
}
