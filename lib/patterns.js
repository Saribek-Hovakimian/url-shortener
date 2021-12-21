export const isValidURL = (str, customPathLink=false) => {
    let regularPattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator

    let localhostPattern = new RegExp(
      "^https?:\/\/localhost:[0-9]{1,5}\/([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)"
    );

    let localhost = false;

    if (customPathLink && (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "testing")) {
      localhost = localhostPattern.test(str);
    }
    
    return regularPattern.test(str) || localhost;
};