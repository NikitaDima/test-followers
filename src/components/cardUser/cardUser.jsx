import { useState } from 'react';
import { ReactComponent as LogoSvg } from '../../images/Logo.svg';
import classnames from 'classnames';
import css from './cardUser.module.css';
import picture21 from '../../images/picture21.png';

const CardUser = ({ users, onClick, isFollowing }) => {
  const [activeButtonId, setActiveButtonId] = useState(null);

  const handleButtonClick = (e, user) => {
    if (activeButtonId === user.id) {
      setActiveButtonId(null);
    } else {
      setActiveButtonId(user.id);
    }

    onClick(e, user);
  };

  return (
    <ul className={css.List}>
      {users.map(user => (
        <li className={css.Item} key={user.id}>
          <div className={css.LogoWrapper}>
            <LogoSvg alt="Logo" />
          </div>
          <div className={css.BcgWrapper}>
            <img className={css.BcgImg} src={picture21} alt="picture21" />
          </div>
          <div className={css.AvatarWrapper}>
            <div className={css.AvatarBox}>
              <img className={css.Avatar} src={user.avatar} alt={user.user} />
            </div>
          </div>
          <div className={css.TextWrapper}>
            <p className={css.Text}>Tweets: {user.tweets}</p>
            <p className={css.Text}>Followers: {user.followers}</p>
          </div>
          <div className={css.ButtonWrapper}>
            <button
              className={classnames(css.Btn, {
                [css.BtnActive]: activeButtonId === user.id && isFollowing,
                [css.BtnInactive]: activeButtonId !== user.id || !isFollowing,
              })}
              onClick={e => handleButtonClick(e, user)}
            >
              Follower
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CardUser;
