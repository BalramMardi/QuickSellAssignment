import { useState } from "react";
import "./Header.css";
import Display from "../assets/icons/Display.svg";
import down from "../assets/icons/down.svg";

export default function Header({
  grouping,
  ordering,
  setGrouping,
  setOrdering,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="header">
      <div className="display-button" onClick={() => setIsOpen(!isOpen)}>
        <img src={Display} alt="display" />
        Display
        <img src={down} alt="down" />
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-item">
            <span>Grouping</span>
            <select
              value={grouping}
              onChange={(e) => setGrouping(e.target.value)}
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="dropdown-item">
            <span>Ordering</span>
            <select
              value={ordering}
              onChange={(e) => setOrdering(e.target.value)}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
