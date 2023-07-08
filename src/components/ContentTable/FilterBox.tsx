import { Form } from "react-bootstrap";

interface FilterBoxProps {
    id: string;
    filters: { [key: string]: boolean };
    handleFilters: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
const FilterBox: React.FC<FilterBoxProps> = ({id, filters, handleFilters}) => {
  return (
    <Form>
      <div className="mr-3 ml-3 font-normal">
        <Form.Check
          name={id}
          type="checkbox"
          label={id.toUpperCase()}
          checked={filters[id]}
          onChange={handleFilters}
        />
      </div>
    </Form>
  );
};

export default FilterBox;
