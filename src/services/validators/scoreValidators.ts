import { IIgubetMarket, IOutcome } from '../../redux/features/igubetTypes';
import { IOddspediaMatchInfoPeriods } from '../../redux/features/oddspediaTypes';

const validateCorrectScore = (market: IIgubetMarket, periods: IOddspediaMatchInfoPeriods): IIgubetMarket => {
  const homeScore = periods[0].home + periods[1].home;
  const awayScore = periods[0].away + periods[1].away;

  const score = `${homeScore}:${awayScore}`;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // 0:0
    if (outcome.id === 204 && score === '0:0') {
      newOutcome.is_winner = true;
    }

    // 1:0
    if (outcome.id === 205 && score === '1:0') {
      newOutcome.is_winner = true;
    }

    // 2:0
    if (outcome.id === 206 && score === '2:0') {
      newOutcome.is_winner = true;
    }
    // 3:0
    if (outcome.id === 207 && score === '3:0') {
      newOutcome.is_winner = true;
    }
    // 4:0
    if (outcome.id === 208 && score === '4:0') {
      newOutcome.is_winner = true;
    }
    // 0:1
    if (outcome.id === 209 && score === '0:1') {
      newOutcome.is_winner = true;
    }
    // 1:1
    if (outcome.id === 210 && score === '1:1') {
      newOutcome.is_winner = true;
    }
    // 2:1
    if (outcome.id === 211 && score === '2:1') {
      newOutcome.is_winner = true;
    }
    // 3:1
    if (outcome.id === 212 && score === '3:1') {
      newOutcome.is_winner = true;
    }
    // 4:1
    if (outcome.id === 213 && score === '4:1') {
      newOutcome.is_winner = true;
    }
    // 0:2
    if (outcome.id === 214 && score === '0:2') {
      newOutcome.is_winner = true;
    }
    // 1:2
    if (outcome.id === 215 && score === '1:2') {
      newOutcome.is_winner = true;
    }
    // 2:2
    if (outcome.id === 216 && score === '2:2') {
      newOutcome.is_winner = true;
    }
    // 3:2
    if (outcome.id === 217 && score === '3:2') {
      newOutcome.is_winner = true;
    }
    // 4:2
    if (outcome.id === 218 && score === '4:2') {
      newOutcome.is_winner = true;
    }
    // 0:3
    if (outcome.id === 219 && score === '0:3') {
      newOutcome.is_winner = true;
    }
    // 1:3
    if (outcome.id === 220 && score === '1:3') {
      newOutcome.is_winner = true;
    }
    // 2:3
    if (outcome.id === 221 && score === '2:3') {
      newOutcome.is_winner = true;
    }
    // 3:3
    if (outcome.id === 222 && score === '3:3') {
      newOutcome.is_winner = true;
    }
    // 4:3
    if (outcome.id === 223 && score === '4:3') {
      newOutcome.is_winner = true;
    }
    // 0:4
    if (outcome.id === 224 && score === '0:4') {
      newOutcome.is_winner = true;
    }
    // 1:4
    if (outcome.id === 225 && score === '1:4') {
      newOutcome.is_winner = true;
    }
    // 2:4
    if (outcome.id === 226 && score === '2:4') {
      newOutcome.is_winner = true;
    }
    // 3:4
    if (outcome.id === 227 && score === '3:4') {
      newOutcome.is_winner = true;
    }
    // 4:4
    if (outcome.id === 228 && score === '4:4') {
      newOutcome.is_winner = true;
    }
    // other
    if (outcome.id === 229 && (homeScore > 4 || awayScore > 4)) {
      newOutcome.is_winner = true;
    }
    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateFirstHalfCorrectScore = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const homeScore = periods[0].home;
  const awayScore = periods[0].away;

  const score = `${homeScore}:${awayScore}`;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // 0:0
    if (outcome.id === 342 && score === '0:0') {
      newOutcome.is_winner = true;
    }

    // 1:0
    if (outcome.id === 345 && score === '1:0') {
      newOutcome.is_winner = true;
    }

    // 2:0
    if (outcome.id === 346 && score === '2:0') {
      newOutcome.is_winner = true;
    }

    // 0:1
    if (outcome.id === 348 && score === '0:1') {
      newOutcome.is_winner = true;
    }
    // 1:1
    if (outcome.id === 343 && score === '1:1') {
      newOutcome.is_winner = true;
    }
    // 2:1
    if (outcome.id === 347 && score === '2:1') {
      newOutcome.is_winner = true;
    }
    // 0:2
    if (outcome.id === 349 && score === '0:2') {
      newOutcome.is_winner = true;
    }
    // 1:2
    if (outcome.id === 350 && score === '1:2') {
      newOutcome.is_winner = true;
    }
    // 2:2
    if (outcome.id === 344 && score === '2:2') {
      newOutcome.is_winner = true;
    }

    // other
    if (outcome.id === 351 && (homeScore > 2 || awayScore > 2)) {
      newOutcome.is_winner = true;
    }
    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateSecondHalfCorrectScore = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const homeScore = periods[1].home;
  const awayScore = periods[1].away;

  const score = `${homeScore}:${awayScore}`;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // 0:0
    if (outcome.id === 30921 && score === '0:0') {
      newOutcome.is_winner = true;
    }

    // 1:0
    if (outcome.id === 30924 && score === '1:0') {
      newOutcome.is_winner = true;
    }

    // 2:0
    if (outcome.id === 30927 && score === '2:0') {
      newOutcome.is_winner = true;
    }

    // 0:1
    if (outcome.id === 30922 && score === '0:1') {
      newOutcome.is_winner = true;
    }
    // 1:1
    if (outcome.id === 30925 && score === '1:1') {
      newOutcome.is_winner = true;
    }
    // 2:1
    if (outcome.id === 30928 && score === '2:1') {
      newOutcome.is_winner = true;
    }
    // 0:2
    if (outcome.id === 30923 && score === '0:2') {
      newOutcome.is_winner = true;
    }
    // 1:2
    if (outcome.id === 30926 && score === '1:2') {
      newOutcome.is_winner = true;
    }
    // 2:2
    if (outcome.id === 30929 && score === '2:2') {
      newOutcome.is_winner = true;
    }

    // other
    if (outcome.id === 30930 && (homeScore > 2 || awayScore > 2)) {
      newOutcome.is_winner = true;
    }
    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateMultiscores = (market: IIgubetMarket, periods: IOddspediaMatchInfoPeriods): IIgubetMarket => {
  const homeScore = periods[0].home + periods[1].home;
  const awayScore = periods[0].away + periods[1].away;

  const score = `${homeScore}:${awayScore}`;

  const allowedScores = [
    '1:0',
    '2:0',
    '3:0',
    '0:1',
    '0:2',
    '0:3',
    '4:0',
    '5:0',
    '6:0',
    '0:4',
    '0:5',
    '0:6',
    '2:1',
    '3:1',
    '4:1',
    '1:2',
    '1:3',
    '1:4',
    '3:2',
    '4:2',
    '4:3',
    '5:1',
    '2:3',
    '2:4',
    '3:4',
    '1:5',
  ];

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // 1:0, 2:0, 3:0
    if (outcome.id === 1465 && ['1:0', '2:0', '3:0'].includes(score)) {
      newOutcome.is_winner = true;
    }
    // 0:1, 0:2, 0:3
    if (outcome.id === 1466 && ['0:1', '0:2', '0:3'].includes(score)) {
      newOutcome.is_winner = true;
    }
    // 4:0, 5:0, 6:0
    if (outcome.id === 1467 && ['4:0', '5:0', '6:0'].includes(score)) {
      newOutcome.is_winner = true;
    }
    // 0:4, 0:5, 0:6
    if (outcome.id === 1468 && ['0:4', '0:5', '0:6'].includes(score)) {
      newOutcome.is_winner = true;
    }
    // 2:1, 3:1, 4:1
    if (outcome.id === 1469 && ['2:1', '3:1', '4:1'].includes(score)) {
      newOutcome.is_winner = true;
    }
    // 1:2, 1:3, 1:4
    if (outcome.id === 1470 && ['1:2', '1:3', '1:4'].includes(score)) {
      newOutcome.is_winner = true;
    }
    // 3:2, 4:2, 4:3, 5:1
    if (outcome.id === 1471 && ['3:2', '4:2', '4:3', '5:1'].includes(score)) {
      newOutcome.is_winner = true;
    }
    // 2:3, 2:4, 3:4, 1:5
    if (outcome.id === 1472 && ['2:3', '2:4', '3:4', '1:5'].includes(score)) {
      newOutcome.is_winner = true;
    }

    // other & home win
    if (outcome.id === 1473 && !allowedScores.includes(score) && homeScore > awayScore) {
      newOutcome.is_winner = true;
    }

    // other & away win
    if (outcome.id === 1474 && !allowedScores.includes(score) && homeScore < awayScore) {
      newOutcome.is_winner = true;
    }

    // draw
    if (outcome.id === 1475 && homeScore === awayScore) {
      newOutcome.is_winner = true;
    }
    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateMultigoals = (market: IIgubetMarket, periods: IOddspediaMatchInfoPeriods): IIgubetMarket => {
  const homeScore = periods[0].home + periods[1].home;
  const awayScore = periods[0].away + periods[1].away;

  const total = homeScore + awayScore;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // 1-2 goals
    if (outcome.id === 30652 && total < 3 && total > 0) {
      newOutcome.is_winner = true;
    }
    // 1-3 goals
    if (outcome.id === 30657 && total < 4 && total > 0) {
      newOutcome.is_winner = true;
    }
    // 1-4 goals
    if (outcome.id === 30659 && total <= 4 && total > 0) {
      newOutcome.is_winner = true;
    }
    // 1-5 goals
    if (outcome.id === 30661 && total <= 5 && total > 0) {
      newOutcome.is_winner = true;
    }
    // 1-6 goals
    if (outcome.id === 30663 && total <= 6 && total > 0) {
      newOutcome.is_winner = true;
    }

    // 2-3 goals
    if (outcome.id === 30666 && total <= 3 && total >= 2) {
      newOutcome.is_winner = true;
    }
    // 2-4 goals
    if (outcome.id === 30668 && total <= 4 && total >= 2) {
      newOutcome.is_winner = true;
    }
    // 2-5 goals
    if (outcome.id === 30670 && total <= 5 && total >= 2) {
      newOutcome.is_winner = true;
    }
    // 2-6 goals
    if (outcome.id === 30672 && total <= 6 && total >= 2) {
      newOutcome.is_winner = true;
    }
    // 3-4 goals
    if (outcome.id === 30674 && total <= 4 && total >= 3) {
      newOutcome.is_winner = true;
    }
    // 3-5 goals
    if (outcome.id === 30675 && total <= 5 && total >= 3) {
      newOutcome.is_winner = true;
    }
    // 3-6 goals
    if (outcome.id === 30676 && total <= 6 && total >= 3) {
      newOutcome.is_winner = true;
    }
    // 4-5 goals
    if (outcome.id === 30678 && total <= 5 && total >= 4) {
      newOutcome.is_winner = true;
    }
    // 4-6 goals
    if (outcome.id === 30679 && total <= 6 && total >= 4) {
      newOutcome.is_winner = true;
    }
    // 5-6 goals
    if (outcome.id === 30681 && total <= 6 && total >= 5) {
      newOutcome.is_winner = true;
    }

    // 7+ goals
    if (outcome.id === 30682 && total >= 7) {
      newOutcome.is_winner = true;
    }
    // no goals
    if (outcome.id === 30684 && total === 0) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateFirstHalfMultigoals = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const homeScore = periods[0].home;
  const awayScore = periods[0].away;

  const total = awayScore + homeScore;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // 1-2 goals
    if (outcome.id === 30954 && total < 3 && total > 0) {
      newOutcome.is_winner = true;
    }
    // 1-3 goals
    if (outcome.id === 30955 && total < 4 && total > 0) {
      newOutcome.is_winner = true;
    }
    // 2-3 goals
    if (outcome.id === 30956 && total < 4 && total > 1) {
      newOutcome.is_winner = true;
    }
    // 4+ goals
    if (outcome.id === 30957 && total > 3) {
      newOutcome.is_winner = true;
    }
    // no goals
    if (outcome.id === 30958 && total === 0) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateSecondHalfMultigoals = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const homeScore = periods[1].home;
  const awayScore = periods[1].away;

  const total = awayScore + homeScore;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // 1-2 goals
    if (outcome.id === 32090 && total < 3 && total > 0) {
      newOutcome.is_winner = true;
    }
    // 1-3 goals
    if (outcome.id === 32091 && total < 4 && total > 0) {
      newOutcome.is_winner = true;
    }
    // 2-3 goals
    if (outcome.id === 32092 && total < 4 && total > 1) {
      newOutcome.is_winner = true;
    }
    // 4+ goals
    if (outcome.id === 32093 && total > 3) {
      newOutcome.is_winner = true;
    }
    // no goals
    if (outcome.id === 32094 && total === 0) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateAwayTeamMultigoals = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const awayScore = periods[0].away + periods[1].away;

  const total = awayScore;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // 1-2 goals
    if (outcome.id === 159988 && total < 3 && total > 0) {
      newOutcome.is_winner = true;
    }
    // 1-3 goals
    if (outcome.id === 159989 && total < 4 && total > 0) {
      newOutcome.is_winner = true;
    }
    // 2-3 goals
    if (outcome.id === 159990 && total < 4 && total > 1) {
      newOutcome.is_winner = true;
    }
    // 4+ goals
    if (outcome.id === 159991 && total > 3) {
      newOutcome.is_winner = true;
    }
    // no goals
    if (outcome.id === 159992 && total === 0) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateHomeTeamMultigoals = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const homeScore = periods[0].home + periods[1].home;

  const total = homeScore;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // 1-2 goals
    if (outcome.id === 29607 && total < 3 && total > 0) {
      newOutcome.is_winner = true;
    }
    // 1-3 goals
    if (outcome.id === 29608 && total < 4 && total > 0) {
      newOutcome.is_winner = true;
    }
    // 2-3 goals
    if (outcome.id === 29609 && total < 4 && total > 1) {
      newOutcome.is_winner = true;
    }
    // 4+ goals
    if (outcome.id === 29611 && total > 3) {
      newOutcome.is_winner = true;
    }
    // no goals
    if (outcome.id === 29612 && total === 0) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

const validateHalftimeFulltimeCorrectScore = (
  market: IIgubetMarket,
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket => {
  const homeScore = periods[0].home + periods[1].home;
  const awayScore = periods[0].away + periods[1].away;

  const firstHalfHome = periods[0].home;
  const firstHalfAway = periods[0].away;

  const firstHalfTotal = periods[0].home + periods[0].away;
  const total = homeScore + awayScore;

  const score = `${firstHalfHome}:${firstHalfAway} ${homeScore}:${awayScore}`;

  const firstHalfScore = `${firstHalfHome}:${firstHalfAway}`;

  const outcomes = market.outcomes.map((outcome, idx) => {
    const newOutcome: IOutcome = { ...outcome, is_validated: true, is_winner: false };

    // 0:0 0:0
    if (outcome.id === 27955 && score === '0:0 0:0') {
      newOutcome.is_winner = true;
    }
    // 0:0 0:1
    if (outcome.id === 27956 && score === '0:0 0:1') {
      newOutcome.is_winner = true;
    }
    // 0:0 0:2
    if (outcome.id === 27957 && score === '0:0 0:2') {
      newOutcome.is_winner = true;
    }
    // 0:0 0:3
    if (outcome.id === 27958 && score === '0:0 0:3') {
      newOutcome.is_winner = true;
    }
    // 0:0 1:0
    if (outcome.id === 27959 && score === '0:0 1:0') {
      newOutcome.is_winner = true;
    }
    // 0:0 1:1
    if (outcome.id === 27960 && score === '0:0 1:1') {
      newOutcome.is_winner = true;
    }
    // 0:0 1:2
    if (outcome.id === 27961 && score === '0:0 1:2') {
      newOutcome.is_winner = true;
    }
    // 0:0 2:0
    if (outcome.id === 27962 && score === '0:0 2:0') {
      newOutcome.is_winner = true;
    }
    // 0:0 2:1
    if (outcome.id === 27963 && score === '0:0 2:1') {
      newOutcome.is_winner = true;
    }
    // 0:0 3:0
    if (outcome.id === 27964 && score === '0:0 3:0') {
      newOutcome.is_winner = true;
    }
    // 0:0 4+
    if (outcome.id === 27965 && firstHalfScore === '0:0' && total >= 4) {
      newOutcome.is_winner = true;
    }
    // 0:1 0:1
    if (outcome.id === 27966 && score === '0:1 0:1') {
      newOutcome.is_winner = true;
    }
    // 0:1 0:2
    if (outcome.id === 27967 && score === '0:1 0:2') {
      newOutcome.is_winner = true;
    }
    // 0:1 0:3
    if (outcome.id === 27968 && score === '0:1 0:3') {
      newOutcome.is_winner = true;
    }
    // 0:1 1:1
    if (outcome.id === 27969 && score === '0:1 1:1') {
      newOutcome.is_winner = true;
    }
    // 0:1 1:2
    if (outcome.id === 27970 && score === '0:1 1:2') {
      newOutcome.is_winner = true;
    }
    // 0:1 2:1
    if (outcome.id === 27971 && score === '0:1 2:1') {
      newOutcome.is_winner = true;
    }
    // 0:1 4+
    if (outcome.id === 27972 && firstHalfScore === '0:1' && total >= 4) {
      newOutcome.is_winner = true;
    }
    // 0:2 0:2
    if (outcome.id === 27973 && score === '0:2 0:2') {
      newOutcome.is_winner = true;
    }
    // 0:2 0:3
    if (outcome.id === 27974 && score === '0:2 0:3') {
      newOutcome.is_winner = true;
    }
    // 0:2 1:2
    if (outcome.id === 27975 && score === '0:2 1:2') {
      newOutcome.is_winner = true;
    }
    // 0:2 4+
    if (outcome.id === 27976 && firstHalfScore === '0:2' && total >= 4) {
      newOutcome.is_winner = true;
    }
    // 0:3 0:3
    if (outcome.id === 27977 && score === '0:3 0:3') {
      newOutcome.is_winner = true;
    }
    // 0:3 4+
    if (outcome.id === 27978 && firstHalfScore === '0:3' && total >= 4) {
      newOutcome.is_winner = true;
    }
    // 1:0 1:0
    if (outcome.id === 27979 && score === '1:0 1:0') {
      newOutcome.is_winner = true;
    }
    // 1:0 1:1
    if (outcome.id === 27980 && score === '1:0 1:1') {
      newOutcome.is_winner = true;
    }
    // 1:0 1:2
    if (outcome.id === 27981 && score === '1:0 1:2') {
      newOutcome.is_winner = true;
    }
    // 1:0 2:0
    if (outcome.id === 27982 && score === '1:0 2:0') {
      newOutcome.is_winner = true;
    }
    // 1:0 2:1
    if (outcome.id === 27983 && score === '1:0 2:1') {
      newOutcome.is_winner = true;
    }
    // 1:0 3:0
    if (outcome.id === 27984 && score === '1:0 3:0') {
      newOutcome.is_winner = true;
    }
    // 1:0 4+
    if (outcome.id === 27985 && firstHalfScore === '1:0' && total >= 4) {
      newOutcome.is_winner = true;
    }
    // 1:1 1:1
    if (outcome.id === 27986 && score === '1:1 1:1') {
      newOutcome.is_winner = true;
    }
    // 1:1 1:2
    if (outcome.id === 27987 && score === '1:1 1:2') {
      newOutcome.is_winner = true;
    }
    // 1:1 2:1
    if (outcome.id === 27988 && score === '1:1 2:1') {
      newOutcome.is_winner = true;
    }
    // 1:1 4+
    if (outcome.id === 27989 && firstHalfScore === '1:1' && total >= 4) {
      newOutcome.is_winner = true;
    }
    // 1:2 1:2
    if (outcome.id === 27990 && score === '1:2 1:2') {
      newOutcome.is_winner = true;
    }
    // 1:2 4+
    if (outcome.id === 27991 && firstHalfScore === '1:2' && total >= 4) {
      newOutcome.is_winner = true;
    }
    // 2:0 2:0
    if (outcome.id === 27992 && score === '2:0 2:0') {
      newOutcome.is_winner = true;
    }
    // 2:0 2:1
    if (outcome.id === 27993 && score === '2:0 2:1') {
      newOutcome.is_winner = true;
    }
    // 2:0 3:0
    if (outcome.id === 27994 && score === '2:0 3:0') {
      newOutcome.is_winner = true;
    }
    // 2:0 4+
    if (outcome.id === 27995 && firstHalfScore === '2:0' && total >= 4) {
      newOutcome.is_winner = true;
    }
    // 2:1 2:1
    if (outcome.id === 27996 && score === '2:1 2:1') {
      newOutcome.is_winner = true;
    }
    // 2:1 4+
    if (outcome.id === 27997 && firstHalfScore === '2:1' && total >= 4) {
      newOutcome.is_winner = true;
    }
    // 3:0 3:0
    if (outcome.id === 27998 && score === '3:0 3:0') {
      newOutcome.is_winner = true;
    }
    // 3:0 4+
    if (outcome.id === 27999 && firstHalfScore === '3:0' && total >= 4) {
      newOutcome.is_winner = true;
    }

    // 4+ 4+
    if (outcome.id === 28000 && firstHalfTotal >= 4 && total >= 4) {
      newOutcome.is_winner = true;
    }

    return newOutcome;
  });

  return { ...market, outcomes };
};

export const validateScoreMarkets = (
  markets: IIgubetMarket[],
  periods: IOddspediaMatchInfoPeriods
): IIgubetMarket[] => {
  return markets.map((market, idx) => {
    switch (market.id) {
      case 76: // correct score
        return validateCorrectScore(market, periods);

      case 126: // 1st half - correct score
        return validateFirstHalfCorrectScore(market, periods);

      case 4508: // 2nd half - correct score
        return validateSecondHalfCorrectScore(market, periods);

      case 398: // multiscores
        return validateMultiscores(market, periods);

      case 4486: // multigoals
        return validateMultigoals(market, periods);

      case 4514: // 1st half - multigoals
        return validateFirstHalfMultigoals(market, periods);

      case 4888: // 2ns half - multigoals
        return validateSecondHalfMultigoals(market, periods);

      case 4278: // home team multigoals
        return validateHomeTeamMultigoals(market, periods);

      case 23890: // away team multigoals
        return validateAwayTeamMultigoals(market, periods);

      case 3938: // halftime/fulltime correct score
        return validateHalftimeFulltimeCorrectScore(market, periods);
        
      default:
        break;
    }

    return market;
  });
};
