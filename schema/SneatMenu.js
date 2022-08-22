const mongoose = require('mongoose');
const {Schema} = mongoose;

const SneatMenu = new Schema({
    name: String,
    href: String,
    subMenu:[
        {
            name: String,
            href: String,
        }
    ]

})