import { useParams } from "react-router-dom";
import PageBreadcrumbs, { IBreadcrumb } from "../components/PageBreadcrumbs";


const CategoryPage = () => {

  const { sport, category } = useParams();

  const breadcrumbsArray: IBreadcrumb[] = [
    {
      name: 'Home',
      to: '/',
    },
    {
      name: sport,
      to: `/sports/${sport}`,
    },
    {
      name: category,
      to: ``,
    },
  ];

  return <div>
          <PageBreadcrumbs breadcrumbs={breadcrumbsArray} />
    CategoryPage</div>;
};

export default CategoryPage;
