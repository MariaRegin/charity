import styles from "./errorTooltip.module.css";
import { useState } from "react";

type PropsType = {
  text: string;
};

const ErrorTooltip: React.FC<PropsType> = ({ text }) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const onMouseEventHandler = (): void => {
    setShowTooltip(true);
  };

  const onMouseLeaveHandler = (): void => {
    setShowTooltip(false);
  };

  return (
    <div
      className={styles.container}
      onMouseEnter={onMouseEventHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      {showTooltip && <div className={styles.tooltip}>{text}</div>}
    </div>
  );
};

export default ErrorTooltip;
