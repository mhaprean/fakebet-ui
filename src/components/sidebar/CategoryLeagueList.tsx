import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IIgubetCategoryWithTournaments } from '../../redux/features/igubetApi';
import ImageWithFallback from '../atoms/ImageWithFallback';

interface IPropsCategoryLeagueList {
  category: IIgubetCategoryWithTournaments;
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

  const handleClick = () => {
    setOpen(!open);
  };

  const handleLeagueChange = () => {};

  return (
    <StyledCategoryLeagueList className="CategoryLeagueList">
      <ListItemButton onClick={handleClick} className={open ? 'isExpanded' : ''}>
        <ListItemIcon>
          <ImageWithFallback
            image={`https://cdn.oddspedia.com/images/categories/${slug}.svg`}
            type="category"
          />
        </ListItemIcon>
        <ListItemText primary={name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {category.tournaments.map((tournament, idx) => (
            <Link
              onClick={handleLeagueChange}
              className="LeagueLink"
              key={tournament.urn_id}
              to={`/sports/${tournament.sport.key}/${category.id}/${category.slug}/${tournament.id}/${tournament.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <ListItem disablePadding>
                <ListItemButton className="league" sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ImageWithFallback
                      image={`https://cdn.oddspedia.com/images/leagues/small/${sportSlug}/${category.slug}/${tournament.slug}.png`}
                      type="league"
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
