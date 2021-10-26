import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import './SearchField.scss';
import { useHistory, useLocation } from 'react-router';

const debounce = (func) => {
  let timer;
  return (args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(args), 500);
  }
}

export const SearchField = ({ setOpenSearchField }) => {

  const [text, setText] = useState(null)
  const [isActive, setIsActive] = useState(false)

  const location = useLocation()
  const history = useHistory()
  const searchParams = new URLSearchParams(location.search)

  useEffect(() => {
    setTimeout(() => {
      setIsActive(true)
    }, 0);
  }, [])

  useEffect(() => {
    if (text === null) return;
    onSetSearchQuery(text.toLowerCase())
  }, [text])

  const onSetSearchQuery = useCallback(debounce((query) => {

    !!query
      ? searchParams.set('query', query)
      : searchParams.delete('query');

    const path = !!query ? 'search' : '/'
    history.push(`${path}?${searchParams.toString()}`)
  }), [])

  return (
    <div
      className={classNames(
        "search-field",
        { "search-field--active": isActive }
      )}
      id="search"
    >
      <input
        type="text"
        className="search-field__input"
        autoFocus
        value={text || ''}
        placeholder="input query..."
        onChange={(event) => setText(event.target.value)}
      />
      <button
        className="search-field__close"
        onClick={() => {
          setIsActive(false)
          setTimeout(() => setOpenSearchField(false), 500)
        }}
      >
         ✕
      </button>
    </div>
  )
}
