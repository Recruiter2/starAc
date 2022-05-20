
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


function getSrcImage() {
  var res = window.sessionStorage.getItem("img_spect");
  return res;
}


function getID() {
  var res = window.sessionStorage.getItem("id_spec");
  return res;
}

function getNomSpect() {
  var res = window.sessionStorage.getItem("name_spect");
  return res;
}


function getPointsSpec() {
  majPointsSpec();
  var res = window.sessionStorage.getItem("points_spec");
  return res;
}




/////////////////////////////////////////////////////////////////////////////////////////
function majPointsSpec() {
  id = window.sessionStorage.getItem("id_spec");
  var request = "SELECT points FROM `spectateur` WHERE id_spec=" + id;
  db.query(request,
    function (err, result, fields) {
      window.sessionStorage.setItem("points_spec", result[0].points);
    });


}
////////////////////////////////RESERVATION//////////////////////////////////////////////////


function reservation() {
  var id_evt = document.getElementById("mySelect").value;
  window.sessionStorage.setItem("id_evt", id_evt);
  window.location.assign("reservation.html");
}

function get_id_evt() {
  return res = window.sessionStorage.getItem("id_evt");
}


///////////////////////////////////////////////////////////////////////////////////////
// 0 -> On affiche TOUS 
// 1 -> On affiche seulement ceux en cours ou à venir
function showSelectEve() {
  var request;
  request = "SELECT * FROM `evenements` WHERE 1";
  db.query(request,
    function (err, result, fields) {
      label = document.createElement("label");
      select = document.createElement("select");
      label.for = "chooseEve-select";
      select.name = "choixEve";
      select.id = "choixEve-select";
      select.setAttribute("onclick", "getValueSelectValue(this.value)");
      var option = document.createElement("option");
      option.value = "";
      option.innerHTML = "--Choisir un évènement--";
      select.appendChild(option);
      for (var i = 0; i < result.length; i++) {
        var option = document.createElement("option");
        option.value = result[i].id_evt;
        option.text = result[i].nom + " // " + result[i].date.toISOString().split('T')[0];
        select.appendChild(option);
      }
      document.getElementById('gauche2').append(label);
      document.getElementById('gauche2').append(select);
    });
}

