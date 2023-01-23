import { styled } from '@mui/material/styles';

import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface IDropdownItem {
  value: string;
  label: string;
}

interface IPropsDropdownList {
  className?: string;
  items?: IDropdownItem[];
  value: string;
  onChange?: (value: string) => void;
}

const StyledFormControl = styled(FormControl)`
  min-width: 100px;
  margin: 2px;
  background: ${(props) => props.theme.palette.background.paper};
  border-radius: 50px;

  .MuiSelect-select {
    padding: 5px 15px;
    font-size: ${(props) => props.theme.typography.h6};
  }
  .MuiOutlinedInput-root {
    border-radius: 50px;
    padding-left: 5px;
    padding-right: 5px;
  }
`;
const DropdownList = ({ value, onChange, items }: IPropsDropdownList) => {
  const handleChange = (event: SelectChangeEvent) => {
    const newVal = event.target.value as string;
    if (onChange) {
      onChange(newVal);
    }
  };

  return (
    <div>
      <StyledFormControl className="DropdownList">
        <Select value={value} displayEmpty onChange={handleChange}>
          {items?.map((item, idx) => (
            <MenuItem key={idx} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>
    </div>
  );
};

export default DropdownList;
