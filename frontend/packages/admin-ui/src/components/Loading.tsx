import React from "react";
import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  z-index: 1500;

  &.fixed {
    align-items: flex-start;
  }

  &.visible {
    visibility: visible;

    //transition: opacity 0.5s ease-in;
  }

  &.hidden {
    visibility: hidden;
    opacity: 0;
    transition: ease-in 0s 0.5s, opacity 0.5s ease-in;
  }
`;

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  display: inline-block;
  width: 8rem;
  height: 8rem;
  border: 12px solid #f3f3f3;
  border-radius: 50%;
  border-top: 12px solid #282c34;
  animation: ${rotation} 1000ms ease-in infinite;

  &.fixed {
    margin-top: 20rem;
  }
`;

const Loading = ({ visible, fixed = false }) => {
  const [show, setShow] = React.useState(false);

  const [delay, setDelay] = React.useState(0);

  /**
   * 100ms is supposed for browser finish rendering data
   */
  React.useEffect(() => {
    if (!visible) {
      setShow(false);
    } else {
      setTimeout(() => {
        setShow(true);
      }, 100);
    }
  }, [visible]);

  const className = `${visible ? "visible" : "hidden"} ${fixed ? "fixed" : ""}`;

  return (
    <Wrapper className={className}>
      <Loader className={`${fixed ? "fixed" : ""}`} />
    </Wrapper>
  );
};

export default Loading;
