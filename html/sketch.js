var dataPodCast, dataEsport, dataGameplay;

function preload(){
  dataPodCast = loadJSON("dataPodCast.json");
  dataEsport = loadJSON("dataEsport.json");
  dataGameplay = loadJSON("dataGameplay.json");
}

function setup() {
  resizeTable();
  chamaTable();
  showMenu();
  window.addEventListener("resize", resizeTable);
  window.addEventListener("resize", block)
}

function draw() {

}

function block(){
  if(window.innerWidth < 700){
      document.getElementById("sec-menu-desktop").style.display = "none";
  }else{
    document.getElementById("sec-menu-desktop").style.display = "inline";
  }
}

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
  var table, value, data, row, celula, tam;

  if(tableName == "tablePodcast"){
    data = dataPodCast;
    tam = dataPodCast.lenght;
  }else if(tableName == "tableEsport"){
    data = dataEsport;
    tam = dataEsport.lenght;
  }else{
    data = dataGameplay;
    tam = dataGameplay.lenght;
  }

  table = document.getElementById(tableName).getElementsByTagName('tbody')[0];

  for(i=19; i>=0 ; i--){
    //pega o id da tabela passada como parametro
    row = document.createElement("tr")    //cria uma linha vazia
    celula = document.createElement("td");    //cria uma celula de dados
    link = document.createElement("a");
    link.setAttribute("href", data[i].link);
    link.innerHTML = data[i].titulo;
    celula.appendChild(link);
    row.appendChild(celula);
    table.appendChild(row);
  }
}

function resizeTable(){
  for(i = 0; i<3; i++){
    var tblH = document.getElementsByClassName("video-wrapper")[i].offsetHeight;
    document.getElementsByTagName("tbody")[i].style.height = tblH+"px";
  }
}
