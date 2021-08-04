exports.getUniqueFileName = (fileName) => {
    let name =  fileName.split(".").slice(0,1); 
    let fileExtension = fileName.split(".").slice(1,);
    let uniqueFileName = name + "__" + new Date().getTime()
    uniqueFileName += fileExtension.length > 0 ? ("." + fileExtension) : "";
    return uniqueFileName;
};

exports.isFileTypeValid = (file) => {
    const fileType = file.mimetype;
    const allowedFormats = ["image/jpeg", "image/jpg", "image/png"];
    return allowedFormats.includes(fileType);
}

exports.isFileSizeValid = (file) => {
    const MAX_ALLOWED_FILE_SIZE = 2097152; // 2 MB
    return file.size <= MAX_ALLOWED_FILE_SIZE;  
}
