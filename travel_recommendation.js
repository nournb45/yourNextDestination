// Fetch and display recommendations
async function fetchRecommendations() {
    const response = await fetch('travel_recommendation_api.json');
    const data = await response.json();
    return data;
  }
  
  const searchInput = document.querySelector('.search-box input');
  const searchBtn = document.querySelector('.search-box button[type="submit"]');
  const clearBtn=document.querySelector('.search-box button[type="reset"]');
  
  const resultsDiv = document.createElement('div');
  resultsDiv.id = 'results';
  document.body.appendChild(resultsDiv);
  
  // Task 7 & 8: Search logic
  searchBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const keyword = searchInput.value.trim().toLowerCase();
    const data = await fetchRecommendations();
  
    let results = [];
  
    if (keyword.includes('beach')) results = data.beaches;
    else if (keyword.includes('temple')) results = data.temples;
    else if (keyword.includes('australia')) results = data.countries[0].cities;
    else if (keyword.includes('japan')) results = data.countries[1].cities;
    else if (keyword.includes('brazil')) results = data.countries[2].cities;

  
    displayResults(results);
  });
  
  // Display fetched results
  function displayResults(places) {
    resultsDiv.innerHTML = '';
    if (!places || places.length === 0) {
      resultsDiv.innerHTML = '<p>No results found.</p>';
      return;
    }
    

    
    places.forEach(place => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <img src="${place.imageUrl}" alt="${place.name}">
        <h3>${place.name}</h3>
        <p>${place.description}</p>
      `;
      resultsDiv.appendChild(card);
    });
  }
  
  // Task 9: Clear button logic
  clearBtn.addEventListener('click', () => {
   
    resultsDiv.innerHTML = ' ';
  });