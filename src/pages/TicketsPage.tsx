import qs from "qs";
import { useState } from "react";
import { useGetTicketsQuery } from "../redux/features/strapiApi";




const TicketsPage = () => {

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState('20');

  const query = qs.stringify(
    {
      sort: ['id:desc', 'is_validated:asc'],
      // filters: filters,
      // {
      //   validation_date: {
      //     $lt: currentDate,
      //   },
      // },
      populate: ['bets'],
      pagination: {
        pageSize: parseInt(perPage),
        page: page,
      },
    },
    {
      encodeValuesOnly: true, // prettify url
    }
  );

  

  const {data, isLoading, isSuccess, isFetching} = useGetTicketsQuery({queryString: query});


  
  return <div>TicketsPage
    {
      isSuccess && data.data.map((ticket, idx) => <div key={idx}>
        {ticket.id}
      </div>)
    }
    {isFetching && <div>is loading...</div>}
  </div>;
};

export default TicketsPage;
