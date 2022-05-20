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


function creerEve(nom, date, prix, heure) {
  console.log("ok");
  alert(nom);
  var sql = "INSERT INTO `evenements`(`nom`, `date`, `prix`, `heure`) VALUES ('" + nom + "','" + date + "','" + prix + "','" + heure + "')";

  db.query(sql, function (err, result) {

    if (err) throw new Error("ERREUR INSERTION");
    else {
      alert("L'insertion a été réalisé !");
    }
  });
}

function connexionAdmin(nom, mdp) {
  var sql = "SELECT * FROM `admin`";
  db.query(sql, function (err, result) {
    if (nom == result[0].nom && mdp == result[0].password) {
      window.location.assign('admin.html');
    }
    else {
      alert("ERROR MDP/LOGIN");
    }
  });
}
function SuppEv(id) {
  var sql = "DELETE FROM `evenements` WHERE `evenements`.`id_evt` = " + id + "";

  db.query(sql, function (err, result) {
    if (err) alert("ERREUR");
    
    else {
      alert("DELETED");
      window.location.assign('SupprEvenement.html');
    }
  });
}

function ModifEvenements(id_evt, nom, prix, heure, date) {
  var sql = "UPDATE `evenements` SET `nom`='" + nom + "',`date`='" + date + "',`heure`='" + heure + "',`prix`='" + prix + "' WHERE `id_evt` =" + id_evt;

  db.query(sql, function (err, result) {
    if (err) alert("ERREUR");
    else {
      alert("YES");
      window.location.assign('ModifEvenement.html');
    }
  });
}


