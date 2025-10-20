import { useState } from 'react'
import './App.css'

function App() {
  const [dark, setDark] = useState(false);

  const toggleDark = () => {
    setDark(!dark);
    document.body.classList.toggle("dark-mode", !dark);
  };

  return (
    <>

      <main className="page">
        <section className="filters">
          <div className="conteinerheader">
            <h1>Filters</h1>
            <button className="buttonclose">⨉</button>
          </div>
          <hr />

          <div className="pricerange">
            <div className="pricerange-header">
              <h1>Price Range</h1>
              <div className="darkmode-toggle">
                <h1 className="darkmode">Dark mode</h1>
                <div className="toggle-switch" onClick={toggleDark}>
                  <div className={`toggle-knob ${dark ? "dark" : ""}`}></div>
                </div>
              </div>
            </div>
            <p>The average nightly price is $180</p>
            <div className="histogram">
              <hr />
            </div>

          </div>
          <div className="conteinerprice">
            <div className="price">
              <p className="pricetext">Min price</p>
              <p className="priceamount">$60</p>
            </div>
            <div className="price">
              <p className="pricetext">Max price</p>
              <p className="priceamount">$60</p>
            </div>
          </div>
        </section>
        <section className="list"></section>
      </main>

    </>
  )
}

export default App
