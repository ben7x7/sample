// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
import 'bootstrap';
require("@rails/ujs").start()
require("@rails/activestorage").start()
require("channels")


const developper = document.querySelectorAll('#developper path');

for(let i = 0; i < developper.length; i++){
  console.log(`Letter ${i} is ${developper[i].getTotalLength()}`);
}
