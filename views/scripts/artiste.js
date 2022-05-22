/************************************************************************************/

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



/**************************************************************************************/



function getNomArt() {
  var res = window.sessionStorage.getItem("name_art");
  return res;
}



/****************GROUPE*********************/

function creeGroupe(nom, type) {
  var radios = document.getElementsByName('membreS');

  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      var val = radios[i].value;
      break;
    }
  }

  var id = window.sessionStorage.getItem("id_art");
  var sql = "INSERT INTO `groupe`(`nomG`, `type`, `id_createur`,`recherche`) VALUES ('" + nom + "','" + type + "','" + id + "','" + parseInt(val) + "')";

  db.query(sql, function (err, result) {
    if (err) alert("ERREUR INSERTION");
    else {
      alert("L'insertion a été réalisé !");
      window.location.assign("Agroupe.html");
    }
  });
}

function modifGroupe(ent, id) {
  db.query("UPDATE `groupe` SET `recherche`='" + ent + "' WHERE `id_groupe`='" + id + "'",
    function (err, result, fields) {
      if (err) throw err;
      window.location.assign("Agroupe.html");
    }
  )
}

function supprimGroupe(id) {

  db.query("DELETE FROM `participe` WHERE id_groupe=" + id,
    function (err, result, fields) {
      if (err) throw err;
      db.query("DELETE FROM `groupe_membres` WHERE id_grpe=" + id,
        function (err, result, fields) {
          if (err) throw err;
          db.query("DELETE FROM `groupe` WHERE id_groupe=" + id,
            function (err, result, fields) {
              if (err) throw err
              alert("groupe DELETED")
              window.location.assign("Agroupe.html");
            })
        })
    })



}

function rejoindre(id, id_groupe) {
  db.query("INSERT INTO `groupe_membres`(`id_grpe`, `id_membre`, `dans`) VALUES ('" + id_groupe + "','" + id + "','0')",
    function (err, result, fields) {
      if (err) throw err;
      window.location.assign("Agroupe.html");
    })
}



function accepteRefuse(val, id, id_groupe) { //1 =refuse 0=accepte
  if (val != 0) {
    var request = " DELETE FROM `groupe_membres` WHERE id_membre='" + id + "' && id_grpe='" + id_groupe + "'";
  }
  else {
    var request = "UPDATE `groupe_membres` SET `dans`=1 WHERE id_membre='" + id + "' && id_grpe='" + id_groupe + "'";
  }

  db.query(request,
    function (err, result, fields) {
      if (err) throw err;
      window.location.assign("Agroupe.html");
    });


}



function demande() {
  var id = window.sessionStorage.getItem("id_art");
  var request = "SELECT * FROM `groupe` INNER JOIN `groupe_membres` ON groupe_membres.id_grpe = groupe.id_groupe WHERE id_createur = " + id;
  db.query(request,
    function (err, result, fields) {
      if (err) throw err;

      var compt = 0;
      for (var i = 0; i < result.length; i++) {
        if (result[i].dans == 0) {
          compt++;
        }
      }


      if (compt != 0) {
        var tbl = document.createElement("table");
        var tblBody = document.createElement("tbody");
        var tblHead = document.createElement("thead");
        var row = document.createElement("tr");

        var cell = document.createElement("td");
        var cellText = document.createTextNode("Nom");
        cell.appendChild(cellText);
        row.appendChild(cell);

        var cell = document.createElement("td");
        var cellText = document.createTextNode("Nom membre");
        cell.appendChild(cellText);
        row.appendChild(cell);

        var cell = document.createElement("td");
        var cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);

        var cell = document.createElement("td");
        var cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);

        tblHead.appendChild(row);
        tbl.appendChild(tblHead);

        for (var i = 0; i < result.length; i++) {
          if (result[i].dans === 0) {
            var row = document.createElement("tr");

            var cell = document.createElement("td");
            var cellText = document.createTextNode(result[i].nomG);
            cell.appendChild(cellText);
            row.appendChild(cell);

            var cell = document.createElement("td");
            var cellText = document.createTextNode(result[i].id_membre);
            cell.appendChild(cellText);
            row.appendChild(cell);

            var cell = document.createElement("td");
            var a = document.createElement('a');
            var link = document.createTextNode("Accepter");
            a.appendChild(link);
            a.href = "javascript:accepteRefuse(0," + result[i].id_membre + "," + result[i].id_groupe + ")";
            cell.appendChild(a);
            row.appendChild(cell);

            var cell = document.createElement("td");
            var a = document.createElement('a');
            var link = document.createTextNode("Refuser");
            a.appendChild(link);
            a.href = "javascript:accepteRefuse(1," + result[i].id_membre + "," + result[i].id_groupe + ")";
            cell.appendChild(a)
            row.appendChild(cell);


            tblBody.appendChild(row);
          }
          tbl.appendChild(tblBody);
          tbl.classList.add("table", "table-bordered", "text-center", "table-hover")
          document.getElementById("droite").appendChild(tbl);
        }
      }
      else {
        var link = document.createTextNode("Aucune demande");
        document.getElementById("droite").appendChild(link);

      }
    });
}



