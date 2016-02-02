// 需加入jquery參考，資料來源為Json格式
// ------------------------------------------------------------
// Sample:
// ------------------------------------------------------------
// <div id="WallArea" style="width:800px; height:600px;"></div>
// <script type="text/javascript">
//     var Wall = new ChangeTextWall();
//     Wall.setTarget("WallArea");
//     Wall.setColumnAndRow(3, 2);
//     Wall.setSource("Test.json", "word", "url");
//     Wall.start();
// </script>
//==================================
function ChangeTextWall() {
    // 指定顯示Div名稱
    var g_TargetDivID = "Area";
    // 欄
    var g_Column = 3;
    // 列
    var g_Row = 3;
    // Json資料來源
    var g_JsonSourceURL = "Test.json";
    var g_TextField = "word";
    var g_ValueField = "url";
    // 區域顏色清單
    var g_AreaColor = ["#8FBC8F", "#FFD700", "#4169E1", "#BEBEBE"];
    // 區域填滿花費時間(毫秒)
    var g_AreaFillColorMS = 1200;
    // 文字填寫速度(毫秒)
    var g_TextSpeedMS = 200;
    // 區域完成後等待時間(毫秒)
    var g_AreaCompleteStandMS = 1000;

    this.setTarget = function (ID) { g_TargetDivID = ID; };
    this.setColumnAndRow = function (Column, Row) { g_Column = Column; g_Row = Row; };
    this.setSource = function (URL, TextField, ValueField) { g_JsonSourceURL = URL; g_TextField = TextField; g_ValueField = ValueField; };
    this.start = function () { createWall(); };

    var g_divAreaName = "";
    var g_divAreaName_Color = "";
    var g_divAreaName_Link = "";
    var g_AreaCount = 0;
    var g_JsonDataTemp = null;
    var g_JsonDataCount = 0;
    var g_AreaColorTemp = null;
    var g_AreaTextTemp = null;
    var g_divArea_Width = 0;
    var g_divArea_Height = 0;

    // 建立預設值
    function Init() {
        // 設定預設ID
        g_divAreaName = g_TargetDivID + "_Area_";
        g_divAreaName_Color = g_TargetDivID + "_AreaColor_";
        g_divAreaName_Link = g_TargetDivID + "_AreaLink_";

        // 設定區域數量
        g_AreaCount = g_Column * g_Row;

        // 設定資料暫存陣列        
        g_AreaColorTemp = new Array(g_AreaCount);
        g_AreaTextTemp = new Array(g_AreaCount);
    }

    // 取得JSON資料
    function getJsonData() {
        var Result = true;

        $.ajax({
            type: "GET",
            dataType: "json",
            async: false,
            url: g_JsonSourceURL,
            success: function (Jdata) {
                g_JsonDataTemp = Jdata;
                g_JsonDataCount = g_JsonDataTemp.length;
            },
            error: function () {
                Result = false;
            }
        });

        return Result;
    }

    // 建立區域
    function createWall() {
        Init();

        var TargetDiv = $("#" + g_TargetDivID);

        if (getJsonData() === false) { alert("無法取得資料來源"); return; }
        if (TargetDiv === null) { alert("找不到指定ID"); return; }

        var TargetDiv_Width = TargetDiv.width();
        var TargetDiv_Height = TargetDiv.height();

        // 清空區域內容
        TargetDiv.empty();

        // 設定區域 width, height
        g_divArea_Width = Math.floor(TargetDiv_Width / g_Column);
        g_divArea_Height = Math.floor(TargetDiv_Height / g_Row);

        for (var AreaNo = 1; AreaNo <= g_AreaCount; AreaNo++) {
            // 設定暫存預設值
            g_AreaColorTemp[AreaNo - 1] = 0;
            setDefault_AreaTextTemp(AreaNo);

            // 建立區域
            var divAreaID = g_divAreaName + AreaNo.toString();
            var divFloat = "left";
            if (g_Column === 1) { divFloat = "inherit"; }
            TargetDiv.append("<div id=\n" + divAreaID + "\n></div>");

            $("#" + divAreaID).css({
                "float": divFloat,
                "display": "table",
                "background-color": g_AreaColor[0],
                "width": g_divArea_Width.toString() + "px",
                "height": g_divArea_Height.toString() + "px"
            });

            // 啟動區域
            areaContent_Start(AreaNo);
        }
    }

    // 取得區域顏色
    function areaContent_GetChangeColor(AreaColorTempIndex) {
        var ColorIndex = g_AreaColorTemp[AreaColorTempIndex] + 1;

        if (ColorIndex >= g_AreaColor.length) { ColorIndex = 0; }

        g_AreaColorTemp[AreaColorTempIndex] = ColorIndex;

        return g_AreaColor[ColorIndex];
    }

    // 區域顯示資料預設值
    function setDefault_AreaTextTemp(AreaNo) {
        var TempIndex = AreaNo - 1;

        if (AreaNo <= g_JsonDataCount) {
            g_AreaTextTemp[TempIndex] = TempIndex;
        }
        else {
            var ModValue = Math.floor(AreaNo % g_JsonDataCount);
            if (ModValue === 0) {
                g_AreaTextTemp[TempIndex] = 0;
            } else {
                g_AreaTextTemp[TempIndex] = ModValue - 1;
            }
        }
    }

    // 取得亂數秒數(毫秒)
    function getRandomMS(MinValue, MaxValue) {
        return Math.floor((Math.random() * (MaxValue - MinValue) + MinValue) * 1000);
    }

    // 啟動區域
    function areaContent_Start(AreaNo) {
        setTimeout(function () { areaContent_Setting(AreaNo); }, getRandomMS(1.5, 3));
    }

    // 設定區域填色動作
    function areaContent_Setting(AreaNo) {
        var divAreaJQID = "#" + g_divAreaName + AreaNo.toString();
        var divAreaColorID = g_divAreaName_Color + AreaNo.toString();

        // 建立顏色區域
        $(divAreaJQID).empty().append("<div id=\"" + divAreaColorID + "\"></div>");

        // 設定顏色區域動態模式及顯示顏色
        var divAreaColorJQID = "#" + divAreaColorID;
        var divAreaColor_Width = g_divArea_Width + "px";
        var divAreaColor_Height = g_divArea_Height + "px";
        var FillColor = areaContent_GetChangeColor(AreaNo - 1);
        var RandomMode = Math.round(Math.random() * (4 - 1) + 1);

        switch (RandomMode) {
            case 1:
                // 左→右
                $(divAreaColorJQID)
                .css({
                    "float": "left",
                    "background-color": FillColor,
                    "width": "0px",
                    "height": divAreaColor_Height
                })
                .animate({ "width": divAreaColor_Width }, g_AreaFillColorMS);
                break;
            case 2:
                // 右→左
                $(divAreaColorJQID)
                .css({
                    "float": "right",
                    "background-color": FillColor,
                    "width": "0px",
                    "height": divAreaColor_Height
                })
                .animate({ "width": divAreaColor_Width }, g_AreaFillColorMS);
                break;
            case 3:
                // 上→下
                $(divAreaColorJQID)
                .css({
                    "background-color": FillColor,
                    "width": divAreaColor_Width,
                    "height": "0px"
                })
                .animate({ "height": divAreaColor_Height }, g_AreaFillColorMS);
                break;
            case 4:
                // 下→上
                $(divAreaColorJQID)
                .css({
                    "background-color": FillColor,
                    "width": divAreaColor_Width,
                    "height": "0px",
                    "margin-top": divAreaColor_Height
                })
                .animate({ "height": divAreaColor_Height, "margin-top": "0px" }, g_AreaFillColorMS);
                break;
        }

        //因執行順序問題，所以需設定Timout等填色結束後再執行後續動作
        setTimeout(function () { areaContent_ColorFill_Completed(AreaNo, FillColor); }, g_AreaFillColorMS);
    }

    //顏色區域填色完成後續動作
    function areaContent_ColorFill_Completed(AreaNo, FillColor) {
        var divAreaJQID = "#" + g_divAreaName + AreaNo.toString();
        var divArea_Width = g_divArea_Width + "px";
        var divArea_Height = g_divArea_Height + "px";
        //清空區域
        $(divAreaJQID).children().remove();
        $(divAreaJQID).css({ "background-color": FillColor });

        //建立文字區域及設定顯示資料
        var TempIndex = AreaNo - 1;
        var DataIndex = g_AreaTextTemp[TempIndex];
        var Text = g_JsonDataTemp[DataIndex][g_TextField];
        var Value = g_JsonDataTemp[DataIndex][g_ValueField];

        var divAreaLinkID = g_divAreaName_Link + AreaNo.toString();
        var divAreaLinkJQID = "#" + divAreaLinkID;
        $(divAreaJQID)
        .append("<table cellpadding=\"0\" cellspacing=\"0\" style=\"height:" + divArea_Height + ";width:" + divArea_Width + ";padding:5px;\">" +
                "<tr><td valign=\"middle\" align=\"center\">" +
                "<a id=\"" + divAreaLinkID + "\" href=\"" + Value + "\" Target=\"_blank\"></a>" +
                "</td></tr></table>");
        $(divAreaLinkJQID).css({ color: "#FFFFFF", "font-size": "large" });

        //更新下次顯示資料Index，若新資料Index超過資料總數，則設回預設值
        var NewDataIndex = DataIndex + g_AreaCount;
        if (NewDataIndex >= g_JsonDataCount) {
            setDefault_AreaTextTemp(AreaNo);
        } else {
            g_AreaTextTemp[TempIndex] = NewDataIndex;
        }

        //顯示區域文字
        areaContent_ShowText(AreaNo, "#" + divAreaLinkID, Text, 0);
    }

    //顯示區域文字，每次增加1個字元直到完成
    function areaContent_ShowText(AreaNo, divAreaLinkJQID, Text, TextIndex) {
        if (TextIndex <= Text.length) {
            //文字未顯示完成，則遞回呼叫
            $(divAreaLinkJQID).text(Text.substring(0, TextIndex));

            TextIndex++;

            setTimeout(function () { areaContent_ShowText(AreaNo, divAreaLinkJQID, Text, TextIndex); }, g_TextSpeedMS);
        }
        else {
            //文字顯示完成後，重新起動區域
            setTimeout(function () { areaContent_Start(AreaNo); }, g_AreaCompleteStandMS);
        }
    }
}
