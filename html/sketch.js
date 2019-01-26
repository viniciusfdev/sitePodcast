var dataPodCast, dataEsport, dataGameplay;

function preload(){
  dataPodCast = loadJSON("dataPodCast.json");
  dataEsport = loadJSON("dataEsport.json");
  dataGameplay = loadJSON("dataGameplay.json");
  $("#buttonpodcast").click(function(){
    $("#viewpodcast").show(500);
    $("#viewesport").hide(500);
    $("#viewgameplays").hide(500);
    resizeTable();
  });
  $("#buttongameplays").click(function(){
    $("#viewpodcast").hide(500);
    $("#viewesport").hide(500);
    $("#viewgameplays").show(500);
    resizeTable();
  });
  $("#buttonesport").click(function(){
    $("#viewpodcast").hide(500);
    $("#viewesport").show(500);
    $("#viewgameplays").hide(500);
    resizeTable();
  });
}

function setup() {
  resizeTable();
  chamaTable();
  showMenu();
  window.addEventListener("resize", resizeTable);
  window.addEventListener("resize", block);
}

function draw() {
}

//exibi em bloco se nao ouver espaço para inline
function block(){
  if(window.innerWidth < 700){
      document.getElementById("sec-menu-desktop").style.display = "none";
  }else{
    document.getElementById("sec-menu-desktop").style.display = "inline";
  }
}

//exibi o menu responsivo
function showMenu(){
  if(window.innerWidth < 700){
    var desk = document.getElementById("sec-menu-desktop");
    var iphone =  document.getElementById("sec-menu-iphone");

    if(desk.style.display == "none"){
      desk.style.display = "inline";
    }else{
      desk.style.display = "none";
    }
  }
}

function chamaTable(){
  insereTable("tablePodcast");
  insereTable("tableGameplays");
  insereTable("tableEsport");
}

/*INSERE NA TABLE AUTOMATICAMENTE*/
function insereTable(tableName){
  var table, value, data, row, celula, iframeClass;

  if(tableName == "tablePodcast"){
    data = dataPodCast;
    iframeClass = "podcastTD";
    tam = dataPodCast.lenght;
  }else if(tableName == "tableEsport"){
    data = dataEsport;
    iframeClass = "esportTD";
    tam = dataEsport.lenght;
  }else{
    data = dataGameplay;
    iframeClass = "gameplayTD";
    tam = dataGameplay.lenght;
  }
  table = document.getElementById(tableName).getElementsByTagName('tbody')[0];

  var count = Object.keys(data).length;
  for(i = count-1; i>= 0 ; i--){
    row = document.createElement("tr")
    celula = document.createElement("td");
    link = document.createElement("button");
    link.setAttribute("href", data[i].link);
    link.setAttribute("class", iframeClass);
    link.innerHTML = data[i].titulo;
    link.style.width = "100%";
    celula.appendChild(link);
    row.appendChild(celula);
    table.appendChild(row);
    link.addEventListener("click", function(){relationIframe(this)});
  }
}

//seta o tamanho das tabelas de acordo com o tamanho do video
function resizeTable(){
  for(i = 0; i<3; i++){
    var tblH = document.getElementsByClassName("video-wrapper")[i].offsetHeight;
    document.getElementsByTagName("tbody")[i].style.height = tblH+"px";
  }
}

//cria a relacao do iframe com o episodio escolhido
function relationIframe(Obj){
  if(Obj.getAttribute("class") == "podcastTD"){
    video = document.getElementById("sec-podcast").getElementsByTagName("iframe")[0];
    video.setAttribute("src", Obj.getAttribute("href"));
  }else if(Obj.getAttribute("class")  == "esportTD"){
    video = document.getElementById("sec-esport").getElementsByTagName("iframe")[0];
    video.setAttribute("src", Obj.getAttribute("href"));
  }else if(Obj.getAttribute("class")  == "gameplayTD"){
    video = document.getElementById("sec-gameplays").getElementsByTagName("iframe")[0];
    video.setAttribute("src", Obj.getAttribute("href"));
  }
}
