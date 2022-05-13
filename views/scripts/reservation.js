const mysql = require('mysql');
//const session = require('electron');
const db = mysql.createConnection({
    port: 1183,
    host: "localhost",
    user: "l2_info_3",
    password: "Kaduu6Ox",
    database: "l2_info_3",
 });


db.connect(function(err) {
   if (err) throw err;
   console.log("CONNEXION REUSSI!");
 });

/**
 * 
 * @param {number} id_salle L'ID de la salle (si implementé un jour)
 */
function getSalle(id_salle) {
    return [10, 10]; // Retourne les dimensions de la salle Hauteur, Longueur
}

/**
 * 
 * @param {number} id_salle ID de la salle (si implementé un jour)
 */
function getReservationTable(id_salle) {

    let evt_id = window.sessionStorage.getItem("evt_id");
    if (evt_id == null) {
        alert("Vous êtes arriver sur la page de réservation sans avoir d'ID d'évenement assigné...");
        window.location.assign("spectateur.html");
        return;
    }

    let salle = getSalle(id_salle);

    // On génere un tableau représentant les places libres pour la page de réservation
    let ret = [];
    for (var x = 0; x < salle[0]; x++) {
        ret.push([]);
        for (var y = 0; y < salle[1]; y++) {
            ret[x].push(1); // Chaque place est consideré comme libre base!
        }
    }

    return ret;
}