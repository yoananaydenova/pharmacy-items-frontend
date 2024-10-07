import { useEffect, useState } from "react"
import { request, setAuthHeader } from "../helpers/axios_helper";
import Table from "./Table";
import { Item } from "../types/Item";
import { FavoriteSearchData } from "../types/FavoriteSearchData.tsx"
import SearchTable from "./SearchTable.tsx";

type DashboardProps = {
    login: boolean,
    logout: () => void
}

const Dashboard = ({ login, logout }: DashboardProps) => {

    const [favorites, setFavorites] = useState<Item[]>([])

    const [searches, setSearches] = useState<FavoriteSearchData[]>([])

    useEffect(() => {
        loadFavorites();
        loadSearches();
    }, []);

    const loadFavorites = () => {
        request(
            "GET",
            "/favorites",
            {},
            {}
        ).then(
            (response) => {
                setFavorites(response.data)
            }).catch(
                (error) => {
                    if (error.response.status === 401) {
                        setAuthHeader(null);
                    } else {
                        setFavorites(error.response.code)
                    }

                }
            );
    }

    const removeItem = (itemUrl: string) => {
        setFavorites((favorites) => favorites.filter((favUrl) => favUrl.itemUrl !== itemUrl));
    }

    const loadSearches = () => {
        request(
            "GET",
            "/searches",
            {},
            {}
        ).then(
            (response) => {
                setSearches(response.data)
            }).catch(
                (error) => {
                    if (error.response.status === 401) {
                        setAuthHeader(null);
                    } else {
                        setFavorites(error.response.code)
                    }

                }
            );
    }

    return (
        <div className="mt-5">

            <div className="card" >
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Items</button>
                        <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Searches</button>
                        <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Profile</button>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                        <h3 className="card-header bg-light">Favorite Items</h3>
                        <div className="card-body">
                            {favorites.length > 0 ?
                                <Table items={favorites} login={login} logout={logout} removeItem={removeItem} />
                                : null}
                        </div>
                    </div>
                    <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                        <h3 className="card-header bg-light">Favorite Searches</h3>
                        <div className="card-body">
                            <SearchTable searches={searches}/>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                        <h3 className="card-header bg-light">Profile Information</h3>
                    </div>
                </div>

            </div>

        </div>

    )
}

export default Dashboard