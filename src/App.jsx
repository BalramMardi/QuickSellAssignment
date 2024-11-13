import { useState, useEffect } from "react";
import KanbanBoard from "./components/KanbanBoard";
import Header from "./components/Header";
import { fetchTickets } from "./data/api"; // Ensure this is correctly imported
import "./App.css";

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState(
    () => localStorage.getItem("grouping") || "status"
  );
  const [ordering, setOrdering] = useState(
    () => localStorage.getItem("ordering") || "priority"
  );

  useEffect(() => {
    const getTicketsData = async () => {
      const data = await fetchTickets(); // Fetch the data from the API
      setTickets(data.tickets);
      setUsers(data.users);
    };

    getTicketsData(); // Call the function to fetch the data on mount
  }, []);

  useEffect(() => {
    localStorage.setItem("grouping", grouping);
    localStorage.setItem("ordering", ordering);
  }, [grouping, ordering]);

  return (
    <div className="app">
      <Header
        grouping={grouping}
        ordering={ordering}
        setGrouping={setGrouping}
        setOrdering={setOrdering}
      />
      <KanbanBoard
        tickets={tickets}
        users={users}
        grouping={grouping}
        ordering={ordering}
      />
    </div>
  );
}

export default App;
