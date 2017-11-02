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
Date.prototype.diffDays = function(date) {
    var timeDiff = Math.abs(this.getTime() - date.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

/**
 * 取得日期間隔天數
 *
 * @param {date} startDate: 開始日
 * @param {date} endDate: 結束日
 */
Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() + parseInt(days));
    return this;
};
