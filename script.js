// MY API key:c0710ab9
// example :http://www.omdbapi.com/?i=tt3896198&apikey=c0710ab9
const key='c0710ab9';

let searchInput=document.getElementById('input');
let displaySearchList=document.getElementsByClassName('fav_container');


// on keypress a list of movie should be visible
// adding an event listener

searchInput.addEventListener('input',findMovie);

//findMovie is the function to find a movie
//lets build this function first
async function findMovie(){
    //this is the url structure for running search query
    const url=`https://www.omdbapi.com/?s=${(searchInput.value).trim()}&page=1&apikey=${key}`;
    const res=await fetch(`${url}`);
    const data=await res.json();
       //checks if .Search property exists for data in API
       //Then calls displayMovieList function
       if(data.Search){
        displayMovieList(data.Search);
       }
}
// Now lets build displayMovieList function
//display the movie list on the search
async function displayMovieList(movies){
    let output='';
    //traversing over list of movies
    for(i of movies){
        var img='';
        if(i.Poster !='N/A'){
            img=i.Poster
        }
         else{
            img='Movie clone\img\default movie poster.png';

         }
         let id=i.imdbID;
         // appending the output using string interpolitian
         // using class fav-item as it will be common in both pages
         output+=`

         <div class="fav-item">
         <div class="fav-poster">
             <a href="movie.html?id=${id}"><img src=${img} alt="Movie-poster"></a>
         </div>
         <div class="fav-details">
             <div class="details-box">
                 <div>
                     <p class="movie-name"><a href="movie.html?id=${id}">${i.Title}</a></p>
                     <p class="movie-year">${i.Year}</p>
                 </div>
                 <div>
                     <i class="fa-solid fa-bookmark" onClick=addToFavorites('${id}') style="cursor:pointer;" ></i>
                 </div>
             </div>
         </div>
     </div>
     `}
     //We will define addToFavourites later

    //lets append this output to movie-display class 

    document.querySelector('.fav_container').innerHTML=output;
    console.log("the movie list:", movies);
}

        //lets build singleMovie function first for movie.html

        async function singleMovie(){
            //finding ID of the movie from the url
            let param=new URLSearchParams(window.location.search);
            let id=param.get('id');
            console.log(id);

            const url=`https://www.omdbapi.com/?i=${id}&apikey=${key}`
            const res=await fetch(`${url}`);
            const data=await res.json();

          //making the output html by string interpolition

            let output=`
            <div class="movie-poster">
            <img src=${data.Poster} alt="movie-poster">
        </div>
        <div class="movie-details">
            <div class="details-header">
                <div class="left-side">
                    <h2>${data.Title}</h2>
                </div>
                <div class="right-side">
                <i class="fa-solid fa-bookmark" onClick=addToFavorites('${id}') style="cursor: pointer;"></i>
                </div>
                </div>
                <span class="movie-text"><i>${data.Year} &#x2022; ${data.Country} &#x2022; Rating - <span
                    style="font-size: 20px; font-weight: 500;">${data.imdbRating}</span> </i></span>
                    <ul class="details-ul">
            <li><strong>Actors: </strong>${data.Actors}</li>
            <li><strong>Director: </strong>${data.Director}</li>
            <li><strong>Writers: </strong>${data.Writer}</li>
        </ul>
        <ul class="details-ul">
            <li><strong>Genre: </strong>${data.Genre}</li>
            <li><strong>Release Date: </strong>${data.DVD}</li>
            <li><strong>Box Office: </strong>${data.BoxOffice}</li>
            <li><strong>Movie Runtime: </strong>${data.Runtime}</li>
        </ul>
        <p style="font-size: 14px; ">${data.Plot}</p>
        <p style="font-size: 15px; font-style: italic;">
            <i class="fa-solid fa-award"></i>
            &thinsp; ${data.Awards}
        </p>
    </div> `
    //Appending the output
       document.querySelector('.movie_container').innerHTML=output;
        }   
        // function to add movies in watchlist
                   async function addToFavorites(id){
                    //for storing at random place in localstoragre
                    localStorage.setItem(Math.random().toString(36).slice(2,7),id);
                    alert('Movie added Successfully');
                   }

                   //function to remove movies from watchlist
                   async function removeFromFavorites(id){
                    for(i in localStorage){
                        if(localStorage[i]==id){
                            localStorage.removeItem(i);
                            break;
                        }
                    }
                          alert('Movie removed from the watchlist');
                          window.location.replace('favorite.html');
                   }
                   //function for loading favorite.html
                   async function favMovieLoader(){
                    let output='';
                    for(i in localStorage){
                        let sId=localStorage.getItem(i);
                        if(sId!=null){
                            const url=`https://www.omdbapi.com/?i=${sId}&plot=full&apikey=${key}`
                            const res=await fetch(`${url}`);
                            const data=await res.json();

                            let img='';
                            if(data.Poster){
                                img=data.Poster;
                            }
                            else {
                                img=data.Title;
                            }
                            let id=data.imdbID;
                            output+=`

                            <div class="fav_item">
            <div class="fav_poster">
                <a href="movie.html?id=${id}"><img src=${img} alt="Favourites Poster"></a>
            </div>
            <div class="fav_details">
                <div class="fav-details-box">
                    <div>
                        <p class="fav-movie-name">${data.Title}</p>
                        <p class="fav-movie-year">${data.Year} &middot; <span
                                style="font-size: 15px; font-weight: 600;">${data.imdbRating}</span></p>
                    </div>
                    <div class="dust">
                        <i class="fa-solid fa-trash" style="cursor:pointer;" onClick=removeFromFavorites('${sId}')></i>
                    </div>
                </div>
            </div>
        </div>

       `
                        }
                    }
                    // appending the html to favorites pages
                    document.querySelector('.fav-container').innerHTML=output;

                   }



            
    
