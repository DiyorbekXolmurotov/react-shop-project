import React, { useEffect, useState } from 'react'
import "./Categories.scss"
import { useSearchParams } from 'react-router-dom'
import getUrlParams from '../../helpers/getUrlParams'
export default function Categories() {
  const [searchParams, setSearchParams] = useSearchParams()
  return (
    <>
      <section className="categories">
        <div className="categories__filter">
          <input value={searchParams.get("title") || ''} onChange={(evt) => setSearchParams(getUrlParams("title", evt.target.value, searchParams))} className='categories__search' name='search' type="search" placeholder='Search...' />
        </div>
      </section>
    </>
  )
}