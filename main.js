let currentLanguage = "en";
function changeLanguage(event){
  currentLanguage = event.currentTarget.id;
  displayContents();
}

create = (type, attributes) => {
  const item = document.createElement(type);
  if(attributes){
    for(let attribute of Object.keys(attributes)){
      item[attribute] = attributes[attribute];
    }
  }
  return item;
}

createChild = (parent, type, attributes) =>{
  const item = create(type, attributes);
  parent.appendChild(item);
  return item;
}

const body = document.body;
const container = createChild(body, "div", {className : "container"});
const languageRow = createChild(container, "div", {className : "language-row"});
const contentRow = createChild(container, "div", {className : "row content-row"});
const mainHeadingCol = createChild(contentRow, "div", {className : "col-12 jumbotron"});
const pageHeadingText = createChild(mainHeadingCol, "h1", {innerText : "Website Name"});
const articleCol = createChild(contentRow, "div", {className : "col-12", id : "phrase-article"});
const articleContents = createChild(articleCol, "row", {className : "col-12"});


let globalData;
const dataURL = 'https://raw.githubusercontent.com/LiamOsler/sample-json/main/data_multilingual_website.json';
 
fetchData = async (URL) =>{
  const response = fetch(URL);
  const data = await response;
  return data.json();
}

fetchData(dataURL).then(data => {
  globalData = data;
  for(let key of Object.keys(data.languages)){
    const flag = createChild(languageRow, "img", {id : key, src : data.languages[key].flag, className : "language-icon"})
    flag.addEventListener("click", changeLanguage, 0);
  }
  displayContents();
});

displayContents = () => {
  pageHeadingText.innerText = globalData.title[currentLanguage]
  articleContents.innerText = globalData.description[currentLanguage]
}