function afficheGroupe() {

  var id_evt = document.getElementById("mySelect").value;
  db.query("SELECT * FROM participe LEFT JOIN groupe ON groupe.id_groupe = participe.id_groupe LEFT JOIN artiste ON participe.id_solo=artiste.id WHERE id_evt = " + id_evt + " ORDER BY participe.temps ",
    function (err, result, fields) {
      // if any error while executing above query, throw error
      if (err) throw err;
      // if there is no error, you have the result
      var droite = document.getElementById("droite");

      let tab = document.createElement("div");
      tab.id = "tab";
      let caption = document.createElement("caption");
      caption.innerText = "Evenement";
      tab.appendChild(caption);
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
      var cellText = document.createTextNode("SOLO(/)/GROUPE(X)");
      cell.appendChild(cellText);
      row.appendChild(cell);

      var cell = document.createElement("td");
      var cellText = document.createTextNode("Heure de passage");
      cell.appendChild(cellText);
      row.appendChild(cell);



      var cell = document.createElement("td");
      var cellText = document.createTextNode("ENLEVER");
      cell.appendChild(cellText);
      row.appendChild(cell);

      tblHead.appendChild(row);
      tbl.appendChild(tblHead);

      for (var i = 0; i < result.length; i++) {
        var nom;
        var type;
        var text;
        var estGroupe = 0;
        var id_participant = result[i].id_participant;
        //console.log(result[i]);
        if (result[i].id_groupe != null) {
          nom = result[i].nomG;
          type = result[i].type;
          text = "X";
          estGroupe = 1;
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
        var cellText = document.createTextNode(text);
        cell.appendChild(cellText);
        row.appendChild(cell);


        var cell = document.createElement("td");
        var input = document.createElement("input");
        input.type = "time";
        input.id = "temps" + result[i].id_participant;
        input.value = result[i].temps;
        cell.appendChild(input);
        row.appendChild(cell);

        var cell = document.createElement("td");
        var input = document.createElement("input");
        input.setAttribute('onclick', "supprParEve2(" + result[i].id_participant + ")");
        input.value = "X";
        input.type = "button";
        cell.appendChild(input);
        row.appendChild(cell);
        tblBody.appendChild(row);
      }
      // put the <tbody> in the <table>

      if (document.getElementById("tab") != null) {
        document.getElementById("tab").remove();
      }
      else {
        let but = document.createElement("input");
        but.type = "button";
        but.value = "MAJ CRENEAUX";
        but.setAttribute('onclick', "modifCreneaux()");
        droite.append(but);
      }


      tbl.appendChild(tblBody);
      tbl.classList.add("TableCSS");
      tab.appendChild(tbl);
      droite.append(tab);

      //document.getElementById("gauche").removeChild()
      //console.log(result);
    });
}

// VA ENVOYER UN MESSAGE à LARTISTE POUR N'IMPORTE QUELLE MESSAGE
function info(txt, id) {
  console.log(id);
  db.query("SELECT * FROM `participe` WHERE id_participant = " + id,
    function (err, result, fields) {
      console.log(result[0]);
      if (err) throw err;
      if (result[0].id_groupe != null) {
        var grpeDB = "SELECT * FROM `groupe_membres` WHERE id_grpe=" + result[0].id_groupe + " && dans=1";
        console.log(grpeDB);
        db.query(grpeDB,
          function (err, result2, fields) {

            for (var i = 0; i < result2.length; i++) {
              console.log(i);
              var msg = "INSERT INTO `info`( `texte`, `id_artiste`) VALUES ('" + txt + "'," + result2[i].id_membre + ")";

              db.query(msg,
                function (err, result3, fields) { });
            }
          });
      }
      else {
        console.log(result[0]);
        var msg = "INSERT INTO `info`( `texte`, `id_artiste`) VALUES ('" + txt + "'," + result[0].id_solo + ")";
        console.log(msg);
        db.query(msg,
          function (err, result2, fields) { });
      }
    });
}


function supprParEve2(id) {
  info("VOUS AVEZ ETE SUPPRIME D UN EVENEMENT : (id) = " + id, id);
  suprParticipEve(id);
}

function suprParticipEve(id) {
  var dbmodif = "DELETE FROM `participe` WHERE `id_participant`=" + id;
  console.log(dbmodif);
  db.query(dbmodif,
    function (err, result, fields) {
      if (err) throw alert("ERROR  -> l'artiste possede deja des notes, impossible a enlever pour cette evenement");
      afficheGroupe();
    });
}



function modifCreneaux() {

  var id_evt = document.getElementById("mySelect").value;
  var dbmodif = "SELECT * FROM `participe` LEFT JOIN evenements ON evenements.id_evt = participe.id_evt WHERE participe.id_evt=" + id_evt;

  db.query(dbmodif,
    function (err, result, fields) {
      if (err) throw err;
      for (var i = 0; i < result.length; i++) {
        var id_participant = result[i].id_participant;
        var time = document.getElementById("temps" + result[i].id_participant).value;
        if (result[i].temps != time) {
          var modif = "UPDATE `participe` SET `temps`= '" + time + "' WHERE `id_participant`=" + id_participant;
          info("MODIFICATION CRENEAU POUR EVENEMENT  :" + result[0].nom + " a " + time, id_participant); db.query(modif,
            function (err, result2, fields) {
              if (err) throw err;
            });
        }
      }
      afficheGroupe();
    });
}











function ShowEve2(id) {
  db.query("SELECT * FROM `evenements` WHERE `id_evt` = '" + id + "'",
    function (err, result, fields) {
      if (err) throw alert("Error");

      if (document.getElementById('nom') == null) {
        var input = document.createElement("input");
        input.id = "nom";
        input.type = "text";
        input.name = "Nom :";
        input.id = "nom";
        input.value = result[0].nom;
        document.getElementById('1').appendChild(input);
        var input = document.createElement("input");
        input.type = "number";
        input.id = "prix";
        input.name = "Prix :"
        input.value = result[0].prix;
        document.getElementById('2').appendChild(input);
        var input = document.createElement("input");
        input.type = "date";
        input.id = "dateEve";
        input.name = "Date :";
        input.value = result[0].date.toISOString().split('T')[0];
        document.getElementById('3').appendChild(input);
        var input = document.createElement("input");
        input.type = "time";
        input.id = "temps";
        input.name = "Heure :";
        input.value = result[0].heure;
        document.getElementById('4').appendChild(input);
      }
      else {
        document.getElementById('nom').value = result[0].nom;
        document.getElementById('prix').value = result[0].prix;
        document.getElementById('dateEve').value = result[0].date.toISOString().split('T')[0];
        document.getElementById('temps').value = result[0].heure;
      }
    });
}





function ShowEve() {
  db.query("SELECT * FROM `evenements` WHERE 1",
    function (err, result, fields) {
      // if any error while executing above query, throw error
      if (err) throw err;

      var myParent = document.getElementById('haut');
      //Create and append select list
      var selectList = document.createElement("select");
      selectList.id = "mySelect";
      myParent.appendChild(selectList);


      //Create and append the options
      for (var i = 0; i < result.length; i++) {
        var option = document.createElement("option");
        option.value = result[i].id_evt;
        option.text = result[i].id_evt;
        selectList.appendChild(option);
      }
    });
}




function TabEve() {
  db.query("SELECT * FROM `evenements` WHERE 1",
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
        tblBody.appendChild(row);
      }
      // put the <tbody> in the <table>
      tbl.appendChild(tblBody);
      tbl.classList.add("table", "table-bordered", "text-center", "table-hover");
      tblHead.classList.add("table-primary");
      document.getElementById('haut').appendChild(tbl);


      console.log(result);
    });
}





