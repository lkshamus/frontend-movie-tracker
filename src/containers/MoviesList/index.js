import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchCall from '../../utilities/fetchCall';
import { getUserLoggedIn } from '../../actions';
import { getMovieList, updateFavorites } from '../../actions/thunkActions/movieListThunk'
import SingleMovie from '../../components/SingleMovie';
import LogButton from '../LogButton';
import Logo from '../../components/Logo';
import SearchBar from '../../containers/SearchBar';
import Filters from '../../containers/Filters';
import ShowFavoritesBtn from '../ShowFavoritesBtn';

import './MoviesList.css'


class MoviesList extends Component {

  componentDidMount() {
    this.props.setFetchedMovies(this.props.movies)
    
    if (localStorage.getItem('userInfo')) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.props.logIn(userInfo.user.id, userInfo.user.name);
      this.props.setFavorites(userInfo.user.id)
    }
    
    if (this.props.user.id) {
      this.props.setFavorites(this.props.user.id)
      localStorage.setItem('userInfo', JSON.stringify({
        user: this.props.user
      }));
    }
  }

  componentDidUpdate() {
    
  }
  
  getMovies = () => {
    if (this.props.movies.results) {
      return this.props.movies.results.map( movie => (
        <SingleMovie key={movie.id} {...movie} />
        ));
    } else {
      return '';
    }
  }

  render() {
      return (
        <div className='movies-list'>
          <header>

            <section className='header-wrapper'>
              <section className='left-side-header-btns'>
                <Filters />
                <LogButton />
                <ShowFavoritesBtn />
              </section>
              <SearchBar />
            </section>
          </header>
          <section className='movies-wrapper'>
            <div className='movies-stripe'></div>
            {this.getMovies()}
          </section>
          <footer>
            <div className='footer-wrap'>
              <section className='logo-footer-section'>
                <Logo />
                <h1><span>movie</span>Tracker</h1>
              </section>
              <section className='scroll-social-wrapper'>
                <i className="fab fa-facebook scroll-social"></i>
                <i className="fab fa-instagram scroll-social"></i>
                <i className="fab fa-twitter scroll-social"></i>
              </section>
              <h3 className='footer-copyright'>© 2018 MovieTracker - All Rights Reserved</h3>
            </div>
          </footer>
        </div>
    );
  }
}


export const mapStateToProps = (state) => ({
  movies: state.movies,
  user: state.user,
  favorites: state.favorites
});

export const mapDispatchToProps = (dispatch) => ({
  setFetchedMovies: (data) => dispatch(getMovieList(data)),
  setFavorites: (data) => dispatch(updateFavorites(data)),
  logIn: (id, name) => dispatch(getUserLoggedIn(id, name))
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
