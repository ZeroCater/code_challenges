import React, { Component } from 'react';
import MovieRow from './MovieRow';

export default class Results extends Component {
  constructor(props) {
    super();
  }

  render() {
    let rows = [];
    let filteredMovies = [];
    let counter = 0;

    // Get all the movie titles and store them as a key with value 0
    let movieTitles = {};
    this.props.data.forEach(movie => {
      movieTitles[movie.title] = 0;
    });

    // Filter check to see if the a movie matches the current criteria
    this.props.data.forEach(movie => {
      if (movie.genre === this.props.genre) {
        movieTitles[movie.title] += 1;
      }
      if (movie.wonBestPicture === this.props.bestPicture) {
        movieTitles[movie.title] += 1;
      }
      if (movie.title === this.props.searchText) {
        movieTitles[movie.title] += 1;
      }
      if ((Math.floor(movie.year / 10) * 10) === Number(this.props.decade)) {
        movieTitles[movie.title] += 1;
      }
    });


    // Initially all movies in movieTitles have a value of 0 so they all get rendered.
    // After changes are made to the state we push the highest valued keys to the rows array for rendering
    // ===================================================================================================

    //Set the high count value
    for (var key in movieTitles) {
      if (movieTitles[key] > counter) {
        counter = movieTitles[key];
      }
    }

    // Loop thorugh the movieTitles object and push them to a the filteredMovies array
    for (var key in movieTitles) {
      if (movieTitles[key] === counter) {
        filteredMovies.push(key);
      }
    }

    // Loop through the data checking against the filtered movies array and push the movie objects to rows array
    for (var i = 0; i < this.props.data.length; i++) {
      for (var j = 0; j < filteredMovies.length; j++) {
        if (this.props.data[i].title === filteredMovies[j]) {
          rows.push(this.props.data[i]);
        }
      }
    }

    return (
      <table>
        <tbody>
          <tr>
            <th>Movie Title</th>
            <th>Year</th>
            <th>Won Best Picture</th>
            <th>Genre</th>
          </tr>
        </tbody>
        <tbody>{rows.map((movie, i) => <MovieRow key={i} data={movie} />)}</tbody>
      </table>
    );
  }
}
