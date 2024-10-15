import { request } from "../helpers/axios_helper";
import BinIcon from "../icons/BinIcon";
import { FavoriteSearchData } from "../types/FavoriteSearchData"
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast"

type SearchTableProps = {
    searches: FavoriteSearchData[],
    setSearches: (res: FavoriteSearchData[]) => void,
    logout: () => void
}

const SearchTable = ({ searches, setSearches, logout }: SearchTableProps) => {


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

    const removeSearch = (item: FavoriteSearchData) => {

        request(
            "DELETE",
            `/searches/${item.id}`,
            {},
            {}
        ).then(
            (response) => {

                const result: FavoriteSearchData[] = searches.filter((s) => s.id !== item.id);
                setSearches(result);

                toast.success(response.data)
            }).catch(
                (error) => {
                    if (error.response.status === 401) {
                        logout();
                        toast.error("The user was logged out!");
                    } else {
                        toast.error(error.response.code);
                    }
                }
            );
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
                            <tr key={item.id}>
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

                                </td>

                                <td className="position-relative">
                                    <button onClick={() => removeSearch(item)} className="btn btn-light rounded-pill mb-3">
                                        <BinIcon width="20px" height="20px" />
                                    </button>
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