import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import Restaurants from '../../components/Resturants/Restaurants'

function Home() {

    const [category, setCategory] = useState("All")

  return (
    <div>
      <Header/>
      <Restaurants category={category} setCategory={setCategory} />
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category} />
      <AppDownload />
      
    </div>
  )
}

export default Home
