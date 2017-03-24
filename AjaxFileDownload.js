/**
 * iframe Ajax Download
 *
 * 缺點: 無法偵測下載結束和錯誤
 *
 * @param {string} url
 * @param {object} data
 */
function iframeAjaxDownload(url, data) {
    if ($('#downloadContainer').html()) {
        $('#downloadContainer').remove();
    }

    var htmlArray = [];

    // 顯示 Loading
    htmlArray.push('<div id="downloadContainer" style="width:130px;height:130px;"">');
    htmlArray.push('<a id="downloadTrigger" href="#downloadContent"></a>');
    htmlArray.push('<div id="downloadContent" style="text-align:center;">');
    htmlArray.push('<span style="font-size:14px;">处理档案中...</span><br/><br/>');
    htmlArray.push('<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>');
    htmlArray.push('<form id="downloadForm" method="post" action="' + url + '" target="downloadFrame" style="display:none;">');

    if (data) {
        var keys = Object.keys(data);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            htmlArray.push('<input type="hidden" name="' + key + '" value="' + data[key] + '" />');
        }
    }

    htmlArray.push('</form>');
    htmlArray.push('<iframe id="downloadFrame" name="downloadFrame" style="display:none;" />');
    htmlArray.push('</div>');
    htmlArray.push('</div>');

    $('body').append(htmlArray.join(''));

    $('#downloadForm').submit();
}

/**
 * XMLHttpRequest Ajax Download
 *
 * @param {string} url
 * @param {object} data
 */
function ajaxDownload(url, data) {
    // 顯示 Loading
    var htmlArray = [];

    htmlArray.push('<div id="downloadContainer" style="width:130px;height:130px;">');
    htmlArray.push('<div id="downloadContent" style="text-align:center;">');
    htmlArray.push('<span style="font-size:14px;">处理档案中...</span><br/><br/>');
    htmlArray.push('<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>');
    htmlArray.push('</div>');
    htmlArray.push('</div>');
    $('body').append(htmlArray.join(''));

    // 建立 Post Data
    var postData = new FormData();

    if (data) {
        var keys = Object.keys(data);

        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            postData.append(key, data[key]);
        }
    }

    // 建立連線
    var xhttp = new XMLHttpRequest();
    xhttp.open('post', url);
    xhttp.responseType = 'blob';
    xhttp.timeout = 10000;

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            var contentType = xhttp.getResponseHeader('Content-Type').toLowerCase(),
                contentDisposition = xhttp.getResponseHeader('Content-Disposition'),
                filename = '';

            if (contentDisposition) {
                var matchValues = contentDisposition.match(/filename=(.+)/); //["filename=xx.zip", "xx.zip"]

                if (matchValues != null && matchValues.length >= 2) {
                    filename = matchValues[1];
                }
            }

            if (filename.length === 0) {
                var fileTypes = {
                    'image/gif': '.gif',
                    'image/jpeg': '.jpg',
                    'text/plain': '.txt',
                    'image/png': '.png',
                    'application/msword': '.doc',
                    'application/pdf': '.pdf',
                    'application/vnd.ms-excel': '.xls',
                    'application/vnd.ms-powerpoint': '.ppt',
                    'application/zip': '.zip'
                };

                filename = 'download' + fileTypes[contentType];
            }

            var a = document.createElement('a');
            a.href = window.URL.createObjectURL(xhttp.response);
            a.download = filename;
            a.style.display = 'none';
            a.click();

            close();
        }
    };

    xhttp.ontimeout = function () {
        console.log('timeout');
        close();
    };

    xhttp.onerror = function () {
        console.log('error');
        close();
    };

    xhttp.send(postData);

    function close() {
        $('#downloadContainer').remove();
    }
}

/**
 * JQuery Ajax Download
 * 
 * @param {string} url
 * @param {object} data
 */
function jqAjaxDownload(url, data) {
    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        timeout: 5000 //ms
    })
    .done(function (data, textStatus, jqXHR) {
        var contentType = jqXHR.getResponseHeader('Content-Type').toLowerCase(),
            contentDisposition = jqXHR.getResponseHeader('Content-Disposition'),
            filename = '';

        if (contentDisposition) {
            var matchValues = contentDisposition.match(/filename=(.+)/); //["filename=xx.zip", "xx.zip"]

            if (matchValues != null && matchValues.length >= 2) {
                filename = matchValues[1];
            }
        }

        if (filename.length === 0) {
            var fileTypes = {
                'image/gif': '.gif',
                'image/jpeg': '.jpg',
                'text/plain': '.txt',
                'image/png': '.png',
                'application/msword': '.doc',
                'application/pdf': '.pdf',
                'application/vnd.ms-excel': '.xls',
                'application/vnd.ms-powerpoint': '.ppt',
                'application/zip': '.zip'
            };

            filename = 'download' + fileTypes[contentType];
        }

        var blob = new Blob([data]);
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        console.log('Ready State:' + jqXHR.readyState);
        console.log('Status:' + jqXHR.status);
        console.log('Response Headers:');
        console.log(jqXHR.getAllResponseHeaders());
        console.log('Error Message:' + errorThrown);
    });
}
