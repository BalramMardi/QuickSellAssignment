import "./Card.css";
import urgent from "../assets/icons/SVG - Urgent Priority grey.svg";
import high from "../assets/icons/Img - High Priority.svg";
import medium from "../assets/icons/Img - Medium Priority.svg";
import low from "../assets/icons/Img - Low Priority.svg";
import no_priority from "../assets/icons/No-priority.svg";

export default function Card({ ticket, user }) {
  return (
    <div className="card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        {user && (
          <div className="user-avatar-cards">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
              alt={user.name}
            />
            <span
              className={`status-dot ${user.available ? "available" : ""}`}
            />
          </div>
        )}
      </div>
      <h2 className="card-title">{ticket.title}</h2>
      <div className="card-tags">
        <span className="priority-icon">
          {ticket.priority === 4 && (
            <img src={urgent} alt="Urgent Priority" className="urgent-icon" />
          )}
          {ticket.priority === 3 && (
            <img src={high} alt="high Priority" className="high-icon" />
          )}
          {ticket.priority === 2 && (
            <img src={medium} alt="medium Priority" className="medium-icon" />
          )}
          {ticket.priority === 1 && (
            <img src={low} alt="low Priority" className="low-icon" />
          )}
          {ticket.priority === 0 && (
            <img
              src={no_priority}
              alt="no_priority Priority"
              className="no_priority-icon"
            />
          )}
        </span>
        {ticket.tag.map((tag, index) => (
          <span key={index} className="tag">
            <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
              <circle cx="7.5" cy="7.5" r="6" fill="lightgrey" />
            </svg>{" "}
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
