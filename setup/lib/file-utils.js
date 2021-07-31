const fs = require("fs");
const fetch = require("node-fetch");
const axios = require("axios");
const path = require("path");
const request = require('request')


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
  getFileData: function (fileName) {
    return new Promise(async (resolve) => {
      let url = `https://raw.githubusercontent.com/builtjs/builtjs-theme-windy/main/public/images/${fileName}`;
      let filePath = "../../.data/uploads";
      const fullPath = path.resolve(__dirname, filePath, fileName);
      await downloadImage(url, fullPath);
      // Parse the file metadata
      const size = await this.getFileSizeInBytes(fullPath);
      const ext = fileName.split(".").pop();
      const mimeType = `image/${ext === "svg" ? "svg+xml" : ext}`;
      resolve({
        path: `./.data/uploads/${fileName}`,
        name: fileName,
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
        fileData[file.attributeName || file.name] = await this.getFileData(file.fileName);
      }
    }
    return fileData;
  }
};