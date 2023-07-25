// API
 const API_KEY = 'api_key=dcb8566793ee25483cc12bd41b005537';
 const BASE_URL = 'https://api.themoviedb.org/3';
 const API_URL= BASE_URL+ '/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&'+API_KEY;
 const IMG_URL = 'https://image.tmdb.org/t/p/w500';
 const searchURL = BASE_URL + '/search/movie?'+API_KEY;

// GENRE LIST
 const genres = [
        {
        "id": 28,
        "name": "Action"
        },
        {
        "id": 12,
        "name": "Adventure"
        },
        {
        "id": 16,
        "name": "Animation"
        },
        {
        "id": 35,
        "name": "Comedy"
        },
        {
        "id": 80,
        "name": "Crime"
        },
        {
        "id": 99,
        "name": "Documentary"
        },
        {
        "id": 18,
        "name": "Drama"
        },
        {
        "id": 10751,
        "name": "Family"
        },
        {
        "id": 14,
        "name": "Fantasy"
        },
        {
        "id": 36,
        "name": "History"
        },
        {
        "id": 27,
        "name": "Horror"
        },
        {
        "id": 10402,
        "name": "Music"
        },
        {
        "id": 9648,
        "name": "Mystery"
        },
        {
        "id": 10749,
        "name": "Romance"
        },
        {
        "id": 878,
        "name": "Science Fiction"
        },
        {
        "id": 10770,
        "name": "TV Movie"
        },
        {
        "id": 53,
        "name": "Thriller"
        },
        {
        "id": 10752,
        "name": "War"
        },
        {
        "id": 37,
        "name": "Western"
        }
        ]
    

 const main = document.getElementById('main');
 const form =  document.getElementById('form')
 const search =  document.getElementById('search')
 const tagsElement =  document.getElementById('tags')

 let prev = document.getElementById('prev');
 let current = document.getElementById('current');
 let next = document.getElementById('next');


 var currentPage =1;
 var nextPage =2;
 var prevPage =3;
 var lastURL='';
 var totalPage = 100;



let selectedGenre = [];

let setGenre = ()=>{
    // tagsElement.innerHTML = '';
    genres.forEach(genre=>{
        const t = document.createElement('div');
        t.classList.add('tag');
        t.id=genre.id;
        t.innerText = genre.name;
        t.addEventListener('click',()=>{
            if(selectedGenre.length ==0){
                selectedGenre.push(genre.id)
            }
            else{
                if(selectedGenre.includes(genre.id)){
                    selectedGenre.forEach((id,idx)=>{
                        if(id==genre.id){
                            selectedGenre.splice(idx,1);
                        }
                    })
                }
                else{
                    selectedGenre.push(genre.id)
                }
            }
            console.log(selectedGenre)
            getMovies(API_URL+"&with_genres="+encodeURI(selectedGenre.join(',')));
            highLightSelection();

        })
        tagsElement.append(t)
    })
}
setGenre()
            // console.log('--->',setGenre());


let highLightSelection = () =>{
   const tags=  document.querySelectorAll('.tag');
    tags.forEach(tag=>{
        tag.classList.remove('hightlight')
    })
    clearBtn();
    if(selectedGenre.length !==0){
         selectedGenre.forEach(id=>{
         const highLightTag = document.getElementById(id);
         highLightTag.classList.add('hightlight')
         
        })
            // highLightTag.classList.remove('hightlight')
    }
    // else{

    // }
 }
//  highLightSelection();

// clear button

// var clearBtn = () =>{
function clearBtn(){
    let clearBtn =document.getElementById('clear');

    if(clearBtn){
        clearBtn.classList.add('hightlight')
    }
    else{
        let clear =document.createElement('div');

        clear.classList.add('tag','hightlight');
        clear.id = 'clear';
        clear.innerText = 'Clear All';
        clear.addEventListener('click', ()=>{
            console.log("object")
            // clear.classList.add('hightlight')
        // clear.classList.remove('hightlight')


            // selectedGenre= [];
            selectedGenre= [];
            // setGenre();
            // console.log('--->',setGenre());
            getMovies(API_URL);
            


        })
        tagsElement.append(clear);
    }
} 
clearBtn();

let getMovies = (url) =>{
    lastURL = url;

    fetch(url)
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        console.log(data.results);
        if(data.results.length !==0){
        showMovie(data.results);
         currentPage =data.page
         nextPage =currentPage+1;
         prevPage =currentPage-1;
         totalPage=data.total_pages;
        //  movieBooking();

         current.innerText = currentPage;

         if(current<=1){
            prev.classList.add('disabled')
            next.classList.remove('disabled');
         }
         else if (currentPage >= totalPage) {
            prev.classList.remove("disabled");
            next.classList.add("disabled");
          } 
          else {
            prev.classList.remove("disabled");
            next.classList.remove("disabled");
          }
          tagsElement.scrollIntoView({behavior:'smooth'})
        }
        else{
            main.innerHTML=`<h1 class='no-result'>No Results Found</h1>`
            // showMovie(data.results);
        }
    })
    .catch(error=>error)
    
    
}
getMovies(API_URL);

