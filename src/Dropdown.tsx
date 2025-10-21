import { useState } from "react";
import "./Dropdown.css";

export default function Dropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Select option");

  const handleSelect = (value: string) => {
    setSelected(value);
    setOpen(false);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-btn" onClick={() => setOpen(!open)}>
        {selected} <span className={`arrow ${open ? "up" : "down"}`}>▼</span>
      </button>

      {open && (
        <ul className="dropdown-menu">
          <li onClick={() => handleSelect("Newest first")}>Newest first</li>
          <li onClick={() => handleSelect("Lowest price")}>Lowest price</li>
          <li onClick={() => handleSelect("Highest price")}>Highest price</li>
        </ul>
      )}
    </div>
  );
}
