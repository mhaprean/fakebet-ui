import MarketsSkeleton from "./MarketsSkeleton";
import MatchPageHeaderSkeleton from "./MatchPageHeaderSkeleton";

const MatchPageLoading = () => {
  return (
    <div>
      <MatchPageHeaderSkeleton />
      <MarketsSkeleton />
    </div>
  );
};

export default MatchPageLoading;
