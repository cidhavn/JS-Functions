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
