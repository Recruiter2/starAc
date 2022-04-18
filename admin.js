//import {connect} from './connexion.js';
//connect();
const mysql = require('mysql');
//const session = require('electron');
const db = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "",
   database : "l2_info_3"
 });


db.connect(
  function(err) {
   if (err) throw err;
   console.log("CONNEXION REUSSI!2");
 });


function creerEve(nom,date,prix,heure){
  console.log("ok");
  alert(nom);
 var sql = "INSERT INTO `evenements`(`nom`, `date`, `prix`, `heure`) VALUES ('"+nom+"','"+date+"','"+prix+"','"+heure+"')";
 
    db.query(sql, function (err, result) {
    
    if (err) throw new Error("ERREUR INSERTION");
    else{
      alert("L'insertion a été réalisé !");
    }
});
}

function SuppEv(id){
var sql = "DELETE FROM `evenements` WHERE id_evt='"+id+"'";
 
    db.query(sql, function (err, result) {
    if (err) alert("ERREUR");
    else{
      alert("DELETED");
      window.location.assign('SupprEvenement.html');
    }
});
}

function ModifEvenements(id_evt,nom,prix,heure,date){
var sql = "UPDATE `evenements` SET `nom`='"+nom+"',`date`='"+date+"',`heure`='"+heure+"',`prix`='"+prix+"' WHERE `id_evt` ="+ id_evt;
 
    db.query(sql, function (err, result) {
    if (err) alert("ERREUR");
    else{
      alert("YES");
      window.location.assign('ModifEvenement.html');
    }
});
}


















function ShowEve2(id){
  db.query("SELECT * FROM `evenements` WHERE `id_evt` = '"+id+"'", 
  function (err, result, fields) {
      if (err) throw alert("Error");

        if (document.getElementById('nom')==null){
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
        input.id="dateEve";
        input.name = "Date :";
        input.value = result[0].date.toISOString().split('T')[0];
      document.getElementById('3').appendChild(input);
        var input = document.createElement("input");
        input.type = "time";
        input.id="temps";
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





function ShowEve(){
   db.query("SELECT * FROM `evenements` WHERE 1", 
  function (err, result, fields) {
    // if any error while executing above query, throw error
    if (err) throw err;

    var myParent = document.body;
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




function TabEve(){
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

    for (var i=0; i<result.length;i++){
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
  tbl.classList.add("TableCSS")
  body.appendChild(tbl);


    console.log(result);
  });
}