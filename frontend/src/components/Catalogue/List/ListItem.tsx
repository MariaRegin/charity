import styles from "./listItem.module.css";
import { useNavigate } from "react-router-dom";
import { listConstants } from "./listConstants";
import personFinance from "./person-help-finance.png";
import personMaterial from "./person-help-material.png";
import organization from "./organization-help.png";
import { useEffect, useState } from "react";

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

  const navigate = useNavigate();
  const [addedToFavourites, setAddedToFavourites] = useState(false);

  useEffect(() => {
    const favouriteRequests =
      JSON.parse(localStorage.getItem("favourites")) || [];
    setAddedToFavourites(favouriteRequests.includes(request.id));
  }, [request.id]);

  const toggleAddToFavourites = () => {
    setAddedToFavourites((prev) => !prev);
  };

  const handleToggleFavourites = async () => {
    if (addedToFavourites) {
      await handleDeleteFromFavourites();
    } else {
      await handleAddToFavorites();
    }
    toggleAddToFavourites();
  };

  const handleAddToFavorites = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");
      const requestId = request.id;
      const response = await fetch("/api/user/favourites", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requestId }),
      });
      if (!response.ok)
        throw new Error(`HTTP error! status:${response.status}`);
      console.log(response);
      const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
      favourites.push(requestId);
      localStorage.setItem("favourites", JSON.stringify(favourites));
    } catch (error) {
      console.error("Произошла ошибка: ", error);
    }
  };

  const handleDeleteFromFavourites = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");
      const requestId = request.id;
      const response = await fetch(`/api/user/favourites/${requestId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requestId }),
      });
      if (!response.ok)
        throw new Error(`HTTP error! status:${response.status}`);
      console.log(response);
      const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
      const updatedFavourites = favourites.filter((id) => id !== requestId);
      localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
    } catch {
      console.error("Произошла ошибка: ");
    }
  };

  const handleClick = () => {
    navigate(`/request/${request.id}`);
  };

  return (
    <div className={styles.container}>
      <div>
        <img src={imageSrc} alt="patient" className={styles.image} />
        <div className={styles.cardHeader}>
          <h3 className={styles.title}>{request.title}</h3>
          <button
            className={`${styles.buttonFavourites} ${
              addedToFavourites
                ? styles.buttonFavourite
                : styles.buttonNotFavourite
            }`}
            onClick={handleToggleFavourites}
          ></button>
        </div>
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
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleClick}>
          ПОМОЧЬ
        </button>
      </div>
    </div>
  );
};

export default ListItem;
