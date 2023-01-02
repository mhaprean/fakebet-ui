import { Link, useParams } from 'react-router-dom';
import { useGetCategoriesQuery } from '../redux/features/igubetApi';
import axios from 'axios';
import { useEffect } from 'react';

const IIgubetCategories = () => {
  const { sport } = useParams();

  const { data: categoriesRes, isLoading } = useGetCategoriesQuery(
    { sport_id: sport ? +sport : 1 },
    { skip: !sport }
  );

  return (
    <div>
      {isLoading && <div>is loading...</div>}
      {!isLoading &&
        categoriesRes &&
        categoriesRes.data.map((cat) => (
          <div key={cat.id}>
            <Link to={`/igubet-categories/${cat.id}`}>{cat.name}</Link>
          </div>
        ))}
    </div>
  );
};

export default IIgubetCategories;
