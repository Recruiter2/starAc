const mysql = require('mysql');
//const session = require('electron');
const db = mysql.createConnection({
  port: 1183,
  host: "localhost",
  user: "l2_info_3",
  password: "Kaduu6Ox",
  database: "l2_info_3",

});



db.connect(function (err) {
  if (err) throw err;
  console.log("CONNEXION REUSSI!");
});





function getNomSpect() {
  var res = window.sessionStorage.getItem("name_spect");
  return res;
}

function getNomArt() {
  var res = window.sessionStorage.getItem("name_art");
  return res;
}

function ArtisteConnexion(nom, mdp) {

  var res = null;
  db.query("SELECT `id`,`nom`, `password` FROM `artiste`",
    function (err, result, fields) {
      // if any error while executing above query, throw error
      if (err) throw err;
      //
      for (var i = 0; i < result.length; i++) {
        if (result[i].nom == nom && result[i].password == mdp) {
          res = result[i];
        }
      }
      if (res != null) {
        const cookie = { url: 'http://www.github.com', name: 'dummy_name', value: 'dummy' }
        window.sessionStorage.setItem("name_art", res.nom);
        window.sessionStorage.setItem("id_art", res.id);
        window.location.replace("artiste.html");
      }
      else {
        alert("ERROR CONNEXION");
        window.location.assign("login.html");
      }

    });
}

function SpectateurConnexion(nom, mdp) {

  var res = null;
  db.query("SELECT `id`,`nom`, `password` FROM `spectateur`",
    function (err, result, fields) {
      // if any error while executing above query, throw error
      if (err) throw err;
      //
      for (var i = 0; i < result.length; i++) {
        if (result[i].nom == nom && result[i].password == mdp) {
          res = result[i];
        }
      }
      if (res != null) {
        window.sessionStorage.setItem("name_spect", res.nom);
        window.sessionStorage.setItem("id_spect", res.id);
        window.location.replace("spectateur.html");
      }
      else {
        alert("ERROR CONNEXION");
      }

    });
}



function TableauSpectacle() {
  db.query("SELECT `nom`, `jour`, `temps`,`type` FROM `groupe` ORDER by `temps`",
    function (err, result, fields) {
      // if any error while executing above query, throw error
      if (err) throw err;
      // if there is no error, you have the result
      var body = document.getElementsByTagName("body")[0];

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



      for (var i = 0; i < result.length; i++) {
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
      // put the <tbody> in the <table>
      tbl.appendChild(tblBody);
      tbl.classList.add("TableCSS")
      body.appendChild(tbl);


      console.log(result);
    });
}


function ajouteGroupe(nom, jour, type) {
  /*
  alert(nom);
  alert(jour);
  alert(type);
  */
  var sql = "INSERT INTO `groupe`(`nom`, `jour`, `temps`, `type`, `id_artiste`) VALUES ('" + nom + "','" + jour + "','10:00:00','" + type + "','1')";


  db.query(sql, function (err, result) {
    if (err) alert("ERREUR INSERTION");
    else {
      alert("L'insertion a été réalisé !");
      window.location.assign("artiste.html");
    }
  });
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

function loginSpec() {
  var res = window.sessionStorage.getItem("id_spec");
  if (res == null) {
    window.location.assign("loginSpectateur.html");
  }
  else {
    window.location.assign("spectateur.html");
  }
}


function reservation() {

  var idSpec = window.sessionStorage.getItem("id_spec");
  var sql = "INSERT INTO `reservation`(`id_concert`, `id_spectateur`, `prix`) VALUES ('1','" + idSpec + "','25.5')";
  console.log(idSpec);
  db.query(sql, function (err, result) {

    if (err) alert("ERREUR INSERTION");
    else {
      alert("SUCESS !");
    }
  });
}
