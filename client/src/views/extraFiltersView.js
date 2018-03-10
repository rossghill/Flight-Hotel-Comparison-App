const ExtraFiltersView = function(callBack){
  this.callBack = callBack;
}

ExtraFiltersView.prototype.createBudgetFilter = function(minPrice, maxPrice){

  let div     = document.createElement('div');
  div.className = "flex-column";

  let input   = document.createElement('input');
  input.type  = "range";
  input.min   = Math.floor(minPrice);
  input.max   = Math.floor(maxPrice);
  input.value = Math.floor(maxPrice);
  input.classList.add("input-150");
  input.id    = "filter-budget";
  input.addEventListener("change", this.callBack);

  let label   = document.createElement("label")
  label.id    = "label-filter-budget";
  label.for   = "filter-budget";

  div.appendChild(label);
  div.appendChild(input);
  return div;
}

ExtraFiltersView.prototype.createHotelNameFilter = function(){
  let div               = document.createElement('div');
  div.className         = "flex-column";

  let label             = document.createElement("label")
  label.for             = "filter-hotelName";
  label.innerText       = "Hotel name"
  div.appendChild(label);

  let input             = document.createElement('input');
  input.type            = "text";
  input.classList.add("input-150");
  input.id              = "filter-hotelName";
  input.addEventListener("input", this.callBack);
  div.appendChild(input);

  return div;
}

ExtraFiltersView.prototype.createStarRatingFilter = function()
{
  let mainDiv            = document.createElement('div');
  mainDiv.className      = "flex-column";

  for(let starsCounter = 4; starsCounter >= 0; starsCounter--)
  {

    let div       = document.createElement("div");
    div.classList.add("flex-row-flex-center");

    let checkbox  = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id   = `filter-star-rating-${starsCounter}`;
    checkbox.classList.add("checkbox-star-rating");
    checkbox.addEventListener("click", this.callBack);
    div.appendChild(checkbox);

    for(let starImageCounter = 0 ; starImageCounter < starsCounter; starImageCounter++)
    {
      let image       = document.createElement("img");
      image.className = "star-image";
      image.src       = "./images/star.png";
      div.appendChild(image);
    }

    mainDiv.appendChild(div);
  };

  return mainDiv;
}

ExtraFiltersView.prototype.createSortings = function()
{
  let div             = document.createElement("div");
  div.classList.add("div-sorting-packages");
  let select          = document.createElement("select");
  select.id           = "select-sorting-packages";
  select.addEventListener("change", this.callBack);
  div.appendChild(select);

  let sortingOptions  = [ {value: "price-asc",         label: "Price - > +"},
                          {value: "price-desc",        label: "Price + > -"},
                          {value: "startRating-desc",  label: "Rating + > -"},
                          {value: "startRating-asc",   label: "Rating - > +"}];

  sortingOptions.forEach(function(sorting){
    let option        = document.createElement("option");
    option.value      = sorting.value;
    option.innerText  = sorting.label;
    select.appendChild(option);
  });

  return div;
}

ExtraFiltersView.prototype.createExtraFilters = function(minPrice, maxPrice)
{
  let divHookForExtraFilters    = document.getElementById("container-extra-filters");
  divHookForExtraFilters.innerHTML = "";

  let createSortings            = this.createSortings();
  divHookForExtraFilters.appendChild(createSortings);

  let divBudgetFilter           = this.createBudgetFilter(minPrice, maxPrice);
  divHookForExtraFilters.appendChild(divBudgetFilter);

  let divHotelNameFilter        = this.createHotelNameFilter();
  divHookForExtraFilters.appendChild(divHotelNameFilter);

  let divHotelStarRatingFilter  = this.createStarRatingFilter();
  divHookForExtraFilters.appendChild(divHotelStarRatingFilter);
}

ExtraFiltersView.prototype.updateCurrentBudgetLabel = function()
{
  document.getElementById("label-filter-budget").innerText = "Budget £ " + Math.round(document.getElementById("filter-budget").value);
}


ExtraFiltersView.prototype.getExtraFilterValues = function(){
  let budgetMax    = parseFloat(document.getElementById("filter-budget").value);
  let hotelName    = document.getElementById("filter-hotelName").value;
  let startRating4 = document.getElementById("filter-star-rating-4").checked;
  let startRating3 = document.getElementById("filter-star-rating-3").checked;
  let startRating2 = document.getElementById("filter-star-rating-2").checked;
  let startRating1 = document.getElementById("filter-star-rating-1").checked;
  let startRating0 = document.getElementById("filter-star-rating-0").checked;
  let sorting      = document.getElementById("select-sorting-packages").value;
  return  { budgetMax: budgetMax, hotelName: hotelName,
            starRating: [{"checked": startRating4, "value": 4},
                         {"checked": startRating3, "value": 3},
                         {"checked": startRating2, "value": 2},
                         {"checked": startRating1, "value": 1},
                         {"checked": startRating0, "value": 0}],
            sortTravelPackage:sorting
          };
}






module.exports = ExtraFiltersView;
