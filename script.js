///Global variables
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjY5MTJkNTI2MjAwMTViNmRjOTciLCJpYXQiOjE2MjkzODAyNjYsImV4cCI6MTYzMDU4OTg2Nn0.UxeebZD64XATR_FQ4U4ISpUcZYFec-3wli83C703UqA"
const apiUrl = "https://striveschool-api.herokuapp.com/api/movies/"
const categories = []
const movies = {}
///API Functions
const getCategories = async () => {
    try {
    apiResponse = await fetch(apiUrl,{
        method:"GET",
        headers:{
            "Authorization": `Bearer ${apiKey}` 
          }
    })
    if (apiResponse.status === 200){
        let result = await apiResponse.json()
        result.forEach(category => {categories.push(category)
        });
    }
    else if(apiResponse.status > 400 && apiResponse.status < 500){
        throw new Error ("Client Side Error")
    }   
    else if(apiResponse.status > 500){
        throw new Error ("Server Side Error")
    }   
    }
    catch(err){
        console.error(err)
    }    
}

const getMovies = async (category) => {
    movies[category] = []
    try {
    apiResponse = await fetch(apiUrl+category,{
        method:"GET",
        headers:{
            "Authorization": `Bearer ${apiKey}` 
          }
    })
    if (apiResponse.status === 200){
        let result = await apiResponse.json()
        result.forEach(movie => movies[category].push(movie))
        }
        else if(apiResponse.status > 400 && apiResponse.status < 500){
            throw new Error ("Client Side Error")
        }   
        else if(apiResponse.status > 500){
            throw new Error ("Server Side Error")
        }   
    }
    catch(err){
        console.error(err)
    }    
}

const newMovie = async (event) => {
    event.preventDefault()
    let newMovieData = {
        name:document.getElementById('movieTitle').value,
        description:document.getElementById('movieDescription').value,
        category:document.getElementById('movieCategory').value.toLowerCase(),
        imageUrl:document.getElementById('movieImageUrl').value
    }
    try {
    apiResponse = await fetch(apiUrl,{
        method:"POST",
        body:JSON.stringify(newMovieData),
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}` 
          }
    })
    console.log(apiResponse)
    if (apiResponse.status === 200){
        let result = await apiResponse.json()
        console.log(result)
        }
        else if(apiResponse.status > 400 && apiResponse.status < 500){
            throw new Error ("Client Side Error")
        }   
        else if(apiResponse.status > 500){
            throw new Error ("Server Side Error")
        }   
    }
    catch(err){
        console.error(err)
    }    
}

const editMovie = async (data) => {
    try {
    apiResponse = await fetch(apiUrl+category,{
        method:"POST",
        body:JSON.stringify(newMovieData),
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}` 
          }
    })
    console.log(apiResponse)
    if (apiResponse.status === 200){
        let result = await apiResponse.json()
        console.log(result)
        }
        else if(apiResponse.status > 400 && apiResponse.status < 500){
            throw new Error ("Client Side Error")
        }   
        else if(apiResponse.status > 500){
            throw new Error ("Server Side Error")
        }   
    }
    catch(err){
        console.error(err)
    }    
}

const deleteMovie = async (query) => {
    try {
    apiResponse = await fetch(apiUrl+query,{
        method:"DELETE",
        headers:{
            "Authorization": `Bearer ${apiKey}` 
          }
    })
    console.log(apiResponse)
    if (apiResponse.status === 200){
        let result = await apiResponse.json()
        console.log(result)
        }
        else if(apiResponse.status > 400 && apiResponse.status < 500){
            throw new Error ("Client Side Error")
        }   
        else if(apiResponse.status > 500){
            throw new Error ("Server Side Error")
        }   
    }
    catch(err){
        console.error(err)
    }    
}
/// Local Functions
const displayAlert = (text, seconds) => {
    
}

const prepareMovies = async() => {
   for(category of categories){
       await getMovies(category)
   }
}
const makeLists = async () => {
    await getCategories()
    await prepareMovies()
    displayCategoriesOffice()
    console.log(movies)
}
const displayCategoriesOffice = () => {
    let categorySelectors = document.getElementById('pills-tab')
    let categoryLists = document.getElementById('pills-tabContent')
    for (category of categories){
        categorySelectors.innerHTML += `<li class="dropdown-item">
        <a
          class="nav-link"
          id="pills-${category}-tab"
          data-toggle="pill"
          href="#pills-${category}"
          role="tab"
          aria-controls="pills-${category}"
          aria-selected="true"
          >${category.toUpperCase()}</a
        >
      </li>`
      categoryLists.innerHTML += `<div
      class="tab-pane fade"
      id="pills-${category}"
      role="tabpanel"
      aria-labelledby="pills-${category}-tab"
    >
      <div class="row">
        <h3>${category.toUpperCase()}</h3>
        <table class="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Title</th>
              <th scope="col">Category</th>
              <th scope="col">View Details</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody id="${category + "Table"}">
          </tbody>
        </table>
      </div>
    </div>`
    }
    for (movie in movies){
        for (let i = 0; i<movies[movie].length;i++){
    let tableOfCategory = document.getElementById(`${movies[movie][i].category+"Table"}`)
    tableOfCategory.innerHTML += `
    <tr>
      <th scope="row">${movies[movie][i]._id}</th>
      <td>${movies[movie][i].name}</td>
      <td>${movies[movie][i].category}</td>
      <td><a href="detailspage?${movies[movie][i]._id}"><button class="btn btn-success">View Details</button></a></td>
      <td><button id="${movies[movie][i]._id}" class="btn btn-danger" onclick="deleteMovie(this.id)">Delete</button></td>
    </tr>`
    }
    }
    }

const displayMovies = (data) => {


}

/// Window onload

window.onload = () =>{
    makeLists()
}