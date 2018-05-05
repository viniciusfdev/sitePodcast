var data;
function preload(){
  jsonn1 = loadJSON("dataPodCast.json");
}

function setup() {
    testeJSON();
}

function draw() {
}

function testeJSON(){
  document.getElementById('teste').innerHTML = jsonn1[0].titulo;
  document.getElementById('teste').setAttribute('href', jsonn1[0].link);
}

function chamaTable(){
  insereTable('tableEsport');
  insereTable('tablePodcast');
  insereTable('tableGameplays');
}
/*INSERE A TABLE AUTOMATICAMENTE*/
function insereTable(tableName){
  //pega o id da tabela passada como parametro
  var table = document.getElementById(tableName).getElementsByTagName('tbody')[0];
  //cria uma linha vazia
  var row = table.insertRow(table.rows.length);
  //cria uma celula de dados
  var celula = row.insertCell(0);
  //adiciona
  var value  = document.createTextNode('kkkkkkkkkk');
  celula.appendChild(value);

}

//le os arquivos que contém os links
