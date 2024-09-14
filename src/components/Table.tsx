import FilledHeart from "../icons/FilledHeart"
import OutlinedHeart from "../icons/OutlinedHeart"
import { Item } from "./Item"

type TableProps = {
  items: Item[],
  isFavorite: (itemUrl: string) => boolean,
  addOrRemoveUrlFromFavorites: (item: Item) => void
}


const Table = ({ items, isFavorite, addOrRemoveUrlFromFavorites }: TableProps) => {


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
                  <button onClick={() => addOrRemoveUrlFromFavorites(item)} className="btn btn-light rounded-pill position-absolute bottom-0 start-50 translate-middle">
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