// SHOW MOVIE

let showMovie = (data)=>{
    main.innerHTML = '';
    data.forEach(movie => {
        const { title , poster_path , overview , vote_average , id } = movie;
        
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
            movieElement.innerHTML = `
                                    <img src="${IMG_URL+poster_path}" alt="${title}">
                                    <div class="movie-info">
                                        <h3>${title}</h3>
                                        <span class="${getColor(vote_average)}">${vote_average}</span>
                                    </div>
                                    <div class="overview">
                                        <h3>Overview</h3>
                                        ${overview}
                                        <br>
                                        <button class="know-more" id="${id}">Know More</button>
                                        <button class="book-now" id="book-${id}" onclick="movie_booking()">Book Now</button>
                                   

                                    </div>
                                `
        main.appendChild(movieElement)
        document.getElementById(id).addEventListener('click', ()=>{
            console.log(id)
            openNav(movie)
         
            console.log("object==>", movie)
        })
        // document.getElementById(id).addEventListener('click', ()=>{
        //     console.log(id)
            // openNav(movie)
         
            // console.log("object==>", movie)
        // })
       
      
    });
}

let movie_booking = ()=>{
    // openNav(movie)
    // showMovie(movie)
    alert("under process")

}


const overlayContent = document.getElementById('overlay-content');

/* Open when someone clicks on the span element */
function openNav(movie) {
    let id = movie.id;
    fetch(BASE_URL+'/movie/'+id+'/videos?'+API_KEY)
    .then(res=>res.json())
    .then((data)=>{
        console.log("---->",data)

        if(data){

            document.getElementById("myNav").style.width = "100%";
            if(data.results.length > 0){
                var embed = [];
                data.results.forEach(video => {
                    let {name, key , site} = video;
                    if(site=="YouTube"){

                    embed.push(`
                                    <iframe width="560" height="315" 
                                            src="https://www.youtube.com/embed/${key}" 
                                            title="${name}" class="embed hide" frameborder="0" 
                                            allow="accelerometer; autoplay; clipboard-write; 
                                            encrypted-media; gyroscope; picture-in-picture; 
                                            web-share" allowfullscreen>
                                    </iframe>
                                    
                            `)
                    }
                    
                });
                
        //         // console.log("objectrfjijerf--->",embed)
                overlayContent.innerHTML= embed.join('');
                activeSlide =0;
                showVideo();
            }
            else{
                overlayContent.innerHTML  = `<h1 clss="no-results>No Results Found</h1>`
            }
        }
    })
  }
var activeSlide =0;
var totalVideos=0;
  function showVideo(){
    let emnbetClass =  document.querySelectorAll('.embed');
    totalVideos = emnbetClass.length;
    emnbetClass.forEach((embedTag , inx)=>{
        if(activeSlide==inx){
            embedTag.classList.add('show')
            embedTag.classList.remove('hide')

        }
        else{
            embedTag.classList.add('hide')
            embedTag.classList.remove('show')

        }
    })
  }

  const leftArrow = document.getElementById('left-arrow')
  const rightArrow = document.getElementById('right-arrow')

  leftArrow.addEventListener('click',()=>{
    if(activeSlide > 0){
        activeSlide--;
    }
    else{
        activeSlide = totalVideos-1;

    }
    showVideo()
  })
  rightArrow.addEventListener('click',()=>{
    if(activeSlide < (totalVideos-1)){
        activeSlide++;
    }
    else{
        activeSlide =0;
    }
    showVideo();
  })

  
  /* Close when someone clicks on the "x" symbol inside the overlay */
  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }



let getColor = (vote)=>{
    if(vote>=8){
        return 'green'
    }
    else if(vote>=5){
        return 'orange'
    }
    else{
        return 'red'
    }
}


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    const serachTerms = search.value;
    selectedGenre = [];
    highLightSelection()
    if(serachTerms){
        getMovies(searchURL+'&query='+serachTerms)
    }
    else{
        getMovies(API_URL);
    }
})

next.addEventListener('click', ()=>{
    if(nextPage<=totalPage){
        pageCall(nextPage);
    }
})
prev.addEventListener("click", () => {
    if (prevPage > 0) {
        pageCall(prevPage);
    }
});

function pageCall(page){
    let urlSplit = lastURL.split('?');
    let queryParams = urlSplit[0].split('&');
    let key = queryParams[queryParams.length-1].split('=');
    if(key[0] != 'page'){
        let url = lastURL+ '&page='+page;
        getMovies(url)
    }
    // console.log("object" , page)
    else{
        key[1] = page.toString();
        let a = key.join("=");
        queryParams[queryParams.length - 1] = a;
        let b = queryParams.join("&");
        let url = urlSplit[0] + "?" + b;
        getMovies(url);

    }
}
