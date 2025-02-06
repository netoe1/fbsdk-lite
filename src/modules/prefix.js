const LIBRARYNAME = "fbsdklite";
function getPrefixByState(state) {
  return `[${LIBRARYNAME}-${state}]:`;
}

//#region EXPORT_REGION
module.exports = { LIBRARYNAME, getPrefixByState };
//#endregion EXPORT_REGION
