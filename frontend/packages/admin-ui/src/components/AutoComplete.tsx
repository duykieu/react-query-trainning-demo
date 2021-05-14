import React from "react";
import styled from "styled-components";
import { Input } from "antd";
import { Colors } from "../colors";

function useClickOutside(ref, callback) {
  React.useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  .dropdown {
    position: absolute;
    left: 0;
    top: 35px;
    background-color: #fff;
    width: 100%;
    max-height: 300px;
    overflow-y: scroll;
    border: 1px solid ${Colors.Gray2};
    display: none;
    z-index: 999;

    &.show {
      display: block;
    }

    .item {
      padding: 0.5rem 1rem;
      cursor: pointer;

      &:hover {
        background-color: ${Colors.Gray2};
      }
    }
  }
`;

interface IAutoCompleteProps {
  data: any[];
  renderLabel?: any;
  onChange?: any;
  defaultItem?: any;
  onSelect?: any;
}

const AutoComplete: React.FunctionComponent<IAutoCompleteProps> = ({
  data,
  renderLabel,
  onChange,
  defaultItem,
  onSelect,
}) => {
  const [keywords, setKeywords] = React.useState("");

  const [focused, setFocused] = React.useState(false);

  const [displayLabel, setDisplayLabel] = React.useState("");

  const [lastLabel, setLastLabel] = React.useState("");

  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    onChange(keywords);
  }, [keywords]);

  React.useEffect(() => {
    if (user) {
      if (onSelect) onSelect(user);
      setDisplayLabel(renderLabel(user));
    }
  }, [user]);

  React.useEffect(() => {
    if (defaultItem) {
      setUser(defaultItem);
    }
  }, [defaultItem]);

  React.useEffect(() => {
    if (!displayLabel && user && !focused) {
      setDisplayLabel(renderLabel(user));
    }
  }, [user, displayLabel, focused]);

  const onChangeHandler = e => {
    setKeywords(e.target.value);
  };

  const onSelectHandler = item => {
    setUser(item);
    setFocused(false);
  };

  const wrapperRef = React.useRef(null);
  useClickOutside(wrapperRef, () => {
    setFocused(false);
  });

  return (
    <Wrapper ref={wrapperRef}>
      <Input
        onFocus={() => {
          setDisplayLabel("");
          setFocused(true);
        }}
        style={{ width: "100%" }}
        onChange={onChangeHandler}
        value={displayLabel || keywords}
      />
      <div className={`dropdown ${data.length && focused ? "show" : ""}`}>
        {data.map((item, index) => (
          <div
            onClick={() => onSelectHandler(item)}
            className="item"
            key={index}
          >
            {renderLabel(item)}
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default AutoComplete;
