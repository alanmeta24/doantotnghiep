import React from "react";
import { useSelector } from "react-redux";

const LikeButton = ({ isLike, handleLike, handleUnLike }) => {
  const { theme } = useSelector((state) => state);

  return (
    <>
      {isLike ? (
        <i
          className="fas fa-star text-danger"
          onClick={handleUnLike}
          style={{ filter: theme ? "invert(1)" : "invert(0)" }}
        />
      ) : (
        <i className="far fa-star" onClick={handleLike} />
      )}
    </>
  );
};

export default LikeButton;
