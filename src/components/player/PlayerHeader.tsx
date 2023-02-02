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

  .UserImage {
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
  .UserInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .RegisterDate {
    display: flex;
    align-items: center;
  }
  .Tabs {
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
      <div className="UserImage">
        <img src={account.user.data.attributes.image} alt="" />
      </div>

      <div className="UserInfo">
        <Typography noWrap variant="h2">
          {account?.user?.data.attributes.username}
        </Typography>

        <div className="RegisterDate">
          <Typography noWrap variant="body2">
            Member from:
          </Typography>
          <Typography noWrap variant="subtitle2" style={{ marginLeft: 10 }}>
            {timeFormatService.formatDateForPlayerHeader(account?.user?.data.attributes.createdAt || '')}
          </Typography>
        </div>

        <div className="RegisterDate">
          <Typography noWrap variant="body2">
            Current balance:
          </Typography>
          <Typography noWrap variant="h4" style={{ marginLeft: 10 }}>
            {parseFloat(account.current_balance + '').toFixed(2)} $
          </Typography>
        </div>
      </div>

      <div className="Tabs">
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
