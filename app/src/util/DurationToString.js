
function getDateUTCMilliseconds (date) {
    // Dear god this is incredibly retarded
    return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
        date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
}
function getDuration (fromDate, toDate) {
    return getDateUTCMilliseconds(toDate) - getDateUTCMilliseconds(fromDate);
}

// You can use this with Date.now(), or as the result of getDuration(new Date(), new Date())
// Please try to use Date.now() (integral milliseconds since epoch) and not the above 2
// functions for duration handling...
function durationToString (durationInMilliseconds) {
    if (!durationInMilliseconds || isNaN(durationInMilliseconds)) {
        return "0s";
    }
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
export { durationToString, getDuration, getDateUTCMilliseconds };

