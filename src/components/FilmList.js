import FilmPreview from './FilmPreview';
import ListPagination from './ListPagination';
import React from 'react';

const FilmList = props => {
  if (!props.films) {
    return (
      <div className="film-preview">Loading...</div>
    );
  }

  if (props.films.length === 0) {
    return (
      <div className="film-preview">
        No films are here... yet.
      </div>
    );
  }

  return (
    <div>
      {
        props.films.map(film => {
          return (
            <FilmPreview film={film} key={film.slug} />
          );
        })
      }

      <ListPagination
        pager={props.pager}
        filmsCount={props.filmsCount}
        currentPage={props.currentPage} />
    </div>
  );
};

export default FilmList;