function afficheGroupe(possede) {

  var id = window.sessionStorage.getItem("id_art");
  var res = "";
  if (possede == 0) {
    res = "SELECT * FROM `groupe` LEFT JOIN groupe_membres ON groupe.id_groupe = groupe_membres.id_grpe AND groupe_membres.id_membre="+id+" WHERE groupe.id_createur!="+id;
    console.log(res);
    }
  else {
    res = "SELECT * FROM `groupe` WHERE groupe.id_createur="+id;
  }
  db.query(res,
    function (err, result, fields) {
      if (err) throw err;
      var id = window.sessionStorage.getItem("id_art");
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

      if (possede != 0) {
        var cell = document.createElement("td");
        var cellText = document.createTextNode("Supprimer");
        cell.appendChild(cellText);
        row.appendChild(cell);
      }

      tblHead.appendChild(row);
      tbl.appendChild(tblHead);

      for (var i = 0; i < result.length; i++) {

        var recherche = result[i].recherche;
        var id_groupe = result[i].id_groupe;
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
        var rep = document.createElement('a');



        if (possede != 0) { // Pour la 3me colonne on regarde si ce sont le groupe appartient à l'utilisateur, si oui, on n'affichera que le oui/non pour modifier l'entrée de nouveux membres dans le groupe
          if (recherche == 1) {
            var link = document.createTextNode("Oui");
            rep.appendChild(link);
            rep.href = "javascript:modifGroupe(0," + result[i].id_groupe + ");";
          }
          else {
            var link = document.createTextNode("Non");
            rep.appendChild(link);
            rep.href = "javascript:modifGroupe(1," + result[i].id_groupe + ");";
          }

        }

        else { // Sinon on regarde si l'utilisatuer peut rejoindre/partir/En attente dans un groupe qui ne lui appartient pas
          //console.log(id,id_groupe,getGroupe(id, id_groupe));

          //console.log(result[i]);
          if (result[i].dans != null) {
            if (result[i].dans == 1) {
              var link = document.createTextNode("Appartient");
            }
            else {
              var link = document.createTextNode("En attente");
            }
          }
          else {
            if (recherche == 1) {
              var link = document.createTextNode("Rejoindre");
              rep.href = "javascript:rejoindre(" + id + "," + id_groupe + ");";
            }
            else {
              var link = document.createTextNode("Bloque");
            }
          }

        }

        rep.appendChild(link);
        cell.appendChild(rep);
        row.appendChild(cell);
        

        if (result[i].dans== 1 ) {
          var cell = document.createElement("td");
          var a = document.createElement('a');
          var link = document.createTextNode("Partir");
          a.appendChild(link);
          a.href = "javascript:accepteRefuse(1," + result[i].id_membre + "," + result[i].id_groupe + ")";
          cell.appendChild(a)
          row.appendChild(cell);
        }



        if (possede != 0) {
          var cell = document.createElement("td");
          var rep = document.createElement('a');
          var link = document.createTextNode("Supprimer");
          rep.appendChild(link);
          rep.href = "javascript:supprimGroupe(" + id_groupe + ");";
          cell.appendChild(rep);
          row.appendChild(cell);
        }
        tblBody.appendChild(row);
        sessionStorage.removeItem("groupe");
      }
      tbl.appendChild(tblBody);
      tbl.classList.add("table", "table-bordered", "text-center", "table-hover")
      if (possede != 0) {
        document.getElementById("Atab1").appendChild(tbl);
      }
      else {
        document.getElementById("Atab2").appendChild(tbl);
      }
      console.log(result);

    });
}
/*************************************MESSAGERIE********************************** */

