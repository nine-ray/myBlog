const lind2Icon = (link) => {
    let index = 0
    if (startWith(link, "https://")) {
        index = link.indexOf("/", 8);
    } else if (startWith(link, "http://")) {
        index = link.indexOf("/", 7);
    } else {
        return false;
    }
    return link.substring(0, index)+"/favicon.ico";

};
const startWith = (str, target) => {
    const reg = new RegExp("^" + target);
    return reg.test(str);
};
const skipToOther = (link) => {
    window.open(link);
};
const endWith = (str, target) => {
    const reg = new RegExp(target + "$");
    return reg.test(str);
};
export {
    lind2Icon,
    startWith,
    endWith,
    skipToOther
}
