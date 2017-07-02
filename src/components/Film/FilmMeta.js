import FilmActions from './FilmActions';
import { Link } from 'react-router';
import React from 'react';

const FilmMeta = props => {
  const film = props.film;
  return (
    <div className="film-meta">
      <Link to={`@${film.author.username}`}>
        <img className="film-meta-avatar" src={film.author.image} alt={film.author.username} />
      </Link>

      <div className="info">
        <Link to={`@${film.author.username}`} className="author">
          {film.author.username}
        </Link>
        <span className="date">
          {new Date(film.createdAt).toDateString()}
        </span>
      </div>

      <FilmActions canModify={props.canModify} film={film} />
    </div>
  );
};

export default FilmMeta;
