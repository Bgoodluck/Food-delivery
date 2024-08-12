import React, { useState } from 'react'
import './SearchBar.css'
import FoodDisplay from '../FoodDisplay/FoodDisplay';
import Restaurants from '../Resturants/Restaurants';


function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="parent-component">
            <div className="navbar-search">
                <input 
                    type="text" 
                    placeholder="Search for food or restaurant..." 
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <FoodDisplay searchQuery={searchQuery} />
            <Restaurants searchQuery={searchQuery} />
        </div>
    );
}

export default SearchBar;
