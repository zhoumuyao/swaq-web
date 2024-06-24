export default function MapLoader() {
    return new Promise((resolve, reject) => {
        let aMapScript = document.createElement('script');
        aMapScript.setAttribute('src', 'https://webapi.amap.com/maps?v=1.4.11&key=5c913b8a517b8b143534b263a4b3b066&plugin=AMap.Geolocation');
        document.head.appendChild(aMapScript);

        aMapScript.onload = function() {
            AMap.plugin('AMap.Geolocation', function() {
                var geolocation = new AMap.Geolocation({
                    enableHighAccuracy: true,
                    timeout: 10000,
                    buttonOffset: new AMap.Pixel(10, 20),
                    zoomToAccuracy: true,
                    buttonPosition: 'RB'
                });

                geolocation.getCurrentPosition();

                AMap.event.addListener(geolocation, 'complete', function(data) {
                    // 解析完整地址
                    const formattedAddress = data.formattedAddress;
                    resolve(formattedAddress);
                });

                AMap.event.addListener(geolocation, 'error', function(data) {
                    reject(data);
                });
            });
        };
    });
}
