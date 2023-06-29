import ContentTable from "./ContentTable/ContentTable";
import Navbar from "./Navbar";
import Toolbar from "./Toolbar";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col">
        <div className="flex-none">
          <Navbar />
        </div>
        <div className="flex-none">
          <Toolbar />
        </div>
        <div className="flex-none">
          <ContentTable />
        </div>
      </div>
    </Router>
  );
};

export default App;
