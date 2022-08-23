import React from "react";

const UserWithStatus = ({ img, size, status, onClick = null }) => {
  const style = {
    position: "relative",
    width: size || "100%",
    height: size || "100%",
    borderRadius: "50%",
    backgroundImage: `url(${img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    cursor: "pointer",
  };
  return <div onClick={onClick} style={style}></div>;
};

export default UserWithStatus;
