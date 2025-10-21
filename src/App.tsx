import { useState } from 'react'
import './App.css'
import { bikes as bikeData } from './bikes';
import HistogramSlider from './HistogramSlider';

function App() {
  const [dark, setDark] = useState(false);
  const [specOpen, setSpecOpen] = useState(false);
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>([]);
  const [filter, setFilter] = useState<string | null>(null);

  const specs = ["Road / Racing", "Electric / e-Bike", "Mountain / Trail", "Gravel / Adventure", "Hubrid / Commuter"];

  const [bikes] = useState(bikeData);

  const [minPrice, setMinPrice] = useState<number | undefined>(0);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(10000);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const toggleDark = () => {
    setDark(!dark);
    document.body.classList.toggle("dark-mode", !dark);
  };

  const toggleSpec = () => setSpecOpen(prev => !prev);

  const toggleSpecItem = (item: string) => {
    setSelectedSpecs(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
    setCurrentPage(1);
  };

  const handleFilterClick = (type: string) => {
    setFilter(prev => (prev === type ? null : type));
    setCurrentPage(1);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(Number(e.target.value));
    setCurrentPage(1);
  };
  const handleHistogramChange = (min: number, max: number) => {
    console.log('Selected range:', min, max);

  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value > 0) setItemsPerPage(value);
    setCurrentPage(1);
  };


  const filteredBikes = bikes.filter(bike => {
    const matchesSpec = selectedSpecs.length === 0 || bike.type.some(spec => selectedSpecs.includes(spec));
    const matchesPrice = (minPrice === undefined || bike.price >= minPrice) &&
      (maxPrice === undefined || bike.price <= maxPrice);
    return matchesSpec && matchesPrice;
  });


  const sortedBikes = filter === "price"
    ? [...filteredBikes].sort((a, b) => a.price - b.price)
    : filter === "closest" || filter === "newest" || filter === "retailer"
      ? []
      : filteredBikes;

  const totalPages = Math.ceil(sortedBikes.length / itemsPerPage);
  const paginatedBikes = sortedBikes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page: number) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);
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
            <p>
              The average nightly price is $
              {filteredBikes.length > 0
                ? Math.round(filteredBikes.reduce((sum, bike) => sum + bike.price, 0) / filteredBikes.length)
                : 0}
            </p>
            <div className="histogram">
              <HistogramSlider
                bikes={bikes}
                onChange={(minPriceFromSlider, maxPriceFromSlider) => {
                  setMinPrice(minPriceFromSlider);
                  setMaxPrice(maxPriceFromSlider);
                  setCurrentPage(1);
                }}
              />

            </div>


          </div>
          <div className="conteinerprice">
            <div className="price">
              <p className="pricetext">Min price</p>
              <div className="priceamount-wrapper">
                <span className="currency">$</span>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="priceamount-input"
                />
              </div>
            </div>
            <div className="price">
              <p className="pricetext">Max price</p>
              <div className="priceamount-wrapper">
                <span className="currency">$</span>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="priceamount-input"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="list">
          <h1 className="bikesfound">
            {sortedBikes.length > 0
              ? `${sortedBikes.length} bikes found`
              : "No bikes found"}
          </h1>

          <div className="category">
            <p>Order by</p>
            <div className="categoryblock">
              <button
                className={filter === "price" ? "active" : ""}
                onClick={() => handleFilterClick("price")}
              >
                Lowest price
              </button>
              <button
                className={filter === "closest" ? "active" : ""}
                onClick={() => handleFilterClick("closest")}
              >
                Closest
              </button>
              <button
                className={filter === "newest" ? "active" : ""}
                onClick={() => handleFilterClick("newest")}
              >
                Newest Listings
              </button>
              <div className="spec-dropdown">
                <button className={specOpen ? "active" : ""} onClick={toggleSpec}>
                  Specification
                </button>
                {specOpen && (
                  <div className="spec-list">
                    {specs.map(spec => (
                      <label key={spec} className="spec-item">
                        <span>{spec}</span>
                        <input
                          type="checkbox"
                          checked={selectedSpecs.includes(spec)}
                          onChange={() => toggleSpecItem(spec)}
                        />

                      </label>
                    ))}
                  </div>
                )}
              </div>
              <button
                className={filter === "retailer" ? "active" : ""}
                onClick={() => handleFilterClick("retailer")}
              >
                Retailer
              </button>
            </div>
          </div>
          <div className="pagesblock">
            <div className="pages">
              <button onClick={() => goToPage(1)}>First</button>
              <button onClick={() => goToPage(currentPage - 1)}>Prev</button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={currentPage === i + 1 ? "active" : ""}
                  onClick={() => goToPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button onClick={() => goToPage(currentPage + 1)}>Next</button>
              <button onClick={() => goToPage(totalPages)}>Last</button>
            </div>
            <div className="pagesrange">
              <p>Results per page</p>
              <input
                type="number"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                min={1}
              />
            </div>
          </div>

          <div className="listbikes">
            {sortedBikes.length > 0 ? (
              paginatedBikes.map((bike) => (
                <article className="bikescard" key={bike.name}>
                  <div className="textblock">
                    <p className="biketype">{bike.type}</p>
                    <h2 className="bikename">{bike.name}</h2>
                    <p className="bikecity">{bike.city}</p>
                  </div>
                  <p className="bikeprice">${bike.price}</p>
                </article>
              ))
            ) : (
              <p className="nobikes">No available bikes by chosen filters</p>
            )}
          </div>
        </section>
      </main >

    </>
  )
}

export default App
