import React from 'react';
import { Link } from 'react-router';
import agent from '../agent';
import { connect } from 'react-redux';
import { FILM_FAVORITED, FILM_UNFAVORITED } from '../constants/actionTypes';

const FAVORITED_CLASS = 'btn btn-sm btn-primary';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';

const mapDispatchToProps = dispatch => ({
  favorite: slug => dispatch({
    type: FILM_FAVORITED,
    payload: agent.Films.favorite(slug)
  }),
  unfavorite: slug => dispatch({
    type: FILM_UNFAVORITED,
    payload: agent.Films.unfavorite(slug)
  })
});

const FilmPreview = props => {
  const film = props.film;
  const favoriteButtonClass = film.favorited ?
    FAVORITED_CLASS :
    NOT_FAVORITED_CLASS;

  const handleClick = ev => {
    ev.preventDefault();
    if (film.favorited) {
      props.unfavorite(film.slug);
    } else {
      props.favorite(film.slug);
    }
  };

  return (
    <div className="film-preview">
      <div className="film-meta">
        <Link to={`@${film.author.username}`}>
          <img src={film.author.image} alt={film.author.username} />
        </Link>

        <div className="info">
          <Link className="author" to={`@${film.author.username}`}>
            {film.author.username}
          </Link>
          <span className="date">
            {new Date(film.createdAt).toDateString()}
          </span>
        </div>

        <div className="pull-xs-right">
          <button className={favoriteButtonClass} onClick={handleClick}>
            <i className="ion-heart"></i> {film.favoritesCount}
          </button>
        </div>
      </div>

      <Link to={`film/${film.slug}`} className="preview-link">
        <h1>{film.title}</h1>
        <p>{film.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {
            film.tagList.map(tag => {
              return (
                <li className="tag-default tag-pill tag-outline" key={tag}>
                  {tag}
                </li>
              )
            })
          }
        </ul>
      </Link>
    </div>
  );
}

export default connect(() => ({}), mapDispatchToProps)(FilmPreview);
