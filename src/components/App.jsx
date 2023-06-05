//
import { useState, useEffect, useRef } from 'react';
import { fetchUpdatedFollowers, fetchUsers } from 'servers/api';
import CardUser from './cardUser/cardUser';
import BtnLoadMore from './pagination/btnLoadMore';

export const App = () => {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [flagNextPage, setFlagNextPage] = useState(true);

  const prevUsersRef = useRef([]);

  useEffect(() => {
    fetchUsers(page)
      .then(getUsers => {
        if (getUsers.length < 3) {
          setFlagNextPage(false);
        }

        const newUsers = getUsers.filter(
          user =>
            !prevUsersRef.current.some(
              existingUser => existingUser.id === user.id
            )
        );
        prevUsersRef.current = [...prevUsersRef.current, ...newUsers];
        setUsers(prevUsers => [...prevUsers, ...newUsers]);

        if (!flagNextPage) {
          alert('Больше нечего загрузить');
        }
      })
      .catch(error => {
        console.log(error);
        setUsers([]);
      });
  }, [flagNextPage, page]);

  const handleBtnClick = (_, user) => {
    const updatedFollowers = user.isFollowing
      ? user.followers - 1
      : user.followers + 1;

    fetchUpdatedFollowers(user, updatedFollowers)
      .then(() => {
        const updatedUsers = users.map(prevUser =>
          prevUser.id === user.id
            ? {
                ...prevUser,
                followers: updatedFollowers,
                isFollowing: !prevUser.isFollowing,
              }
            : prevUser
        );
        setUsers(updatedUsers);
      })
      .catch(error => {
        console.log('Ошибка при обновлении количества фолловеров:', error);
      });
  };

  const handleNextPage = () => {
    if (flagNextPage) {
      setPage(page + 1);
    }
  };

  return (
    <div>
      <CardUser users={users} onClick={handleBtnClick} />
      {flagNextPage && <BtnLoadMore onClick={handleNextPage} />}
    </div>
  );
};
