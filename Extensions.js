/**
 * javascript 擴充方法
 */
; (function () {
    'use strict';

    if (typeof Number.prototype.mathRound !== 'function') {
        /**
         * 四捨五入
         *
         * @param {Number} decimalPlace: 小數位數
         */
        Number.prototype.mathRound = function (decimalPlace) {
            var size = Math.pow(10, decimalPlace);

            return (this * size) / size;
        }
    }

    if (typeof Number.prototype.padLeft !== 'function') {
        /**
         * 左邊補字
         * 
         * @param {Number} length 總字串長度
         * @param {String} char 要補的字
         *
         * Sample: var t = 1; t.padLeft(2, '0'); => '01'
         */
        Number.prototype.padLeft = function (length, char) {
            var value = this.toString(),
                remainLength = (length - value.length);

            if (remainLength) {
                for (var i = 0; i < remainLength; i++) {
                    value = char + value;
                }
            }

            return value;
        }
    }

    if (typeof Number.prototype.padRight !== 'function') {
        /**
         * 右邊補字
         * 
         * @param {Number} length 總字串長度
         * @param {String} char 要補的字
         *
         * Sample: var t = 1; t.padRight(2, '0'); => '10'
         */
        Number.prototype.padRight = function (length, char) {
            var value = this.toString(),
                remainLength = (length - value.length);

            if (remainLength > 0) {
                for (var i = 0; i < remainLength; i++) {
                    value += char;
                }
            }

            return value;
        }
    }

    if (typeof Number.prototype.toMoneyString !== 'function') {
        /**
         * 數值轉千分位字串
         */
        Number.prototype.toMoneyString = function () {
            if (this < 1000) {
                return this.toString();
            }

            var number = this.toString(),
                separateIndex = (number.length % 3) - 1,
                maxIndex = number.length - 1,
                result = '';

            if (separateIndex === -1) separateIndex = 2;

            for (var i = 0; i < number.length; i++) {
                result += number[i];

                if (i === separateIndex & i < maxIndex) {
                    result += ',';
                    separateIndex += 3;
                }
            }

            return result;
        };
    }

    if (typeof Number.prototype.toByteString !== 'function') {
        /**
         * 數值轉位元組（Bytes）字串
         */
        Number.prototype.toByteString = function () {
            if (this >= 1000000) {
                return (parseFloat((this / 1000000).toFixed(1))).toMoneyString() + 'M';
            }
            else if (this >= 1000) {
                return (parseFloat((this / 1000).toFixed(1))).toMoneyString() + 'K';
            }

            return this.toString();
        };
    }
})();
(function () {
    'use strict';

    if (typeof String.prototype.format !== 'function') {
        /**
         * 字串格式化
         *
         * Sample: '{0}+{1}'.format('A', 'B') => 'A+B'
         */
        String.prototype.format = function () {
            var result = this;

            for (var i = 0; i < arguments.length; i++) {
                result = result.replace('{' + i + '}', arguments[i]);
            }

            return result;
        };
    }
})();
(function () {
    'use strict';

    if (typeof Date.prototype.diffDays !== 'function') {
        /**
         * 取得間隔天數
         *
         * @param {Date} date: 比較日期
         */
        Date.prototype.diffDays = function (date) {
            var timeDiff = Math.abs(this.getTime() - date.getTime());

            return Math.ceil(timeDiff / (1000 * 3600 * 24));
        }
    }    

    if (typeof Date.prototype.format !== 'function') {
        /**
         * 設定日期天數
         *
         * @param {Number} days: 天數
         */
        Date.prototype.addDays = function (days) {
            return this.setDate(this.getDate() + parseInt(days, 10));
        };
    }
    

    if (typeof Date.prototype.format !== 'function') {
        /**
         * 日期格式化
         * @param {String} formatString 字串格式
         *
         * Sample: new Date().format('yyyy-MM-dd') => '2018-05-16'
         */
        Date.prototype.format = function (formatString) {
            var year = this.getFullYear(),
                month = (this.getMonth() + 1),
                day = this.getDate(),
                hour = this.getHours(),
                minutes = this.getMinutes(),
                seconds = this.getSeconds();

            return formatString
                .replace('yyyy', year)
                .replace('yy', year - 1911) //民國
                .replace('y', year.toString().substring(2, 4))
                .replace('MM', month.padLeft(2, '0'))
                .replace('M', month)
                .replace('dd', day.padLeft(2, '0'))
                .replace('d', day)
                .replace('HH', hour.padLeft(2, '0'))
                .replace('h', hour)
                .replace('mm', minutes.padLeft(2, '0'))
                .replace('m', minutes)
                .replace('ss', seconds.padLeft(2, '0'))
                .replace('s', seconds);
        };
    }
})();
(function () {
    'use strict';

    if (typeof Array.prototype.insert !== 'function') {
        /**
         * 插入陣列資料
         * @param {Number} index 陣列位置
         * @param {Object} value 值
         */
        Array.prototype.insert = function (index, value) {
            return this.splice(index, 0, value);
        };
    }
})();
