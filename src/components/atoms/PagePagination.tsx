import { Pagination, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPagePagination = styled('div')`
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

interface IPropsPagePagination {
  total?: number;
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

const PagePagination = ({
  total = 0,
  totalPages = 1,
  currentPage = 1,
  onPageChange = () => {},
}: IPropsPagePagination) => {
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };

  return (
    <StyledPagePagination className="PagePagination">
      <Typography noWrap variant="body2">
        Total: {total || '0'}
      </Typography>

      <Pagination
        count={totalPages}
        siblingCount={0}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
      />
    </StyledPagePagination>
  );
};

export default PagePagination;
