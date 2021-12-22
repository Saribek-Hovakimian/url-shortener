export const isValidURL = (str, customPathLink=false) => {
    let regularPattern = new RegExp(
        /^(ftp|http|https):\/\/[^ "]+$/
      );

    let localhostPattern = new RegExp(
      "^https?:\/\/localhost:[0-9]{1,5}\/([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)"
    );

    let localhost = false;

    if (customPathLink && (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "testing")) {
      localhost = localhostPattern.test(str);
    }
    
    return regularPattern.test(str) || localhost;
};