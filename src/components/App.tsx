import ContentTable from "./ContentTable/ContentTable";
import Navbar from "./Navbar";
import Toolbar from "./Toolbar";
import { BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";

const App = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <Router>
      <div className="flex flex-col">
        <div className="flex-none">
          <Navbar />
        </div>
        <div className="flex-none">
          <Toolbar refresh={refresh} setRefresh={setRefresh}/>
        </div>
        <div className="flex-none">
          <ContentTable refresh={refresh}/>
        </div>
      </div>
    </Router>
  );
};

export default App;
