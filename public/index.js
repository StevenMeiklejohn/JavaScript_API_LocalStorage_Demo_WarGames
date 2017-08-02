var app = function(){
    var url = 'https://restcountries.eu/rest/v2';
    var jsonCountry = localStorage.getItem("country");
    var previousCountry = JSON.parse(jsonCountry);
    console.log(previousCountry.borders);
    setCountryInfo(previousCountry);
    makeRequest(url, requestComplete);
  };

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
};

var requestComplete = function(){
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var countries = JSON.parse(jsonString);
  console.log(countries);
  populateSelect(countries);
};

var populateSelect = function(countries){
  var select = document.getElementById('drop_down');
  countries.forEach(function(item, index){
    item.index = index;
    var option = document.createElement('option');
    option.value = index;
    option.text = item.name;
    select.appendChild(option);
  });
  select.addEventListener('change', function(event){
    var index = this.value;
    var country = countries[index];
    setCountryInfo(country);
  });
}

var setCountryInfo = function(country){
  var pTags = document.querySelectorAll('#info p');
  pTags[1].innerText = country.name;
  pTags[3].innerText = country.population;
  pTags[5].innerText = country.capital;
  borders = country.borders;
  var ul = document.getElementById("borders");
  borders.forEach(function(bc){
    var li = document.createElement('li');
    li.innerText = bc;
    ul.appendChild(li);
  })
  document.getElementById("flag").src=country.flag;
  save(country);
}

var save = function(country){
  var saveCountry = {
    name: country.name,
    population: country.population,
    capital: country.capital,
    borders: country.borders,
    flag: country.flag
  };
  var jsonCountry = JSON.stringify(saveCountry);
  localStorage.setItem("country", jsonCountry);
}

window.addEventListener('load', app);