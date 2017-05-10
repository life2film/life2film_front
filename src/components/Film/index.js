import FilmMeta from './FilmMeta';
import CommentContainer from './CommentContainer';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
// import marked from 'marked';
import { FILM_PAGE_LOADED, FILM_PAGE_UNLOADED } from '../../constants/actionTypes';

const mapStateToProps = state => ({
  ...state.film,
  currentUser: state.common.currentUser
});


const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: FILM_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: FILM_PAGE_UNLOADED })
});

class Film extends React.Component {
  componentWillMount() {
    this.props.onLoad(Promise.all([
      agent.Films.get(this.props.params.id),
      agent.Comments.forFilm(this.props.params.id)
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    if (!this.props.film) {
      return null;
    }

    // const markup = { __html: marked(this.props.film.body, { sanitize: true }) };
    const canModify = this.props.currentUser &&
      this.props.currentUser.username === this.props.film.author.username;
    return (
      <div className="film-page">

        <div className="banner">
          <div className="container">

            <h1>{this.props.film.title}</h1>
            <FilmMeta
              film={this.props.film}
              canModify={canModify} />

          </div>
        </div>

        <div className="container page">

          <div className="row film-content">
            <div className="col-xs-12">


              <ul className="tag-list">
                {
                  this.props.film.tagList.map(tag => {
                    return (
                      <li
                        className="tag-default tag-pill tag-outline"
                        key={tag}>
                        {tag}
                      </li>
                    );
                  })
                }
              </ul>

            </div>
          </div>

          <hr />

          <div className="film-actions">
          </div>

          <div className="row">
            <CommentContainer
              comments={this.props.comments || []}
              errors={this.props.commentErrors}
              slug={this.props.params.id}
              currentUser={this.props.currentUser} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Film);
