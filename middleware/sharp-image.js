const sharp = require("sharp");
async function formatImage(source_image, output_image) {
  await sharp(source_image)
    .resize(750, 500)
    .toFile('./images/'+output_image)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));
}

module.exports = formatImage;
                           