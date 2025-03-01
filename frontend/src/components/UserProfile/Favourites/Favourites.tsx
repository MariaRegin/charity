import { useEffect, useState } from "react";
import ListItem from "../../Catalogue/List/ListItem";

const Favourites = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const fetchFavourites = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("/api/user/favourites", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // if (!response.ok) {
        //   console.error(
        //     "Ошибка при получении данных",
        //     response.status,
        //     response.statusText
        //   );
        //   setError(new Error(`HTTP error! status: ${response.status}`));
        //   return;
        // }
        let ids = await response.json();

        let promises = [];

        for (let id of ids) {
          promises.push(
            fetch(`/api/request/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            }).then((response) => {
              if (!response.ok) {
                console.error(
                  `Ошибка получения данных по ID ${id}:`,
                  response.statusText
                );
                return null;
              }
              return response.json();
            })
          );
        }

        let favouritesData = await Promise.all(promises).then((results) =>
          results.filter((item) => item !== null)
        );

        setFavourites(favouritesData);
        setIsLoading(false);
        console.log("Data from fetch:", favouritesData);
      } catch (error) {
        console.error("Произошла ошибка:", error);
        setError(error as Error);
      }
    };
    fetchFavourites();
  }, []);

  if (isLoading) return <div>Загрузка...</div>;

  return (
    <div>
      {favourites.map((item) => (
        <ListItem key={item.id} request={item} />
      ))}
    </div>
  );
};

export default Favourites;
