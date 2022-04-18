/************************************************************************************/

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



/**************************************************************************************/






function loginArt(){
  var res = window.sessionStorage.getItem("id_art");
  if (res==null){
    window.location.assign("login.html");
  }
   else {
     window.location.assign("artiste.html");
  }
}


function ArtisteConnexion(nom,mdp){
  var res=null;
  db.query("SELECT `id`,`nom`, `password` FROM `artiste`",
  function (err, result, fields) {
    // if any error while executing above query, throw error
    if (err) throw err;
    //
    for (var i=0; i<result.length;i++){
       if (result[i].nom==nom &&  result[i].password==mdp){
         res=result[i];
       }
    }
    if (res!=null){
      const cookie = { url: 'http://www.github.com', name: 'dummy_name', value: 'dummy' }
      window.sessionStorage.setItem("name_art",res.nom);
      window.sessionStorage.setItem("id_art",res.id);
      window.location.replace("artiste.html");
    }
    else
    {
      alert("ERROR CONNEXION");
      window.location.assign("login.html");
    }

  });
}



function getNomArt(){
  var res = window.sessionStorage.getItem("name_art");
  return res;
}



function ajouteGroupe(nom,jour,type){
  /*
  alert(nom);
  alert(jour);
  alert(type);
  */
  var sql = "INSERT INTO `groupe`(`nom`, `jour`, `temps`, `type`, `id_artiste`) VALUES ('"+nom+"','"+jour+"','10:00:00','"+type+"','1')";    
    db.query(sql, function (err, result) {
    if (err) alert("ERREUR INSERTION");
    else{
      alert("L'insertion a été réalisé !");
      window.location.assign("artiste.html");
    }
});
}





/***************************************************************************************** */

function loginSpec(){
  var res = window.sessionStorage.getItem("id_spect");
  if (res==null){
    window.location.assign("loginSpectateur.html");
  }
  else {
     window.location.assign("spectateur.html");
  }
}





/****************GROUPE*********************/

function creeGroupe(nom,type){
var radios = document.getElementsByName('membreS');

for (var i = 0, length = radios.length; i < length; i++) {
  if (radios[i].checked) {
    // do whatever you want with the checked radio
    var val = radios[i].value;

    // only one radio can be logically checked, don't check the rest
    break;
  }
}
  
  var id = window.sessionStorage.getItem("id_art");
  var sql = "INSERT INTO `groupe`(`nom`, `type`, `id_createur`,`recherche`) VALUES ('"+nom+"','"+type+"','"+id+"','"+parseInt(val)+"')";

    
    db.query(sql, function (err, result) {
    if (err) alert("ERREUR INSERTION");
    else{
      alert("L'insertion a été réalisé !");
      window.location.assign("artiste.html");
    }
});
}


function afficheGroupe(possede){
  var id = window.sessionStorage.getItem("id_art");
  var res="";
  if (possede===0) {
      res="SELECT * FROM `groupe` WHERE id_createur!="+id;
  }
  else{
      res="SELECT * FROM `groupe` WHERE id_createur="+id;
  }
  
  db.query(res, 
  function (err, result, fields) {
    if (err) throw err;
   

    var body = document.getElementsByTagName("body")[0];
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");
    var tblHead = document.createElement("thead");
    var row = document.createElement("tr");
    

    var cell = document.createElement("td");
    var cellText = document.createTextNode("Nom");
    cell.appendChild(cellText);
    row.appendChild(cell);

    var cell = document.createElement("td");
    var cellText = document.createTextNode("Type");
    cell.appendChild(cellText);
    row.appendChild(cell);

    var cell = document.createElement("td");
    var cellText = document.createTextNode("Recherche");
    cell.appendChild(cellText);
    row.appendChild(cell);
    
    if(possede!=0){
    var cell = document.createElement("td");
    var cellText = document.createTextNode("Supprimer");
    cell.appendChild(cellText);
    row.appendChild(cell);
    }
    tblHead.appendChild(row);
    tbl.appendChild(tblHead);

    for (var i=0; i<result.length;i++){
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
        if (result[i].recherche===1){
            var rep = "Oui";
        }
        else{
           var rep = "Non";
        }
        var cellText = document.createTextNode(rep);;
        cell.appendChild(cellText);
        row.appendChild(cell);

        if(possede!=0){
        var cell = document.createElement("td");
        var cellText = document.createTextNode("supprimer");
        cell.appendChild(cellText);
        row.appendChild(cell);
        }

        tblBody.appendChild(row);
    }
    // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  tbl.classList.add("TableCSS")
   if (possede!=0) {
      document.getElementById("Atab1").appendChild(tbl);
  }
  else{
      document.getElementById("Atab2").appendChild(tbl);
  }
 


    console.log(result);
  });
}
