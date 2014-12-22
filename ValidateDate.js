// 確認必填資料
function checkRequireData(value) {
    return (value != null && value.replace(/ /gi, "").replace(/　/gi, "").length > 0)
}
// 確認是否為數值
function checkIsNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}
