import { useEffect, useState } from "react"
import Table from "./Table";
import Loading from "./Loading";
import { request } from '../helpers/axios_helper.ts';
import toast from "react-hot-toast";
import SaveButton from "./SaveButton.tsx";
import Select from "react-select";


type FormData = {
    pharms: string[];
    limit: number;
    text: string
}

type SearchProps = {
    login: boolean,
    logout: () => void
}

type SearchDropdownProps = {
    value: string,
    label: string
}

type SearchData = {
    searchedText: string,
    searchLimit: number,
    pharmacies: string[]
}

const options = [
    { value: 'chocolate', label: 'Chocolate abcd ssdf sadfsagsagsgsagsagammmmmmmmmmmmmmmmmmmmmmmmms' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
];

const Search = ({ login, logout }: SearchProps) => {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedSearch, setSelectedSearch] = useState<null | SearchDropdownProps>(null);
    const [searchData, setSearchData] = useState<FormData>(
        {
            pharms: [],
            limit: 1,
            text: ""
        }
    )
    const [searches, setSearches] = useState<[SearchData] | []>([]);

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

                setSearches(response.data)

            }).catch(
                (error) => {
                    console.log('error', error)
                    if (error.response.status === 401) {
                        logout()
                        toast.error("The user was logged out!");
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

        setLoading(false);

        let { name, value, min, max } = e.target;

        let newValue: string | number = value;
        if (name === "limit") {
            newValue = Math.max(Number(min), Math.min(Number(max), Number(value)));
        }

        if (name === "text") {
            setSelectedSearch(null);
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

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

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
        // TODO add to saved search
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

                const addedItem = response.data;

                //   setFavorites((prevState) =>
                //     [...prevState, { id: addedItem.id, itemUrl: addedItem.itemUrl }]
                //   );

                toast.success("Successfully saved search!");

            }).catch(
                (error) => {
                    if (error.response.status === 401) {
                        logout();
                        toast.error("Тhe user was logged out!");
                    } else {
                        toast.error(error.response.code);
                    }
                }
            );

    }

    const handleDropdownChange = (selectedSearch: null | SearchDropdownProps) => {
        setSelectedSearch(selectedSearch);
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
                <form onSubmit={handleSubmit} className="d-flex flex-column " role="search">


                    <input onChange={onInputChange} name="text" className="form-control input-lg mb-3" type="text" placeholder="Search pharmacy item..." aria-label="Search" />




                    {login && <div className="d-flex flex-row mb-3 gap-2">

                        <Select
                            options={options}
                            value={selectedSearch}
                            onChange={handleDropdownChange}
                            placeholder={"Select saved search..."}
                            styles={styles}

                        />
                        <SaveButton onClick={saveSearch} />
                    </div>}

                    <div className="align-self-center">

                        <div className="d-flex flex-column mb-3 align-items-start">

                            <label >Choose pharmacy:</label>
                            <div className="form-check">
                                <input onChange={onPharmacyChange} className="form-check-input" type="checkbox" name="pharms" value="SOPHARMACY" id="sopharmacy" />
                                <label className="form-check-label" htmlFor="sopharmacy">sopharmacy.bg</label>
                            </div>

                            <div className="form-check">
                                <input onChange={onPharmacyChange} className="form-check-input" type="checkbox" name="pharms" value="SUBRA" id="subra" />
                                <label className="form-check-label" htmlFor="subra">subra.bg</label>
                            </div>

                            <div className="form-check">
                                <input onChange={onPharmacyChange} className="form-check-input" type="checkbox" name="pharms" value="REMEDIUM" id="remedium" />
                                <label className="form-check-label" htmlFor="remedium">remedium.bg</label>
                            </div>
                        </div>

                        <div className="d-flex flex-column align-items-start">
                            <label >Choose limit:</label>
                            <input onChange={onInputChange} name="limit" defaultValue="1" className="form-control input-lg mb-3" min="1" max="1000" type="number" placeholder="Limit results for pharmacy..." aria-label="Limit" />
                        </div>

                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </div>

                </form>

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