
var fs = require('fs')
var unzip = require('unzip2')
var sharp = require('sharp')


var dir = './tmpe'
var name = "foto";
var iterator = 1;

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir)
}

var strim = fs.createReadStream('dp.zip').pipe(unzip.Extract({ path: dir }));

strim.on('finish', function () {
  if (fs.existsSync(dir)){
      fs.mkdirSync(dir+'/'+name)
  }
  fs.readdir('./tmpe', (err, files) => {
    files.forEach(file => {
      if (file.includes('.JPG')) {
      file.replace(".JPG", ".jpg");
      sharp(`${dir}/${file}`)
        .resize(100, 100)
        .toFile(`${dir}/${name}/b${iterator}.JPG`, (err, info) => console.log(err));
        iterator++;
    }
    });
  })
});
