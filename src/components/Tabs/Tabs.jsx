import React from 'react'
import classNames from 'classnames'
import './Tabs.scss'
import { useHistory, useLocation } from 'react-router'

export const Tabs = ({ setQueryResult, setOpenSearchField }) => {

  const history = useHistory()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const query = searchParams.get('query') || ''

  const handleClick = () => {
    setQueryResult([])
    searchParams.delete('query')
    history.push(`/mobiles?${searchParams.toString()}`)
    setOpenSearchField(false)
  }

  return (
    <div className="tabs">
      <span
        className={classNames(
          'tabs__tab',
          { 'tabs__tab--active': !query.length }
        )}
        onClick={handleClick}
      >
        Home
      </span>
      <span
        className={classNames(
          'tabs__tab',
          { 'tabs__tab--active': query.length }
        )}
        hidden={!query}
      >
        <span
          className="tabs__tab--close"
          onClick={handleClick}
        >
           ✕
        </span>
        {
          (query || '').length > 10 ? query.slice(0, 10) + '...' : query
        }
      </span>
    </div>
  )

}
