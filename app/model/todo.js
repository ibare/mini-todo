'use strict';

/*
 * categories from mongodb
 */
var mongoose = require('mongoose');
var schema = mongoose.Schema;

var todoSchema = schema({
  name: String,
  done: { type: Boolean, default: false },
  createdate: { type: Date, default: Date.now },
  updatedate: { type: Date, default: Date.now }
});

/**
 * 저장하기전 후킹하여 전처리 함수
 */
todoSchema.pre('save', function(next) {
  if(this.isNew) {
    // 새로 생성시 필요한 작업 구현
  } else {
    this.updatedate = new Date();
  }

  return next();
});

todoSchema.methods = {

};

mongoose.model('todo', todoSchema);
