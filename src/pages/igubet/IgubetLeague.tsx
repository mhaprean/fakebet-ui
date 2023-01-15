import axios from 'axios';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IMatchMarketsResponse, useGetIguMatchesQuery } from '../../redux/features/igubetApi';
import { IIgubetMarket } from '../../redux/features/igubetTypes';
import { IIguDetaMatch, useAddMatchesMutation } from '../../redux/features/iguDetaApi';
import { transformIgubetMarkets } from '../../services/igubetTransformer';
import { timeFormatService } from '../../services/timeFormaterService';

function delay(t: number) {
  return new Promise((resolve) => setTimeout(resolve, t));
}

const IgubetLeague = () => {
  const { id } = useParams();

  const [addIguDetaMatches, response] = useAddMatchesMutation();

  const { data: matchesRes, isSuccess } = useGetIguMatchesQuery(
    { tournament_id: id, limit: 100 },
    { skip: !id }
  );

  const getMatchesOddMarkets = async () => {
    if (!matchesRes) {
      return false;
    }
    const matches: IIguDetaMatch[] = matchesRes.data.map((match) => {
      const key = match.urn_id.replace('sr:match:', '');

      const iguDetaMatch: IIguDetaMatch = {
        key,
        igu_id: match.id,
        start_time: match.start_time,
        home_team: match.competitors.home.name,
        away_team: match.competitors.away.name,
        tournament_id: match.tournament.id,
        tournament_name: match.tournament.name,
        category_id: match.tournament.category.id,
        category_name: match.tournament.category.name,
        is_validated: false,
        validation_date: timeFormatService.getMatchValidationDate(match.start_time),
        markets: [],
      };

      return iguDetaMatch;
    });

    for (let i = 5; i < matches.length; i = i + 5) {
      await delay(200);
      const results: IIguDetaMatch[] = [];

      for (let match of matches.slice(i - 5, i)) {
        await delay(200);
        let res = await axios.get<IMatchMarketsResponse>(
          `https://igubet.com/api/v2/matches/${match.igu_id}/markets?limit=500`
        );

        if (res.data) {
          const matchMarkets = transformIgubetMarkets(res.data.data);
          results.push({ ...match, markets: matchMarkets });
        }
      }

      addIguDetaMatches({ matches: results });
    }
  };

  useEffect(() => {
    // getMatchesOddMarkets();
  }, [isSuccess]);

  useEffect(() => {}, [response]);

  return (
    <div>
      IgubetLeague---
      {isSuccess &&
        matchesRes.data.map((match) => (
          <div key={match.id}>
            <Link
              to={`/igubet/${match.tournament.sport.key}/${match.tournament.category.slug}/${match.tournament.slug}/match/${match.id}`}
            >
              {match.competitors.home.name} - {match.competitors.away.name}
            </Link>
          </div>
        ))}
      {response.isSuccess && <b>SUCCESS !!!!!!!!!!!!!!!</b>}
      {response.isError && <b>ERRORR !!!!!!!!!!!!!!!</b>}
      {response.isLoading && <b>LOADING !!!!!!!!!!!!!!!</b>}
    </div>
  );
};

export default IgubetLeague;
