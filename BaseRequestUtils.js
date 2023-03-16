/**
 * 成功返回结果
 * @param res
 * @param data
 * @param msg
 */
function successResult(res, data, msg = "success") {
  res.end(JSON.stringify({
    "code": 200,
    msg,
    data
  }), 'utf-8');
}

/**
 * 失败返回结果
 * @param res
 * @param msg
 * @param code
 * @param data
 */
function errorResult(res, msg = "请求失败", code = 500, data = null) {
  res.end(JSON.stringify({
    code,
    msg,
    data
  }), 'utf-8');
}


module.exports = {
  successResult,
  errorResult
}
