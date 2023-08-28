import React from "react";
import PropTypes from "prop-types";

function CurrentLocation({ refresh }) {
  const handleClick = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      refresh(position.coords.latitude, position.coords.longitude);
    });
  };

  return (
    <button className="float-left btn btn-success" onClick={handleClick}>
      Current
    </button>
  );
}

CurrentLocation.propTypes = {
  refresh: PropTypes.func.isRequired,
};

export default CurrentLocation;
