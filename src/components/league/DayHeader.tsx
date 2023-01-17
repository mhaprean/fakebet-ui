import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { timeFormatService } from '../../services/timeFormaterService';

const StyledDayHeader = styled(Paper)`
  color: ${(props) => props.theme.palette.text.secondary};
  padding: 5px;
  padding-left: 10px;
  margin-top: 25px;

  box-shadow: none;
  border: 1px solid ${(props) => props.theme.palette.divider};
`;

interface IPropsDayHeader {
  day: string;
}

const DayHeader = ({ day }: IPropsDayHeader) => {
  return (
    <StyledDayHeader className="DayHeader" variant="elevation" elevation={2}>
      {timeFormatService.formatLeagueDay(day)}
    </StyledDayHeader>
  );
};

export default DayHeader;
