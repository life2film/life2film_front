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

  const url = film.url_image.split('/')
  const vidId = url[url.length-1]

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

      <Link to={`film/${film.slug}`} className="preview-link">
        <div>
            {/*<video id="example_video_1_html5_api" className="vjs-tech" preload="auto" autoPlay=""
                   data-setup="{&quot;ga&quot;: {&quot;debug&quot;: [&quot;true&quot;]}}"
                   poster="https://dcr2ej3odfzos.cloudfront.net/380197/baaai3eg.mp4.jpg" controls>
                <source src={ film.url_image || "https://dcr2ej3odfzos.cloudfront.net/380197/baaai3eg.mp4"} type="video/mp4"/>
            </video>*/}
          {/*{ film.url_image &&
            <iframe width="560" height="315" src={ film.url_image } frameborder="0" allowfullscreen></iframe>
          }*/}
          <img src={ `https://img.youtube.com/vi/${vidId}/0.jpg` } alt=""/>
        </div>
      </Link>
    </div>
  );
};

export default connect(() => ({}), mapDispatchToProps)(FilmPreview);
