import { Tab, Tabs, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IAccountAttributes } from '../../redux/features/strapiApi';
import { timeFormatService } from '../../services/timeFormaterService';

const StyledPlayerHeader = styled('div')`
  background: ${(props) => props.theme.palette.background.paper};
  display: flex;
  padding: 20px 0;
  flex-direction: column;
  /* max-width: 300px; */
  align-items: center;
  padding-bottom: 0;
  margin-bottom: 10px;

  .user-image {
    width: 76px;
    height: 76px;
    border-radius: 50px;
    margin: 10px;
    background: ${(props) => props.theme.palette.text.primary};

    img {
      width: 70px;
      height: 70px;
      border-radius: 50px;
      margin-top: 3px;
      margin-left: 3px;
    }
  }
  .user-info {
    display: flex;
    flex-direction: column;
    align-items: center;

    .username {
      font-weight: ${props => props.theme.typography.fontWeightBold};
      font-size: 20px;
    }
  }
  .register-date {
    display: flex;
    align-items: center;
  }
  .tabs {
    width: 100%;
  }
  .MuiTabs-indicator {
    height: 3px;
  }
`;

interface IPropsProfileHeader {
  activeTab?: string;
  onTabChange?: (value: string) => void;
  account: IAccountAttributes;
}

const PlayerHeader = ({ account, activeTab = 'stats', onTabChange = () => {} }: IPropsProfileHeader) => {
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    onTabChange(newValue);
  };

  return (
    <StyledPlayerHeader className="PlayerHeader">
      <div className="user-image">
        <img src={account.user.data.attributes.image} alt="" />
      </div>

      <div className="user-info">
        <Typography noWrap variant="h2" className='username'>
          {account?.user?.data.attributes.username}
        </Typography>

        <div className="register-date">
          <Typography noWrap variant="body2">
            Member from:
          </Typography>
          <Typography noWrap variant="subtitle2" style={{ marginLeft: 10 }}>
            {timeFormatService.formatDateForPlayerHeader(account?.user?.data.attributes.createdAt || '')}
          </Typography>
        </div>

        <div className="register-date">
          <Typography noWrap variant="body2">
            Current balance:
          </Typography>
          <Typography noWrap variant="h4" style={{ marginLeft: 10 }}>
            {parseFloat(account.current_balance + '').toFixed(2)} $
          </Typography>
        </div>
      </div>

      <div className="tabs">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="secondary"
          textColor="inherit"
          aria-label="full width tabs example"
          // allowScrollButtonsMobile
          // selectionFollowsFocus
          // visibleScrollbar
          // scrollButtons
          variant="scrollable"
        >
          <Tab label="Stats" value="stats" />
          <Tab label="Tickets" value="tickets" />
        </Tabs>
      </div>
    </StyledPlayerHeader>
  );
};

export default PlayerHeader;
