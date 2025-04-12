import styles from "./tooltip.module.css";
import { useState } from "react";

type PropsType = {
  children: ReactElement;
  text: string;
};

const Tooltip: React.FC<PropsType> = ({ children, text }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const onMouseEventHandler = () => {
    setShowTooltip(true);
  };

  const onMouseLeaveHandler = () => {
    setShowTooltip(false);
  };

  return (
    <div
      className={styles.container}
      onMouseEnter={onMouseEventHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      {children}
      {showTooltip && <div className={styles.tooltip}>{text}</div>}
    </div>
  );
};

export default Tooltip;
