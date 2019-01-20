
function getDateUTCMilliseconds (date) {
    // Dear god this is incredibly retarded
    return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
        date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
}
function durationToString (fromDate, toDate) {
    let durationInMilliseconds = getDateUTCMilliseconds(toDate) - getDateUTCMilliseconds(fromDate);
    let durationInSeconds = durationInMilliseconds * 1e-3;

    if (durationInSeconds < 60) {
        return ""+(durationInSeconds.toFixed(0))+"s";
    } else if (durationInSeconds < 3600) {
        return ""+((durationInSeconds / 60).toFixed(1))+"m";
    } else if (durationInSeconds < 86400) {
        return ""+((durationInSeconds / 3600).toFixed(1))+"h";
    } else {
        return ""+((durationInSeconds / 3600).toFixed(1))+"d";
    }
}
export default durationToString;
