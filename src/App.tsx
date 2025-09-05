import React, { useMemo, useRef, useState } from 'react';
import './App.scss';
import { peopleFromServer } from './data/people';
import { Dropdown } from './components/Dropdown/Dropdown';
import { Person } from './types/Person';

export const App: React.FC = () => {
  // eslint-disable-next-line no-console
  console.log('render App');
  const [query, setQuery] = useState('');
  const [normalizedQuery, setNormalizedQuery] = useState('');

  const [selectedUser, setSelectedUser] = useState<null | Person>(null);
  const { name, born, died } = selectedUser ?? { name: '', born: '', died: '' };

  const timerId = useRef(0);

  function saveQuery({ newQuery }: { newQuery: string }) {
    setQuery(newQuery);

    window.clearTimeout(timerId.current);

    timerId.current = window.setTimeout(() => {
      setNormalizedQuery(newQuery.trim().toLowerCase());
    }, 1000);
  }

  const filterUsers = useMemo(() => {
    return peopleFromServer.filter(user =>
      user.name.toLowerCase().includes(normalizedQuery),
    );
  }, [normalizedQuery]);

  return (
    <div className="container">
      <main className="section is-flex is-flex-direction-column">
        <h1 className="title" data-cy="title">
          {selectedUser !== null
            ? `${name} (${born} - ${died})`
            : 'No selected person'}
        </h1>

        <Dropdown
          users={filterUsers}
          query={query}
          setSelectedUser={setSelectedUser}
          saveQuery={saveQuery}
        />

        {filterUsers.length === 0 && (
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
      </main>
    </div>
  );
};
