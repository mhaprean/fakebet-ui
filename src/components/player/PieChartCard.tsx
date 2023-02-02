import { Paper, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { PieChart } from 'react-minimal-pie-chart';

const StyledPieChartCard = styled(Paper)`
  display: flex;
  flex-direction: column;
  padding: 20px;

  .PieChart {
    max-width: 200px;
    margin: 0 auto;
  }

  .PieLabels {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    .Label {
      display: flex;
      align-items: center;
      margin: 0 10px;

      .Index {
        margin-right: 5px;

        &.Lost {
          color: ${(props) => props.theme.palette.error.main};
        }
        &.Win {
          color: ${(props) => props.theme.palette.success.main};
        }
        &.Pending {
          color: ${(props) => props.theme.palette.warning.main};
        }
      }
    }
  }
`;

interface IPropsPieChartCard {
  winning_tickets?: number;
  lose_tickets?: number;
  pending_tickets?: number;
}

const PieChartCard = ({
  winning_tickets = 0,
  lose_tickets = 0,
  pending_tickets = 0,
}: IPropsPieChartCard) => {
  const theme = useTheme();

  return (
    <StyledPieChartCard className="PieChartCard">
      <PieChart
        className="PieChart"
        lineWidth={20}
        paddingAngle={18}
        rounded
        labelPosition={60}
        lengthAngle={-360}
        animate
        data={[
          { title: 'Win', value: winning_tickets, color: theme.palette.success.main },
          { title: 'Pending', value: pending_tickets, color: theme.palette.warning.main },
          { title: 'Lose', value: lose_tickets, color: theme.palette.error.main },
        ]}
      />

      <div className="PieLabels">
        <div className="Label">
          <Typography className="Index Win" noWrap variant="caption">
            Win:
          </Typography>
          <Typography noWrap variant="subtitle2">
            {winning_tickets}
          </Typography>
        </div>

        <div className="Label">
          <Typography className="Index Pending" noWrap variant="caption">
            Pending:
          </Typography>
          <Typography noWrap variant="subtitle2">
            {pending_tickets}
          </Typography>
        </div>

        <div className="Label">
          <Typography className="Index Lost" noWrap variant="caption">
            Lost:
          </Typography>
          <Typography noWrap variant="subtitle2">
            {lose_tickets}
          </Typography>
        </div>
      </div>
    </StyledPieChartCard>
  );
};

export default PieChartCard;
