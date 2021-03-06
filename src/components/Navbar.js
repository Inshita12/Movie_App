import React from "react";
import { data } from "./data";
import { addMovies, handleMovieSearch } from "../actions";
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
    };
  }

  handleAddToMovies = (movies) => {
    console.log("INSIDE handleAddToMovies");
    this.props.dispatch(addMovies(movies));
    this.setState({
      showSearchResults: false,
      
    });
  };

  handleSearch = () => {
    const { searchText } = this.state;

    this.props.dispatch(handleMovieSearch(searchText)); //action to fetch api
  };
  handleChange = (e) => {
    this.setState({
      searchText: e.target.value, //e= event
    });
  };
  render() {
    const {result:movie,showSearchResults}=this.props.search;
    return (
      <div className="nav">
        <div className="search-container">
          <input onChange={this.handleChange} />
          <button id="search-btn" onClick={this.handleSearch}>
            Search
          </button>

          {showSearchResults && (
            <div className="search-results">
              <div className="search-result">
                <img src={movie.Poster} alt="search-pic" />

                <div className="movie-info">
                  <span>{movie.Title}</span>
                  <button onClick={() => this.handleAddToMovies(movie)}>
                    Add to Movies
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Navbar;
