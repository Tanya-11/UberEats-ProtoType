import { useState, useEffect } from 'react'
import Axios from 'axios'
import { useSelector } from 'react-redux'
import RestCard from '../../common/RestCard'
import './Dashboard.scss'

const Dashboard = () => {
    const [restData, setrestData] = useState([])
    const [favRest, setfavRest] = useState(false)
    const customer = useSelector((state) => state.userLogin.text.user)
    const [deliveryMode, setDeliveryMode] = useState(true)
    const [location, setLocation] = useState('')
    const [searchString, setSearchString] = useState('')
    const [searchData, setSearchData] = useState({
        city: localStorage.getItem('city') || 'San Jose',
        mode: '',
        category: '',
        searchTabText: '',
    })
    const [value, setValue] = useState([1, 3])
    Axios.defaults.withCredentials = true

    const getRestData = Axios.post('/getDataBySearchTabTextForDish', {
        ...searchData,
    })

    const getFavData = Axios.post('/get-favorites', {
        email: customer,
    })
    // + adding the use
    useEffect(() => {
        Promise.all([getRestData, getFavData])
            .then((res) => {
                console.log(`Promise${JSON.stringify(res)}`)
                res[0].data.map((el) => {
                    res[1].data.map((item) => {
                        if (el.restId === item.restId) {
                            console.log(`favvvvv${item.restId}`)
                            el.fav = true
                        }
                    })
                })
                setrestData(res[0].data)
            })
            .catch((err) => {
                throw err
            })
    }, [searchData])

    const handleChange = (e) => {
        // console.log(e.target.value)
        const { name, value } = e.target
        setSearchData((prevSate) => ({
            ...prevSate,
            [name]: value,
        }))
        // console  .log(searchData)
    }
    const handleChangebtn = (val) => setValue(val)
    return (
        <div className="dashboardContent">
            <div className="leftContent">
                <div className="mode" onChange={(e) => handleChange(e)}>
                    <label>
                        <input type="radio" value="delivery" name="mode"
                            checked={searchData.mode === 'delivery'} />
                        Delivery
                    </label>
                    <label>
                        <input type="radio" value="pick" name="mode"
                            checked={searchData.mode === 'pick'} />
                        Pick Up
                    </label>
                    <label>
                        <input type="radio" value="both" name="mode"
                            checked={searchData.mode === 'both'} />
                        Both
                    </label>
                </div>
                <div className="location">
                    <input
                        type="text"
                        name="city"
                        value={searchData.city}
                        onChange={(e) => { handleChange(e); localStorage.setItem('city', e.target.value) }}
                        placeholder="search City"
                    />
                </div>
                <div className="category" onChange={(e) => handleChange(e)}>
                    <label>
                        <input type="radio" value="Vegetarian" name="category" />
                        Vegetarian
                    </label>
                    <label>
                        <input type="radio" value="Halal" name="category" />
                        Halal
                    </label>
                </div>
                <div className="search">
                    <input
                        type="text"
                        name="searchTabText"
                        value={searchData.searchTabText}
                        onChange={(e) => handleChange(e)}
                        placeholder="search Restaurant"
                    />
                </div>
            </div>
            <div className="rightContent">
                {restData.map((result, i) => (
                    <RestCard key={i} data={result}></RestCard>
                ))}
            </div>
        </div>
    )
}

export default Dashboard
