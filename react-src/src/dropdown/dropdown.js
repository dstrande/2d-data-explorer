import Dropdown from 'react-bootstrap/Dropdown';

function OptionMenu() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-options">
        Options
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default OptionMenu;