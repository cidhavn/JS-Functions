// 滑動固定標題在最上方
// 支援: TABLE (Format: <thead><tr><th><div>Title</div></th></tr></thead>)
//       DIV (Style 需另外設定)
// =======================================
// Sample: <table id="fixedHeader"></table> => FixedHeaderOnScrollTop("fixedHeader");
// =======================================
function FixedHeaderOnScrollTop (elementID) {
    var $targetElement = $("#" + elementID);
    var targetType = $targetElement.get(0).tagName;
    var targetTop = $targetElement.offset().top;
    var tempWindowWidth = $(window).width();

    // 建立要顯示的 div，並附加在目標之後
    var $displayHeader = $(document.createElement("div"));
    $displayHeader.css({ "display": "none", "position": "fixed", "top": "0", "width": $targetElement.width() });
    $targetElement.after($displayHeader);            

    // 依 tag 做處理
    var $cloneElement = $($targetElement.clone());
    switch (targetType) {
        case "TABLE":
            // 移除不需要的 element (ex: tbody)
            $cloneElement.children().each(function (index, element) {
                if (element.tagName !== "THEAD") { $(element).remove(); }
            })
            // 設定欄寬，複製的 table 內容移除後欄寬會跑掉
            setCloneTableColumnWidth(true);                    
            // handle window resize event
            var timeoutKey;
            $(window).bind("resize", function () {
                var nowWidth = $(this).width();
                var resizeRange = tempWindowWidth - nowWidth;

                if (resizeRange <= -20 || resizeRange >= 20) {
                    tempWindowWidth = nowWidth;
                    // 利用 setTimeout 的 Key 來控制，避免頻繁處理 DOM 而造成 CPU 飆高
                    clearTimeout(timeoutKey);
                    timeoutKey = setTimeout(function () { setCloneTableColumnWidth(false); }, 500);
                }
            });
            break;
    }
    $displayHeader.append($cloneElement);
            
    // 處理滾動事件，AJAX 後會失效，所以要先處理一次
    fixedHeader();
    $(window).bind("scroll", function () { fixedHeader(); });

    function setCloneTableColumnWidth(cloneEvent) {
        // 設定 Table Width
        $cloneElement.css("width", $targetElement.width() + "px");
        // 處理 Header Column，
        // <th> 寬度會因 css 而造成設定和顯示會有出入，所以要多包一層 <div style="margin:0 auto;display:block;">
        $targetElement.find("thead tr th div").each(function (index, element) {
            var $cloneTH = $($cloneElement.find("thead tr th div")[index]);
            // 設定 Column Width
            $cloneTH.css("width", element.clientWidth + "px");
            // 註冊原來物件的 Event
            if (cloneEvent) { $cloneTH.click(function () { $(element).trigger("click"); }); }
        });
    }
    function fixedHeader() {
        var srollTop = $(window).scrollTop();
        if (srollTop > targetTop && $displayHeader.is(':hidden')) { $displayHeader.show(); }
        else if (srollTop < targetTop) { $displayHeader.hide(); }
    }
}
