// The news api loaded

const allNews = async () => {
  try {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
    const data = await res.json();
    navigateNews(data.data.news_category)
  }

  catch (error) {
    document.write("Cann't get the url: ", error);
  }

}

allNews();

// News Categories Navigation Bar

function navigateNews(allNewsCategories) {
  const newsNavigation = document.getElementById('news-navigation');

  for (const key in allNewsCategories) {
    const newsNavigationLi = document.createElement('li');
    newsNavigationLi.classList.add('d-inline');
    newsNavigationLi.classList.add();
    if (Object.hasOwnProperty.call(allNewsCategories, key)) {
      const element = allNewsCategories[key];
      newsNavigationLi.innerHTML = `
                <button class="btn btn-outline-info" onclick="categoryWiseNews('${element.category_id}')">${element.category_name}</button>
            `;

      newsNavigation.appendChild(newsNavigationLi);


    }


  }
}
//loaded category wise news 
function categoryWiseNews(categoryID) {
  toggleSpinner(true);

  fetch(`https://openapi.programming-hero.com/api/news/category/${categoryID}`)
    .then(res => res.json())
    .then(data => displaycategoryWiseNews(data.data))
    .catch(error => document.write("Cann't get the url: ", error));


}

// loaded detailed news for modal
const loadDetailedNews = (newsId) => {

  fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
    .then(res => res.json())
    .then(data => displayDetailedNews(data.data[0]))
    .catch(error => document.write("Cann't get the url: ", error));
}

// in modal, display detailed news
const displayDetailedNews = (detailNews) => {
  const modalTitle = document.getElementById('staticBackdropLabel');
  modalTitle.innerText = `${detailNews.title}`;
  const detailNewsBody = document.getElementById("detail-news-body");
  detailNewsBody.innerHTML = `
  <img src="${detailNews.image_url}" class="img-fluid rounded-start" alt="...">
  <p>${detailNews.details}</p>
  <div class="row justify-content-center align-items-center">
                  <div class="col-4">
                  <p> <img src="${detailNews.author.img}" class="w-25 rounded-5 img-fluid" alt=""> Author: ${detailNews.author.name ? detailNews.author.name : 'Unavailable'}</p>
                    <p>Published: ${detailNews.author.published_date ? detailNews.author.published_date : 'Unavailable'}</p>
                  </div>
                  <div class="col-4">
                  <p> ${detailNews.total_view ? '<i class="fa fa-eye"></i> ' + detailNews.total_view : '<i class="fa fa-eye-slash"></i> No views'}</p>
                  </div>
                  <div class="col-4">
                    <p>Ratings: ${detailNews.rating.number ? detailNews.rating.number : 'Unavailable'}</p>
                  </div>
              </div>
          `;
}

// category wise news display in UI
const displaycategoryWiseNews = (singleNewsCategory) => {

  singleNewsCategory.sort((a, b) => {
    return b.total_view - a.total_view;
  });

  const newsCategoryContainer = document.getElementById('news-category-container');
  const singleNewsCategoryCounter = document.getElementById('news-counter');
  singleNewsCategoryCounter.innerHTML = `
  <p>${singleNewsCategory.length} items are found.
  
  </p>
  `;
  newsCategoryContainer.textContent = '';
  const noNewsMessage = document.getElementById('no-news-message');

  if (singleNewsCategory.length === 0) {
    noNewsMessage.classList.remove('d-none');
  }
  else {
    noNewsMessage.classList.add('d-none');
  }

  singleNewsCategory.forEach(news => {


    const newsDiv = document.createElement('div');


    newsDiv.innerHTML = `
        <div class="card mb-3 shadow p-3 mb-5 bg-body rounded">
        <div class="row g-0">
          <div class="col-md-3 col-12">
            <img src="${news.thumbnail_url}" class="img-fluid  w-100 rounded-start" alt="...">
          </div>
          <div class="col-md-9 col-12">
            <div class="card-body">
              <h5 class="card-title">${news.title}</h5>
              <p class="card-text news-details p-2">${news.details}</p>
              <div class="card-text row justify-content-center align-items-center">
                  <div class="col-6 col-md-3">
               
                  <p> <img src="${news.author.img}" class="w-25 rounded-5 img-fluid" alt=""> Author: ${news.author.name ? news.author.name : 'Unavailable'}</p>
                  </div>
                  <div class="col-6 col-md-3">
                    <p> ${news.total_view ? '<i class="fa fa-eye"></i> ' + news.total_view : '<i class="fa fa-eye-slash"></i> No views'}</p>
                  </div>
                  <div class="col-6 col-md-3">
                    <p>Ratings: ${news.rating.number ? news.rating.number : 'Unavailable'}</p>
                  </div>
                  <div class="col-6 col-md-3">
                    <button onclick="loadDetailedNews('${news._id}')" class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Continue...<i class="fa fa-circle-right"></i></button>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
        `;
    newsCategoryContainer.appendChild(newsDiv);
  });


  toggleSpinner(false);

}

// spinner function
function toggleSpinner(isSpinning) {
  const spinning = document.getElementById('spinner');
  if (isSpinning) {
    spinning.classList.remove('d-none');
  }
  else {
    spinning.classList.add('d-none');
  }
}