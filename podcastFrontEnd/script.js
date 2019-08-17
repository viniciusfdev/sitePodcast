//const CLIENT_ID = {CLIENT_ID};
//const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];
const API_KEY = 'AIzaSyAONVephJiOij7ryDiKQ-_RZ6p6Wvi4sLQ';
const PL_PODCAST = 'PLmSkFzJxyNCIpVdhtdl5WBxnca7xwg3rM';
const PL_REVIEW = 'PLmSkFzJxyNCIiLqEzh4DFMtMxIZW6MZ5w';
const PL_GAMEPLAY = 'PLmSkFzJxyNCJdVQ4mZ_sz7O6dFnHCYGz8';

var pl_podcastR;
var pl_reviewR;
var pl_gameplayR;

function start() {
  console.log('loading');
  gapi.client.init({
    apiKey: 'AIzaSyAONVephJiOij7ryDiKQ-_RZ6p6Wvi4sLQ',
    discoveryDocs:DISCOVERY_DOCS
    //clientId: CLIENT_ID,
    //scope: SCOPES
  }).then(function(){

    console.log('inicializado req 1');
    return gapi.client.youtube.playlistItems.list({
      playlistId: PL_PODCAST,
      part: 'snippet',
      maxResults: 50 
    });

  }).then(function(response){
    console.log(response.result.items);
    response.result.items = Array.prototype.reverse.call(response.result.items);
    pl_podcastR = response.result;
    console.log('sucessifuly req 1:podcast');

  }, function(reason){
      console.log('error'+reason);

  }).then(function(){
    console.log('inicializado req 2');

    return gapi.client.youtube.playlistItems.list({
      playlistId: PL_REVIEW,
      part: 'snippet',
      maxResults: 50 
    });

    }).then(function(response){
      response.result.items = Array.prototype.reverse.call(response.result.items);
      pl_reviewR = response.result;
      console.log('sucessifuly req 2:review');

    }, function(reason){
        console.log('error'+reason);

    }).then(function(){
      console.log('inicializado req 3');

      return gapi.client.youtube.playlistItems.list({
        playlistId: PL_GAMEPLAY,
        part: 'snippet',
        maxResults: 50 
      });

    }).then(function(response){
      response.result.items = Array.prototype.reverse.call(response.result.items);
      pl_gameplayR = response.result;
      console.log('sucessifuly req 3:gameplay');

    }, function(reason){
        console.log('error'+reason);

  }).then(function(){
    insereTable(pl_podcastR);
    $("#podcast").on("click", function(){insereTable(pl_podcastR);});
    $("#gameplay").on("click", function(){insereTable(pl_gameplayR);});
    $("#review").on("click", function(){insereTable(pl_reviewR);});
    
    $(".menu").click(function(){
      $("#menu-itens").toggleClass("active");
    });

    $("#podcast").on("click", function(){
      $("#content-title h3").html("PODCAST");
    });
    $("#gameplay").on("click", function(){
      $("#content-title h3").html("GAMEPLAY");
    });
    $("#review").on("click", function(){
      $("#content-title h3").html("REVIEW");
    });

  });

}

function insereTable(table_data){
  var table, data, row, celula;

  $("#table-content tbody tr").remove();
  data = table_data.items;
  table = document.getElementById('table-content').getElementsByTagName('tbody')[0];

  var count = Object.keys(data).length;
  
  for(i = 0; i < count ; i++){
    row = document.createElement("tr");
    celula = document.createElement("td");
    link = document.createElement("button");
    link.setAttribute("href", 'https://www.youtube.com/embed/'+data[i].snippet.resourceId.videoId);
    link.innerHTML = data[i].snippet.title;
    celula.appendChild(link);
    row.appendChild(celula);
    table.appendChild(row);
    video = document.getElementById("video-container").getElementsByTagName("iframe")[0];
    link.addEventListener("click", function(){relationIframe(this);});
    row.addEventListener("mousemove", function(event){showPopUpDescription(this, event);});
    row.addEventListener("mouseout", function(){hidePopUpDescription(this);});
    if(i == 0){
      document.getElementById("video-container").getElementsByTagName("iframe")[0].setAttribute("src", 'https://www.youtube.com/embed/'+data[i].snippet.resourceId.videoId);
    }
  }
  document.getElementById('table-content').getElementsByTagName('tbody')[0] = table;
}

function relationIframe(Obj){
  video = document.getElementById("video-container").getElementsByTagName("iframe")[0];
  video.setAttribute("src", Obj.getAttribute("href"));
}

function showPopUpDescription(Obj, event){
  var playlist = document.getElementById("content-title").getElementsByTagName("h3")[0].innerHTML;
  switch(playlist){
    case "PODCAST":
      Obj = pl_podcastR.items[Obj.rowIndex];
    break;
    case "REVIEW":
      Obj = pl_reviewR.items[Obj.rowIndex];
    break;
    case "GAMEPLAY":
      Obj = pl_gameplayR.items[Obj.rowIndex];
    break;
    default:
      Obj = pl_podcastR.items[Obj.rowIndex];
    break;
  }
  var img = document.getElementById("popup-description").getElementsByTagName("img")[0];
  img.setAttribute("src", Obj.snippet.thumbnails.medium.url);
  document.getElementById("description-item").innerHTML = "<b>Descri&ccedil&atildeo:</b>"+Obj.snippet.description;
  $("#popup-description").css("display", "flex");
  $("#popup-description").css("left", event.clientX+50);
}

function hidePopUpDescription(){
  $("#popup-description").hide();
}

// 1. Load the JavaScript client library.
gapi.load('client', start);
