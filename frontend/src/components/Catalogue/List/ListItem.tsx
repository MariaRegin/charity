import styles from "./listItem.module.css";
import { listConstants } from "./listConstants";
import personFinance from "./person-help-finance.png";
import personMaterial from "./person-help-material.png";
import organization from "./organization-help.png";

const ListItem = ({ request }) => {
  let imageSrc;

  if (request.requesterType === "person" && request.helpType === "finance") {
    imageSrc = personFinance;
  } else if (
    request.requesterType === "person" &&
    request.helpType === "material"
  ) {
    imageSrc = personMaterial;
  } else if (request.requesterType === "organization") {
    imageSrc = organization;
  }

  return (
    <div className={styles.container}>
      <img src={imageSrc} alt="patient" className={styles.image} />
      <h3 className={styles.title}>{request.title}</h3>
      <p>
        {listConstants.organization} {request.organization.title}
      </p>
      <p>{listConstants.location}</p>
      <p>
        {listConstants.goal} {request.goalDescription}
      </p>
      <p>
        {listConstants.deadline} {request.endingDate}
      </p>
      <p>{listConstants.collected}</p>
      <p></p>

      <button></button>
    </div>
  );
};

export default ListItem;