function lanceEvenements(val) {
  db.query("SELECT * FROM `evenements` WHERE etat =" + val,
    function (err, result, fields) {
      // if any error while executing above query, throw error
      if (err) throw err;
      // if there is no error, you have the result
      var tbl = document.createElement("table");
      tbl.id = "tbl" + val;
      var tblBody = document.createElement("tbody");
      var tblHead = document.createElement("thead");
      if (result.length != 0) {
        if (val != 2) {

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
          row.appendChild(cell);
          tblHead.appendChild(row);
          tbl.appendChild(tblHead);
        }
        else {
          var row = document.createElement("tr");
          var cell = document.createElement("td");
          var cellText = document.createTextNode("id");
          cell.appendChild(cellText);
          row.appendChild(cell);
          row.appendChild(cell);
          row.appendChild(cell);
          row.appendChild(cell);
          tblHead.appendChild(row);
          tbl.appendChild(tblHead);
        }
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
          var but = document.createElement("input");
          but.type = "button";
          if (result[i].etat == 0) {

            but.value = "LANCER";
            but.setAttribute('onclick', "modifEtatEvt(1," + result[i].id_evt + ")");
          }
          else if (result[i].etat == 1) {

            but.value = "STOP";
            but.setAttribute('onclick', "modifEtatEvt(2," + result[i].id_evt + ")");
          }
          else if (result[i].etat == 2) {
            var but = document.createElement("input");
            but.type = "button";
            but.value = "CALCUL";
            but.setAttribute('onclick', "modifEtatEvt(3," + result[i].id_evt + ")");
          }
          else {
            but.value = "REMETTRE";
            but.setAttribute('onclick', "modifEtatEvt(0," + result[i].id_evt + ")");
          }
          cell.appendChild(but);
          row.appendChild(cell);

          tblBody.appendChild(row);
        }
        tbl.appendChild(tblBody);
      }
      else{ 
      var row = document.createElement("tr");
      var cell = document.createElement("td");
      var cellText = document.createTextNode("------AUCUN GROUPE------");
      cell.appendChild(cellText);
      row.appendChild(cell);
      tblHead.appendChild(row);
      tbl.appendChild(tblHead);
      }
      tbl.classList.add("table", "table-bordered", "text-center", "table-hover");
      if (val == 0) {
        document.getElementById("gauche").appendChild(tbl);
      }
      else if (val == 1) {
        document.getElementById("droite").appendChild(tbl);
      }
      else if (val == 3) {
        var br = document.createElement("br");
        for (var j = 0; j < 4; j++)
          document.getElementById("gauche").appendChild(br);
        document.getElementById("gauche").appendChild(tbl);
      }
      else {
        document.getElementById("droite").appendChild(tbl);
      }

    });

}

function modifEtatEvt(etat, id_evt) {
  var modifDB = "UPDATE `evenements` SET `etat`=" + etat + " WHERE id_evt = " + id_evt;
  //console.log(modifDB);
  if (etat == 2) {
    finEve(id_evt);
  }

  if (etat == 3) {
    metPointsUser(id_evt);
  }

  db.query(modifDB,
    function (err, result, fields) {
      if (err) throw err;
    });

  for (var i = 0; i < 4; i++) {
    document.getElementById("tbl" + i).remove();
    lanceEvenements(i);
  }

}

function modifEtatMSG(etat, id) {
  var modifDB = "UPDATE `message` SET `etat`=" + etat + " WHERE id_message = " + id;
  console.log(modifDB);
  db.query(modifDB,
    function (err, result, fields) {
      if (err) throw err;
      window.location.assign('message.html');
    });


}

