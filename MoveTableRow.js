//sample:
//function MoveUp() { MoveTableRow("chkSelect", 2, true); }
//function MoveDown() { MoveTableRow("chkSelect", 2, false); }
//<table><tr><td><input type="checkbox" name="chkSelect" /></td></tr></table>

//checkboxsName: 選取checkbox name
//parentCount: Row最上層<tr>階層數
//isUp: [true = up][false = down]
function MoveTableRow(checkboxsName, parentCount, isUp) {
    var checkboxs = document.getElementsByName(checkboxsName);
    var checkeds = [];
    if (checkboxs != null) {
        var checkedIndex = 0;
        for (var i = 0; i < checkboxs.length; i++) {
            if (checkboxs[i].checked) {
                checkeds[checkedIndex] = checkboxs[i];
                checkedIndex++;
            }
        }
    }

    if (checkeds.length > 0) {
        for (var i = 0; i < checkeds.length; i++) {
            var target = $(checkeds[i]);
            for (var i = 0; i < parentCount; i++) { target = target.parent(); }
            if (direction == "up") {
                // move up
                if ($(target).prev().html() != null) { $(target).insertBefore($(target).prev()); }
            }
            else {
                // move down
                if ($(target).next().html() != null) { $(target).insertAfter($(target).next()); }
            }
        }
    }
    else {
        alert("請選擇要移動的項目");
    }
}
