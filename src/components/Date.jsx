// Afficher l'heure actuelle
export function GetHour() {
    let date = new Date();
    let minute = date.getMinutes();
    let heure = date.getHours();

    if( heure < 10){heure = "0" + heure;}
    if( minute < 10){minute = "0" + minute;}

    return (
        <>
            <p className="text-lg">{`${heure}:${minute}`}</p>
        </>
    )
};


export function getTommorowDate() {
    const today = new Date();
  
    // Ajoutez un jour pour obtenir la date du lendemain
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    // Formatez la date du lendemain en 'YYYY-MM-DD' pour la comparer avec `dt_txt`
    return tomorrow.toISOString().split('T')[0];
}