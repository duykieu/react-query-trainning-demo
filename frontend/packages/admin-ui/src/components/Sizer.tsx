import React from "react";

const Sizer: React.FunctionComponent<{ size: number }> = ({ size }) => (
    <div style={{ height: `${size}px` }} />
);

export default Sizer;
