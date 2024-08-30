import { useState } from "react"
import axios from "axios"

type FormData = {
    pharms: string[];
    limit: string;
    text: string
}

const Search = () => {

    const [items, setItems] = useState([]);

    const [searchData, setSearchData] = useState<FormData>(
        {
            pharms: [],
            limit: "5",
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
        const { name, value } = e.target;
        if(name === "limit" && parseInt(value) < 1){

        }
        setSearchData({ ...searchData, [name]: value })
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const requestParams = { ...searchData, pharms: searchData.pharms.toString() }
        axios.get('http://localhost:8080/items'
            , { params: requestParams }
        ).then(res => setItems(res.data))
    }

    return (
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
                        <input onChange={onInputChange} name="limit" className="form-control input-lg mb-3" min="1" type="number" placeholder="Limit results for pharmacy..." aria-label="Limit" />
                        {/* <div className="d-flex flex-row gap-3 mb-3">

                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="limit" id="limit5" value="5" checked={searchData.limit == "5"} onChange={onInputChange} />
                                <label className="form-check-label" htmlFor="limit5">
                                    5
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="limit" id="limit10" value="10" checked={searchData.limit == "10"} onChange={onInputChange} />
                                <label className="form-check-label" htmlFor="limit10">
                                    10
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="limit" id="limit20" value="20" checked={searchData.limit == "20"} onChange={onInputChange} />
                                <label className="form-check-label" htmlFor="limit20">
                                    20
                                </label>
                            </div>

                        </div> */}
                    </div>


                    <button className="btn btn-outline-success" type="submit">Search</button>
                </div>
            </form>

            {items.map((item, index) => {
                return (
                    <div key={index}> {index + 1}. {" "}{item.itemName}</div>
                )
            })}
        </div>
    )
}

export default Search