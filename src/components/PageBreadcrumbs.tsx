import { Breadcrumbs, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export interface IBreadcrumb {
  name?: string;
  to: string;
}
export interface IPropsPageBreadcrumbs {
  breadcrumbs: IBreadcrumb[];
}

const StyledBreadcrumbs = styled('div')`
  margin: 10px 0;
  .MuiBreadcrumbs-separator {
    margin: 0;
  }
  .MuiBreadcrumbs-li {
    a {
      color: ${(props) => props.theme.palette.text.primary};
      display: flex;
    }
    p {
      color: ${(props) => props.theme.palette.text.secondary};
    }
  }
`;

const PageBreadcrumbs = ({ breadcrumbs }: IPropsPageBreadcrumbs) => {
  return (
    <StyledBreadcrumbs className="PageBreadcrumbs">
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        {breadcrumbs?.map((breadcrumb: IBreadcrumb, index) =>
          index === breadcrumbs.length - 1 ? (
            breadcrumb.name ? (
              <Typography key="3" color="text.primary">
                {breadcrumb.name}
              </Typography>
            ) : null
          ) : breadcrumb.name ? (
            <Link key={index} color="inherit" to={breadcrumb.to}>
              {index === 0 ? <HomeIcon fontSize="small" /> : breadcrumb.name}
            </Link>
          ) : null
        )}
      </Breadcrumbs>
    </StyledBreadcrumbs>
  );
};

export default PageBreadcrumbs;
