import { Link } from 'react-router-dom';
import { useGetCategoriesQuery } from '../redux/features/igubetApi';

const IIgubetCategories = () => {
  const { data: categoriesRes, isLoading } = useGetCategoriesQuery({});
  return (
    <div>
      {isLoading && <div>is loading...</div>}
      {!isLoading && categoriesRes && categoriesRes.data.map((cat) => <div key={cat.id}>
        <Link to={`/igubet-categories/${cat.id}`}>
        {cat.name}
        </Link>
      </div>)}
    </div>
  );
};

export default IIgubetCategories;
