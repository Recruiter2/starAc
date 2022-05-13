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

function enlevePoints(points){
    var id_spec = window.sessionStorage.getItem("id_spec");
    var request ="UPDATE spectateur SET points = points - "+ points +" WHERE id_spec = " + id_spec;
    db.query(request,
        function (err, result, fields) {
            if (err) throw err;
        }
    );
}

var getReservations = function (id_evt) {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT * FROM reservation WHERE id_evt = ?";
        db.query(sql, [id_evt], function (err, result) {
            if (!err) {
                resolve(result);
            } else {
                resolve({
                    status: "error",
                    message: "Error Getting Data",
                    debug: err
                });
            }
        });
    });
};

/**
 * 
 * @param {number} id_salle ID de la salle (si implementé un jour)
 */
async function getReservationTable(id_salle) {

    let evt_id = window.sessionStorage.getItem("id_evt");
    if (evt_id == null) {
        alert("Vous êtes arriver sur la page de réservation sans avoir d'ID d'évenement assigné...");
        window.location.assign("spectateur.html");
        return;
    }

    let salle = getSalle(id_salle);

    // On génere un tableau représentant les places libres pour la page de réservation
    var ret = [];
    for (var x = 0; x < salle[0]; x++) {
        ret.push([]);
        for (var y = 0; y < salle[1]; y++) {
            ret[x].push(1); // Chaque place est consideré comme libre base!
        }
    }

    try {
        var reservations = await getReservations(evt_id);
        reservations.forEach(element => {
            ret[element.posY][element.posX] = 2;
        });
        console.log(reservations);
    } catch (error) {
        console.log(error);
    }
    
    return ret;
}