export default (fileName) => {
    /*let temp = fileName.split(".");

    let tempFileName = fileName.slice(
      0,
      fileName.length - temp[temp.length - 1].length - 1
    );

    let newFileName;

    if (tempFileName.length > 12) {
      temp = fileName.split(".");
      newFileName =
        tempFileName.slice(0, 12) + "..." + " ." + temp[temp.length - 1];
    } else {
      newFileName = fileName;
    }

    return newFileName;*/ 


      
    let filename = fileName.substring(0, fileName.lastIndexOf('_'))
    let ext = fileName.substring(fileName.lastIndexOf('.'))

    if (filename.length > 12) {
      filename =
      filename.slice(0, 12) + "..." ;
    } 


    let blobName = filename + ext


    return blobName;
  };