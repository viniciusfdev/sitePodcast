function dragMENU(){
  if (document.getElementById("iconOpenOption").style.display == "none") {
      document.getElementById("iconOpenOption").style.display = "block";
  }else {
      document.getElementById("iconOpenOption").style.display = "none";
  }
}

function chamaTable(){
  insereTable('tableEsport');
  insereTable('tablePodcast');
  insereTable('tableGameplays');
  leArquivo();
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
function leArquivo(){
    var reader = new FileReader();
    reader.onload = function(){
        document.getElementById('teste').innerHTML = this.result;
    }
}
