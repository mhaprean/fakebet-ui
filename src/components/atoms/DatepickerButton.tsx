import { Box, Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { timeFormatService } from '../../services/timeFormaterService';
import CalendarIcon from '@mui/icons-material/Event';

import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

const StyledDatepickerButton = styled('div')`
  display: flex;
  .RenderBox {
    display: flex;
    cursor: pointer;
    background: ${(props) => props.theme.palette.background.paper};
    color: ${(props) => props.theme.palette.text.primary};
    border-radius: 50px;
    padding: 0 15px;
    text-transform: initial;
    height: 35.6px;
    box-shadow: none;
    border: 1px solid ${(props) => props.theme.palette.divider};

    &:hover {
      border-color: ${(props) => props.theme.palette.primary.contrastText};
      border: 1px solid;
    }
    &:active {
      /* box-shadow: none; */
      border: 1px solid;
      border-color: ${(props) => props.theme.palette.primary.main};
    }
    &:focus {
      border: 1px solid;
      border-color: ${(props) => props.theme.palette.primary.main};
      box-shadow: 0 0 0 1px ${(props) => props.theme.palette.primary.main};
    }
  }
`;

export interface IPropsDatepickerButton {
  selectedDate: string;
  onChangeDate: (value: string) => void;
}

const DatepickerButton = ({ selectedDate, onChangeDate }: IPropsDatepickerButton) => {
  const [isOpen, setIsOpen] = useState(false);

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 7);

  const handleDateChange = (val: string | null) => {
    if (val) {
      console.log('!!! new date val: ', val);
      onChangeDate(val);
    }
  };

  return (
    <StyledDatepickerButton>
      <LocalizationProvider dateAdapter={DateFnsUtils}>
        <DatePicker
          label="Chose date from here"
          value={selectedDate}
          onChange={handleDateChange}
          open={isOpen}
          onClose={() => setIsOpen(false)}
          renderInput={({ inputRef, inputProps, InputProps }) => (
            <Button
              className="RenderBox"
              onClick={() => setIsOpen(true)}
              startIcon={<CalendarIcon />}
              disableRipple
            >
              <input ref={inputRef} {...inputProps} style={{ width: 0, height: 0, opacity: 0 }} />{' '}
              {timeFormatService.formatMatchDate(selectedDate)}
            </Button>
          )}
          minDate={new Date().toISOString()}
          maxDate={maxDate.toISOString()}
        />
      </LocalizationProvider>
    </StyledDatepickerButton>
  );
};

export default DatepickerButton;
