import React from 'react';
import '../styles/styles.scss';
import {URLS} from '../utils/AppConstants';
import {get} from '../utils/request';
import PetList from './PetList';
const App = () => {
    const fetchPetsMel = () => {
        return get(URLS.MELBOURNE);
    }
    const fetchPetsSydney = () => {
        return get(URLS.SYDNEY);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const petsMel = fetchPetsMel();
        const petsSyd = fetchPetsSydney();
        return [...petsMel, ...petsSyd]
    }
    return (
        <div className="container">
        <form onSubmit={(event)=>handleSubmit(event)}>
            <div className="search">
            <label htmlFor="petName">Search: </label>
            <input id="petName" name="petName" type="text" />
            </div> 
            <div role="group" aria-labelledby="filter" className="filter">
                <span id="filter">Filter by: </span>
                <div className="city-wrapper">
                <label htmlFor="city">
                    <span className="sr-only">City</span>
                </label>
                <select name="city" id="city" role="listbox">
                    <option value="melbourne">Melbourne</option>
                    <option value="sydney">Sydney</option>
                </select>
                </div>
                <div className="pet-wrapper">
                <label htmlFor="shipping_name">
                    <span className="sr-only">Pet </span>
                </label>
                <select name="pet" id="pet" role="listbox">
                    <option value="cat">cat</option>
                    <option value="dog">dog</option>
                </select>
                </div>
                </div> 
                <button className="submit" type="button" onClick={handleSubmit}>Go!</button>
        </form>
        <PetList />
        </div>
    )
}

export default App;