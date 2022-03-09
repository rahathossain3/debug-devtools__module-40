document.getElementById('error-message').style.display = 'none';
const searchFood = () => {
    const searchField = document.getElementById('search-field');    //get input data
    const searchText = searchField.value;
    // console.log(searchText);
    //clear data
    searchField.value = '';     //-------clear input field

    //error hendling
    document.getElementById('error-message').style.display = 'none';

    //if else own work-------------
    const emptyField = document.getElementById('ownWork');
    if (searchText == '') {
        const emptyFieldGet = emptyField;
        const div = document.createElement('div');
        div.innerHTML = `
        <h1 class="text-center mt-4 pt-3"> Please write  something To display </h1>
        `;
        emptyField.appendChild(div);
    }
    else {
        emptyField.textContent = '';
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        //load data
        // console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.meals))  //call display function
            //error hendling
            .catch(error => displayError(error))
    }
}

//error hendling
const displayError = error => {
    document.getElementById('error-message').style.display = 'block';

}


const displaySearchResult = meals => {
    const searchResult = document.getElementById('search-result');      // ger parent node
    console.log(meals);
    searchResult.innerHTML = '';
    // searchResult.textContent = '';
    //if else own work----------------
    const emptyField = document.getElementById('ownWork');
    if (meals == null) {
        const div = document.createElement('div');
        div.classList.add('text-center')
        div.innerHTML = `
        <h1 class="text-center mt-4 pt-3">No result Found</h1>
        `;
        emptyField.appendChild(div);
    }
    else {
        emptyField.innerHTML = '';
        //start function and get single elemtnt of meals
        meals.forEach(meal => {
            // console.log(meal);
            const div = document.createElement('div');              //careat chald node
            div.classList.add('col');                    //add class in create element  & add a onclick function
            div.innerHTML = `
                <div onclick= "loadMealDetail(${meal.idMeal})" class="card h-100">
                     <img src=" ${meal.strMealThumb}" class="card-img-top" alt="...">
                  <div class="card-body">
                     <h5 class="card-title">${meal.strMeal}</h5>
                     <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
                  </div>
                </div>
                `;
            searchResult.appendChild(div);          //append chield         in      parent NOde
        });

    }


}
// for onclick dynamic
const loadMealDetail = mealId => {
    // console.log(mealId);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetail(data.meals[0]))
}

const displayMealDetail = meal => {
    console.log(meal);
    const mealDetail = document.getElementById('meal-details');
    mealDetail.textContent = '';
    const div = document.createElement('div')
    div.classList.add('card');
    div.innerHTML = `
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text"> ${meal.strInstructions.slice(0, 150)}</p>
                <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
            </div>
    `;
    mealDetail.appendChild(div);
}