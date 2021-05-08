const sharp = require("sharp");
const webp = require("webp-converter");
async function formatImage(source_image, output_image) {
  await webp.cwebp(
    "./uploads/" + source_image,
    "./images/" + output_image + '.webp',
    "-q 80",
    (logging = "-v")
  ).then(response=>console.log(response.output))
  .catch(err=>console.log(err))
  await sharp("./images/" + source_image)
    .resize(750, 500).webp()
    .toFile("./uploads/" + output_image+ '.webp')
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));
}

module.exports = formatImage;
