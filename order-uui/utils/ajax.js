/**
 * ajax封装
 * by Fang
 */
function $ajax(url, postData, succCallback, errorCallback, type, dataType) {
  var type = type || "post";
  var dataType = dataType || "json";
  $.ajax({
    type: type,
    url: url,
    data: postData,
    contentType: "application/json;charset=utf-8",
    success: function(res) {
      if (res.success) {
        if (succCallback) {
          succCallback(res);
        }
      } else {
        if (errorCallback) {
          errorCallback(res);
        }
      }
    }
  });
}