const ExtraFiltersView = function(callBack){
  this.callBack = callBack;
}


ExtraFiltersView.prototype.createExtraFilters = function(minPrice, maxPrice){
  let divHookForExtraFilters  = document.getElementById("container-extra-filters");
  let divBudgetFilter         = this.createBudgetFilter(minPrice, maxPrice);
  divHookForExtraFilters.appendChild(divBudgetFilter);
}


ExtraFiltersView.prototype.createBudgetFilter = function(minPrice, maxPrice){

  // return `<div class="""slidecontainer">
  //         <input type="range" min="1" max="100" value="50" class="slider" id="myRange">
  //         <p>Value: <span id="demo"></span></p>
  //         </div>`;

  let div     = document.createElement('div');
  let input   = document.createElement('input');
  input.type  = "range";
  input.min   = minPrice;
  input.max   = maxPrice;
  input.value = maxPrice;
  input.class = "slider";
  input.id    = "filter-budget";
  input.addEventListener("change", this.callBack);

  let label   = document.createElement("label")
  label.id    = "label-filter-budget";
  label.for   = "filter-budget";

  div.appendChild(label);
  div.appendChild(input);

  return div;
}

ExtraFiltersView.prototype.updateCurrentBudgetLabel = function(){
  document.getElementById("label-filter-budget").innerText = "Price limit : £ " + Math.round(document.getElementById("filter-budget").value);
}


ExtraFiltersView.prototype.getExtraFilterValues = function(){
  let budgetMax = parseFloat(document.getElementById("filter-budget").value);
  return  {budgetMax: budgetMax};
}






module.exports = ExtraFiltersView;
