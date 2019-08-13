//const CLIENT_ID = {CLIENT_ID};
//const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];
const API_KEY = 'AIzaSyAONVephJiOij7ryDiKQ-_RZ6p6Wvi4sLQ';
const PL_PODCAST = 'PLmSkFzJxyNCIpVdhtdl5WBxnca7xwg3rM';
const PL_REVIEW = 'PLmSkFzJxyNCIi21LboIt_SblqXuvnin9F';
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
    console.log(response);
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
      pl_gameplayR = response.result;
      console.log('sucessifuly req 3:gameplay');

    }, function(reason){
        console.log('error'+reason);

  }).then(function(){
    insereTable(pl_podcastR);
  });

}

/*INSERE NA TABLE AUTOMATICAMENTE*/
function insereTable(table_data){
  var table, data, row, celula;

  data = table_data.items;
  table = document.getElementById('table-content').getElementsByTagName('tbody')[0];

  var count = Object.keys(data).length;
  console.log(count);
  for(i = count-1; i>= 0 ; i--){
    row = document.createElement("tr")
    celula = document.createElement("td");
    link = document.createElement("button");
    link.setAttribute("href", 'https://www.youtube.com/embed/'+data[i].snippet.resourceId.videoId);
    link.innerHTML = data[i].snippet.title;
    celula.appendChild(link);
    row.appendChild(celula);
    table.appendChild(row);
    video = document.getElementById("video-container").getElementsByTagName("iframe")[0];
    video.setAttribute("src", 'https://www.youtube.com/embed/'+data[i].snippet.resourceId.videoId);
    link.addEventListener("click", function(){relationIframe(this)});
    link.addEventListener("mouseenter", function(){relationIframe(data[i])});
    link.addEventListener("mouseover", function(){relationIframe(data[i])});
  }
}

//cria a relacao do iframe com o episodio escolhido
function relationIframe(Obj){
  video = document.getElementById("video-container").getElementsByTagName("iframe")[0];
  video.setAttribute("src", Obj.getAttribute("href"));
}

function showPopUpDescription(Obj){
  var img = $("#popup-description").getElementsByTagName("img")[0];
  img.attr("src", Obj.snippet.thumbnails.medium.url);
  document.getElementById("description-item").innerHTML("<b>Descrição:</b>"+Obj.snippet.description);
  $("#popup-description").show("fast");
}

function hidePopUpDescription(){
  $("#popup-description").hide("fast");
}

$(document).ready(function(){
  $("#podcast").on("click", insereTable(pl_podcastR));
  $("#gameplay").on("click", insereTable(pl_gameplayR));
  $("#review").on("click", insereTable(pl_reviewR));
});

// 1. Load the JavaScript client library.
gapi.load('client', start);
