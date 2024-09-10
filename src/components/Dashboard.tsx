import { useEffect, useState } from "react"
import { request, setAuthHeader } from "../helpers/axios_helper";

const Dashboard = () => {
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
    return (
        <div className="row justify-content-md-center">
            <div className="col-4">
                <div className="card" style={{ width: "18rem" }}>
                    <div className="card-body">
                        <h5 className="card-title">Dashboard</h5>
                        <p className="card-text">Content:</p>
                        <ul>
                            {favorites && favorites
                                .map((line) =>
                                    <li key={line}>{line}</li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Dashboard