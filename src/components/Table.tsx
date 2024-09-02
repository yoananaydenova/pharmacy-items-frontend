type Item = {
  pharmacyName: string,
  itemName: string,
  price: number,
  itemUrl: string,
  imageUrl: string
}

type TableProps = {
  items: Item[]
}

const Table = ({ items }: TableProps) => {

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
                  <img src={item.imageUrl} className="w-50" alt={item.itemName} />
                </td>
                <td >
                  <a href={getPharmacyUrl(item.itemUrl)} rel="noopener noreferrer" target="_blank">
                    <span className={getPharmacyNameCss(item.pharmacyName)}>{item.pharmacyName}</span>
                  </a>
                </td>
                <td>
                  <a href={item.itemUrl} rel="noopener noreferrer" target="_blank">{item.itemName}</a>
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