'use strict';

/*
 * categories from mongodb
 */
var mongoose = require('mongoose');
var schema = mongoose.Schema;

var archiveSchema = schema({
  name: String,
  createdate: { type: Date, default: Date.now },
});

/**
 * 저장하기전 후킹하여 전처리 함수
 */
archiveSchema.pre('save', function(next) {
  return next();
});

archiveSchema.methods = {

};

mongoose.model('archive', archiveSchema);
