import multer from "multer";

export const multerUpload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "public/uploads/");
        },
        filename: (req, file, cb) => {
            cb(null, new Date().valueOf() + "_" + file.originalname);
        },
    }),
});
