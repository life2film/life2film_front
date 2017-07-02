import React from 'react';
import { Link } from 'react-router';
import agent from '../agent';
import { connect } from 'react-redux';
import { FILM_FAVORITED, FILM_UNFAVORITED } from '../constants/actionTypes';
import '../assets/film-preview.css'

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

        <div className="info">
          <Link className="author" to={`@${film.author.username}`}>
            {film.author.username}
          </Link>
          <span className="date">
            ({new Date(film.createdAt).toDateString()})
          </span>
        </div>

        <div className="pull-xs-right">
          <button className={favoriteButtonClass} onClick={handleClick}>
            <i className="ion-heart"/> {film.favoritesCount}
          </button>
        </div>
      </div>


      <Link to={`film/${film.slug}`} className="preview-link">
        {film.title.slice(0, 40)}
      </Link>

        <div>
            <iframe width="420" height="315"
                    src={film.url_image}>
            </iframe>
        </div>

    </div>
  );
};

export default connect(() => ({}), mapDispatchToProps)(FilmPreview);
