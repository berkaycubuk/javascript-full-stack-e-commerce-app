const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UploadSchema = new Schema({
  slug: String,
  fileName: String,
  fileType: String
})

const Upload = mongoose.model('upload', UploadSchema)

module.exports = Upload