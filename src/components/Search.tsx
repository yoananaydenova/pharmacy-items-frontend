import { useEffect, useState } from "react"
import Table from "./Table";
import Loading from "./Loading";
import { request } from '../helpers/axios_helper.ts';
import toast from "react-hot-toast";
import SaveButton from "./SaveButton.tsx";
import Select from "react-select";




type SearchProps = {
    login: boolean,
    logout: () => void
}


type FormData = {
    text: string,
    limit: number,
    pharms: string[],
}

type SearchData = {
    searchedText: string,
    searchLimit: number,
    pharmacies: string[]
}

type OptionData = {
    label: string,
    value: SearchData
}


const emptyOptionData: OptionData = {
    label: "",
    value: {
        searchedText: "",
        searchLimit: 1,
        pharmacies: []
    }
}

const Search = ({ login, logout }: SearchProps) => {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedSearch, setSelectedSearch] = useState<OptionData>(emptyOptionData);
    const [searchData, setSearchData] = useState<FormData>(
        {
            pharms: [],
            limit: 1,
            text: ""
        }
    )
    const [options, setOptions] = useState<OptionData[]>([]);

    useEffect(() => {
        loadSearches();
    }, []);

    const loadSearches = () => {
        request(
            "GET",
            "/searches",
            {},
            {}
        ).then(
            (response) => {

                const result: [OptionData] = response.data.map((s: SearchData) => ({ "label": s.searchedText, "value": s }))

                setOptions(result)

            }).catch(
                (error) => {

                    if (error.response.status === 401) {
                        logout()
                    } else {
                        toast.error(error.response.code);
                    }
                }
            );
    }


    const onPharmacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setLoading(false);

        const newValue: string = e.target.value;

        let newArr: string[] = [...searchData.pharms];

        if (searchData.pharms.find(v => v === newValue)) {
            newArr = newArr.filter(v => v != newValue);
        } else {
            newArr.push(newValue);
        }

        setSearchData((prevState) => ({
            ...prevState,
            pharms: newArr,
        }));

    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setLoading(false);

        let { name, value, min, max } = e.target;

        let newValue: string | number = value;
        if (name === "limit") {
            newValue = Math.max(Number(min), Math.min(Number(max), Number(value)));
        }

        if (name === "text") {
            setSelectedSearch(emptyOptionData);
        }

        setSearchData({ ...searchData, [name]: newValue })
    }

    const getErrorMessages = () => {
        const messages = [];
        if (searchData.text.trim().length == 0) {
            messages.push("The search text can't be empty string!");
        }

        if (searchData.pharms.length == 0) {
            messages.push("You must choose at least 1 pharmacy!");
        }

        if (searchData.limit < 1) {
            messages.push("The limit must be more than 0!");
        }

        if (searchData.limit > 1000) {
            messages.push("The limit must be less than 1000!");
        }

        if (messages.length > 0) {
            return messages.join("\n");
        }

        return "";
    }

    const handleSearch = () => {

        const errorMessages = getErrorMessages();
        if (errorMessages.length > 0) {
            toast.error(errorMessages);

            return;
        }

        setLoading(true);

        const requestParams = { ...searchData, pharms: searchData.pharms.toString() }

        request(
            "GET",
            "/search",
            requestParams,
            {}
        ).then(res => {
            setItems(res.data);
            setLoading(false);
        })


    }

    const saveSearch = () => {
        request(
            "POST",
            "/searches",
            {},
            {
                searchedText: searchData.text,
                pharmacies: searchData.pharms,
                searchLimit: searchData.limit,
            }
        ).then(
            (response) => {

                const responseObj: SearchData = response.data;
                const resultItem: OptionData = { "label": responseObj.searchedText, "value": responseObj }

                setOptions(prevState => [...prevState, resultItem]);
                setSelectedSearch(resultItem);

                toast.success("Successfully saved search!");

            }).catch(
                (error) => {
                    if (error.response.status === 401) {
                        logout();
                        toast.error("Тhe user was logged out!");
                    } else {
                        toast.error(error.response.data.message);
                    }
                }
            );

    }

    const handleDropdownChange = (selectedSearch: OptionData | null) => {
        if (selectedSearch !== null) {
            setSelectedSearch(selectedSearch);
        }
    }


    const styles = {
        control: (css) => ({
            ...css,
            width: 460
        }),
        menu: ({ width, ...css }) => ({
            ...css,
            width: "max-content",
            minWidth: "20%"
        }),
        option: (css) => ({ ...css, width: 500 })
    };

    return (
        <>
            <div className="container d-flex flex-column justify-content-center w-50 mt-5">

                <div className="d-flex flex-column " role="search">

                    <input onChange={onInputChange} value={selectedSearch?.value.searchedText} name="text" className="form-control input-lg mb-3" type="text" placeholder="Search pharmacy item..." aria-label="Search" />


                    {login && <div className="d-flex flex-row mb-3 gap-2">

                        <Select
                            options={options}
                            value={selectedSearch}
                            onChange={handleDropdownChange}
                            placeholder={"Select saved search..."}
                            styles={styles}

                        />
                        <SaveButton isDisabled={selectedSearch !== null} onClick={saveSearch} />
                    </div>}

                    <div className="align-self-center">

                        <div className="d-flex flex-column mb-3 align-items-start">

                            <label >Choose pharmacy:</label>
                            <div className="form-check">
                                <input onChange={onPharmacyChange} className="form-check-input" type="checkbox" name="pharms" value="SOPHARMACY" checked={selectedSearch?.value.pharmacies.includes("SOPHARMACY")} id="sopharmacy" />
                                <label className="form-check-label" htmlFor="sopharmacy">sopharmacy.bg</label>
                            </div>

                            <div className="form-check">
                                <input onChange={onPharmacyChange} className="form-check-input" type="checkbox" name="pharms" value="SUBRA" checked={selectedSearch?.value.pharmacies.includes("SUBRA")} id="subra" />
                                <label className="form-check-label" htmlFor="subra">subra.bg</label>
                            </div>

                            <div className="form-check">
                                <input onChange={onPharmacyChange} className="form-check-input" type="checkbox" name="pharms" value="REMEDIUM" checked={selectedSearch?.value.pharmacies.includes("REMEDIUM")} id="remedium" />
                                <label className="form-check-label" htmlFor="remedium">remedium.bg</label>
                            </div>
                        </div>

                        <div className="d-flex flex-column align-items-start">
                            <label >Choose limit:</label>
                            <input onChange={onInputChange} value={selectedSearch?.value.searchLimit} name="limit" className="form-control input-lg mb-3" min="1" max="1000" type="number" placeholder="Limit results for pharmacy..." aria-label="Limit" />
                        </div>

                        <button onClick={handleSearch} className="btn btn-outline-success" type="button">Search</button>
                    </div>

                </div>

            </div>
            <div className="container d-flex flex-column justify-content-center w-80 mt-5">
                {loading && <Loading />}
                {!loading && items.length > 0 &&
                    <Table
                        items={items}
                        login={login}
                        logout={logout}
                    />}
            </div>
        </>
    )
}

export default Search