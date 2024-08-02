export default {
    init: function () {
        const AK = 'GXu6KNxiNuZ84Nfkjq4e9jOd6TUEoY0t';  //你的AK
        const BMap_URL = "https://api.map.baidu.com/api?v=2.0&ak=GXu6KNxiNuZ84Nfkjq4e9jOd6TUEoY0t" +
            AK + "&s=1&callback=onBMapCallback";
        return new Promise((resolve, reject) => {
            // 如果已加载直接返回
            if (typeof BMap !== 'undefined') {
                resolve(BMap);
                return true;
            }
            // 百度地图异步加载回调处理
            window.onBMapCallback = function () {
                resolve(BMap);
            };
        });
    }
}

