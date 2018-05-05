var dataPodCast, dataEsport, dataGameplay;

function preload(){
  dataPodCast = loadJSON("dataPodCast.json");
  dataEsport = loadJSON("dataEsport.json");
  dataGameplay = loadJSON("dataGameplay.json");
}

function setup() {
  chamaTable();
}

function draw() {
}

function chamaTable(){
  insereTable('tablePodcast');
  insereTable('tableGameplays');
  insereTable('tableEsport');
}
/*INSERE NA TABLE AUTOMATICAMENTE*/
function insereTable(tableName){
  var table, value, data, row, celula;

  if(tableName === "tablePodcast"){
    data = dataPodCast;
  }else if(tableName === "tableEsport"){
    data = dataEsport;
  }else{
    data = dataGameplay;
  }

  table = document.getElementById(tableName).getElementsByTagName('tbody')[0];

  for(i=0; i<5 ; i++){
    //pega o id da tabela passada como parametro
    row = document.createElement("tr")    //cria uma linha vazia
    celula = document.createElement("td");    //cria uma celula de dados
    value  = document.createTextNode(data[i].titulo); //adiciona
    celula.appendChild(value);
    row.appendChild(celula);
    table.appendChild(row);
  }
}
