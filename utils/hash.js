import bcrypt from "bcrypt";

export const hash = (password) => {
    const salt = bcrypt.genSaltSync(parseInt(process.env.SALT));
    const hash = bcrypt.hashSync(password, salt);

    return hash;
};
