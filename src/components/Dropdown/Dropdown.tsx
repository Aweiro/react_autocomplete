import React, { useCallback, useMemo, useRef, useState } from 'react';
import { User } from '../User/User';
import { Props } from '.';
import { Person } from '../../types/Person';

export const Dropdown: React.FC<Props> = ({ users, setSelectedUser }) => {
  // eslint-disable-next-line no-console
  console.log('render Dropdown');
  const [focus, setFocus] = useState(false);
  const [rawQuery, setRawQuery] = useState('');
  const [query, setQuery] = useState('');

  const timerId = useRef(0);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    window.clearTimeout(timerId.current);

    timerId.current = window.setTimeout(() => {
      setQuery(event.target.value.trim().toLowerCase());
    }, 300);
    setRawQuery(event.target.value);
    setSelectedUser(null);
  }

  const selectUser = useCallback(
    (user: Person) => {
      setSelectedUser(user);
      setRawQuery(user.name);
      setQuery(user.name.toLowerCase());
    },
    [setSelectedUser],
  );

  const filteredUsers = useMemo(
    () => users.filter(user => user.name.toLowerCase().includes(query)),
    [query, users],
  );

  return (
    <div className="dropdown is-active">
      <div className="dropdown-trigger">
        <input
          value={rawQuery}
          type="text"
          placeholder="Enter a part of the name"
          className="input"
          data-cy="search-input"
          onChange={handleChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
      </div>

      <div className="dropdown-menu" role="menu" data-cy="suggestions-list">
        {focus && filteredUsers.length > 0 && (
          <div className="dropdown-content">
            {filteredUsers.map(user => (
              <User key={user.slug} user={user} onSelected={selectUser} />
            ))}
          </div>
        )}

        {filteredUsers.length === 0 && (
          <div
            className="
            notification
            is-danger
            is-light
            mt-3
            is-align-self-flex-start
          "
            role="alert"
            data-cy="no-suggestions-message"
          >
            <p className="has-text-danger">No matching suggestions</p>
          </div>
        )}
      </div>
    </div>
  );
};
