import React from "react";

function Heading(props) {
  const { children = null, data } = props;

  return (
    <div className="heading-title">
      <h2>{data}</h2>
      {children}
    </div>
  );
}

export default Heading;
