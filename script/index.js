const allNews = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
    const data = await res.json();
    navigateNews(data.data.news_category)
}

allNews();
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
function categoryWiseNews(categoryID) {
    fetch(`https://openapi.programming-hero.com/api/news/category/${categoryID}`)
        .then(res => res.json())
    .then(data => displaycategoryWiseNews(data.data))
    
    
}
const displaycategoryWiseNews = (singleNewsCategory) => {
    const newsCategoryContainer = document.getElementById('news-category-container');
    newsCategoryContainer.textContent = '';
    for (const news of singleNewsCategory) {
        console.log(news)
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
        <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${news.title}</h5>
              <p class="card-text">${news.details}</p>
              <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
          </div>
        </div>
      </div>  
        `;
        newsCategoryContainer.appendChild(newsDiv);
    }
    
}