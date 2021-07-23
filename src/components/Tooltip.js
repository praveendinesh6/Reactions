import { useState } from 'react';

const Tooltip = ({ children, text, ...otherProps }) => {
  const [show, setShow] = useState(false);
  const [timeoutId, setTimeoutId] = useState()
  return (
    <div className="tooltip-container">
      <div className={`tooltip-box ${show ? "visible" : ''}`}>
        {text}
        <span className="tooltip-arrow" />
      </div>
      <div
        onMouseEnter={() => {
          let timeoutId = setTimeout(() => setShow(true), 1500)
          setTimeoutId(timeoutId)
        }}
        onMouseLeave={() => {
          clearTimeout(timeoutId)
          setShow(false)
        }}
        {...otherProps}
      >
        {children}
      </div>
    </div>
  );
};

export default Tooltip;