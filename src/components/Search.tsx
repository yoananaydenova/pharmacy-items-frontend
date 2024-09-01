import { useState } from "react"
import axios from "axios"
import Table from "./Table";
import Loading from "./Loading";

type FormData = {
    pharms: string[];
    limit: number;
    text: string
}

const Search = () => {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const [searchData, setSearchData] = useState<FormData>(
        {
            pharms: [],
            limit: 1,
            text: ""
        }
    )

    const onPharmacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const newValue: string = e.target.value;

        let newArr: string[] = [...searchData.pharms];

        if (!searchData.pharms.find(v => v === newValue)) {
            newArr.push(newValue);
        } else {
            newArr = newArr.filter(v => v != newValue);
        }

        setSearchData((prevState) => ({
            ...prevState,
            pharms: newArr,
        }));

    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        let { name, value, min, max } = e.target;

        let newValue: string | number = value;
        if (name === "limit") {
            newValue = Math.max(Number(min), Math.min(Number(max), Number(value)));
        }

        setSearchData({ ...searchData, [name]: newValue })
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setLoading(true);

        const requestParams = { ...searchData, pharms: searchData.pharms.toString() }

        axios.get('http://localhost:8080/items'
            , { params: requestParams }
        ).then(res => {
            setItems(res.data);
            setLoading(false);
        })


    }

    return (
        <>
            <div className="container d-flex flex-column justify-content-center w-50 mt-5">
                <form onSubmit={handleSubmit} className="d-flex flex-column" role="search">

                    <input onChange={onInputChange} name="text" className="form-control input-lg mb-3" type="text" placeholder="Search pharmacy item..." aria-label="Search" />

                    <div className="mx-auto">
                        <div className="d-flex flex-column mb-3 align-items-start">
                            <label >Choose pharmacy:</label>
                            <div className="form-check">
                                <input onChange={onPharmacyChange} className="form-check-input" type="checkbox" name="pharms" value="1" id="sopharmacy" />
                                <label className="form-check-label" htmlFor="sopharmacy">sopharmacy.bg</label>
                            </div>

                            <div className="form-check">
                                <input onChange={onPharmacyChange} className="form-check-input" type="checkbox" name="pharms" value="2" id="subra" />
                                <label className="form-check-label" htmlFor="subra">subra.bg</label>
                            </div>

                            <div className="form-check">
                                <input onChange={onPharmacyChange} className="form-check-input" type="checkbox" name="pharms" value="3" id="remedium" />
                                <label className="form-check-label" htmlFor="remedium">remedium.bg</label>
                            </div>

                        </div>
                        <div className="d-flex flex-column b align-items-start">
                            <label >Choose limit:</label>
                            <input onChange={onInputChange} name="limit" defaultValue="1" className="form-control input-lg mb-3" min="1" max="1000" type="number" placeholder="Limit results for pharmacy..." aria-label="Limit" />
                        </div>

                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </div>
                </form>

            </div>
            <div className="container d-flex flex-column justify-content-center w-80 mt-5">
                {loading && <Loading />}
                {!loading && items.length > 0 && <Table items={items} />}
            </div>
        </>
    )
}

export default Search