// if info = 1 then 
function afficheMessage(info) {
  var id = window.sessionStorage.getItem("id_art");
  var res = "";
  if (info === 0) {
    res = "SELECT * FROM `message` WHERE id_artiste=" + id;
  }
  else if (info==2){
    res = "SELECT * FROM `rdv` WHERE etat=0 && `id_artiste`=" + id;
  }
  else {
    res = "SELECT * FROM `info` WHERE `id_artiste` =" + id;
  }

  db.query(res,
    function (err, result, fields) {
      var div = document.createElement("div");
      div.id = "tab" + info;
      if (result.length != 0) {

        if (err) throw err;
        var tbl = document.createElement("table");
        var tblBody = document.createElement("tbody");
        var tblHead = document.createElement("thead");
        var row = document.createElement("tr");

        var cell = document.createElement("td");
        var cellText = document.createTextNode("Contenu");
        cell.appendChild(cellText);
        row.appendChild(cell);

        if (info == 0) {
          var cell = document.createElement("td");
          var cellText = document.createTextNode("etat");
          cell.appendChild(cellText);
          row.appendChild(cell);
        }

        var cell = document.createElement("td");
        var cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);

        tblHead.appendChild(row);
        tbl.appendChild(tblHead);

        for (var i = 0; i < result.length; i++) {

          var row = document.createElement("tr");
          var cell = document.createElement("td");
          if (info==2){
            var cellText = document.createTextNode("L'artiste souhaite vous voir id="+result[i].id_spec);
          }
          else{
          var cellText = document.createTextNode(result[i].texte);
          }
          cell.appendChild(cellText);
          row.appendChild(cell);

          if (info == 0) {

            var cell = document.createElement("td");
            var cellText = document.createTextNode("En attente");
            if (result[i].etat == 1) {
              cellText = document.createTextNode("Accepte");
            }
            else if (result[i].etat == 2) {
              cellText = document.createTextNode("Refuse");
            }
            cell.appendChild(cellText);
            row.appendChild(cell);
          }


          var cell = document.createElement("td");
          var a = document.createElement('a');
          var link = document.createTextNode("X");
          a.appendChild(link);
          if (info === 0) {
            a.href = "javascript:supprimeMSG(" + result[i].id_message + ")";
          }
          else if (info==2){
            var a2 = document.createElement('a');
            var link = document.createTextNode("V");
            a2.href = "javascript:validRDV(" + result[i].id_rdv + ")";
            a.href = "javascript:supprimRDV(" + result[i].id_rdv + ")";
            a2.appendChild(link);
            cell.appendChild(a2);
            cell.append("----");
          }
          else {
            a.href = "javascript:supprimeINFO(" + result[i].id_info + ")";
          }
          cell.appendChild(a)
          row.appendChild(cell);

          tblBody.appendChild(row);
        }
        tbl.appendChild(tblBody);
        tbl.classList.add("table", "table-bordered", "text-center", "table-hover")
        div.append(tbl);
      }
      else {
        var cellText = document.createTextNode("----------------AUCUN MESSAGES----------------");
        div.append(cellText);
      }
      if (info == 1) {
        document.getElementById("tabInfo").appendChild(div);
      }
      else if (info==2){
        document.getElementById("rdv").appendChild(div);
      }
      else {
        document.getElementById("tabMsg").appendChild(div);
      }

    });
}
function validRDV(id_rdv){
  var request ="UPDATE `rdv` SET `etat`=1 WHERE id_rdv="+id_rdv;
  db.query(request,
    function (err, result, fields) {
      document.getElementById("tab2").remove();
      afficheMessage(2)
    });
}



function supprimRDV(id_rdv){
  var request ="DELETE FROM `rdv` WHERE `id_rdv`="+id_rdv;
  db.query(request,
    function (err, result, fields) {
      document.getElementById("tab2").remove();
      afficheMessage(2)
    });
}

function supprimeINFO(id) { 
  db.query("DELETE FROM `info` WHERE `id_info`=" + id,
    function (err, result, fields) {
      document.getElementById("tab1").remove();
      afficheMessage(1)
    });
}

function supprimeMSG(id) {
  console.log(id);
  db.query("DELETE FROM `message` WHERE `id_message`=" + id,
    function (err, result, fields) {
      document.getElementById("tab0").remove();
      afficheMessage(0)
    });
}


function envoiMessage(msg) {
  var radios = document.getElementsByName('membreS');
  var id = window.sessionStorage.getItem("id_art");

  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      var val = radios[i].value;
      break;
    }
  }
  msg = val + " : " + msg;
  var insert = "INSERT INTO `message`(`id_artiste`, `texte`, `etat`) VALUES (" + id + ",'" + msg + "',0)";
  db.query(insert,
    function (err, result, fields) {
      window.location.assign("messagerie.html");
    });
}


