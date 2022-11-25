function createPageBtn(page, classes = []) {
  let btn = document.createElement("button");
  classes.push("btn");
  for (cls of classes) {
    btn.classList.add(cls);
  }
  btn.dataset.page = page;
  btn.innerHTML = page;
  return btn;
}

function renderPaginationElement(info) {
  let btn;
  let paginationContainer = document.querySelector(".pagination");
  paginationContainer.innerHTML = "";

  btn = createPageBtn(1, ["first-page-btn"]);
  btn.innerHTML = "Первая страница";
  if (info.current_page == 1) {
    btn.style.visibility = "hidden";
  }
  paginationContainer.append(btn);

  let buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("pages-btns");
  paginationContainer.append(buttonsContainer);

  let start = Math.max(info.current_page - 2, 1);
  let end = Math.min(info.current_page + 2, info.total_pages);
  for (let i = start; i <= end; i++) {
    buttonsContainer.append(
      createPageBtn(i, i == info.current_page ? ["active"] : [])
    );
  }

  btn = createPageBtn(info.total_pages, ["last-page-btn"]);
  btn.innerHTML = "Последняя страница";
  if (info.current_page == info.total_pages) {
    btn.style.visibility = "hidden";
  }
  paginationContainer.append(btn);
}

function perPageBtnHandler(event) {
  downloadData(1);
}

function setPaginationInfo(info) {
  document.querySelector(".total-count").innerHTML = info.total_count;
  let start =
    info.total_count > 0 ? (info.current_page - 1) * info.per_page + 1 : 0;
  document.querySelector(".current-interval-start").innerHTML = start;
  let end = Math.min(info.total_count, start + info.per_page - 1);
  document.querySelector(".current-interval-end").innerHTML = end;
}

function pageBtnHandler(event) {
  if (event.target.dataset.page) {
    downloadData(event.target.dataset.page);
    window.scrollTo(0, 0);
  }
}

function createAuthorElement(record) {
  let user = record.user || { name: { first: "", last: "" } };
  let authorElement = document.createElement("div");
  authorElement.classList.add("author-name");
  authorElement.innerHTML = user.name.first + " " + user.name.last;
  return authorElement;
}

function createUpvotesElement(record) {
  let upvotesElement = document.createElement("div");
  upvotesElement.classList.add("upvotes");
  upvotesElement.innerHTML = record.upvotes;
  return upvotesElement;
}

function createFooterElement(record) {
  let footerElement = document.createElement("div");
  footerElement.classList.add("item-footer");
  footerElement.append(createAuthorElement(record));
  footerElement.append(createUpvotesElement(record));
  return footerElement;
}

function createContentElement(record) {
  let contentElement = document.createElement("div");
  contentElement.classList.add("item-content");
  contentElement.innerHTML = record.text;
  return contentElement;
}

function createListItemElement(record) {
  let itemElement = document.createElement("div");
  itemElement.classList.add("facts-list-item");
  itemElement.append(createContentElement(record));
  itemElement.append(createFooterElement(record));
  return itemElement; 
}

function renderRecords(records) {
  let factsList = document.querySelector(".facts-list");
  factsList.innerHTML = "";
  for (let i = 0; i < records.length; i++) {
    factsList.append(createListItemElement(records[i]));
  }
}



// -- Функция для нахождения совпадений в строке
function searchIntersections() {
  let searchField = document.querySelector(".search-field"); // -- Нашли поле с текстом
  let value = searchField.value; // значение внутри поля

  if (value == "") {
    // когда в поле запроса пустое значение - мы скрываем выпадающий список
    intersectionsList.classList.add("hidden");
  }

  let url = new URL(
    "http://cat-facts-api.std-900.ist.mospolytech.ru/autocomplete"
  );
  url.searchParams.append("q", value); // добавляем парметр q с текстовым значением, чтоб находили слова с нужными буквы

  let xhr = new XMLHttpRequest(); //запрос к серверу
  xhr.open("GET", url); // получаем данные с сервера
  xhr.responseType = "json";

  // создаем список и вешаем на каждый из элементов eventListener чтоб реагировал на нажатие
  xhr.onload = function () {
    const data = this.response; //ответ сервера
    intersectionsList.innerHTML = ""; //список в html

    //наполняем список в этом цикле
    for (let i = 0; i < data.length; i++) {
      if (value != "") {
        let itemElement = document.createElement("li");
        itemElement.classList.add("intersections__item");
        itemElement.innerHTML = data[i]; //для заполнения внутреннего элемента текстом
        intersectionsList.append(itemElement); //добавляем в конец
      }
    }
    if (intersectionsList.childElementCount > 0) {
      intersectionsList.classList.remove("hidden");
    } else {
      intersectionsList.classList.add("hidden");
    }

    let searchItems = document.querySelectorAll(".intersections__item"); //обращаеимся к элементам выпадающего списка
    searchItems.forEach((item) => {
      //проходимся по всем элементам выпадающего списка
      item.addEventListener("click", (event) => {
        //добавляем реагирование не клик
        let textContent = event.target.textContent; //получаем значения слова на которое мы нажали
        // downloadData(1, textContent); //делаем запрос на сервер, чтоб выводил посты с нужным нам словом
        searchField.value = textContent; //напоняем поисковую строку текстом нашего слова
        intersectionsList.classList.add("hidden");
      });
    });
  };

  xhr.send();
}

//фукнция нам нужна чтоб вывести посты
function downloadData(page=1, autocompleteValue) {
  let factsList = document.querySelector(".facts-list");
  let searchField = document.querySelector(".search-field"); // -- Нашли поле с текстом
  let value = searchField.value.trim(); // -- Взяли значение из поля и удалили все лишние пробелы
  let perPage = document.querySelector(".per-page-btn").value;
  //если значения поиска пустое, чтоб не появлялся выпадающий список
  intersectionsList.classList.add("hidden");
  
  let url = new URL(factsList.dataset.url);
  url.searchParams.append("page", page);
  url.searchParams.append("per-page", perPage);
  // url.searchParams.append("q", autocompleteValue ? autocompleteValue : value); // -- Добавили в запрос ключ 'q' и туда передали значение из поля поисковика

  let xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.responseType = "json";
  xhr.onload = function () {

    console.log(this.response);
    let res = [];
    for (var i=0; i<this.response.records.length; i++) {
      if (this.response.records[i]['text'].includes(value)) {
        res.push(this.response.records[i]);
      }
    }

    renderRecords(res);
    setPaginationInfo(this.response["_pagination"]);
    renderPaginationElement(this.response["_pagination"]);
  };
  xhr.send();

}


var intersectionsList = document.querySelector(".intersections"); // -- Нашли список с элементами совпадения

// старт программы
window.onload = function () {
  downloadData();
  document.querySelector("#search-f-id").onkeyup = searchIntersections;
  document.querySelector(".pagination").onclick = pageBtnHandler;
  document.querySelector(".per-page-btn").onchange = perPageBtnHandler;
  document.querySelector(".search-btn").onclick = downloadData; // -- Добавили обработку по кнопке "Найти"
};