import { useEffect, useState } from "react"
import { request, setAuthHeader } from "../helpers/axios_helper";
import Table from "./Table";

type DashboardProps = {
    login: boolean
}

const Dashboard = ({ login }: DashboardProps) => {
    const [favorites, setFavorites] = useState([])

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

    console.log('favorites', favorites)
    return (
        <div className="mt-5">

            <div className="card" >
                <h3 className="card-header bg-light">Favorite items:</h3>
                <div className="card-body">
                    <Table items={favorites} login={login} />
                </div>
            </div>

        </div>

    )
}

export default Dashboard