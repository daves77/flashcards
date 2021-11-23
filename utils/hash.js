import jsSha from "jsSha";

const SALT = process.env.SALT;

const getHash = (input) => {
    // create new SHA object
    const shaObj = new jsSha("SHA-512", "TEXT", { encoding: "UTF8" });
    // create an unhashed cookie string based on user ID and salt
    const unhashedString = `${input}-${SALT}`;
    // generate a hashed cookie string using SHA object
    shaObj.update(unhashedString);
    return shaObj.getHash("HEX");
};
