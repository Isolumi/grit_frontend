import { Form } from "react-bootstrap";
import {
  FaRedoAlt,
  FaRecycle,
  FaEyeSlash,
  FaHammer,
  FaPlus,
  FaExclamation,
  FaFilter,
  FaFileAlt,
} from "react-icons/fa";
import Searchbar from "./Searchbar";

const Toolbar = () => {
  return (
    <div className="shadow-sm flex justify-start items-center h-12">
      <Form>
        <Form.Check type="switch" />
      </Form>

      <div className="min-w-[800px] max-w-[800px] flex justify-between">
        <button id="navBtn" className="btn btn-primary">
          <div className="flex flex-row items-center">
            <FaRedoAlt />
            <span className="ml-1">Refresh</span>
          </div>
        </button>
        <button id="navBtn" className="btn btn-primary">
          <div className="flex flex-row items-center">
            <FaRecycle />
            <span className="ml-1">Recycle</span>
          </div>
        </button>
        <button id="navBtn" className="btn btn-primary">
          <div className="flex flex-row items-center">
            <FaEyeSlash />
            <span className="ml-1">Ignore</span>
          </div>
        </button>
        <button id="navBtn" className="btn btn-primary">
          <div className="flex flex-row items-center">
            <FaHammer />
            <span className="ml-1">Fix-All</span>
          </div>
        </button>
        <button id="navBtn" className="btn btn-primary">
          <div className="flex flex-row items-center">
            <FaPlus />
            <span className="ml-1">Create</span>
          </div>
        </button>
        <button id="navBtn" className="btn btn-primary">
          <div className="flex flex-row items-center">
            <FaExclamation />
            <span className="ml-1">Errors</span>
          </div>
        </button>
        <button id="navBtn" className="btn btn-primary">
          <div className="flex flex-row items-center">
            <FaFilter />
            <span className="ml-1">Reset-Filters</span>
          </div>
        </button>
        <button id="navBtn" className="btn btn-primary">
          <div className="flex flex-row items-center">
            <FaFileAlt />
            <span className="ml-1">Report</span>
          </div>
        </button>
      </div>

      <span><Searchbar /></span>
    </div>
  );
};

export default Toolbar;
