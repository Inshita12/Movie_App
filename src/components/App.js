import React from "react";
import { data } from "../components/data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import {addMovies, showFavourites} from '../actions'
class App extends React.Component {
  componentDidMount(){
    const{store}=this.props;
    store.subscribe(()=>{
      console.log('UPDATED');
      this.forceUpdate();
    })
    //api call
    //dispatch action
 store.dispatch(addMovies(data))

    console.log('STATE',this.props.store.getState());
  }

  isMovieFavourite=(movie)=>{
    const {movies}=this.props.store.getState()
    const index=movies.favourites.indexOf(movie);

    if(index!==-1){

      //we found the movie
      return true;
    }

    return false;
  }
  onChangeTab=(val)=>{
    this.props.store.dispatch(showFavourites(val))
  }
  render() {
    const {movies,search } =this.props.store.getState();//{movies:[], search:[]}
    const {list,favourites,showFavourites} =movies;
 console.log('RENDER',this.props.store.getState());

 const displayMovies=showFavourites ? favourites:list;
    return (
      <div className="App">
        <Navbar dispatch={this.props.store.dispatch} search={search} />
        <div className="main">
          <div className="tabs">
            <div className={`tab ${showFavourites ? '': 'active-tabs'}`} onClick={()=>this.onChangeTab(false)}>Movies</div>
            <div className={`tab ${showFavourites ? 'active-tabs': ''}`} onClick={()=>this.onChangeTab(true)}>Favourites</div>
          </div>
          <div className="list">
            {console.log("displayMovies", displayMovies)}
            {displayMovies.map(
              (
                movie,
                index //index argument give the index of particukare movie in the data array
              ) => (
                <MovieCard movie={movie} key={"movies-$(index)"} dispatch={this.props.store.dispatch} isFavourite={this.isMovieFavourite(movie)} />
              )
            )}
          </div>
          {displayMovies.length=== 0 ? <div className="no-movies">No movies to display</div>:null}
        </div>
      </div>
    );
  }
}

export default App;
