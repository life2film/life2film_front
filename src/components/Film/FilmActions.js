import { Link } from 'react-router';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { DELETE_FILM } from '../../constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  onClickDelete: payload =>
    dispatch({ type: DELETE_FILM, payload })
});

const FilmActions = props => {
  const film = props.film;
  const del = () => {
    props.onClickDelete(agent.Films.del(film.slug))
  };
  if (props.canModify) {
    return (
      <span>

        <Link
          to={`/editor/${film.slug}`}
          className="btn btn-outline-secondary btn-sm">
          <i className="ion-edit"></i> Edit Film
        </Link>

        <button className="btn btn-outline-danger btn-sm" onClick={del}>
          <i className="ion-trash-a"></i> Delete Film
        </button>

      </span>
    );
  }

  return (
    <span>
    </span>
  );
};

export default connect(() => ({}), mapDispatchToProps)(FilmActions);
