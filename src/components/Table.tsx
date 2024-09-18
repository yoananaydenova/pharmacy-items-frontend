import { useEffect, useState } from "react"
import FilledHeart from "../icons/FilledHeart"
import OutlinedHeart from "../icons/OutlinedHeart"
import { Item } from "./Item"
import { request } from "../helpers/axios_helper"
import toast from "react-hot-toast"


type TableProps = {
  items: Item[],
  removeItem?: (itemUrl: string) => void,
  login: boolean,
  logout: () => void
}

type FavoriteItem = {
  id: number,
  itemUrl: string
}

const Table = ({ items, removeItem, login, logout }: TableProps) => {

  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    if (login) {
      loadFavorites();
    }

  }, []);

  const loadFavorites = () => {
    request(
      "GET",
      "/favorites",
      {},
      {}
    ).then(
      (response) => {

        setFavorites(response.data.map((item: Item) => ({ id: item.id, itemUrl: item.itemUrl })))

      }).catch(
        (error) => {
          console.log('error', error)
          if (error.response.status === 401) {
            logout()
            toast.error("The user was logged out!");
          } else {
            toast.error(error.response.code);
          }
        }
      );
  }

  const isFavorite = (itemUrl: string) => {
    const result = favorites.filter((favItem: FavoriteItem) => favItem.itemUrl === itemUrl);
    return result.length > 0;
  }

  const addOrRemoveFromFavorites = (item: Item) => {
    if (isFavorite(item.itemUrl)) {
      const resultItem = favorites.filter((favItem: FavoriteItem) => favItem.itemUrl === item.itemUrl);
      removeFromFavorites(resultItem[0]);
    } else {
      addToFavorites(item)

    }
  }

  const addToFavorites = (item: Item) => {

    request(
      "POST",
      "/favorites",
      {},
      item
    ).then(
      (response) => {

        const addedItem = response.data;

        setFavorites((prevState) =>
          [...prevState, { id: addedItem.id, itemUrl: addedItem.itemUrl }]
        );

        toast.success("The item: " + addedItem.itemName + " is succesfully added!")

      }).catch(
        (error) => {
          if (error.response.status === 401) {
            logout();
            toast.error("Тhe user was logged out!");
          } else {
            toast.error(error.response.code);
          }
        }
      );
  }

  const removeFromFavorites = (item: FavoriteItem) => {
    request(
      "DELETE",
      `/favorites/${item.id}`,
      {},
      {}
    ).then(
      (response) => {

        setFavorites((favorites) => favorites.filter((favUrl) => favUrl.itemUrl !== item.itemUrl));
        removeItem && removeItem(item.itemUrl)
        toast.success(response.data)

      }).catch(
        (error) => {
          if (error.response.status === 401) {
            logout();
            toast.error("Тhe user was logged out!");
          } else {
            toast.error(error.response.code);
          }
        }
      );
  }

  const getPharmacyNameCss = (pharmacyName: string) => {
    if (pharmacyName == "SOpharmacy")
      return "badge bg-success"
    if (pharmacyName == "Subra")
      return "badge bg-primary"
    if (pharmacyName == "Remedium")
      return "badge bg-danger"

    return "badge bg-white"
  }

  const getPharmacyUrl = (itemUrl: string) => {
    return itemUrl.substring(0, itemUrl.indexOf(".bg") + 3);
  }


  return (
    <div className="table-responsive">
      <table className="table table-bordered border-secondary table-hover align-middle" >
        <thead>
          <tr>
            <th scope="col">#</th>
            <th className="col-2" scope="col">IMAGE</th>
            <th className="col-2" scope="col">PHARMACY</th>
            <th scope="col">ITEM NAME</th>
            <th scope="col">PRICE</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {items.map((item, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  <img src={item.imageUrl} className="img-fluid img-thumbnail item-img" alt={item.itemName} />
                </td>
                <td >
                  <a href={getPharmacyUrl(item.itemUrl)} rel="noopener noreferrer" target="_blank">
                    <span className={getPharmacyNameCss(item.pharmacyName)}>{item.pharmacyName}</span>
                  </a>
                </td>
                <td className="position-relative">
                  <a href={item.itemUrl} rel="noopener noreferrer" target="_blank">{item.itemName}</a>
                  <button onClick={() => addOrRemoveFromFavorites(item)} className="btn btn-light rounded-pill position-absolute bottom-0 start-50 translate-middle">
                    {isFavorite(item.itemUrl) ? <FilledHeart width="20px" height="20px" /> : <OutlinedHeart width="20px" height="20px" />}
                  </button>

                </td>
                <td className={item.price == null ? "text-danger" : "text-dark"}>{item.price == null ? "Изчерпан" : item.price}</td>
              </tr>
            )
          })}

        </tbody>
      </table>
    </div>
  )
}

export default Table