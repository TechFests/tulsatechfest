function isNumeric(value) {
    return /^\d+$/.test(value);
}

function removeSortIndex(str) {
    var firstDash = str.indexOf("-");
    if (firstDash === -1) {return str;}
    var sortIndex = str.substr(0, firstDash);
    //console.log(`sortIndex:${sortIndex}`);
    if (!isNumeric(sortIndex)) {return str;}
    ++firstDash;
    str = str.substr(firstDash, str.length - firstDash);
    return str;
}

module.exports.removeSortIndex = removeSortIndex;

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}
  
function toTitleCaseSorted(str) {
    return removeSortIndex(str).replace('-', ' ').replace(
        /\w\S*/g,
        function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

//const toSlug = name => slugify(name).toLocaleLowerCase();

module.exports.toTitleCase = toTitleCase;

