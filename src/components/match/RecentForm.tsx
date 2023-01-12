import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import classNames from 'classnames';

interface IPropsRecentForm {
  home: string;
  away: string;
  homeForm: string;
  awayForm: string;
}

const StyledRecentForm = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;

  .team-form {
    display: flex;
    flex-direction: row;
    padding: 10px 0;
    margin-right: -10px;

    .recent-form-result {
      background-color: blue;
      border: 2px solid #fff;
      height: 30px;
      width: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      border-radius: 50px;
      color: #fff;
      margin-left: -10px;

      &.winner {
        background-color: ${(props) => props.theme.palette.success.main};
      }
      &.draw {
        background-color: ${(props) => props.theme.palette.warning.main};
      }
      &.lost {
        background-color: ${(props) => props.theme.palette.error.main};
      }
    }

    &.home-team {
      padding-right: 5px;
    }

    &.away-team {
      padding-left: 5px;
      .recent-form-result {
        &:nth-of-type(1) {
          z-index: 10;
        }
        &:nth-of-type(2) {
          z-index: 9;
        }
        &:nth-of-type(3) {
          z-index: 8;
        }
        &:nth-of-type(4) {
          z-index: 7;
        }
        &:nth-of-type(5) {
          z-index: 6;
        }
      }
    }
  }
`;

const RecentForm = ({ home, away, homeForm = '', awayForm = '' }: IPropsRecentForm) => {
  return (
    <StyledRecentForm className="RecentForm">
      <div className="team-form home-team">
        {homeForm
          .split('')
          .reverse()
          .map((outcome: string, idx: number) => (
            <div
              key={idx}
              className={classNames('recent-form-result', {
                winner: outcome === 'W',
                draw: outcome === 'D',
                lost: outcome === 'L',
              })}
            >
              {outcome}
            </div>
          ))}
      </div>
      <ArrowForward />
      <ArrowBack />
      <div className="team-form away-team">
        {awayForm
          .split('')
          .reverse()
          .map((outcome: string, idx: number) => (
            <div
              key={idx}
              className={classNames('recent-form-result', {
                winner: outcome === 'W',
                draw: outcome === 'D',
                lost: outcome === 'L',
              })}
            >
              {outcome}
            </div>
          ))}
      </div>
    </StyledRecentForm>
  );
};

export default RecentForm;
