import React, {useState} from 'react';
import { useFormik } from 'formik';

import '../styles/styles.scss';
import PetList from './PetList';

const App = () => {
    const [showPets, setShowPets] = useState(false)
    const [petProps, setPetProps] = useState({})
    
    const formik = useFormik({
        initialValues: {
          petName: '',
          city: '',
          petType: '',
        },
        onSubmit: values => {
            setPetProps(values)
            setShowPets(true)
        },
      });
    return (
        <div className="container">
        <form onSubmit={formik.handleSubmit}>
            <div className="search">
            <label htmlFor="petName">Search: </label>
            <input id="petName" name="petName" type="text" onChange={formik.handleChange} value={formik.values.petName}/>
            </div> 
            <div role="group" aria-labelledby="filter" className="filter">
                <span id="filter">Filter by: </span>
                <div className="city-wrapper">
                <label htmlFor="city">
                    <span className="sr-only">City</span>
                </label>
                <select name="city" id="city" role="listbox" onChange={formik.handleChange} value={formik.values.city}>
                    <option value="" default></option>
                    <option value="melbourne">Melbourne</option>
                    <option value="sydney">Sydney</option>
                </select>
                </div>
                <div className="pet-wrapper">
                <label htmlFor="shipping_name">
                    <span className="sr-only">Pet </span>
                </label>
                <select name="petType" id="petType" role="listbox" onChange={formik.handleChange} value={formik.values.petType}>
                    <option value="" default></option>
                    <option value="Cat">cat</option>
                    <option value="Dog">dog</option>
                    <option value="Fish">fish</option>
                    <option value="Bird">bird</option>
                </select>
                </div>
                </div> 
                <button className="submit" type="submit" >Go!</button>
        </form>
        {showPets && <PetList {...petProps} />}
        </div>
    )
}

export default App;