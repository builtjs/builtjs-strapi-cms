const fs = require("fs");
const fsp = fs.promises;
const axios = require("axios");
const path = require("path");

async function downloadImage(url, fullPath) {
  return new Promise((resolve, reject) => {
    axios({
      url,
      responseType: "stream",
    }).then((response) =>
      response.data
        .pipe(fs.createWriteStream(fullPath))
        .on("finish", () => {
          resolve();
        })
        .on("error", (e) => reject(e))
    );
  });
}

module.exports = {
  getFileSizeInBytes: async function (filePath) {
    const stats = fs.statSync(filePath);
    const fileSizeInBytes = stats["size"];
    return fileSizeInBytes;
  },
  getFileData: function (file) {
    return new Promise(async (resolve) => {
      if(!file.path || !file.format || !file.name){
        resolve(null);
      }
      let filePath = "../../.data/uploads";
      const fullPath = path.resolve(__dirname, filePath);
      const imagePath = `${file.path}/${file.name}.${file.format}`;
      if (!fs.existsSync(fullPath + imagePath)) {
        fsp.mkdir(fullPath + file.path, { recursive: true });
      }
      let url = `<RAW_REPO_URL>${imagePath}`;    
      await downloadImage(url, fullPath + imagePath);
      const size = await this.getFileSizeInBytes(fullPath);
      const mimeType = `image/${file.format === "svg" ? "svg+xml" : file.format}`;
      resolve({
        path: `./.data/uploads${imagePath}`,
        name: file.name,
        size,
        type: mimeType,
      });
    });
  },
  getFilesData: async function(files){
    const fileData = {};
    if (files && files.length) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        fileData[file.attributeName || file.name] = await this.getFileData(file);
      }
    }
    return fileData;
  }
};