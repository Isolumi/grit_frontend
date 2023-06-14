import Content from "./ContentTable";
import Navbar from "./Navbar";
import Toolbar from "./Toolbar";

function App() {
  return (
    <div className="flex flex-col">
      <div className='flex-none'>
        <Navbar />
      </div>
      <div className='flex-none'>
        <Toolbar />
      </div>
      <div className='flex-none'>
        <Content />
      </div>
    </div>
  );
}

export default App;
