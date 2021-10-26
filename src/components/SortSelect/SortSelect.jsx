import React from 'react'
import './SortSelect.scss'
import { useHistory, useLocation } from 'react-router'

export const SortSelect = () => {

  const location = useLocation()
  const history = useHistory()
  const searchParams = new URLSearchParams(location.search)

  const handleChange = (event) => {
    const [sort, order] = event.target.value.split('.')

    searchParams.set('sort', sort)
    searchParams.set('order', order)

    const path = location.pathname
    history.push(`${path}?${searchParams.toString()}`)
  }

  const optionValue = `${searchParams.get('sort')}.${searchParams.get('order')}`

  return (
    <div className="sort-select">
      <select
        onChange={handleChange}
        defaultValue={optionValue}
      >
        <option value="name.desc"> name ᐁ </option> 
        <option value="name.asc"> name ᐃ </option>
        <option value="price.desc"> price ᐁ </option>
        <option value="price.asc"> price ᐃ </option>
      </select>
    </div>
  )
}
