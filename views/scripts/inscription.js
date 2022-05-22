//import {connect} from './connexion.js';
//connect();
const mysql = require('mysql');
//const session = require('electron');
const db = mysql.createConnection({
  port: 1183,
  host: "localhost",
  user: "l2_info_3",
  password: "Kaduu6Ox",
  database: "l2_info_3",

});

db.connect(
  function (err) {
    if (err) throw err;
    console.log("CONNEXION REUSSI!2");
  });




function tabEve() {
  db.query("SELECT * FROM `evenements` WHERE 1",
    function (err, result, fields) {
      // if any error while executing above query, throw error
      if (err) throw err;
      // if there is no error, you have the result
      var caption = document.createElement("caption");
      caption.innerText = "EVENEMENTS";
    
      var tbl = document.createElement("table");
      tbl.appendChild(caption)
      var tblBody = document.createElement("tbody");
      var tblHead = document.createElement("thead");
      var row = document.createElement("tr");
      var cell = document.createElement("td");

      var cellText = document.createTextNode("id");
      cell.appendChild(cellText);
      row.appendChild(cell);

      var cell = document.createElement("td");
      var cellText = document.createTextNode("Nom");
      cell.appendChild(cellText);
      row.appendChild(cell);

      var cell = document.createElement("td");
      var cellText = document.createTextNode("Date");
      cell.appendChild(cellText);
      row.appendChild(cell);

      var cell = document.createElement("td");
      var cellText = document.createTextNode("Heure");
      cell.appendChild(cellText);
      row.appendChild(cell);

      var cell = document.createElement("td");
      var cellText = document.createTextNode("Prix (E)");
      cell.appendChild(cellText);
      row.appendChild(cell);

      tblHead.appendChild(row);
      tbl.appendChild(tblHead);

      for (var i = 0; i < result.length; i++) {
        var row = document.createElement("tr");
        var cell = document.createElement("td");
        var cellText = document.createTextNode(result[i].id_evt);
        cell.appendChild(cellText);
        row.appendChild(cell);
        var cell = document.createElement("td");
        var cellText = document.createTextNode(result[i].nom);
        cell.appendChild(cellText);
        row.appendChild(cell);
        var cell = document.createElement("td");
        var cellText = document.createTextNode(result[i].date.toISOString().split('T')[0]);
        cell.appendChild(cellText);
        row.appendChild(cell);
        var cell = document.createElement("td");
        var cellText = document.createTextNode(result[i].heure);
        cell.appendChild(cellText);
        row.appendChild(cell);
        var cell = document.createElement("td");
        var cellText = document.createTextNode(result[i].prix);
        cell.appendChild(cellText);
        row.appendChild(cell);
        var cell = document.createElement("td");
        var inp = document.createElement("input");
        inp.value = result[i].id_evt;
        inp.name = "evenements";
        inp.type = "radio";
        cell.appendChild(inp);
        row.appendChild(cell);
        tblBody.appendChild(row);
      }
      // put the <tbody> in the <table>
      tbl.appendChild(tblBody);
      tbl.classList.add("table", "table-bordered", "text-center", "table-hover")
    
      document.getElementById("gauche").appendChild(tbl);


      console.log(result);
    });
}








