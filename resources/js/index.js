// let magazines = [
//     "https://flipboard.com/@thenewsdesk/the-latest-on-coronavirus-covid-19-t82no8kmz.rss",
//     "https://flipboard.com/@dfletcher/india-tech-b2meqpd6z.rss",
//     "https://flipboard.com/@thehindu/sportstarlive-rj3ttinvz.rss"
// ];

// const toJSON = "https://api.rss2json.com/v1/api.json?rss_url=";

// const feed = document.getElementById("accordionplaceholder");

// async function init() {
//     magazines.forEach(async (url,index) => {
//       const feedData = await fetchData(toJSON + url);
//       accordionDOM(feedData, index);
//     });
// }

// async function fetchData(url){
//     try{
//         const response = await fetch(url);
//         const data = await response.json();
//         console.log(data);
//         return data;
//     }
//     catch(err){
//         return null;
//     }
// }

// function accordianDOM(feedData,index){
//     const divitem = document.createElement("div");
//     divitem.className = "accordianitem";
//     divitem.innerHTML = `
//     <h2 class="accordion-header" id="heading${index}">
//     <button class="accordion-button ${index === 0 ? "" : "collapsed"}" 
//       type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" 
//       aria-expanded="${index === 0 ? "true" : "false"}" 
//       aria-controls="collapse${index}">
//       ${feedData.feed.title}
//     </button>
//   </h2>
//   <div id="collapse${index}" 
//     class="accordion-collapse collapse ${index === 0 ? "show" : ""}" 
//     aria-labelledby="heading${index}" data-bs-parent="#accordionExample">
//     <div class="accordion-body">
//         <div id="carouselExampleControls${index}" class="carousel slide" data-bs-ride="carousel">
//           <div class="carousel-inner" id="carousel-inner${index}">
//           </div>
//           <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls${index}" data-bs-slide="prev">
//               <span class="carousel-control-prev-icon" aria-hidden="true"></span>
//               <span class="visually-hidden">Previous</span>
//           </button>
//           <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls${index}" data-bs-slide="next">
//               <span class="carousel-control-next-icon" aria-hidden="true"></span>
//               <span class="visually-hidden">Next</span>
//           </button>
//         </div>
//     </div>
//   </div>
//     `;
//     feed.appendChild(divitem);

//     carouselDOM(feedData.items, index);
// }



// init();



let magazines = [
    "https://flipboard.com/@thenewsdesk/the-latest-on-coronavirus-covid-19-t82no8kmz.rss",
    "https://flipboard.com/@dfletcher/india-tech-b2meqpd6z.rss",
    "https://flipboard.com/@thehindu/sportstarlive-rj3ttinvz.rss"
  ];
  //
  const toJSON = "https://api.rss2json.com/v1/api.json?rss_url=";
  const accordionFeed = document.getElementById("accordionExample");
  
  async function init() {
    magazines.forEach(async (rssURL, index) => {
      const feedData = await fetchData(toJSON + rssURL);
      accordionDOM(feedData, index);
    });
  }
  
  async function fetchData(rssURL) {
    try {
      const response = await fetch(rssURL);
      const feeds = await response.json();
      return feeds;
    } catch (error) {
      return null;
    }
  }
  
  function accordionDOM(feedData, index) {
    const accordionItem = document.createElement("div");
    accordionItem.className = "accordion-item";
    accordionItem.innerHTML = `
      <h2 class="accordion-header" id="heading${index}">
        <button class="accordion-button ${index === 0 ? "" : "collapsed"}" 
          type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" 
          aria-expanded="${index === 0 ? "true" : "false"}" 
          aria-controls="collapse${index}">
          ${feedData.feed.title}
        </button>
      </h2>
      <div id="collapse${index}" 
        class="accordion-collapse collapse ${index === 0 ? "show" : ""}" 
        aria-labelledby="heading${index}" data-bs-parent="#accordionExample">
        <div class="accordion-body">
            <div id="carouselExampleControls${index}" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-inner" id="carousel-inner${index}">
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls${index}" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls${index}" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
              </button>
            </div>
        </div>
      </div>
    `;
  
    accordionFeed.appendChild(accordionItem);
  
    carouselDOM(feedData.items, index);
  }
  
  function carouselDOM(items, id) {
    const carouselInner = document.getElementById(`carousel-inner${id}`);
  
    items.forEach((item, key) => {
      let pubDate = new Date(item.pubDate).toLocaleDateString();
      const carouselItem = document.createElement("div");
      carouselItem.className = `carousel-item ${key === 0 ? "active" : ""}`;
      carouselItem.innerHTML = `
        <div class="inner-container">
          <img src="${item.enclosure.link}" class="d-block w-100" alt="${item.title}">
          <div>
          <hr>
            <h3>${item.title}</h3>
            <p class="text-black-50">- ${item.author}  &nbsp;&nbsp;&nbsp; &bull; ${pubDate}</p>
            
            <p>Description: ${item.description}</p>
            <a href="${item.link}">Visit for full article</a>
          </div>
        </div>
      `;
  
      carouselInner.appendChild(carouselItem);
    });
  }
  
  init();