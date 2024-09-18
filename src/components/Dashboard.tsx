import { useEffect, useState } from "react"
import { request, setAuthHeader } from "../helpers/axios_helper";
import Table from "./Table";
import { Item } from "./Item";

type DashboardProps = {
    login: boolean,
    logout: () => void
}

const Dashboard = ({ login, logout }: DashboardProps) => {

    const [favorites, setFavorites] = useState<Item[]>([])

    useEffect(() => {
        loadFavorites();
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

    return (
        <div className="mt-5">

            <div className="card" >
                <h3 className="card-header bg-light">Favorite items:</h3>
                <div className="card-body">
                    <Table items={favorites} login={login} logout={logout} removeItem={removeItem} />
                </div>
            </div>

        </div>

    )
}

export default Dashboard