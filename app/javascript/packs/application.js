// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require('jquery')
require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")
require("@fortawesome/fontawesome-free/css/all.css")
// require("./geocode")
// require("./render_map")
require('./google_maps')
require("./script")
require("./format_text")
require("./button_fade")
require("./scroll")
require("./inspiration")
// require("./map")


  


//= require jquery_ujs
//= require popper
//= require bootstrap-sprockets
//= require_tree .

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)
