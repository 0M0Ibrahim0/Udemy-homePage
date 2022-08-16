let search_box = document.querySelector('.search-text');
let search_button = document.querySelector('.search-button');
let filter_text = localStorage.getItem("filter_text");

const save_local = () => {
  localStorage.setItem('filter_text', filter_text);
  load_courses(filter_text);
};

search_box.addEventListener('input', word => {
  filter_text = word.target.value;
  load_courses(filter_text);
});

search_button.addEventListener('click', save_local);

// function to load courses contain {text} if empty load all courses
function load_courses(text) {
  document.querySelector(".courses-ads").innerHTML = '';
  fetch('../images and logos/courses.json')
    .then((response) => response.json())
    .then((json) => {
      let courses = document.querySelector('.courses-list');
      // update course title
      let sectionTitle = courses.querySelector('.sectionTitle');
      sectionTitle.textContent = json['about'][0]['sectionTitle'];

      // update course Description 
      let courseDesc = courses.querySelector('.words');
      courseDesc.querySelector('.desc').textContent = json['about'][0]['courseDesc'];

      // update course content
      for (const item of json['courses']) {
        const img = item['image'];
        const title = item['title'];
        const author = item['author'];
        const rating = item['rating'];
        const people = item['people'];
        const price = item['price'];
        let course_item =
          `
          <li class="item">
            <a href="#">
              <figure>
                <img src="${img}" alt="Python">
                <figcaption> ${title} </figcaption>
                <figcaption class="author">${author}</figcaption>
                <div>
                  <span class="rating">${rating}</span>
                  <span class="rating">
                  `
                  // algorithm to draw stars
                  let ceil = Math.ceil(rating);
                  let floor = Math.floor(rating);
                  let half_star = ceil-floor;
                  while(floor-- > 0)
                  {
                    course_item += `<i class="fa-solid fa-star"></i>`;
                  }
                  if(half_star == 1)
                    course_item += ` <i class="fa-regular fa-star-half-stroke"></i>`;

                  course_item += `             
                  </span>
                  <span class="rating-numbers">(${people})</span>
                </div>
                <div class="course-price">${price}</div>
              </figure>
            </a>
          </li>
          `
        if (text == '' || title.toLowerCase().includes(filter_text.toLowerCase()))
          document.querySelector(".courses-ads").innerHTML += course_item;
      }
    });
}
load_courses(filter_text);