function afficheMessage() {
  db.query("SELECT * FROM `message` WHERE 1",
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
      var cellText = document.createTextNode("id message");
      cell.appendChild(cellText);
      row.appendChild(cell);

      var cell = document.createElement("td");
      var cellText = document.createTextNode("Message");
      cell.appendChild(cellText);
      row.appendChild(cell);


      var cell = document.createElement("td");
      var cellText = document.createTextNode("Traiter");
      cell.appendChild(cellText);
      row.appendChild(cell);

      tblHead.appendChild(row);
      tbl.appendChild(tblHead);

      for (var i = 0; i < result.length; i++) {
        if (result[i].etat == 0) {
          var row = document.createElement("tr");
          var cell = document.createElement("td");
          var cellText = document.createTextNode(result[i].id_message);
          cell.appendChild(cellText);
          row.appendChild(cell);

          var cell = document.createElement("td");
          var cellText = document.createTextNode(result[i].texte);
          cell.appendChild(cellText);
          row.appendChild(cell);

          var cell = document.createElement("td");
          var butA = document.createElement("input");
          butA.value = "ACCEPTER";
          butA.type = "button";
          butA.setAttribute('onclick', "modifEtatMSG(1," + result[i].id_message + ")");

          var butR = document.createElement("input");
          butR.value = "REFUSER";
          butR.type = "button";
          butR.setAttribute('onclick', "modifEtatMSG(2," + result[i].id_message + ")");

          cell.appendChild(butA);
          cell.appendChild(butR);
          row.appendChild(cell);

          tblBody.appendChild(row)
        }
      }
      // put the <tbody> in the <table>
      tbl.appendChild(tblBody);
      tbl.classList.add("table", "table-bordered", "text-center", "table-hover");
      butA.classList.add("btn", "btn-success");
      butR.classList.add("btn", "btn-warning");
      document.getElementById("milieu").appendChild(tbl);


      console.log(result);
    });

}
//////////////////////FIN EVENEMENTS ACTION///////////////////////////

function finEve(id_evt) {
  var request2 = "SELECT * FROM participe INNER JOIN note on participe.id_participant = note.id_participant WHERE participe.id_evt=" + id_evt;
  db.query(request2,
    function (err, result2, fields) {
      if (err) throw err;
      for (var i = 0; i < result2.length; i++) {
        metDansClassement(id_evt, result2[i].id_participant);
      }
    });
}

function metDansClassement(id_evt, id_p) {
  var request = "SELECT * FROM `note` WHERE id_participant =" + id_p;
  console.log(request);
  db.query(request,
    function (err, result, fields) {
      if (err) throw err;
      var note = 0;
      if (result.length != 0) {
        for (var i = 0; i < result.length; i++) {
          note = result[i].note + note;
        }
        note = note / result.length;
        var request2 = "INSERT INTO `classement`(`id_evt`, `id_part`, `note`) VALUES (" + id_evt + "," + id_p + "," + note + ")";
        console.log(request2);
        db.query(request2,
          function (err, result, fields) {
            if (err) throw err;

          });
      }
    });
}





function metPointsUser(id_evt) {
  gereGagnant(id_evt);
  // ON ATTRIBUE LES POINTS AUX SPECTATEURS QUI ONT PARTICIPE
  var request = "SELECT DISTINCT `id_spec` FROM `pronostic` WHERE id_evt =" + id_evt;
  db.query(request,
    function (err, result, fields) {
      if (err) throw err;
      for (var i = 0; i < result.length; i++) {
        calcul(result[i].id_spec, id_evt);
      }

    });
}

function calcul(id_spec, id_evt) {


  var request = "SELECT * FROM `gagnants` LEFT JOIN pronostic on gagnants.id_evt = pronostic.id_evt && gagnants.position=pronostic.pos && gagnants.id_part = pronostic.id_p WHERE pronostic.id_evt = " + id_evt + " && pronostic.id_spec = " + id_spec;
  console.log(request);
  db.query(request,
    function (err, result, fields) {
      if (err) throw err;
      console.log(result.length);
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
      rajoutePoints(note, id_spec);
      console.log(note);
    });
}

function rajoutePoints(points, id_spec) {
  var request = "UPDATE `spectateur` SET `points`=points + " + points + " WHERE id_spec =" + id_spec;
  console.log(request);
  db.query(request,
    function (err, result, fields) {
      if (err) throw err;

    });
}




function gereGagnant(id_evt) {

  var request = "SELECT * FROM `classement` WHERE id_evt=" + id_evt + " LIMIT 3";
  console.log(request);
  db.query(request,
    function (err, result, fields) {
      if (err) throw err;
      for (var i = 0; i < result.length; i++) {
        var pos = i + 1;
        var request2 = "INSERT INTO `gagnants`(`id_part`, `id_evt`, `position`) VALUES (" + result[i].id_part + "," + id_evt + "," + pos + ")";
        console.log(request2);
        db.query(request2, function (err, result, fields) {
          if (err) throw err;

        });
      }
    });
}


