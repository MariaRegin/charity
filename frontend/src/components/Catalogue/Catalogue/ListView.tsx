import styles from "./listView.module.css";
import { listConstants } from "../List/listConstants";

interface Organization {
  title: string;
}
interface Request {
  title: string;
  organization: Organization;
  endingDate: string;
  goalDescription: string;
}

interface ListViewProps {
  requests: Request[];
}

const ListView: React.FC<ListViewProps> = ({ requests }) => {
  return (
    <div className={styles.container}>
      {requests.map((request) => (
        <div className={styles.card}>
          <div>
            <h3>{request.title}</h3>
            <p>{listConstants.collected}</p>
            <button className={styles.button}>ПОМОЧЬ</button>
          </div>
          <div>
            <p>
              {listConstants.organization} {request.organization.title}
            </p>
            <p>
              {listConstants.deadline} {request.endingDate}
            </p>
          </div>
          <div>
            <p>{listConstants.location}</p>
            <p>
              {listConstants.goal} {request.goalDescription}
            </p>
          </div>
          <button className={styles.buttonFavourite}>Избранное</button>
        </div>
      ))}
    </div>
  );
};

export default ListView;
