import "./App.css";
import Todo from "./pages/Todo";
import Landing from "./pages/Landing";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<main><Landing /></main>} exact />
        <Route path="/todo" element={<main><Todo /></main>} />
      </Routes>
    </Router>

    // <Todo />
  );
}

export default App;