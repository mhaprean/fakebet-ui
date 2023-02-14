import { IIgubetCategoryWithTournaments } from '../../redux/features/igubetApi';
import CategoryLeagueList from './CategoryLeagueList';

interface IPropsCategoryList {
  categories: IIgubetCategoryWithTournaments[];
  sportSlug?: string;
}

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
