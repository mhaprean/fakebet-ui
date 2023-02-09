import React from 'react';
import { IIgubetMatch } from '../../redux/features/igubetTypes';
import LeagueHeader from '../league/LeagueHeader';
import Match from './Match';

interface IPropsMatchList {
  matches: IIgubetMatch[];
}

const MatchList = ({ matches }: IPropsMatchList) => {
  return (
    <div className="MatchList">
      {matches.map((match, idx) => (
        <React.Fragment key={idx}>
          {idx === 0 || matches[idx].tournament.id !== matches[idx - 1].tournament.id ? (
            <LeagueHeader tournament={match.tournament} />
          ) : null}

          <Match match={match} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default MatchList;
