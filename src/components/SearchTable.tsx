import { FavoriteSearchData } from "../types/FavoriteSearchData"
import { v4 as uuidv4 } from "uuid";

type SearchTableProps = {
    searches: FavoriteSearchData[]
}

const SearchTable = ({ searches }: SearchTableProps) => {


    const getPharmacyNameCss = (pharmacyName: string) => {

        switch (pharmacyName.toLocaleUpperCase()) {
            case "SOPHARMACY":
                return "badge bg-success"
            case "SUBRA":
                return "badge bg-primary"
            case "REMEDIUM":
                return "badge bg-danger"
            default:
                return "badge bg-white"
        }



    }


    return (
        <div className="table-responsive">
            <table className="table table-bordered border-secondary table-hover align-middle" >
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col" className="col-8">TEXT</th>
                        <th scope="col">PHARMACIES</th>
                        <th scope="col">LIMIT</th>
                        <th scope="col">ACTION</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {searches.map((item, index) => {
                        return (
                            <tr key={uuidv4()}>
                                <th scope="row">{index + 1}</th>
                                <td>
                                    <p>{item.searchedText}</p>
                                </td>
                                <td >
                                    {item.pharmacies.map(p =>

                                        <p key={uuidv4()}>
                                            <span className={getPharmacyNameCss(p)}>{p}</span>
                                        </p>
                                    )}

                                </td>
                                <td className="position-relative">
                                    <p>{item.searchLimit}</p>
                                    {/* <button onClick={() => addOrRemoveFromFavorites(item)} className="btn btn-light rounded-pill position-absolute bottom-0 start-50 translate-middle">
                                        {isFavorite(item.itemUrl) ? <FilledHeart width="20px" height="20px" /> : <OutlinedHeart width="20px" height="20px" />}
                                    </button> */}

                                </td>

                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default SearchTable