function getValueSelectValue(value) {

  if (value != "") {
    document.getElementById("tabNotes").remove();
    tabNoteEve((parseInt(value)));
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////:
function ShowEve() {
  db.query("SELECT * FROM `evenements` WHERE 1",
    function (err, result, fields) {
      // if any error while executing above query, throw error
      if (err) throw err;
      //Create and append select list
      document.getElementById('gauche').innerHTML = "CHOISIR EVENEMENT  : ";
      var selectList = document.createElement("select");
      selectList.id = "mySelect";
      //Create and append the options
      for (var i = 0; i < result.length; i++) {
        if (result[i].etat != 2) {
          var option = document.createElement("option");
          option.value = result[i].id_evt;
          option.text = result[i].nom + " // " + result[i].date.toISOString().split('T')[0];
          selectList.appendChild(option);
          if (result[i].etat == 1) {
            // CREATION DU BOUTON LIVE
            var buttonLIVE = document.createElement("input");
            buttonLIVE.type = "button";
            buttonLIVE.classList.add("buttonLIVE");
            buttonLIVE.value = "LIVE" + " EVENEMENT : " + result[i].nom;
            buttonLIVE.setAttribute('onclick', "window.open('https://www.youtube.com/watch?v=PQdBUEXxCoo');");
            document.getElementById("c").appendChild(buttonLIVE);
            tableauSpectacle(result[i].id_evt)
          }
        }
      }
      var but = document.createElement("input");
      but.type = "button";
      but.value = "ACTUALISER";
      but.setAttribute('onclick', "tableauSpectacle(0)");
      document.getElementById('gauche').appendChild(selectList);
      document.getElementById('gauche').appendChild(but);

    });
}





function tableauSpectacle(id_evt) {
  if (id_evt == 0) {
    var id_evt = document.getElementById("mySelect").value;
  }
  db.query("SELECT * FROM participe LEFT JOIN groupe ON groupe.id_groupe = participe.id_groupe LEFT JOIN artiste ON participe.id_solo=artiste.id WHERE id_evt = " + id_evt + " ORDER BY participe.temps ",
    function (err, result, fields) {
      db.query("SELECT * FROM `evenements` WHERE `id_evt` =" + id_evt,
        function (err, result2, fields) {
          // if any error while executing above query, throw error
          if (err) throw err;
          // if there is no error, you have the result
          var gauche = document.getElementById("gauche");
          let tab = document.createElement("div");
          tab.id = "tab";
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
          var cellText = document.createTextNode("Heure de passage");
          cell.appendChild(cellText);
          row.appendChild(cell);

          var cell = document.createElement("td");
          var cellText = document.createTextNode("SOLO(/)/GROUPE(X)");
          cell.appendChild(cellText);
          row.appendChild(cell);



          if (result2[0].etat == 1) {
            var cell = document.createElement("td");
            cell.style.width = 'fit-content';
            var cellText = document.createTextNode("\u2B50 ************NOTES************ \u2B50");
            cell.appendChild(cellText);
            row.appendChild(cell);
          }
          tblHead.appendChild(row);
          tbl.appendChild(tblHead);
          for (var i = 0; i < result.length; i++) {
            var nom;
            var type;
            var text;
            var id_participant = result[i].id_participant;
            console.log(result[i]);
            if (result[i].id_groupe != null) {
              nom = result[i].nomG;
              type = result[i].type;
              text = "X";
            }
            else {
              nom = result[i].nom;
              type = "/";
              text = "/";
            }
            var row = document.createElement("tr");
            var cell = document.createElement("td");
            var cellText = document.createTextNode(nom);
            cell.appendChild(cellText);
            row.appendChild(cell);
            var cell = document.createElement("td");
            var cellText = document.createTextNode(type);
            cell.appendChild(cellText);
            row.appendChild(cell);
            var cell = document.createElement("td");
            var cellText = document.createTextNode(result[i].temps);
            cell.appendChild(cellText);
            row.appendChild(cell);
            tblBody.appendChild(row);
            var cell = document.createElement("td");
            var cellText = document.createTextNode(text);
            cell.appendChild(cellText);
            row.appendChild(cell);
            tblBody.appendChild(row);
            if (result2[0].etat == 1) {
              var cell = document.createElement("td");
              var fieldset = document.createElement("fieldset");
              // CREATION DES ETOILES POUR LES NOTES
              for (var j = 10; j > 0; j--) {
                var input = document.createElement("input");
                input.type = "radio";
                input.id = "star" + j + (i * 10);
                input.name = "rating" + (i * 10);
                input.value = j;
                input.setAttribute("onclick", "ajouteNote(" + j + "," + id_participant + ");");
                var lab = document.createElement("label");
                lab.classList.add("full");
                lab.setAttribute("for", "star" + j + (i * 10));
                lab.title = j;
                fieldset.appendChild(input);
                fieldset.appendChild(lab);
                fieldset.classList.add("rating");
                fieldset.id = "notesTabStars";
                cell.appendChild(fieldset);
                row.appendChild(cell);
                tblBody.appendChild(row);
              }
            }

          }
          // put the <tbody> in the <table>
          if (document.getElementById("tab") != null) {
            document.getElementById("tab").remove();
          }
          //document.getElementById("tabNotes").remove();
          tbl.appendChild(tblBody);
          tbl.classList.add("table", "table-bordered", "text-center", "table-hover");


          tab.appendChild(tbl);
          gauche.append(tab);
          //document.getElementById("gauche").removeChild()
          //console.log(result);
        });
    });
}
////////////////////////////////PRONOSTIQUE/////////////////////////////////////


function affichePronoEve() {
  db.query("SELECT * FROM `evenements` WHERE etat=0 ORDER BY date limit 1",
    function (err, result, fields) {
      if (err) throw err;
      var gauche = document.getElementById("gauche");
      if (result.length != 0) {
        var text = document.createTextNode("PRONOSTIQUER pour évènement : " + result[0].nom);
        tableauSpectacle(result[0].id_evt);
        selectProno(result[0].id_evt);

      }
      else {
        var text = document.createTextNode("-- AUCUN EVENEMENT EN COURS--");
      }
      gauche.appendChild(text);
    });
}


function selectProno(id_evt) {
  var id_spect = window.sessionStorage.getItem("id_spec");
  db.query("SELECT * FROM `pronostic` WHERE id_evt = " + id_evt + " && id_spec = " + id_spect,
    function (err, result, fields) {
      if (err) throw err;
      var caption = document.createElement("caption");
      caption.innerText = "VOS PRONOS TOP 3 : ";
      var tbl = document.createElement("table");
      var tblBody = document.createElement("tbody");
      var tblHead = document.createElement("thead");
      var row = document.createElement("tr");
      var cell = document.createElement("td");
      var cellText = document.createTextNode("---Vos Choix---");
      cell.appendChild(cellText);
      row.appendChild(cell);
      var cell = document.createElement("td");
      var cellText = document.createTextNode("Choisir");
      cell.appendChild(cellText);
      row.appendChild(cell);
      tblHead.appendChild(row);
      tbl.appendChild(caption);
      tbl.appendChild(tblHead);
      console.log(result.length);
      for (var i = 1; i < 4; i++) {
        var row = document.createElement("tr");
        var cell = document.createElement("td");
        var cellText = document.createTextNode(i + "- ");
        for (var j = 0; j < result.length; j++) {
          if (i == result[j].pos) {
            donneNom(result[j].id_p, i + "pos" + i);
          }
        }
        cell.appendChild(cellText);
        cell.style.width = '300px';
        cell.id = i + "pos" + i;
        row.appendChild(cell);

        var cell = document.createElement("td");
        cell.id = "pos" + i;

        ajouteChoixSelect(id_evt, "pos" + i);
        row.appendChild(cell);
        tblBody.appendChild(row);

      }
      var but = document.createElement("input");
      but.type = "button";
      but.value = "VALIDER";
      but.setAttribute('onclick', "validProno(" + id_evt + ")");
      var row = document.createElement("tr");
      var cell = document.createElement("td");
      row.appendChild(cell);
      var cell = document.createElement("td");
      cell.appendChild(but);
      row.appendChild(cell);
      tblBody.appendChild(row);
      tbl.appendChild(tblBody);
      tbl.classList.add("table", "table-bordered", "text-center", "table-hover");
      document.getElementById("droite").appendChild(tbl);
    });
}

function donneNom(id_participant, pos) {
  db.query("SELECT * FROM `participe` LEFT JOIN artiste on artiste.id = participe.id_solo LEFT JOIN groupe on participe.id_groupe = groupe.id_groupe WHERE participe.id_participant=" + id_participant,
    function (err, result, fields) {
      if (err) throw err;
      var nom;
      if (result[0].solo == null) {
        nom = result[0].nomG;
      }
      if (result[0].id_groupe == null) {
        nom = result[0].nom + " " + result[0].prenom;
      }
      console.log(nom, result[0]);
      document.getElementById(pos).append(nom);
    });
}



function ajouteChoixSelect(id_evt, pos) {
  db.query("SELECT * FROM `participe` LEFT JOIN artiste on artiste.id = participe.id_solo LEFT JOIN groupe on participe.id_groupe = groupe.id_groupe WHERE participe.id_evt=" + id_evt,
    function (err, result, fields) {
      if (err) throw err;
      var selectList = document.createElement("select");
      selectList.id = "mySelect" + pos;
      var option = document.createElement("option");
      option.value = 0;
      option.text = "---CHOISISSEZ UN ARTISTE---";
      selectList.appendChild(option);
      for (var i = 0; i < result.length; i++) {
        var nom;
        if (result[i].solo == null) {
          nom = result[i].nomG;
        }

        if (result[i].id_groupe == null) {
          nom = result[i].nom + " " + result[i].prenom;
        }
        var option = document.createElement("option");
        option.value = result[i].id_participant;
        option.text = nom;
        selectList.appendChild(option);
      }

      document.getElementById(pos).appendChild(selectList);
    });

}

function validProno(id_evt) {
  validProno2(id_evt, 1);
  validProno2(id_evt, 2);
  validProno2(id_evt, 3);

}


function validProno2(id_evt, pos) {

  var id_spect = window.sessionStorage.getItem("id_spec");
  var request = "SELECT * FROM `pronostic` WHERE id_evt = " + id_evt + " && id_spec = " + id_spect + " && pos=" + pos;
  console.log(request);
  db.query(request,
    function (err, result, fields) {
      if (err) throw err;

      var id_p = document.getElementById("mySelectpos" + pos).value;
      id_p = parseInt(id_p);
      if (id_p != 0) {
        if (result.length != 0) {
          var request2 = "UPDATE `pronostic` SET `id_p`=" + id_p + " WHERE id_spec=" + id_spect + " && pos=" + pos + " && id_evt=" + id_evt;
        }
        else {
          var request2 = "INSERT INTO `pronostic`(`id_spec`, `id_p`, `id_evt`, `pos`) VALUES (" + id_spect + "," + id_p + "," + id_evt + "," + pos + ")";
        }
        console.log(request2, result.length, "HEY");
        db.query(request2,
          function (err, result, fields) {
            if (err) throw err;
          })
      }
      if (pos == 3) {
        window.location.assign("pronostique.html");
      }
    });
}

function afficheResProno() {
  var request = "SELECT * FROM `evenements` WHERE etat=2";
  db.query(request,
    function (err, result, fields) {
      if (err) throw err;
      var caption = document.createElement("caption");
      caption.innerText = "VOS RESULTATS : ";
      var tbl = document.createElement("table");
      var tblBody = document.createElement("tbody");
      var tblHead = document.createElement("thead");
      var row = document.createElement("tr");
      var cell = document.createElement("td");
      var cellText = document.createTextNode("---Vos Choix---");
      cell.appendChild(cellText);
      row.appendChild(cell);
      var cell = document.createElement("td");
      var cellText = document.createTextNode("---Points gagnés---");
      cell.appendChild(cellText);
      row.appendChild(cell);
      tblHead.appendChild(row);
      tbl.appendChild(caption);
      tbl.appendChild(tblHead);
      for (var i = 0; i < result.length; i++) {
        var row = document.createElement("tr");
        var cell = document.createElement("td");
        cell.append("\u272A" + result[i].nom);
        row.appendChild(cell);
        var cell = document.createElement("td");
        cell.id = "note" + result[i].id_evt;
        row.appendChild(cell);
        tblBody.appendChild(row);
        renvoiNotes(result[i].id_evt, "note" + result[i].id_evt);
      }
      tbl.appendChild(tblBody);
      tbl.classList.add("table", "table-bordered", "text-center", "table-hover");
      document.getElementById("gauche2").appendChild(tbl);

    });
}

// POSITION -> PERMET DE SAVOIR où renvoyer la valeur de la note
function renvoiNotes(id_evt, position) {
  var id_spect = window.sessionStorage.getItem("id_spec");
  var request = "SELECT * FROM `gagnants` LEFT JOIN pronostic on gagnants.id_evt = pronostic.id_evt && gagnants.position=pronostic.pos && gagnants.id_part = pronostic.id_p WHERE pronostic.id_evt = " + id_evt + " && pronostic.id_spec = " + id_spect;
  db.query(request,
    function (err, result, fields) {
      if (err) throw err;
      var note = 0;


      for (var i = 0; i < result.length; i++) {
        if (result[i].pos == 1) {
          note = note + 25;
        }
        else if (result[i].pos == 2) {
          note = note + 15;
        }
        else {
          note = note + 10;
        }
      }
      note = note * result.length;
      document.getElementById(position).append(note);
    });
}
/*************************************/
/////////////////////GESTION COMPTE///////////////////////////////////////////////////
function spectateurCreeCompte(nom, prenom, mail, mdp1, mdp2, date) {
  console.log(nom, mail, mdp1, mdp2, date);
  if (mdp1 == mdp2) {
    var add = "INSERT INTO `spectateur`(`nom`, `prenom`, `mail`, `password`, `date_naissance`) VALUES ('" + nom + "','" + prenom + "','" + mail + "','" + mdp1 + "','" + date + "')";

    db.query(add,
      function (err, result, fields) {
        if (err) throw err;
      });
    window.location.assign("loginSpectateur.html");
  }
  else {
    alert("les deux mots de passes ne correspondent pas !");
  }
}







function SpectateurConnexion(nom, mdp) {
  var res = null;
  console.log("SELECT * FROM `spectateur` INNER JOIN image on spectateur.id_img = image.id WHERE nom = '" + nom + "' && password ='" + mdp + "'");
  db.query("SELECT * FROM `spectateur` INNER JOIN image on spectateur.id_img = image.id WHERE nom = '" + nom + "' && password ='" + mdp + "'",
    function (err, result, fields) {
      // if any error while executing above query, throw error
      if (err) throw err;
      if (result.length != 0) {
        window.sessionStorage.setItem("img_spect", result[0].src);
        window.sessionStorage.setItem("name_spect", result[0].nom);
        window.sessionStorage.setItem("id_spec", result[0].id_spec);
        window.location.replace("spectateur.html");
      }
      else {
        alert("ERROR CONNEXION");
      }
    });
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
  else if (value == "3") {
    window.location.assign("specPaye.html");
  }
}
/////////////////////////////////////////////////////////////////////////////////
///////// NOTES FONCTION ///////////



// -> Si groupe (estGroupe == 1) donc on regarde pour le tableau des groupes
// On regarde si (id_evt =0) alors c'est un classement général sinon on regarde pour un évènement spécifique.
function tabNoteEve(id_evt) {
  var request = "SELECT * FROM `participe` WHERE id_evt =" + id_evt;
  db.query(request,
    function (err, result, fields) {
      if (err) throw err;
      var div = document.createElement("div");
      div.id = "tabNotes";
      if (result.length != 0) {
        var caption = document.createElement("caption");
        caption.innerText = "NOTES";
        var tab = document.createElement("tab");
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
        var cellText = document.createTextNode("Notes");
        cell.appendChild(cellText);
        row.appendChild(cell);
        var cell = document.createElement("td");
        var cellText = document.createTextNode("GROUPE(X)/SOLO(/)");
        cell.appendChild(cellText);
        row.appendChild(cell);
        var cell = document.createElement("td");
        var cellText = document.createTextNode("Nombre de votes :");
        cell.appendChild(cellText);
        row.appendChild(cell);
        tblHead.appendChild(row);
        tbl.appendChild(tblHead);

        for (var i = 0; i < result.length; i++) {
          if (result[i].id_solo == null) {
            var request2 = "SELECT * FROM `groupe` LEFT JOIN participe on participe.id_groupe = groupe.id_groupe LEFT JOIN note on note.id_participant = participe.id_participant WHERE participe.id_participant =" + result[i].id_participant;

          }
          else {
            var request2 = "SELECT * FROM `artiste` LEFT JOIN participe on participe.id_solo = artiste.id LEFT JOIN note on note.id_participant = participe.id_participant WHERE participe.id_participant =" + result[i].id_participant;
          }
          console.log(request2);
          db.query(request2,
            function (err, result2, fields) {
              var nom;
              var type;
              var note = 0;
              var groupe = "/";
              var nbVot = result2.length;
              console.log(result2);
              if (result2.length != 0) {
                for (var i = 0; i < result2.length; i++) {
                  console.log(result2[i]);
                  if (result2[i].id_solo == null) {
                    nom = "" + result2[i].nomG;
                    type = "" + result2[i].type;
                    groupe = "X";
                  }
                  else {
                    nom = result2[i].nom + " " + result2[i].prenom;
                    type = "/";
                  }
                  note = note + result2[i].note;
                }
                note = note / result2.length;
              }

              if (note == 0) {
                note = '/';
                nbVot = 0;
              }
              else {
                note = note.toFixed(2);
              }

              var row = document.createElement("tr");
              var cell = document.createElement("td");
              cell.append(nom);
              row.appendChild(cell);
              var cell = document.createElement("td");
              cell.append(type);
              row.appendChild(cell);
              var cell = document.createElement("td");
              cell.append(note);
              row.appendChild(cell);
              var cell = document.createElement("td");
              cell.append(groupe);
              row.appendChild(cell);
              var cell = document.createElement("td");
              cell.append(nbVot);
              row.appendChild(cell);
              tblBody.appendChild(row);
            });
          tbl.appendChild(tblBody);
          tbl.classList.add("table", "table-bordered", "text-center", "table-hover");
          tab.appendChild(caption);
          tab.appendChild(tbl);
          div.appendChild(tab);
        }
      }
      else {
        var cellText = document.createTextNode("----------------AUCUN GROUPE----------------");
        div.append(cellText);
      }
      document.getElementById('gauche2').append(div);
    });

}





function tabNoteGen(estGroupe) {
  var caption = document.createElement("caption");
  if (estGroupe != 0) {
    var request = "SELECT * FROM `groupe`";
    caption.innerText = "NOTES GROUPE";
    var add = document.getElementById("droite");
  }
  else {
    var request = "SELECT * FROM `artiste`";
    caption.innerText = "NOTES ARTISTE";
    var add = document.getElementById("gauche");
  }
  db.query(request,
    function (err, result, fields) {
      if (err) throw err;
      var tab = document.createElement("tab");
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
      var cellText = document.createTextNode("Notes");
      cell.appendChild(cellText);
      row.appendChild(cell);
      tblHead.appendChild(row);
      tbl.appendChild(tblHead);
      console.log(result.length);
      for (var i = 0; i < result.length; i++) {
        if (estGroupe) {
          var request2 = "SELECT * FROM `groupe` INNER JOIN participe on participe.id_groupe = groupe.id_groupe INNER JOIN note on note.id_participant = participe.id_participant WHERE groupe.id_groupe=" + result[i].id_groupe;
        }
        else {
          var request2 = "SELECT * FROM `artiste` INNER JOIN participe on participe.id_solo = artiste.id INNER JOIN note on note.id_participant = participe.id_participant WHERE artiste.id=" + result[i].id;
        }
        //console.log(request2);
        db.query(request2,
          function (err, result2, fields) {
            var nom;
            var type;
            var note = 0;
            //console.log(result2);
            if (result2.length != 0) {
              for (var i = 0; i < result2.length; i++) {
                //console.log(result2[i], i);
                if (estGroupe) {
                  //console.log(result2[i]);
                  nom = "" + result2[i].nomG;
                  type = "" + result2[i].type;
                }
                else {
                  nom = result2[i].nom + " " + result2[i].prenom;
                  type = "/";
                }
                note = note + result2[i].note;
              }
              note = note / result2.length;
            }
            if (note != 0) {
              var row = document.createElement("tr");
              var cell = document.createElement("td");
              cell.append(nom);
              row.appendChild(cell);
              var cell = document.createElement("td");
              cell.append(type);
              row.appendChild(cell);
              var cell = document.createElement("td");
              cell.append(note.toFixed(2));
              row.appendChild(cell);
              tblBody.appendChild(row);
            }
          });
        tbl.appendChild(tblBody);
        tbl.classList.add("table", "table-bordered", "text-center", "table-hover");
        tab.appendChild(caption);
        tab.appendChild(tbl);
        add.append(tab);
      }
    });
}

// FONCTION QUI PERMET A USER DE NOTER UN GROUPE/ARTISTE
function ajouteNote(note, id_p) {
  var idSpec = window.sessionStorage.getItem("id_spec");
  var dbRegarde = "SELECT * FROM `note` WHERE id_participant = " + id_p + "&& id_user=" + idSpec;
  db.query(dbRegarde,
    function (err, result, fields) {
      if (err) throw err;
      if (result[0] == null) {
        var dBnote = "INSERT INTO `note`(`id_participant`, `id_user`, `note`) VALUES (" + id_p + "," + idSpec + "," + note + ")";
        alert("Vous avez mis la note de " + note);
        rajoutePoints(10);
      }
      else {
        var dBnote = "UPDATE `note` SET note=" + note + " WHERE id_participant = " + id_p + "&& id_user=" + idSpec;
        alert("Vous avez modifié votre note, vous avez mis :" + note);
      }
      db.query(dBnote,
        function (err, result, fields) {
          if (err) throw err;
        });

    });
}



function rajoutePoints(points) {
  var id_spec = window.sessionStorage.getItem("id_spec");
  var request = "UPDATE `spectateur` SET `points`=points + " + points + " WHERE id_spec = " + id_spec;
  db.query(request,
    function (err, result, fields) {
      if (err) throw err;
    });
}

////////////////////////////////////////////////////////////FIDELITE//////////////////////////
function assezPoints(cond, pts) {
  var points = getPointsSpec();
  var but = document.createElement("input");
  but.type = "button";
  if (points >= pts) {
    but.value = "ACHETER";
    but.classList.add("BUTTON_JAUNE");
    if (cond == 1) {
      but.setAttribute('onclick', "rdv()");
    }
    else if (cond == 2) {
      but.setAttribute('onclick', "acheteBiere()");
    }
    else if (cond == 3) {
      but.setAttribute('onclick', "afficheImage()");
    }
  }
  else {
    but.value = "BLOQUE";
    but.classList.add("BUTTON_GRIS");
  }
  document.getElementById(cond).appendChild(but);
}

function rdv() {
  document.getElementById('demande').remove();
  div = document.createElement('demande');
  div.id='demande';
  document.getElementById("sec").appendChild(div);
  var request = "SELECT * FROM `artiste`";
  db.query(request,
    function (err, result, fields) {
      if (err) throw err;
      var selectList = document.createElement("select");
      selectList.id = "artisteSelect";
      var option = document.createElement("option");
      option.value = 0;
      option.text = "---Choisir un artiste---";
      selectList.appendChild(option);
      for (var i = 0; i < result.length; i++) {
        var option = document.createElement("option");
        option.value = result[i].id;
        option.text = result[i].nom;
        selectList.appendChild(option);
      }

      var but = document.createElement("input");
      but.type = "button";
      but.value = "VALIDER";
      but.setAttribute('onclick', "prendRdv()");
      but.classList.add("button");
      div.appendChild(selectList);
      div.appendChild(but);
      div.classList.add("encadrer");
      document.getElementById("sec").appendChild(div);
    });
}
function prendRdv(){
  var id_art = document.getElementById("artisteSelect").value;
  var id = getID();
  if (id_art!=0){
    var request = "INSERT INTO `rdv`(`id_artiste`, `id_spec`) VALUES ("+id_art+","+id+")";
    db.query(request,
      function (err, result, fields) {
        if (err) throw err;
        rajoutePoints(-1000);
        alert("Une demande a été envoyé à l'artiste");
        window.sessionStorage.removeItem("points_spec");
        window.location.assign("specPaye.html");
      });
  }
}




function acheteBiere() {
  window.sessionStorage.removeItem("points_spec");
  rajoutePoints(-100);
  window.open('https://static.lexpress.fr/medias_8870/w_968,h_545,c_fill,g_north/v1393340206/code-barres_4541778.jpg');
  window.location.assign("specPaye.html");


}

function afficheImage() {
  document.getElementById('demande').remove();
  var div = document.createElement("div");
  div.id = "demande";
  div.classList.add("encadrer");
  document.getElementById("sec").appendChild(div);
  var request = "SELECT * FROM `image` WHERE id != 1";
  db.query(request,
    function (err, result, fields) {
      if (err) throw err;
      for (var i = 0; i < result.length; i++) {
        userPossedeIm(i, result[i].src);
      }
    });
}

function userPossedeIm(id_im, src) {
  var request2 = "SELECT * FROM `image_spec` WHERE `id_spec`=" + id + " && id_image=" + id_im;
  console.log(request2);
  db.query(request2,
    function (err, result2, fields) {
      if (err) throw err;
      if (result2.length == 0) {
        var img = document.createElement("img");
        img.src = "" + src;
        img.style.width = "150px";
        img.id = id;
        img.style.height = "150px";
        img.setAttribute('onclick', "buttonImage("+""+ id_im + ",'" + src + "')");
        document.getElementById("demande").appendChild(img);
        console.log("passe");
      }
    });
}

function buttonImage(id_im,src){
  document.getElementById('butValid').remove();
  var but = document.createElement("input");
  but.type = "button";
  but.value = "ACHETER IMAGE "+id_im;
  but.id='butValid';
  but.setAttribute('onclick', "acheteIm("+""+ id_im + ",'" + src + "');");
  but.classList.add("button");
  document.getElementById('demande').appendChild(but);

}

function acheteIm(id_im, src) {
  var id = getID();
  console.log("passe");
  var request = "INSERT INTO `image_spec`(`id_spec`, `id_image`) VALUES (" + id + "," + id_im + ")";
  db.query(request,
    function (err, result, fields) {
      if (err) throw err;
    });
  var request2 = "UPDATE `spectateur` SET `id_img`=" + id_im + " WHERE id_spec=" + id;
  db.query(request2,
    function (err, result2, fields) {
      window.sessionStorage.setItem("img_spect", "" + src);
      rajoutePoints(-50);
      window.location.assign("specPaye.html");
    });
}

