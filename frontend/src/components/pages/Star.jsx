const Star = ({ top, left, width, height, animationDelay }) => {
  const starStyle = {
    top: `${top}%`,
    left: `${left}%`,
    width: `${width}px`,
    height: `${height}px`,
    animationDelay: `${animationDelay}s`,
  };

  return <div className="star" style={starStyle} />;
};

export default Star;
