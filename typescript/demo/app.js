var CheckIsInArray = /** @class */ (function () {
    function CheckIsInArray() {
        var _this = this;
        this.output = '';
        var Color;
        (function (Color) {
            Color[Color["Red"] = 0] = "Red";
            Color[Color["Black"] = 1] = "Black";
            Color[Color["White"] = 2] = "White";
        })(Color || (Color = {}));
        var colors = [Color.Black, Color.Black, Color.White];
        this.isInArray(Color.Black, colors, function (res) {
            console.log(res);
            _this.output = res.toString();
        });
    }
    CheckIsInArray.prototype.isInArray = function (target, array, callback) {
        var flag = false;
        array.forEach(function (item) {
            if (item === target) {
                flag = true;
            }
        });
        if (callback) {
            callback(flag);
        }
        return flag;
    };
    return CheckIsInArray;
}());
var test = new CheckIsInArray();
