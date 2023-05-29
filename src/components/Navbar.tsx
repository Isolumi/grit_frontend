import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const Navbar = () => {
  return (
    <div className="w-full min-w-[1500px] shadow-sm flex bg-gray-100">
      <div className="flex justify-between">
        <span className="self-center text-2xl font-semibold whitespace-nowrap font-serif">
          Telus
        </span>
        
        <button id="navBtn" className="btn btn-primary">
          Dashboard
        </button>

        <DropdownButton id="navBtn" title="SAPCC">
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </DropdownButton>

        <DropdownButton id="navBtn" title="OCSG">
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </DropdownButton>

        <DropdownButton id="navBtn" title="Admin">
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </DropdownButton>
      </div>

      <div className="ml-auto flex items-center">
        <DropdownButton id="navBtn" title="User ID">
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </DropdownButton>

        <span className="font-bold text-blue-700 text-xl">pr</span>
      </div>
    </div>
  );
};

export default Navbar;