/***********************************************************************************/
function artisteCreeCompte(nom, prenom, mail, mdp1, mdp2, date) {
  console.log(nom, mail, mdp1, mdp2, date);
  if (mdp1 == mdp2) {
    var add = "INSERT INTO `artiste`(`nom`, `prenom`, `mail`, `password`, `date_naissance`) VALUES ('" + nom + "','" + prenom + "','" + mail + "','" + mdp1 + "','" + date + "')";

    db.query(add,
      function (err, result, fields) {
        if (err) throw err;
        alert("Insertion");
      });
    window.location.assign("login.html");
  }
  else {
    alert("les deux mots de passes ne correspondent pas !");
  }

}





function ArtisteConnexion(nom, mdp) {

  var res = null;
  db.query("SELECT `id`,`nom`, `password` FROM artiste",
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


/***********************************************************/
function afficheAgd(info) {
  var id = window.sessionStorage.getItem("id_art");
  var res = "";

  if (info === 0) {
      res = "SELECT * FROM `participe` JOIN evenements on participe.id_evt = evenements.id_evt WHERE `id_solo`= "+id+" ORDER BY evenements.date";
  }
  else if (info == 2) {
      res = "SELECT * FROM `rdv` JOIN spectateur on rdv.id_spec=spectateur.id_spec WHERE etat=1 && `id_artiste`=" + id;
  }
  else if (info == 4) {
    res = "SELECT * FROM `participe` JOIN groupe on participe.id_groupe = groupe.id_groupe JOIN evenements on participe.id_evt = evenements.id_evt  WHERE groupe.id_createur=" + id;
}
  else {
      res = "SELECT * FROM `participe` INNER JOIN groupe on groupe.id_groupe=participe.id_groupe INNER JOIN groupe_membres on groupe_membres.id_grpe = groupe.id_groupe JOIN evenements on evenements.id_evt = participe.id_evt WHERE groupe_membres.dans=1 && groupe_membres.id_membre=" + id;
  }
  console.log(res);
  db.query(res,
      function (err, result, fields) {
          if (result.length != 0) {

              if (err) throw err;
              /*
              var tbl = document.createElement("table");
              var tblBody = document.createElement("tbody");
              var tblHead = document.createElement("thead");
              var row = document.createElement("tr");
              var cell = document.createElement("td");
              var motif ='----------------------------------------------------';
              var cellText = document.createTextNode("");
              cell.appendChild(cellText);
              row.appendChild(cell);
              tblHead.appendChild(row);
              tbl.appendChild(tblHead);
              */
              var cellText = document.createTextNode("----------------------------------------------------");
              var row = document.createElement("tr");
              var cell = document.createElement("td");
              cell.appendChild(cellText);
              row.appendChild(cell);
              document.getElementById('agenda').append(row);
              for (var i = 0; i < result.length; i++) {
                  var row = document.createElement("tr");
                  var cell = document.createElement("td");
                  if (info==0){
                    var cellText = document.createTextNode("("+result[i].id_participant+") SOLO : "+result[i].nom + "("+result[i].date.toISOString().split('T')[0]+") => "+result[i].heure);
                  }
                  else if(info==1){
                    var cellText = document.createTextNode("("+result[i].id_participant+") GROUPE ("+result[i].nomG+"): "+result[i].nom + "("+result[i].date.toISOString().split('T')[0]+") => "+result[i].heure);
                  }
                  else if(info==4){
                    var cellText = document.createTextNode("("+result[i].id_participant+") MES GROUPE ("+result[i].nomG+"): "+result[i].nom + "("+result[i].date.toISOString().split('T')[0]+") => "+result[i].heure);
                  }
                  else{
                    var cellText = document.createTextNode("("+ result[i].id_rdv+") RDV : " + result[i].nom + " "+result[i].prenom);
                  }
                  
                  cell.appendChild(cellText);
                  row.appendChild(cell);
                  //tblBody.appendChild(row);
                  document.getElementById('agenda').append(row);
                  var cellText = document.createTextNode("----------------------------------------------------");
                  var row = document.createElement("tr");
                  var cell = document.createElement("td");
                  cell.appendChild(cellText);
                  row.appendChild(cell);
                  document.getElementById('agenda').append(row);
                  //tblBody.appendChild(row);
              }
              //tbl.appendChild(tblBody);
              //tbl.classList.add("TableCSS");
              //document.getElementById('centrer').append(tbl);
          }
      });
}






function Deco() {
    window.sessionStorage.removeItem("id_art");
    window.location.assign("index.html")

}
