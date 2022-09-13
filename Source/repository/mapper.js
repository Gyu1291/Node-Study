//@ts-check
const sqlMapper = require("mybatis-mapper")
const sqlMapperPath = "./Resources/SQL/"
//a curry function that registers a mapper and returns a closure
//that can fetch queries from mybatis
exports.getMapper = function getMapper(mapperName) {
  sqlMapper.createMapper([sqlMapperPath + mapperName + ".xml"])
  return {
    makeQuery: function (queryId, params) {
      return sqlMapper.getStatement(mapperName, queryId, params, {
        language: "sql",
        indent: "  ",
      })
    },
  }
}
