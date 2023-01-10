import { styled } from '@mui/material/styles';
import { IOddspediaCategory } from '../../redux/features/oddspediaTypes';
import CategoryLeagueList from './CategoryLeagueList';

interface IPropsCategoryList {
  categories: IOddspediaCategory[];
  sportSlug?: string;
}

const StyledCategoryList = styled('div')``;

const CategoryList = ({ categories, sportSlug = 'football' }: IPropsCategoryList) => {
  return (
    <div>
      {categories.map((category, idx) => (
        <CategoryLeagueList key={idx} category={category} sportSlug={sportSlug} />
      ))}
    </div>
  );
};

export default CategoryList;
