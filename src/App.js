import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [NewJoke, getNewJoke] = useState();
  

  const [isLoading, setIsLoading] = useState(false);
  const [showPunch, setShowPunch] = useState(false);
  const [showPunchButton, setShowPunchButton] = useState(true);
  const [ShowPunchLineStatus, setShowPunchLineStatus] = useState(false);



  const [hidePunch, setHidePunch] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    GenerateRandonJokes();
  }, []);

  function GenerateRandonJokes() {
    
    setShowPunch(false)
    setIsLoading(true);
    setTimeout(
      function () {
       

        fetch("https://karljoke.herokuapp.com/jokes/random", {
      method: 'GET',
    })
      .then(res => res.json())
      .then(joke =>{
        setIsError(false);
        getNewJoke(joke);
        setIsLoading(false);
        setShowPunch(true);
        setShowPunchButton(true);
        setHidePunch(true);
        setShowPunchLineStatus(false);

      } )
      .catch(err => {
        setIsError(true);
        getNewJoke('');
        setIsLoading(false);
        setShowPunch(false);
        setShowPunchButton(true);
        setHidePunch(true);
        setShowPunchLineStatus(false);
      });
      }
        .bind(this),
      3000
    );

   
  }

  function ShowPunchline() {
    return (
      <div>
        <div className='robbery-section' id='robbery-section'>
          <p className='robbery'>{NewJoke?.setup}</p>
        </div>
        <div className='iwitness-section' id='iwitness-section'>
          <ShowOrHidePunch />
          <PunchLines/>
        </div>
      </div>
    )
  }
  function ShowOrHidePunch() {
    if (showPunchButton) {
      return (
        <div className='btn-container'>
          <button className='punchline-btn' onClick={() =>{ setShowPunchButton(!showPunchButton);setShowPunchLineStatus(true)}}>Show Punchline</button>
        </div>
      )
    } else {
      if(hidePunch){
      return (
        <div className='btn-container'>
          <button className='punchline-btn' onClick={() =>{setShowPunchLineStatus(!ShowPunchLineStatus);setShowPunchButton(!showPunchButton)}}>Hide Punchline</button>
        </div>
      )}else{
        return(
        <div className='btn-container'>
       
      </div>)
      }

    }
  }
  function PunchLines(){
    if(ShowPunchLineStatus){
    return(
      <div className='iwitness'>
            <p className='robbery'>{NewJoke?.punchline}</p>
          </div>
    )}else{return(
      <div className='iwitness'>
      
    </div>
    )}
  }



  

  function Loading() {
    return (
      <div className='loading-section' id='loading-section'>
        <p className='loading'>Loading Your Joke...</p>
      </div>
    )
  }

  function Error() {
    return (

      <div className='loading-section' id='loading-section-error'>
        <p className='loading-error'>There was an error loading your joke</p>
      </div>
    )
  }
  return (
    <div className='App'>

      <div className='navbar'>
        <button className='button' onClick={() => GenerateRandonJokes()}>Get A New Random Joke</button>
        <a href='https://karljoke.herokuapp.com/' target='_blank'>View API Docs</a>
      </div>
      <hr />

      {isLoading && <Loading />}


      {isError && <Error />}

      {showPunch && <ShowPunchline />}


      

    </div>
  );
}

export default App;
