var config = {
    // style: 'mapbox://styles/mapbox/streets-v11',
    style: 'mapbox://styles/selahadinosma/ckvrs72on0d8216pdbb035m59',
    accessToken: 'pk.eyJ1Ijoic2VsYWhhZGlub3NtYSIsImEiOiJjazN0bWd5MnIwMXpoM2Rxc25vYTh2cWZwIn0.jLJ0WYJz1asf5kJa80iCBg',
    showMarkers: true,
    markerColor: '',
    theme: 'light',
    use3dTerrain: true,
    title: '                                                                                                                                                                                    ',
    subtitle: '                                                                                                                                                                                                               ',
    byline: '                                                                                                                                                         ',



    // footer: 'Source: source citations, etc.',
    chapters: [
        {
            id: 'slug-style-id',
            alignment: 'left',
            hidden: false,
            title: 'WOSASA',
            image: 'images/source.png',
            description: "Number of Farmers: <br> Altitude: <br> Origin: Varities: <br> Ecology: <br> Harvesting Season: <div class='mbr-section-btn align-left'><a href='mailto:info@sookoocoffee.com?cc=turewaji32%40gmail.com&subject=Shoonddhisa%20Sample%20%7C%20Inquiry&body=Dear%20Sookoo%20Coffee%2C%0A%0AI%20am%20writing%20this%20email%20to%20request%20this%20Sample%20.....%0A.....%0A.....%0A%0ARegards%2C%0Axxxxx' class='btn btn-danger-outline display-4'><span class='mbri-cart-add mbr-iconfont mbr-iconfont-btn'></span>Inquire Now</a></div>",

            location: {
                center: [-122.418398, 37.759483],
                zoom: 8.5,
                pitch: 60,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                // {
                //     layer: 'layer-name',
                //     opacity: 1,
                //     duration: 5000
                // }
            ],
            onChapterExit: [
                // {
                //     layer: 'layer-name',
                //     opacity: 0
                // }
            ]
        },
        {
            id: 'other-identifier',
            alignment: 'left',
            hidden: false,
            // title: 'Shoondhisa',
            image: 'images/source.png',
            title: 'SHOONDHISA',
            description: "Number of Farmers: <br> Altitude: <br> Origin: Varities: <br> Ecology: <br> Harvesting Season: <div class='mbr-section-btn align-left'><a href='mailto:info@sookoocoffee.com?cc=turewaji32%40gmail.com&subject=Shoonddhisa%20Sample%20%7C%20Inquiry&body=Dear%20Sookoo%20Coffee%2C%0A%0AI%20am%20writing%20this%20email%20to%20request%20this%20Sample%20.....%0A.....%0A.....%0A%0ARegards%2C%0Axxxxx' class='btn btn-danger-outline display-4'><span class='mbri-cart-add mbr-iconfont mbr-iconfont-btn'></span>Inquire Now</a></div>",

            location: {
                center: [39.15000, 7.61667],
                zoom: 8.5,
                pitch: 60,
                bearing: -43.2
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        }
    ]
};
