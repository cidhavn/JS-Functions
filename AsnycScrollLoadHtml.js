/**
 * 非同步捲動載入 Html
 *
 * @param {string} url: 呼叫 API 網址
 * @param {object} data: POST 給 API 的資料
 * @param {int} nearBottomHeight: 離最底的高度，超過時會觸發載入
 * @param {function} reloadFunc: AJAX 取得資料後的動作
 *
 * Sample: asnycScrollLoadHtml('http://www.api.com.tw/test',
 *                             { id: 1 },
 *                             200,
 *                             function (data) {
 *                                 $('#content').append(data);
 *                             });
 */
function asnycScrollLoadHtml(url, data, nearBottomHeight, reloadFunc) {
    var docHeight,
        windowHeight,
        timeout,
        loading = false;

    setData();

    // Note:
    // 1. 判斷到底 => $(document).scrollTop() + $(window).innerHeight() == $(document).height()
    // 2. Browser 未最大化 window.innerHeight > $(window).innerHeight()
    // 3. IE9 以下不支援 $(document).on('scroll', function () {});
    
    $(window).on('scroll', function () {
        if ($(document).scrollTop() + windowHeight > docHeight - nearBottomHeight) {
            clearTimeout(timeout);

            timeout = setTimeout(function () {
                if (loading === false && typeof reloadFunc === "function") {
                    loading = true;

                    $.ajax({
                        url: url,
                        data: data,
                        success: function (data) {
                            reloadFunc(data);
                            setData();
                        },
                        complete: function () {
                            loading = false;
                        }
                    });
                }
            }, 100);
        }
    });

    function setData() {
        docHeight = $(document).height();
        windowHeight = $(window).innerHeight();
    }
}
