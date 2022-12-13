import { useGetCategoriesQuery } from '../redux/features/oddspediaApi';

const OddspediaCategories = () => {
  const { data: categoriesRes, isLoading } = useGetCategoriesQuery({});
  return (
    <div>
      OddspediaCategories
      {isLoading && <div>is loading...</div>}
      {!isLoading && categoriesRes && categoriesRes.data.map((cat) => <div key={cat.id}>{cat.name}</div>)}
    </div>
  );
};

export default OddspediaCategories;
