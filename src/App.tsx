import { useState } from 'react'
import './App.css'
import Dropdown from './Dropdown'

function App() {
  const [value, setValue] = useState(10);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };
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
            <div className="histogram-container">
              <div className="bars">
                {Array.from({ length: 60 }).map((_, i) => (
                  <div
                    key={i}
                    className="bar"
                    style={{
                      height: `${Math.random() * 60 + 10}px`,
                    }}
                  ></div>
                ))}
              </div>

              <div className="range-line">
                <input type="range" min="0" max="100" defaultValue="50" className="range" />
              </div>

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
        <section className="list">
          <h1 className="bikesfound">436 bikes found</h1>
          <div className="category">
            <p>Order by</p>
            <div className="categoryblock">
              <button>Lowest price</button>
              <button>Closest</button>
              <button>Newest Listings</button>
              <button>Specification</button>
              <button>Retailer</button>

            </div>

          </div>
          <div className="pagesblock">
            <div className="pages">
              <button>First</button>
              <button>Prev</button>
              <button>1</button>
              <button>2</button>
              <button>3</button>
              <button>4</button>
              <button>Next</button>
              <button>Last</button>
            </div>
            <div className="pagesrange">
              <p>Results per page</p>
              <input type="number" name="number" />
            </div>


          </div>
          <div className="listbikes">
            <article className="bikescard">
              <div className="textblock">
                <p className="biketype">Road / Racing</p>
                <h2 className="bikename"> Colnago Carbitubo 1991 Carbon Classic with Full Dura Ace</h2>
                <p className="bikecity">Salisbury</p>
              </div>
              <p className="bikeprice">$450.00</p>
            </article>
            <article className="bikescard">
              <div className="textblock">
                <p className="biketype">Road / Racing</p>
                <h2 className="bikename"> Colnago Carbitubo 1991 Carbon Classic with Full Dura Ace</h2>
                <p className="bikecity">Salisbury</p>
              </div>
              <p className="bikeprice">$450.00</p>
            </article>
            <article className="bikescard">
              <div className="textblock">
                <p className="biketype">Road / Racing</p>
                <h2 className="bikename"> Colnago Carbitubo 1991 Carbon Classic with Full Dura Ace</h2>
                <p className="bikecity">Salisbury</p>
              </div>
              <p className="bikeprice">$450.00</p>
            </article>
            <article className="bikescard">
              <div className="textblock">
                <p className="biketype">Road / Racing</p>
                <h2 className="bikename"> Colnago Carbitubo 1991 Carbon Classic with Full Dura Ace</h2>
                <p className="bikecity">Salisbury</p>
              </div>
              <p className="bikeprice">$450.00</p>
            </article>
            <article className="bikescard">
              <div className="textblock">
                <p className="biketype">Road / Racing</p>
                <h2 className="bikename"> Colnago Carbitubo 1991 Carbon Classic with Full Dura Ace</h2>
                <p className="bikecity">Salisbury</p>
              </div>
              <p className="bikeprice">$450.00</p>
            </article>
            <article className="bikescard">
              <div className="textblock">
                <p className="biketype">Road / Racing</p>
                <h2 className="bikename"> Colnago Carbitubo 1991 Carbon Classic with Full Dura Ace</h2>
                <p className="bikecity">Salisbury</p>
              </div>
              <p className="bikeprice">$450.00</p>
            </article>

          </div>
        </section>
      </main>

    </>
  )
}

export default App
