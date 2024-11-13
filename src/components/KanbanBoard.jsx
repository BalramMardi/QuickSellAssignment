import { useMemo, useState } from "react";
import Card from "./Card";
import "./KanbanBoard.css";
import down from "../assets/icons/down.svg";
import add from "../assets/icons/add.svg";
import three from "../assets/icons/3 dot menu.svg";

import urgent from "../assets/icons/SVG - Urgent Priority colour.svg";
import high from "../assets/icons/Img - High Priority.svg";
import medium from "../assets/icons/Img - Medium Priority.svg";
import low from "../assets/icons/Img - Low Priority.svg";
import no_priority from "../assets/icons/No-priority.svg";

import todo from "../assets/icons/To-do.svg";
import inprogress from "../assets/icons/in-progress.svg";
import done from "../assets/icons/Done.svg";
import cancelled from "../assets/icons/Cancelled.svg";
import backlog from "../assets/icons/Backlog.svg";

const priorityLabels = {
  4: "Urgent",
  3: "High",
  2: "Medium",
  1: "Low",
  0: "No priority",
};

export default function KanbanBoard({ tickets, users, grouping, ordering }) {
  const [page, setPage] = useState("");
  const groupedTickets = useMemo(() => {
    let grouped = {};

    if (grouping === "status") {
      setPage("status");
      grouped = tickets.reduce((acc, ticket) => {
        acc[ticket.status] = [...(acc[ticket.status] || []), ticket];
        return acc;
      }, {});
    } else if (grouping === "user") {
      setPage("user");

      grouped = tickets.reduce((acc, ticket) => {
        const user = users.find((u) => u.id === ticket.userId);
        const userName = user ? user.name : "Unassigned";
        acc[userName] = [...(acc[userName] || []), ticket];
        return acc;
      }, {});
    } else if (grouping === "priority") {
      setPage("priority");

      grouped = tickets.reduce((acc, ticket) => {
        const priority = priorityLabels[ticket.priority];
        acc[priority] = [...(acc[priority] || []), ticket];
        return acc;
      }, {});
    }

    Object.keys(grouped).forEach((key) => {
      grouped[key].sort((a, b) => {
        if (ordering === "priority") {
          return b.priority - a.priority;
        }
        return a.title.localeCompare(b.title);
      });
    });

    return grouped;
  }, [tickets, users, grouping, ordering]);

  return (
    <div className="kanban-board">
      {Object.entries(groupedTickets).map(([group, tickets]) => (
        <div key={group} className="column">
          <div className="column-header">
            {page === "user" ? (
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed="apple"`}
                alt="icon"
                className="user-avatar"
              />
            ) : page === "status" ? (
              <p className="status-text">
                <p className="status-icon-dash">
                  {group === "Todo" && (
                    <img src={todo} alt="To Do" className="status-icon" />
                  )}
                  {group === "In progress" && (
                    <img
                      src={inprogress}
                      alt="In Progress"
                      className="status-icon"
                    />
                  )}
                  {group === "Done" && (
                    <img src={done} alt="done" className="status-icon" />
                  )}
                  {group === "Backlog" && (
                    <img src={backlog} alt="backlog" className="status-icon" />
                  )}
                  {group === "Canceled" && (
                    <img
                      src={cancelled}
                      alt="cancelled"
                      className="status-icon"
                    />
                  )}
                </p>
              </p>
            ) : page === "priority" ? (
              <p className="priority-icon-dash">
                {group === "Urgent" && (
                  <img
                    src={urgent}
                    alt="Urgent Priority"
                    className="urgent-icon"
                  />
                )}
                {group === "High" && (
                  <img src={high} alt="High Priority" className="high-icon" />
                )}
                {group === "Medium" && (
                  <img
                    src={medium}
                    alt="Medium Priority"
                    className="medium-icon"
                  />
                )}
                {group === "Low" && (
                  <img src={low} alt="Low Priority" className="low-icon" />
                )}
                {group === "No priority" && (
                  <img
                    src={no_priority}
                    alt="No Priority"
                    className="no_priority-icon"
                  />
                )}
              </p>
            ) : null}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div>
                <h2>
                  {group} <span className="count">{tickets.length}</span>
                </h2>
              </div>
              <div>
                <img src={add} alt="add" />
                <img src={three} alt="three" />
              </div>
            </div>
          </div>
          <div className="cards">
            {tickets.map((ticket) => (
              <Card
                key={ticket.id}
                ticket={ticket}
                user={users.find((u) => u.id === ticket.userId)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
