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



// artisteOuSpectateur => 1 -> ARTISTE
//                        0 -> SPECTATEUR
function showModifCompte(artisteOuSpectateur) {
  if (artisteOuSpectateur == 1) {
    var id = window.sessionStorage.getItem("id_art");
    var dbSA = "SELECT * FROM `artiste` WHERE id=" + id;
  }
  else {
    var id = window.sessionStorage.getItem("id_spec");
    var dbSA = "SELECT * FROM `spectateur` WHERE id_spec = '" + id + "'";
  }
  db.query(dbSA,
    function (err, result, fields) {
      if (err) throw alert("Error");

      if (document.getElementById('nom') == null) {
        var input = document.createElement("input");
        input.id = "prenom";
        input.type = "text";
        input.name = "Prenom :";
        input.id = "prenom";
        input.value = result[0].prenom;
        document.getElementById('1').appendChild(input);
        var input = document.createElement("input");
        input.id = "nom";
        input.type = "text";
        input.name = "Nom :";
        input.id = "nom";
        input.value = result[0].nom;
        document.getElementById('2').appendChild(input);
        var input = document.createElement("input");
        input.type = "date";
        input.id = "dateN";
        input.name = "Date";
        input.value = result[0].date_naissance.toISOString().split('T')[0];
        document.getElementById('3').appendChild(input);
        var input = document.createElement("input");
        input.type = "email";
        input.id = "mail";
        input.name = "Mail";
        input.value = result[0].mail;
        document.getElementById('4').appendChild(input);
        var input = document.createElement("input");
        input.type = "password";
        input.id = "password";
        input.name = "Mot de passe :";
        input.value = result[0].password;
        document.getElementById('5').appendChild(input);
      }

    });
}



function modifCompte(prenom, nom, mail, mdp, date, ArtSpec) {
  if (ArtSpec == 1) {
    var id = window.sessionStorage.getItem("id_art");
    var addDB = "UPDATE `artiste` SET `nom`='" + nom + "',`prenom`='" + prenom + "',`date_naissance`='" + date + "',`mail`='" + mail + "',`password`='" + mdp + "' WHERE id=" + id;
  }
  else {
    var id = window.sessionStorage.getItem("id_spec");
    var addDB = "UPDATE `spectateur` SET `nom`='" + nom + "',`prenom`='" + prenom + "',`date_naissance`='" + date + "',`mail`='" + mail + "',`password`='" + mdp + "' WHERE id_spec=" + id;
  }
  db.query(addDB,
    function (err, result, fields) {
      if (err) throw err;
      alert("MODIFIER");
      if (ArtSpec == 1){
        window.location.assign("artiste.html");
      }
      else {
        window.location.assign("spectateur.html");
      }
    });
}

/********************************************************** */
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


function choixS(value) {
  if (value == "2") {
    window.sessionStorage.removeItem("id_spec");
    window.location.assign("index.html");
  }
  else if (value == "1") {
    window.location.assign("modifCompteS.html");
  }
}

function choixA(value) {
  if (value == "2") {
    window.sessionStorage.removeItem("id_art");
    window.location.assign("index.html");
  }
  else if (value == "1") {
    window.location.assign("modifCompteA.html");
  }
}