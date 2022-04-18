const mysql = require('mysql');
//const session = require('electron');
const db = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "",
   database : "l2_info_3"
 });


db.connect(function(err) {
   if (err) throw err;
   console.log("CONNEXION REUSSI!");
 });


function getNomSpect(){
  var res = window.sessionStorage.getItem("name_spec");
  return res;
}



function SpectateurConnexion(nom,mdp){
  var res=null;
  db.query("SELECT * FROM `spectateur`",
function (err, result, fields) {
    // if any error while executing above query, throw error
     if (err) throw err;
    for (var i=0; i<result.length;i++){
       if (result[i].nom==nom &&  result[i].password==mdp){
         res=result[i];
       }
    }

    if (res!=null){
      window.sessionStorage.setItem("name_spec",res.nom);
      window.sessionStorage.setItem("id_spec",res.id_spec);
      window.location.replace("spectateur.html");
    }
    else
    {
      alert("ERROR CONNEXION");
    }

  });
}

function loginSpec(){
  var res = window.sessionStorage.getItem("id_spec");
  if (res==null){
    window.location.assign("loginSpectateur.html");
  }
  else {
     window.location.assign("spectateur.html");
  }
}






function ShowEve(){
   db.query("SELECT * FROM `evenements` WHERE 1", 
  function (err, result, fields) {
    // if any error while executing above query, throw error
    if (err) throw err;

    //Create and append select list
      document.getElementById('gauche').innerHTML = "DATE : ";
      var selectList = document.createElement("select");
      selectList.id = "mySelect";
      document.getElementById('gauche').appendChild(selectList);

      //Create and append the options
      for (var i = 0; i < result.length; i++) {
          var option = document.createElement("option");
          option.value = result[i].id_evt;
          option.text = result[i].date.toISOString().split('T')[0];
         selectList.appendChild(option);
      }
  });
}




function TableauSpectacle(){
  

    db.query("SELECT * FROM groupe INNER JOIN participe WHERE groupe.id_groupe = participe.id_groupe", 
  function (err, result, fields) {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    var gauche = document.getElementById("gauche");
    let tab = document.createElement("div");
    tab.id="tab";
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");

    var tblHead = document.createElement("thead");
    var row = document.createElement("tr");

    var cell = document.createElement("td");
    var cellText = document.createTextNode("Groupe");
    cell.appendChild(cellText);
    row.appendChild(cell);
    var cell = document.createElement("td");
    var cellText = document.createTextNode("Type");
    cell.appendChild(cellText);
    row.appendChild(cell);
    var cell = document.createElement("td");
    var cellText = document.createTextNode("Heure");
    cell.appendChild(cellText);
    row.appendChild(cell);

    tblHead.appendChild(row);
    tbl.appendChild(tblHead);
    var e = document.getElementById("mySelect");
    var value = e.value;


    for (var i=0; i<result.length;i++){
      if (result[i].id_evt==value){
        var row = document.createElement("tr");
        var cell = document.createElement("td");
        var cellText = document.createTextNode(result[i].nom);
        cell.appendChild(cellText);
        row.appendChild(cell);
        var cell = document.createElement("td");
        var cellText = document.createTextNode(result[i].type);
        cell.appendChild(cellText);
        row.appendChild(cell);
        var cell = document.createElement("td");
        var cellText = document.createTextNode(result[i].temps);
        cell.appendChild(cellText);
        row.appendChild(cell);
        tblBody.appendChild(row);
      }
    }
    // put the <tbody> in the <table>
  if (document.getElementById("tab")!=null){
    document.getElementById("tab").remove();
  }
  tbl.appendChild(tblBody);
  tbl.classList.add("TableCSS");
  
  
  tab.appendChild(tbl);
  gauche.append(tab);
   //document.getElementById("gauche").removeChild()
  console.log(result);
  });
}






function reservation(){

  var idSpec = window.sessionStorage.getItem("id_spect");
 var sql =  "INSERT INTO `reservation`(`id_concert`, `id_spectateur`, `prix`) VALUES ('1','"+idSpec+"','25.5')";
  console.log(idSpec);
  db.query(sql, function (err, result) {

    if (err) alert("ERREUR INSERTION");
    else{
      alert("SUCESS !");
    }
});
}







/*************************************/
function loginArt(){
  var res = window.sessionStorage.getItem("id_art");
  if (res==null){
    window.location.assign("login.html");
  }
   else {
     window.location.assign("artiste.html");
  }
}