function afficheGroupe() {
  var id = window.sessionStorage.getItem("id_art");
  var res = "";
  res = "SELECT * FROM `groupe` WHERE id_createur=" + id;
  db.query(res,
    function (err, result, fields) {
      if (err) throw err;
      var caption = document.createElement("caption");
      caption.innerText = "GROUPE ";
     
      var tbl = document.createElement("table");
      tbl.appendChild(caption);
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


      tblHead.appendChild(row);
      tbl.appendChild(tblHead);

      for (var i = 0; i < result.length; i++) {

        var row = document.createElement("tr");

        var cell = document.createElement("td");
        var cellText = document.createTextNode(result[i].nomG);
        cell.appendChild(cellText);
        row.appendChild(cell);

        var cell = document.createElement("td");
        var cellText = document.createTextNode(result[i].type);
        cell.appendChild(cellText);
        row.appendChild(cell);

        var cell = document.createElement("td");
        var inp = document.createElement("input");
        inp.value = result[i].id_groupe;
        inp.name = "groupe";
        inp.type = "radio";
        inp.disabled = "disabled";
        cell.appendChild(inp);
        row.appendChild(cell);
        tblBody.appendChild(row);
      }
      tbl.appendChild(tblBody);
      tbl.classList.add("table", "table-bordered", "text-center", "table-hover")
     
      document.getElementById("gauche").appendChild(tbl);
      console.log(result);

    });
}
/******************/

function giveIdfromRadio(element) {
  var radios = document.getElementsByName(element);

  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      var val = radios[i].value;
      break;
    }
  }
  return val;
}

/******************/
/*Creneau automatique de 10m pour le prochain participant */
function ajoute10M(temps) {
  var min = parseInt(temps[3]);
  min = min + 1;
  if (min >= 6) {
    min = 0;
    var heur = parseInt(temps.substring(0, 2));
    console.log(heur);
    heur = heur + 1;
    console.log(heur);
    //if (heur > 24)
    //heur = 00;
    temps = heur.toString() + ":" + min.toString() + temps.substring(4, 8);
  }
  else {
    temps = temps.substring(0, 3) + min.toString() + temps.substring(4, 8);
  }
  return temps;
}




function inscription() {

  var id = window.sessionStorage.getItem("id_art");
  var id_choix = giveIdfromRadio('choix');
  var id_evt = giveIdfromRadio('evenements');


  console.log(id, id_choix, id_evt);




  db.query("SELECT * FROM `evenements` LEFT JOIN participe ON evenements.id_evt = participe.id_evt WHERE evenements.id_evt = " + id_evt + " ORDER BY participe.temps DESC",
    function (err, result, fields) {
      console.log(result);
      var temps = result[0].heure;
      if (result[0].temps != null) {
        temps = result[0].temps;
      }

      temps = ajoute10M(temps);

      if (id_choix == 2) {
        var id_grpe = giveIdfromRadio('groupe');
        console.log(id_evt, id_grpe, temps);
        var ajouteDB = "INSERT INTO `participe`(`id_evt`, `id_groupe`, `temps`) VALUES ('" + id_evt + "','" + id_grpe + "','" + temps + "')";
      }
      else {

        var ajouteDB = "INSERT INTO `participe`(`id_evt`, `id_solo`, `temps`) VALUES ('" + id_evt + "','" + id + "','" + temps + "')";
      }
      console.log(ajouteDB);

      db.query(ajouteDB,
        function (err, result2, fields) {
          if (err) throw err;
          alert("Vous etes inscrit à l'evenement : " + result[0].nom + "\n Votre Heure de passage est  : " + temps);
        });



    });
}











/////////////////////////////////////////////////////////////////////////////////////////////
function loginSpec() {
  var res = window.sessionStorage.getItem("id_spec");
  if (res == null) {
    window.location.assign("loginSpectateur.html");
  }
  else {
    window.location.assign("spectateur.html");
  }
}

function loginArt() {
  var res = window.sessionStorage.getItem("id_art");
  if (res == null) {
    window.location.assign("login.html");
  }
  else {
    window.location.assign("artiste.html");
  }
}


/////////////////////////////////////////////////////////////////////////////////////////////

function EnableDisableTB() {

  var id_choix = giveIdfromRadio('choix');
  var radios = document.getElementsByName('groupe');
  for (var i = 0, length = radios.length; i < length; i++) {
    if (id_choix == 2) {
      radios[i].disabled = "";
    }
    else {
      radios[i].disabled = "disabled";
    }
  }
}
////////////////////////////////////////////////////////////////////////////////////////////