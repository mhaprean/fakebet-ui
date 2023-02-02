import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { IAccountItem, IStrapiAccount, IStrapiUserList } from '../../redux/features/strapiApi';

interface IPropsPlayerList {
  players: IAccountItem[];
}

const StyledPlayerList = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;

  .heading {
    display: flex;
    background: ${(props) => props.theme.palette.background.paper};
    color: ${(props) => props.theme.palette.text.secondary};
    padding: 10px;
  }

  .player-link {
    text-decoration: none;

    &:nth-of-type(even) {
      .player {
        background: ${(props) => props.theme.palette.background.paper};
      }
    }
  }

  .player {
    display: flex;
    padding: 10px;
    align-items: center;

    color: ${(props) => props.theme.palette.text.primary};

    &:hover {
      color: ${(props) => props.theme.palette.secondary.main};
    }

    .player-name,
    .index {
      flex-shrink: 0;
    }

    img {
      width: 30px;
      height: 30px;
      border-radius: 30px;
      margin: 0 10px;
      flex-shrink: 0;
    }

    .label {
      margin-left: auto;
      margin-right: 10px;
    }

    .current-balance {
      flex-shrink: 0;
      text-align: center;
      width: 100px;
      margin-left: auto;
    }
  }
`;

const PlayerList = ({ players }: IPropsPlayerList) => {
  return (
    <StyledPlayerList className="PlayerList">
      <div className="heading">
        <Typography className="index" noWrap variant="body2" style={{ marginRight: 'auto' }}>
          Player
        </Typography>

        <Typography className="current-balance" noWrap variant="subtitle2">
          Current balance
        </Typography>
      </div>
      {players.map((player, idx) => (
        <Link key={idx} to={`/players/${player.id}`} className="player-link">
          <div className="player">
            <Typography className="index" noWrap variant="caption">
              {player.id}.
            </Typography>

            <img src={player.attributes.user.data.attributes.image} alt="" />

            <Typography className="player-name" noWrap variant="subtitle1">
              {player.attributes.user.data.attributes.username}
            </Typography>

            <Typography className="current-balance" noWrap variant="subtitle2">
              {player.attributes.current_balance} $
            </Typography>
          </div>
        </Link>
      ))}
    </StyledPlayerList>
  );
};

export default PlayerList;
