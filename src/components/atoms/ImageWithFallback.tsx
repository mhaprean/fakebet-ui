import team from '../../assets/team.webp';
import league from '../../assets/league.webp';
import category from '../../assets/world.svg';

interface IPropsImageWithFallback {
  image: string;
  type?: 'team' | 'league' | 'category';
  className?: string;
}

const ImageWithFallback = ({ image, className = '', type = 'team' }: IPropsImageWithFallback) => {
  const fallback = type === 'team' ? team : type === 'league' ? league : category;
  return (
    <img
      className={className}
      src={image}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null; // prevents looping
        currentTarget.src = fallback;
      }}
    />
  );
};

export default ImageWithFallback;
