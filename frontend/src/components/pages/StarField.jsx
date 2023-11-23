
import Star from './Star';

const StarField = ({ numStars }) => {
  const generateRandomValue = (min, max) => Math.random() * (max - min) + min;

  const stars = [];
  for (let i = 0; i < numStars; i++) {
    const top = generateRandomValue(0, 100);
    const left = generateRandomValue(0, 100);
    const width = generateRandomValue(3, 4);
    const height = generateRandomValue(1, 5);
    const animationDelay = generateRandomValue(5, 10);

    stars.push(
      <Star
        key={i}
        top={top}
        left={left}
        width={width}
        height={height}
        animationDelay={animationDelay}
      />
    );
  }

  return <div className="stars-container">{stars}</div>;
};

export default StarField;
