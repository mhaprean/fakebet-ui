import { useGetCategoriesQuery } from "../redux/features/igubetApi";


const IIgubetCategories = () => {
  const { data: categoriesRes, isLoading } = useGetCategoriesQuery({});
  return (
    <div>
      IIgubetCategories
      {isLoading && <div>is loading...</div>}
      {!isLoading && categoriesRes && categoriesRes.data.map((cat) => <div key={cat.id}>{cat.name}</div>)}
    </div>
  );
};

export default IIgubetCategories;
