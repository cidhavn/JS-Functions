/**
 * 四捨五入
 *
 * @param {number} value: 值
 * @param {int} decimalPlace: 小數位數
 */
function mathRound(value, decimalPlace) {
    var size = Math.pow(10, decimalPlace);

    return (value * size) / size;
}

/**
 * 取得日期間隔天數
 *
 * @param {date} startDate: 開始日
 * @param {date} endDate: 結束日
 */
function dateDiffDays(startDate, endDate) {
    var timeDiff = Math.abs(startDate.getTime() - endDate.getTime());

    return Math.ceil(timeDiff / (1000 * 3600 * 24));
}
