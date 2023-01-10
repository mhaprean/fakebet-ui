import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetLeaguesQuery } from '../../redux/features/oddspediaApi';
import { IOddspediaCategory } from '../../redux/features/oddspediaTypes';

interface IPropsCategoryLeagueList {
  category: IOddspediaCategory;
  sportSlug: string;
}

const StyledCategoryLeagueList = styled('div')`
  img {
    width: 20px;
    height: 20px;
  }

  .MuiListItemText-root {
    .MuiTypography-root {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .MuiListItemButton-root {
    padding-left: 20px;

    .MuiListItemIcon-root {
      min-width: 40px;
    }
  }

  .league {
    padding-left: 30px;
    padding-right: 15px;

    &:hover {
      box-shadow: inset 4px 0 0 ${(props) => props.theme.palette.secondary.main};
    }
  }

  .isExpanded {
    background: ${(props) => props.theme.palette.action.selected};
  }
`;

const CategoryLeagueList = ({ category, sportSlug }: IPropsCategoryLeagueList) => {
  const { slug, name, match_count_prematch, id } = category;

  const [open, setOpen] = useState(false);

  const {
    data: leaguesResponse,
    error: leaguesError,
    isLoading: isLeaguesLoading,
    isFetching: isLeaguesFetching,
  } = useGetLeaguesQuery(
    { topLeaguesOnly: 0, includeLeaguesWithoutMatches: 1, sport: sportSlug, category: category.id },
    { skip: !open }
  );

  const handleClick = () => {
    setOpen(!open);
  };

  const handleLeagueChange = () => {};

  if (match_count_prematch === 0) {
    return null;
  }

  return (
    <StyledCategoryLeagueList className="CategoryLeagueList">
      <ListItemButton onClick={handleClick} className={open ? 'isExpanded' : ''}>
        <ListItemIcon>
          <img src={`https://cdn.oddspedia.com/images/categories/${slug}.svg`} alt="" />
        </ListItemIcon>
        <ListItemText primary={name} />
        {open ? (
          <ExpandLess />
        ) : (
          <>
            ({match_count_prematch}) <ExpandMore />
          </>
        )}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {isLeaguesFetching && <div>is loading...</div>}
          {leaguesResponse?.data
            ?.filter((league) => league.match_count_prematch > 0)
            .map((league) => (
              <Link
                onClick={handleLeagueChange}
                className="LeagueLink"
                key={league.league_slug}
                to={`/sports/${sportSlug}/${league.category_slug}/${league.league_slug}`}
                style={{ textDecoration: 'none' }}
              >
                <ListItem disablePadding>
                  <ListItemButton className="league" key={league.league_slug} sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <img
                        src={`https://cdn.oddspedia.com/images/leagues/small/${sportSlug}/${league.category_slug}/${league.league_slug}.png`}
                        alt=""
                      />
                    </ListItemIcon>
                    <ListItemText primary={league.league_name} />
                    {league.match_count_prematch}
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
        </List>
      </Collapse>
    </StyledCategoryLeagueList>
  );
};

export default CategoryLeagueList;
