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
          <div className="container film-container">

            <FilmMeta film={this.props.film} canModify={canModify} className="col-xs-4" />
            <h1 className="col-xs-6 text-lg-center film-title">{this.props.film.title}</h1>
           {/* <video id="example_video_1_html5_api" className="vjs-tech" preload="auto" autoPlay=""
                   data-setup="{&quot;ga&quot;: {&quot;debug&quot;: [&quot;true&quot;]}}" controls>
                <source src={ this.props.film.url_image || "https://dcr2ej3odfzos.cloudfront.net/380197/baaai3eg.mp4" } type="video/mp4"/>
            </video>*/}
            {
              this.props.film && this.props.film.url_image &&
                <iframe width="560" height="315" src={ this.props.film.url_image } frameborder="0" allowfullscreen></iframe>
            }
            <div className="hits-container">
              <div className="hits">
                123 <i className="ion-eye"/>
              </div>
              <div className="donate-container">
                {/*<div className="form-inline">*/}
                  <fieldset className="form-group">
                    <div className="input-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Coin numbers"
                        // value={this.props.videoUrl}
                        // onChange={this.changeVideoURL}
                      />
                      <div className="input-group-btn">
                        <button
                          className="btn pull-xs-right btn-primary"
                          type="button"
                          // disabled={this.props.inProgress}
                          // onClick={this.submitForm}
                        >
                          Donate
                        </button>
                      </div>
                    </div>
                  </fieldset>
                {/*</div>*/}
              </div>
            </div>
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
