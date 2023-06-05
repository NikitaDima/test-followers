import css from './btnLoadMore.module.css';

const BtnLoadMore = ({ onClick }) => {
  return (
    <div className={css.BtnWrapper}>
      <button className={css.Btn} onClick={onClick}>
        {' '}
        Load more
      </button>
    </div>
  );
};

export default BtnLoadMore;
