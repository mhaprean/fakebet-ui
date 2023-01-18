import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Delete as DeleteIcon } from '@mui/icons-material';
import FlexBetween from '../atoms/FlexBetween';
import classNames from 'classnames';
import { useState } from 'react';

const StyledBetslip = styled('div')`
  .betslip-subheader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 2px 2px 10px;
  }

  .cancel-button {
    padding: 0px 5px;
  }

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

const Betslip = () => {
  const eventsNr = 3;

  const [stake, setStake] = useState(100);
  const onClearBetslip = () => {};

  const handlePlaceBet = () => {};

  const changeStakeViaButton = (newStake: number) => {
    // onChangeStake(newStake);
  };

  const handleChangeStake = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStake = parseFloat(event.target.value);
    setStake(newStake);
    // if (isNaN(newStake)) {
    //   setHasError(true);
    //   setErrorMessage('The stake should be a number');
    // } else {
    //   setHasError(false);
    //   setErrorMessage('');
    // }
    // onChangeStake(newStake);
  };

  return (
    <StyledBetslip className="Betslip">
      <Box className="betslip-header">
        <Typography variant="subtitle2">Betslip</Typography>
      </Box>

      <Paper className="betslip-subheader" square variant="outlined">
        <Typography className="events-count" variant="body2">
          Events: {eventsNr}
        </Typography>
        <Button onClick={() => onClearBetslip()} className="cancel-button" endIcon={<DeleteIcon />}>
          Cancel
        </Button>
      </Paper>

      <Box className="selection-list">event list here</Box>
      <Box className="betslip-controls">
        <Paper className="betslip-info" variant="outlined" square>
          <FlexBetween>
            <Typography className="label" variant="h6" component="label">
              Total odds:
            </Typography>
            <Typography className="value" variant="h6" component="label">
              6.32
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
              632 $
            </Typography>
          </FlexBetween>
        </Paper>
        <div>
          <Button onClick={handlePlaceBet} className="submit-button" variant="contained" fullWidth>
            Place bet
          </Button>
        </div>
      </Box>
    </StyledBetslip>
  );
};

export default Betslip;
