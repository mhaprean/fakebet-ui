import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import classNames from 'classnames';
import FlexBetween from '../atoms/FlexBetween';

interface IPropsBetslipControlls {
  totalOdds: number;
  potentialGain: number;

  stake: number;
  onChangeStake: (newStake: number) => void;

  onPlaceBet?: () => void;

  hasError?: boolean;
  setHasError?: (value: boolean) => void;

  errorMessage?: string;
  setErrorMessage?: (value: string) => void;
}

const StyledBetslipControlls = styled(Box)`
  margin-top: auto;
  
  .betslip-info {
    padding: 5px;
    margin-bottom: 5px;
  }

  .stake {
    display: flex;
    align-items: center;
    margin: 10px 0;

    .MuiButton-root {
      padding: 0 5px;
      min-width: 20px;
      text-transform: none;

      border-radius: 3px;

      margin-left: 5px;
    }

    .currency {
      margin-left: auto;
    }

    .MuiOutlinedInput-input {
      padding: 0;
      padding-right: 5px;
      width: 50px;
      font-size: 12px;
      text-align: right;
      border: none;
      height: 25px;
      border-radius: 2px;
    }

    .stake-input {
      margin-left: 5px;

      .MuiOutlinedInput-notchedOutline {
        border-width: 1px !important;
      }

      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      /* Firefox */
      input[type='number'] {
        -moz-appearance: textfield;
      }
    }
  }
`;

const BetslipControlls = ({
  totalOdds,
  potentialGain,
  stake,
  onChangeStake,
  onPlaceBet,
  hasError,
  setHasError,
  errorMessage,
  setErrorMessage,
}: IPropsBetslipControlls) => {
  const handleChangeStake = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStake = parseFloat(event.target.value);

    onChangeStake(newStake);
    // dispatch(changeStake({ stake: newStake }));

    // if (isNaN(newStake)) {
    //   setHasError(true);
    //   setErrorMessage('The stake should be a number');
    // } else {
    //   setHasError(false);
    //   setErrorMessage('');
    // }
    // onChangeStake(newStake);
  };

  const changeStakeViaButton = (newStake: number) => {
    onChangeStake(newStake);
  };

  const handlePlaceBet = () => {};

  return (
    <StyledBetslipControlls className="BetslipControlls">
      <Paper className="betslip-info" variant="outlined" square>
        <FlexBetween>
          <Typography className="label" variant="h6" component="label">
            Total odds:
          </Typography>
          <Typography className="value" variant="h6" component="label">
            {totalOdds}
          </Typography>
        </FlexBetween>

        <div className="stake">
          <Typography className="label" variant="h6" component="label">
            Stake:
          </Typography>
          <Button
            onClick={() => changeStakeViaButton(10)}
            className={classNames('stake-value', { isSelected: stake === 10 })}
          >
            10
          </Button>
          <Button
            onClick={() => changeStakeViaButton(50)}
            className={classNames('stake-value', { isSelected: stake === 50 })}
          >
            50
          </Button>
          <Button
            onClick={() => changeStakeViaButton(100)}
            className={classNames('stake-value', { isSelected: stake === 100 })}
          >
            100
          </Button>

          <Typography className="label currency" variant="h6" component="label">
            $
          </Typography>
          <TextField
            className="stake-input"
            value={stake || ''}
            onChange={handleChangeStake}
            variant="outlined"
            type={'number'}
          />
        </div>

        <FlexBetween>
          <Typography className="label" variant="h6" component="label">
            Potential gain:
          </Typography>
          <Typography className="value" variant="h6" component="label">
            {potentialGain} $
          </Typography>
        </FlexBetween>
      </Paper>
      <div>
        <Button onClick={handlePlaceBet} className="submit-button" variant="contained" fullWidth>
          Place bet
        </Button>
      </div>
    </StyledBetslipControlls>
  );
};

export default BetslipControlls;
