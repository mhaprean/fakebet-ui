import { Link } from 'react-router-dom';
import { useGetCategoriesQuery } from '../redux/features/oddspediaApi';

const OddspediaCategories = () => {
  const { data: categoriesRes, isLoading } = useGetCategoriesQuery({});
  return (
    <div>
      OddspediaCategories
      {isLoading && <div>is loading...</div>}
      {!isLoading &&
        categoriesRes &&
        categoriesRes.data.map((cat) => (
          <div key={cat.id}>
            <Link to={`/oddspedia-categories/${cat.id}`}>{cat.name}</Link>
          </div>
        ))}
    </div>
  );
};

export default OddspediaCategories;
