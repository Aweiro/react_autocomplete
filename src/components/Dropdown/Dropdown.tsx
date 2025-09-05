import React, { useState } from 'react';
import { User } from '../User/User';
import { Props } from '.';
import { Person } from '../../types/Person';

export const Dropdown: React.FC<Props> = React.memo(
  ({ users, query, setSelectedUser, saveQuery }) => {
    // eslint-disable-next-line no-console
    console.log('render Dropdown');
    const [focus, setFocus] = useState(false);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      saveQuery({ newQuery: event.target.value });
      setSelectedUser(null);
    }

    function selectUser(user: Person) {
      setSelectedUser(user);
    }

    return (
      <div className="dropdown is-active">
        <div className="dropdown-trigger">
          <input
            value={query}
            type="text"
            placeholder="Enter a part of the name"
            className="input"
            data-cy="search-input"
            onChange={handleChange}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
        </div>

        {focus && users.length > 0 && (
          <div className="dropdown-menu" role="menu" data-cy="suggestions-list">
            <div className="dropdown-content">
              {users.map(user => (
                <User key={user.slug} user={user} onSelected={selectUser} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
);

Dropdown.displayName = 'Dropdown';

// export const Dropdown: React.FC<Props> = ({
//   users,
//   query,
//   setSelectedUser,
//   saveQuery,
// }) => {
//   // eslint-disable-next-line no-console
//   console.log('render Dropdown');
//   const [focus, setFocus] = useState(false);

//   // function saveQuery({ newQuery }: { newQuery: string }) {
//   //   setNormalizedQuery(newQuery);

//   //   window.clearTimeout(timerId.current);

//   //   timerId.current = window.setTimeout(() => {
//   //     onFilter(newQuery.trim().toLowerCase());
//   //   }, 1000);
//   // }

//   function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
//     saveQuery({ newQuery: event.target.value });
//     setSelectedUser(null);
//   }

//   function selectUser(user: Person) {
//     setSelectedUser(user);
//   }

//   return (
//     <div className="dropdown is-active">
//       <div className="dropdown-trigger">
//         <input
//           value={query}
//           type="text"
//           placeholder="Enter a part of the name"
//           className="input"
//           data-cy="search-input"
//           onChange={handleChange}
//           onFocus={() => setFocus(true)}
//           onBlur={() => setFocus(false)}
//         />
//       </div>

//       {focus && users.length > 0 && (
//         <div className="dropdown-menu" role="menu" data-cy="suggestions-list">
//           <div className="dropdown-content">
//             {users.map(user => (
//               <User key={user.slug} user={user} onSelected={selectUser} />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
