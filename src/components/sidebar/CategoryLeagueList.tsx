import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetIguTournamentsQuery } from '../../redux/features/igubetApi';
import { IIgubetCategory } from '../../redux/features/igubetTypes';
import { useGetLeaguesQuery } from '../../redux/features/oddspediaApi';
import { IOddspediaCategory } from '../../redux/features/oddspediaTypes';

interface IPropsCategoryLeagueList {
  category: IIgubetCategory;
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
  const { slug, name, id } = category;

  const [open, setOpen] = useState(false);

  const {
    data: tournamentsResponse,
    error: tournamentsError,
    isLoading: isTournamentsLoading,
    isFetching: isTournamentsFetching,
  } = useGetIguTournamentsQuery({ category_id: category.id }, { skip: !open });

  const handleClick = () => {
    setOpen(!open);
  };

  const handleLeagueChange = () => {};

  return (
    <StyledCategoryLeagueList className="CategoryLeagueList">
      <ListItemButton onClick={handleClick} className={open ? 'isExpanded' : ''}>
        <ListItemIcon>
          <img src={`https://cdn.oddspedia.com/images/categories/${slug}.svg`} alt="" />
        </ListItemIcon>
        <ListItemText primary={name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {isTournamentsFetching && <div>is loading...</div>}
          {tournamentsResponse?.data.map((tournament, idx) => (
            <Link
              onClick={handleLeagueChange}
              className="LeagueLink"
              key={tournament.urn_id}
              to={`/sports/${tournament.sport.key}/${tournament.category.slug}/${tournament.id}/${tournament.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <ListItem disablePadding>
                <ListItemButton className="league" sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <img
                      src={`https://cdn.oddspedia.com/images/leagues/small/${sportSlug}/${tournament.category.slug}/${tournament.slug}.png`}
                      alt=""
                    />
                  </ListItemIcon>
                  <ListItemText primary={tournament.name} />
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
