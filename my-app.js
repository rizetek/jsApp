var myApp = new Framework7({
    pushState: true,
    swipePanel: 'left',
    material: true,
    materialPreloaderHtml: '<span class="preloader-inner"><span class="preloader-inner-gap"></span><span class="preloader-inner-left"><span class="preloader-inner-half-circle"></span></span><span class="preloader-inner-right"><span class="preloader-inner-half-circle"></span></span></span>',
    cache: true,
    fastClicks: true,
    onAjaxStart: function (xhr) {
        myApp.showIndicator();
    },
    onAjaxComplete: function (xhr) {
        myApp.hideIndicator();
    }
});
var $$ = Dom7;
var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true
});


document.addEventListener("backbutton", onBackKeyDown);

// Handle the back button
function onBackKeyDown(e) {
    if ($('.modal-in').length === 1) {
        myApp.closeModal();
    }
    else if (($('.modal-in')[0] === undefined) && (window.history.state === null)) {
        document.removeEventListener("backbutton", onBackKeyDown);
        return true;
    }
    else if (window.history.state !== null) {
        window.history.back();
    }
}


function showNews(path) {
    var newsBlock = $('.news-block');
    myApp.showIndicator();
    if (newsBlock[0].innerHTML == "") {
        $.ajax(path, {
            timeout: 500,
            cache: false,
            success: function (data) {
                if ($(data)["0"].data == "CHECK TAG") {
                    console.log($(data));
                    console.log($(data).innerText);
                    $('.news-block').append(data);
                    newsHeight = newsBlock["0"].offsetHeight;
                    newsBlock.css('display', 'block');
                    setTimeout(function () {
                        newsBlock.css('opacity', '1')
                    }, 100);
                    newsBlock.addClass('show-news');
                    myApp.hideIndicator();
                } else {
                    myApp.hideIndicator();
                    myApp.alert('<p style="text-transform:none; text-align:center">Проверьте позже.. <br />Или проверьте интернет соединение!</p>', '<p style="text-transform:none; text-align:center">Пока новостей нет!</p>');
                }
            },
            error: function () {
                myApp.hideIndicator();
                myApp.alert('<p style="text-transform:none; text-align:center">Проверьте позже.. <br />Или проверьте интернет соединение!</p>', '<p style="text-transform:none; text-align:center">Пока новостей нет!</p>');
                return false;
            }
        });
    } else if (newsBlock.hasClass('show-news')) {
        newsBlock.removeClass('show-news');
        newsBlock.css('display', 'none');
        newsBlock.css('opacity', '0');
        myApp.hideIndicator();
    } else if (newsBlock[0].innerHTML != "") {
        newsBlock.addClass('show-news');
        newsBlock.css('display', 'block');
        setTimeout(function () {
            newsBlock.css('opacity', '1')
        }, 100);
        myApp.hideIndicator();
    } else {
        return false;
    }
};

function showChat () {
    myApp.popup('.popup-chat');
};


function removeSlider() {
    $('.photo-browser-popup').remove();
    $('.popup-overlay').remove();
}

function callPsk() {
    window.open('tel:88126403838', '_system');
    console.log('calling');
}

function showPromo() {
    var link = "http://rizetek.com/promo1.php";
    var promoBlock = $('.promo-holder');
    myApp.showIndicator();
    if (promoBlock[0].innerText == "") {
        $.ajax(link, {
            timeout: 500,
            cache: false,
            success: function (data) {
                if ($(data)["0"].data == "CHECK TAG") {
                    promoBlock.append(data);
                    myApp.hideIndicator();
                    $('.promo-link').on('click', function () {
                        console.log('test');
                        window.location.href = $('.promo-link').attr('href');
                    });
                } else {
                    myApp.hideIndicator();
                    return false;
                }
            },
            error: function () {
                myApp.hideIndicator();
                return false;
            }
        });
    } else {
        return false;
    }
}
showPromo();

function addBest() {
    $('.add_best').addClass('i_best-active');
    var activeSlide = {
        'image': $('.swiper-slide-active')[1].innerHTML,
        'name': $('.photo-browser-caption-active')[0].outerText,
        'object': $('.object-name')["0"].outerText,
        'check': 'checkOK'
    };
    var planPath = String($('.swiper-slide-active .plan')[0].outerHTML.substr(35).slice(0, -6));
    if (localStorage['' + planPath + '']) {
        localStorage.removeItem(planPath);
        $('.add_best').addClass('i_best');
        $('.add_best').removeClass('i_best-active');
    } else {
        localStorage.setItem(planPath, JSON.stringify(activeSlide));
    }
};

function check() {
    var activeSlide = String($('.swiper-slide-active .plan')[0].outerHTML.substr(35).slice(0, -6));
    if (localStorage['' + activeSlide + '']) {
        $('.add_best').addClass('i_best-active');
        $('.add_best').removeClass('i_best');
    } else {
        $('.add_best').addClass('i_best');
        $('.add_best').removeClass('i_best-active');
    }
    $$(".call-to").on('click', function () {
        window.location.href = "tel:+78126403838";
    });
}

$$(document).on('page:init', '.page[data-page="about"]', function (e) {
    $$('.mailPSK').on('click', showChat);
});
$$(document).on('page:init', '.page[data-page="favorite"]', function (e) {
    $(document).on('ready', function () {
        $('div:contains("BESbswy")').remove();
    });
    $$('.mailPSK').on('click', showChat);
    for (i = 0; i <= localStorage.length; i++) {
        var keyName = localStorage.key(i);
        if ((keyName == '_lastSdkVersion') || (keyName == '_lastWidgetId') || (JSON.parse(localStorage.getItem(localStorage.key(i))) == null))
        { }
        else if (JSON.parse(localStorage.getItem(localStorage.key(i))).check == 'checkOK') {
            if ((JSON.parse(localStorage.getItem(localStorage.key(i))) == '_lastSdkVersion') || (JSON.parse(localStorage.getItem(localStorage.key(i))) == '_lastWidgetId')) {
                return undefined;
            }
            else {
                var id = localStorage.key(i);
                var plan = JSON.parse(localStorage.getItem(localStorage.key(i)));
                $('.fav_plan').append('<div class="card ' + id + ' favPlans"><div class="card-content"><div class="list-block media-list"><ul><li><div class="content-block row"><div class="row no-gutter col-90 open-pb"><div class="col-40 carder-fav">' + plan.image + '</div><div class="col-50 carder"><div class="card-header no-border"><b>' + plan.object + '</b></div><div class="card-content-inner-fav"><p>' + plan.name + '</p></div ></div></div><div class="col-10"><i class="f7-icons btn-right-best deleteFav" data-id="' + id + '" id="' + id + '">close</i></div></a></div></li></ul></div></div></div>');
                $('.clearStorage').css('display', 'flex');
            }
        }
    }
    $('.clearStorage').on('click', function () {
        for (i = 0; i <= localStorage.length; i++) {
            var keyName = localStorage.key(i);
            if ((keyName == '_lastSdkVersion') || (keyName == '_lastWidgetId') || (JSON.parse(localStorage.getItem(localStorage.key(i))) == null))
            { }
            else if (JSON.parse(localStorage.getItem(localStorage.key(i))).check == 'checkOK') {
                var id = localStorage.key(i);
                console.log(id);
                localStorage.removeItem(id);
                i--;
            }
        }
        if (JSON.parse(localStorage.getItem(localStorage.key(0))) == null) {
            $('.clearStorage').css('display', 'none');
        } else {
            $('.clearStorage').css('display', 'flex');
        }
        $('.favPlans, .clearStorage').addClass('deleted');

        function remove() {
            $('.deleted').remove();
        }
        setTimeout(remove, 500);
    });
    $('.deleteFav').on('click', function (options) {
        var delPlan = this.id;
        localStorage.removeItem(delPlan);
        $(this).closest('.card').addClass('deleted');

        function remove() {
            $('.deleted').remove();
        }
        setTimeout(remove, 500);
    });

    function photoBrowser() {
        var favPlans = myApp.photoBrowser({
            ofText: "/",
            photos: function () {
                function slides() {
                    var slidesArr = [];
                    for (i = 0; i < localStorage.length; i++) {
                        var keyName = localStorage.key(i);
                        if ((keyName == '_lastSdkVersion') || (keyName == '_lastWidgetId') || (JSON.parse(localStorage.getItem(localStorage.key(i))) == null)) {
                        }
                        else if (keyName == null) { i++; }
                        else if (JSON.parse(localStorage.getItem(localStorage.key(i))).check == 'checkOK') {
                            var imgPath = "img/gallery/" + localStorage.key(i) + ".png";
                            var aptName = JSON.parse(localStorage.getItem(localStorage.key(i))).name;
                            var slide = {
                                caption: aptName,
                                url: imgPath
                            };
                            slidesArr[i] = slide;
                        }
                    }
                    return slidesArr.filter(function (number) { return number});
                    delete slidesArr;
                }
                return slides();
            },
            theme: 'dark',
            type: 'popup',
            onOpen: function () {
                $(document).ready(function () {
                    $$(".call-to").on('click', function () {
                        window.location.href = "tel:+78126403838";
                    });
                });
            },
            onClose: function () {
                $('.photo-browser-popup').remove();
                $('.popup-overlay').remove();
            }
        });
        favPlans.open();
    }
    $('.open-pb').on('click', function () {
        photoBrowser();
        $('.add_best').remove();
    });
});
$$(document).on('page:init', '.page[data-page="like"]', function (e) {
    $('div:contains("BESbswy")').remove();
    $$('.mailPSK').on('click', showChat);
    $$('.popup-cam').on('popup:open', function () {
        $.ajax('https://www.google.ru', {
            timeout: 1000,
            cache: false,
            success: function () {
                initMap();
                myApp.hideIndicator();
            },
            error: function () {
                myApp.closeModal('.popup-cam', true);
                myApp.hideIndicator();
                myApp.alert('<p style="text-transform:none; text-align:center">Проверьте интернет соединение!</p>', '<p style="text-transform:none; text-align:center">Проблемы с сетью</p>');
                return false;
            }
        });
        $('#full-screen').css('display', 'none');
    });
    var mySwiper = myApp.swiper('.swiper-like', {
        speed: 400,
        spaceBetween: 10,
        touchEventsTarget: '.swiper-like',
        pagination: '.swiper-pagination'
    });
    $('.show-news').on('click', function () {
        showNews("http://psk-info.ru/files/app-news/like-news.html")
    });
    $$('.call').on('click', function () {
        callPsk();
    });
    $$('.like-web').on('click', function () {
        $.ajax('https://www.google.ru', {
            timeout: 1000,
            cache: false,
            success: function () {
                myApp.hideIndicator();
                window.open("https://like.house/zhiloy-kompleks?utm_source=mobile_app&utm_medium=cpc&utm_campaign=planirovka","_system", "location=yes");
            },
            error: function () {
                myApp.hideIndicator();
                myApp.alert('<p style="text-transform:none; text-align:center">Проверьте интернет соединение!</p>', '<p style="text-transform:none; text-align:center">Проблемы с сетью</p>');
                return false;
            }
        });
    });
    var plans = myApp.photoBrowser({
        lazyLoadingInPrevNext: true,
        ofText: "/",
        photos: [{
            url: 'img/gallery/like/plans/super-single-1.png',
            caption: 'Super single 22,78 м2',
            id: '1r'
        }, {
            url: 'img/gallery/like/plans/super-single-2.png',
            caption: 'Super single 32,57 м2'
        }, {
            url: 'img/gallery/like/plans/single-1.png',
            caption: 'Single 45,67 м2'
        }, {
            url: 'img/gallery/like/plans/single-2.png',
            caption: 'Single 57,41 м2'
        }, {
            url: 'img/gallery/like/plans/single-3.png',
            caption: 'Single 36,62 м2'
        }, {
            url: 'img/gallery/like/plans/single-4.png',
            caption: 'Single 44,05 м2'
        }, {
            url: 'img/gallery/like/plans/single-5.png',
            caption: 'Single 39,92 м2'
        }, {
            url: 'img/gallery/like/plans/double-1.png',
            caption: 'Double 57,38 м2'
        }, {
            url: 'img/gallery/like/plans/double-2.png',
            caption: 'Double 64,61 м2'
        }, {
            url: 'img/gallery/like/plans/double-3.png',
            caption: 'Double 54,58 м2'
        }, {
            url: 'img/gallery/like/plans/double-4.png',
            caption: 'Double 50,98'
        }, {
            url: 'img/gallery/like/plans/double-5.png',
            caption: 'Double 51,51 м2'
        }, {
            url: 'img/gallery/like/plans/triple-1.png',
            caption: 'Triple 85,11 м2'
        }],
        theme: 'dark',
        type: 'popup',
        onOpen: function () {
            check();
        },
        onSlideChangeStart: function () {
            check();
        },
        onClose: function () {
            removeSlider();
        }
    });
    $('.plans').on('click', function () {
        plans.open();
        $('.best').on('click', function () {
            addBest();
        });
    });

    function initMap() {
        var point = {
            lat: 59.993172,
            lng: 30.355078
        };
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 14,
            center: point,
            styles: [{
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "saturation": 36
                }, {
                    "color": "#1b1a1a"
                }, {
                    "lightness": 40
                }]
            }, {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "lightness": 16
                }, {
                    "color": "#6d6265"
                }]
            }, {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#000000"
                }, {
                    "lightness": 20
                }]
            }, {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#000000"
                }, {
                    "lightness": 17
                }, {
                    "weight": 1.2
                }]
            }, {
                "featureType": "administrative",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "administrative.country",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "administrative.province",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "administrative.locality",
                "elementType": "all",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "saturation": "-100"
                }, {
                    "lightness": "30"
                }]
            }, {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#9a8585"
                }]
            }, {
                "featureType": "administrative.locality",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "weight": "1"
                }, {
                    "color": "#222222"
                }]
            }, {
                "featureType": "administrative.neighborhood",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "administrative.land_parcel",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [{
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#433939"
                }]
            }, {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [{
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{
                    "lightness": 21
                }, {
                    "color": "#433939"
                }]
            }, {
                "featureType": "poi.attraction",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "poi.business",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "poi.government",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "poi.medical",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#52564a"
                }]
            }, {
                "featureType": "poi.park",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "poi.place_of_worship",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "poi.school",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "poi.sports_complex",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#3c3333"
                }]
            }, {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#9a8585"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#232323"
                }, {
                    "visibility": "on"
                }, {
                    "weight": "2"
                }]
            }, {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [{
                    "lightness": "-10"
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "transit",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#3c3333"
                }]
            }, {
                "featureType": "transit",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "transit",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#9a8585"
                }]
            }, {
                "featureType": "transit",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#171717"
                }, {
                    "weight": "2"
                }]
            }, {
                "featureType": "transit.station.rail",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#484b4c"
                }]
            }, {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#9a8585"
                }]
            }]
        });
        var image = 'img/like_point.png';
        var marker = new google.maps.Marker({
            position: point,
            icon: image,
            map: map
        });
    }
    $('.open-map').on('click', function () {
        $.ajax('https://www.google.ru', {
            timeout: 1000,
            cache: false,
            success: function () {
                initMap();
                myApp.hideIndicator();
            },
            error: function () {
                myApp.hideIndicator();
                myApp.alert('<p style="text-transform:none; text-align:center">Проверьте интернет соединение!</p>', '<p style="text-transform:none; text-align:center">Проблемы с сетью</p>');
                myApp.closeModal('.popup-map', true);
                return false;
            }
        });
    });
    $$('.popup-map').on('popup:opened', function () {
        google.maps.event.trigger($('#map')[0], 'resize');
    });
});
$$(document).on('page:init', '.page[data-page="look"]', function (e) {
    $('div:contains("BESbswy")').remove();
    $$('.mailPSK').on('click', showChat);
    $$('.popup-cam').on('popup:open', function () {
        $.ajax('https://www.google.ru', {
            timeout: 1000,
            cache: false,
            success: function () {
                initMap();
                myApp.hideIndicator();
            },
            error: function () {
                myApp.closeModal('.popup-cam', true);
                myApp.hideIndicator();
                myApp.alert('<p style="text-transform:none; text-align:center">Проверьте интернет соединение!</p>', '<p style="text-transform:none; text-align:center">Проблемы с сетью</p>');
                return false;
            }
        });
        $('#full-screen').css('display', 'none');
    });
    var mySwiper = myApp.swiper('.swiper-look', {
        speed: 400,
        spaceBetween: 10,
        touchEventsTarget: '.swiper-look',
        pagination: '.swiper-pagination'
    });
    $$('.look-web').on('click', function () {
        $.ajax('https://www.google.ru', {
            timeout: 1000,
            cache: false,
            success: function () {
                myApp.hideIndicator();
                window.open("http://look-house.ru/plans?utm_source=mobile_app&utm_medium=cpc&utm_campaign=planirovka","_system", "location=yes");
            },
            error: function () {
                myApp.hideIndicator();
                myApp.alert('<p style="text-transform:none; text-align:center">Проверьте интернет соединение!</p>', '<p style="text-transform:none; text-align:center">Проблемы с сетью</p>');
                return false;
            }
        });
    });
    $('.show-news').on('click', function () {
        showNews("http://psk-info.ru/files/app-news/look-news.html")
    });
    $$('.call').on('click', function () {
        callPsk();
    });
    var plans = myApp.photoBrowser({
        lazyLoadingInPrevNext: true,
        ofText: "/",
        photos: [{
            url: 'img/gallery/look/plans/1r1.png',
            caption: '1-комнатная 47,30 м2'
        }, {
            url: 'img/gallery/look/plans/1r2.png',
            caption: '1-комнатная 51,71 м2'
        }, {
            url: 'img/gallery/look/plans/1r3.png',
            caption: '1-комнатная 48,80 м2'
        }, {
            url: 'img/gallery/look/plans/1r4.png',
            caption: '1-комнатная 43,60 м2'
        }, {
            url: 'img/gallery/look/plans/1r5.png',
            caption: '1-комнатная 42,68 м2'
        }, {
            url: 'img/gallery/look/plans/1r6.png',
            caption: '1-комнатная 50,40 м2'
        }, {
            url: 'img/gallery/look/plans/2r1.png',
            caption: '2-комнатная 75,93 м2'
        }, {
            url: 'img/gallery/look/plans/2r2.png',
            caption: '2-комнатная 61,97 м2'
        }, {
            url: 'img/gallery/look/plans/2r3.png',
            caption: '2-комнатная 69,16 м2'
        }, {
            url: 'img/gallery/look/plans/2r4.png',
            caption: '2-комнатная 70,54 м2'
        }, {
            url: 'img/gallery/look/plans/3r1.png',
            caption: '3-комнатная 102,98 м2'
        }, {
            url: 'img/gallery/look/plans/3r2.png',
            caption: '3-комнатная 92,59 м2'
        }, {
            url: 'img/gallery/look/plans/3r3.png',
            caption: '3-комнатная 121,46 м2'
        }, {
            url: 'img/gallery/look/plans/3r4.png',
            caption: '3-комнатная 100,91 м2'
        }, {
            url: 'img/gallery/look/plans/4r1.png',
            caption: '4-комнатная 129,21 м2'
        }, {
            url: 'img/gallery/look/plans/4r2.png',
            caption: '4-комнатная 110,73 м2'
        }],
        theme: 'dark',
        type: 'popup',
        onOpen: function () {
            check();
        },
        onSlideChangeStart: function () {
            check();
        },
        onClose: function () {
            removeSlider();
        }
    });
    $('.plans').on('click', function () {
        plans.open();
        $('.best').on('click', function () {
            addBest();
        });
    });

    function initMap() {
        var point = {
            lat: 59.909723,
            lng: 30.349063
        };
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: point,
            styles: [{
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#ffffff"
                }, {
                    "visibility": "on"
                }]
            }, {
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "landscape.man_made",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#4c434a"
                }]
            }, {
                "featureType": "landscape.man_made",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#696569"
                }]
            }, {
                "featureType": "landscape.natural",
                "stylers": [{
                    "color": "#464d46"
                }]
            }, {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#464d46"
                }]
            }, {
                "featureType": "poi.medical",
                "stylers": [{
                    "color": "#464d46"
                }]
            }, {
                "featureType": "poi.park",
                "stylers": [{
                    "color": "#464d46"
                }]
            }, {
                "featureType": "poi.sports_complex",
                "stylers": [{
                    "color": "#464d46"
                }]
            }, {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#5d595d"
                }]
            }]
        });
        var image = 'img/look_point.png';
        var marker = new google.maps.Marker({
            position: point,
            icon: image,
            map: map
        });
    }
    $$('.open-map').on('click', function () {
        $.ajax('https://www.google.ru', {
            timeout: 1000,
            cache: false,
            success: function () {
                initMap();
                myApp.hideIndicator();
            },
            error: function () {
                myApp.hideIndicator();
                myApp.alert('<p style="text-transform:none; text-align:center">Проверьте интернет соединение!</p>', '<p style="text-transform:none; text-align:center">Проблемы с сетью</p>');
                myApp.closeModal('.popup-map', true);
                return false;
            }
        });
    });
    $$('.popup-look-map').on('popup:opened', function () {
        google.maps.event.trigger($('#map')[0], 'resize');
    });
});
$$(document).on('page:init', '.page[data-page="diplomat"]', function (e) {
    $('div:contains("BESbswy")').remove();
    $$('.mailPSK').on('click', showChat);
    $$('.popup-cam').on('popup:open', function () {
        $.ajax('https://www.google.ru', {
            timeout: 1000,
            cache: false,
            success: function () {
                initMap();
                myApp.hideIndicator();
            },
            error: function () {
                myApp.closeModal('.popup-cam', true);
                myApp.hideIndicator();
                myApp.alert('<p style="text-transform:none; text-align:center">Проверьте интернет соединение!</p>', '<p style="text-transform:none; text-align:center">Проблемы с сетью</p>');
                return false;
            }
        });
        $('#full-screen').css('display', 'none');
    });
    var mySwiper = myApp.swiper('.swiper-diplomat', {
        speed: 400,
        spaceBetween: 10,
        touchEventsTarget: '.swiper-diplomat',
        pagination: '.swiper-pagination'
    });
    $$('.open-map').on('click', function () {
        myApp.popup('.popup-diplo-map');
    });
    $$('.diplomat-web').on('click', function () {
        $.ajax('https://www.google.ru', {
            timeout: 1000,
            cache: false,
            success: function () {
                myApp.hideIndicator();
                window.open("http://domdiplomat.ru/kvartiry/?utm_source=mobile_app&utm_medium=cpc&utm_campaign=planirovka","_system", "location=yes");
            },
            error: function () {
                myApp.hideIndicator();
                myApp.alert('<p style="text-transform:none; text-align:center">Проверьте интернет соединение!</p>', '<p style="text-transform:none; text-align:center">Проблемы с сетью</p>');
                return false;
            }
        });
    });
    $('.show-news').on('click', function () {
        showNews("http://psk-info.ru/files/app-news/diplo-news.html")
    });
    $$('.call').on('click', function () {
        callPsk();
    });
    var plans = myApp.photoBrowser({
        lazyLoadingInPrevNext: true,
        ofText: "/",
        photos: [{
            url: 'img/gallery/diplomat/plans/1r1.png',
            caption: '1-комнатная 52,53 м2'
        }, {
            url: 'img/gallery/diplomat/plans/1r2.png',
            caption: '1-комнатная 57,72 м2'
        }, {
            url: 'img/gallery/diplomat/plans/1r3.png',
            caption: '1-комнатная 59,13 м2'
        }, {
            url: 'img/gallery/diplomat/plans/1r4.png',
            caption: '1-комнатная 56,81 м2'
        }, {
            url: 'img/gallery/diplomat/plans/1r5.png',
            caption: '1-комнатная 60,62 м2'
        }, {
            url: 'img/gallery/diplomat/plans/1r6.png',
            caption: '1-комнатная 59,13 м2'
        }, {
            url: 'img/gallery/diplomat/plans/1r7.png',
            caption: '1-комнатная 47,62 м2'
        }, {
            url: 'img/gallery/diplomat/plans/1r8.png',
            caption: '1-комнатная 62,03 м2'
        }, {
            url: 'img/gallery/diplomat/plans/1r9.png',
            caption: '1-комнатная 66,33 м2'
        }, {
            url: 'img/gallery/diplomat/plans/1r10.png',
            caption: '1-комнатная 76,51 м2'
        }, {
            url: 'img/gallery/diplomat/plans/1r11.png',
            caption: '1-комнатная 49,05 м2'
        }, {
            url: 'img/gallery/diplomat/plans/1r12.png',
            caption: '1-комнатная 53,35 м2'
        }, {
            url: 'img/gallery/diplomat/plans/2r1.png',
            caption: '2-комнатная 90,72 м2'
        }, {
            url: 'img/gallery/diplomat/plans/2r2.png',
            caption: '2-комнатная 89,72 м2'
        }, {
            url: 'img/gallery/diplomat/plans/2r3.png',
            caption: '2-комнатная 79,77 м2'
        }, {
            url: 'img/gallery/diplomat/plans/2r4.png',
            caption: '2-комнатная 84,24 м2'
        }, {
            url: 'img/gallery/diplomat/plans/2r5.png',
            caption: '2-комнатная 69,50 м2'
        }, {
            url: 'img/gallery/diplomat/plans/2r6.png',
            caption: '2-комнатная 68,23 м2'
        }, {
            url: 'img/gallery/diplomat/plans/2r7.png',
            caption: '2-комнатная 73,80 м2'
        }, {
            url: 'img/gallery/diplomat/plans/2r8.png',
            caption: '2-комнатная 72,53 м2'
        }, {
            url: 'img/gallery/diplomat/plans/2r9.png',
            caption: '2-комнатная 71,15 м2'
        }, {
            url: 'img/gallery/diplomat/plans/2r10.png',
            caption: '2-комнатная 91,79 м2'
        }, {
            url: 'img/gallery/diplomat/plans/2r11.png',
            caption: '2-комнатная 84,44 м2'
        }, {
            url: 'img/gallery/diplomat/plans/2r12.png',
            caption: '2-комнатная 103,37 м2'
        }, {
            url: 'img/gallery/diplomat/plans/2r13.png',
            caption: '2-комнатная тип 96,17 м2'
        }, {
            url: 'img/gallery/diplomat/plans/2r14.png',
            caption: '2-комнатная 88,74 м2'
        }, {
            url: 'img/gallery/diplomat/plans/2r15.png',
            caption: '2-комнатная 74,27 м2'
        }, {
            url: 'img/gallery/diplomat/plans/2r6.png',
            caption: '2-комнатная тип 68,23 м2'
        }, {
            url: 'img/gallery/diplomat/plans/3r1.png',
            caption: '3-комнатная 116,74 м2'
        }, {
            url: 'img/gallery/diplomat/plans/3r2.png',
            caption: '3-комнатная 125,68 м2'
        }, {
            url: 'img/gallery/diplomat/plans/3r3.png',
            caption: '3-комнатная 147,78 м2'
        }, {
            url: 'img/gallery/diplomat/plans/3r4.png',
            caption: '3-комнатная 116,38 м2'
        }, {
            url: 'img/gallery/diplomat/plans/3r5.png',
            caption: '3-комнатная 111,88 м2'
        }, {
            url: 'img/gallery/diplomat/plans/3r6.png',
            caption: '3-комнатная 140,51 м2'
        }, {
            url: 'img/gallery/diplomat/plans/3r7.png',
            caption: '3-комнатная 107,33 м2'
        }, {
            url: 'img/gallery/diplomat/plans/3r8.png',
            caption: '3-комнатная 111,63 м2'
        }, {
            url: 'img/gallery/diplomat/plans/3r9.png',
            caption: '3-комнатная 141,93 м2'
        }, {
            url: 'img/gallery/diplomat/plans/3r10.png',
            caption: '3-комнатная 141,65 м2'
        }, {
            url: 'img/gallery/diplomat/plans/4r1.png',
            caption: '4-комнатная 149,09 м2'
        }, {
            url: 'img/gallery/diplomat/plans/4r2.png',
            caption: '4-комнатная 150,94 м2'
        }, {
            url: 'img/gallery/diplomat/plans/4r3.png',
            caption: '4-комнатная 156,07 м2'
        }, {
            url: 'img/gallery/diplomat/plans/4r4.png',
            caption: '4-комнатная 175,83 м2'
        }, {
            url: 'img/gallery/diplomat/plans/4r5.png',
            caption: '4-комнатная 168,11 м2'
        }, {
            url: 'img/gallery/diplomat/plans/4r6.png',
            caption: '4-комнатная 168,57 м2'
        }, {
            url: 'img/gallery/diplomat/plans/5r1.png',
            caption: '5-комнатная 190,54 м2'
        }],
        theme: 'dark',
        type: 'popup',
        onOpen: function () {
            check();
        },
        onSlideChangeStart: function () {
            check();
        },
        onClose: function () {
            removeSlider();
        }
    });
    $('.plans').on('click', function () {
        plans.open();
        $('.best').on('click', function () {
            addBest();
        });
    });

    function initMap() {
        var point = {
            lat: 59.930290,
            lng: 30.383537
        };
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: point,
            styles: [{
                "featureType": "landscape.man_made",
                "elementType": "geometry.fill",
                "stylers": [{
                    "saturation": -55
                }, {
                    "lightness": -15
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "landscape.man_made",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#000000"
                }, {
                    "lightness": 40
                }]
            }, {
                "featureType": "poi",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "poi.park",
                "stylers": [{
                    "color": "#83916a"
                }]
            }, {
                "featureType": "water",
                "stylers": [{
                    "color": "#58697e"
                }]
            }]
        });
        var image = 'img/diplo_point.png';
        var marker = new google.maps.Marker({
            position: point,
            icon: image,
            map: map
        });
    }
    $$('.open-map').on('click', function () {
        $.ajax('https://www.google.ru', {
            timeout: 1000,
            cache: false,
            success: function () {
                initMap();
                myApp.hideIndicator();
            },
            error: function () {
                myApp.hideIndicator();
                myApp.alert('<p style="text-transform:none; text-align:center">Проверьте интернет соединение!</p>', '<p style="text-transform:none; text-align:center">Проблемы с сетью</p>');
                myApp.closeModal('.popup-map', true);
                return false;
            }
        });
    });
    $$('.popup-diplo-map').on('popup:opened', function () {
        google.maps.event.trigger($('#map')[0], 'resize');
    });
});
$$(document).on('page:init', '.page[data-page="neva"]', function (e) {
    $('div:contains("BESbswy")').remove();
    $$('.mailPSK').on('click', showChat);
    $$('.popup-cam').on('popup:open', function () {
        $.ajax('https://www.google.ru', {
            timeout: 1000,
            cache: false,
            success: function () {
                initMap();
                myApp.hideIndicator();
            },
            error: function () {
                myApp.closeModal('.popup-cam', true);
                myApp.hideIndicator();
                myApp.alert('<p style="text-transform:none; text-align:center">Проверьте интернет соединение!</p>', '<p style="text-transform:none; text-align:center">Проблемы с сетью</p>');
                return false;
            }
        });
        $('#full-screen').css('display', 'none');
    });
    var mySwiper = myApp.swiper('.swiper-neva', {
        speed: 400,
        spaceBetween: 10,
        touchEventsTarget: '.swiper-neva',
        pagination: '.swiper-pagination'
    });
    $$('.neva-web').on('click', function () {
        $.ajax('https://www.google.ru', {
            timeout: 1000,
            cache: false,
            success: function () {
                myApp.hideIndicator();
                window.open("http://nevaetalon.ru/kvartiry/?utm_source=mobile_app&utm_medium=cpc&utm_campaign=planirovka","_system", "location=yes");
            },
            error: function () {
                myApp.hideIndicator();
                myApp.alert('<p style="text-transform:none; text-align:center">Проверьте интернет соединение!</p>', '<p style="text-transform:none; text-align:center">Проблемы с сетью</p>');
                return false;
            }
        });
    });
    $('.show-news').on('click', function () {
        showNews("http://psk-info.ru/files/app-news/neva-news.html")
    });
    $$('.call').on('click', function () {
        callPsk();
    });
    $('.mailNeva').on('click', function () {
        window.location.href = "mailto:sales@psk-info.ru?subject=Вопрос по объекту Невский Эталон";
    });

    function initMap() {
        var point = {
            lat: 59.909211,
            lng: 30.458188
        };
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: point,
            styles: [{
                "featureType": "administrative.country",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "lightness": "40"
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "administrative.country",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "simplified"
                }, {
                    "lightness": "20"
                }]
            }, {
                "featureType": "administrative.province",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "administrative.province",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "simplified"
                }, {
                    "lightness": "10"
                }]
            }, {
                "featureType": "administrative.locality",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "administrative.locality",
                "elementType": "labels",
                "stylers": [{
                    "lightness": "25"
                }]
            }, {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [{
                    "hue": "#ffbb00"
                }, {
                    "saturation": 43.400000000000006
                }, {
                    "lightness": 37.599999999999994
                }, {
                    "gamma": 1
                }]
            }, {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [{
                    "hue": "#00ff6a"
                }, {
                    "saturation": -1.0989010989011234
                }, {
                    "lightness": 11.200000000000017
                }, {
                    "gamma": 1
                }]
            }, {
                "featureType": "road",
                "elementType": "all",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "lightness": "30"
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [{
                    "hue": "#ffc200"
                }, {
                    "saturation": -61.8
                }, {
                    "lightness": 45.599999999999994
                }, {
                    "gamma": 1
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "all",
                "stylers": [{
                    "hue": "#ff0300"
                }, {
                    "saturation": -100
                }, {
                    "lightness": 51.19999999999999
                }, {
                    "gamma": 1
                }]
            }, {
                "featureType": "road.local",
                "elementType": "all",
                "stylers": [{
                    "hue": "#ff0300"
                }, {
                    "saturation": -100
                }, {
                    "lightness": 52
                }, {
                    "gamma": 1
                }]
            }, {
                "featureType": "water",
                "elementType": "all",
                "stylers": [{
                    "hue": "#0078FF"
                }, {
                    "saturation": -13.200000000000003
                }, {
                    "lightness": 2.4000000000000057
                }, {
                    "gamma": 1
                }]
            }, {
                "featureType": "water",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            }]
        });
        var image = 'img/neva_point.png';
        var marker = new google.maps.Marker({
            position: point,
            icon: image,
            map: map
        });
    }
    $$('.open-map').on('click', function () {
        $.ajax('https://www.google.ru', {
            timeout: 1000,
            cache: false,
            success: function () {
                initMap();
                myApp.hideIndicator();
            },
            error: function () {
                myApp.hideIndicator();
                myApp.alert('<p style="text-transform:none; text-align:center">Проверьте интернет соединение!</p>', '<p style="text-transform:none; text-align:center">Проблемы с сетью</p>');
                myApp.closeModal('.popup-map', true);
                return false;
            }
        });
    });
    $$('.popup-neva-map').on('popup:opened', function () {
        google.maps.event.trigger($('#map')[0], 'resize');
    });
    var plans = myApp.photoBrowser({
        lazyLoadingInPrevNext: true,
        ofText: "/",
        photos: [{
            url: 'img/gallery/neva/plans/comm1.png',
            caption: 'Коммерческое помещение 130 м2</br> Последние помещения'
        }, {
            url: 'img/gallery/neva/plans/1r1.png',
            caption: '1-комнатная 43,22 м2</br> Последние квартиры'
        }, {
            url: 'img/gallery/neva/plans/1r2.png',
            caption: '1-комнатная 37,53 м2</br> Последние квартиры'
        }],
        theme: 'dark',
        type: 'popup',
        onOpen: function () {
            check();
        },
        onSlideChangeStart: function () {
            check();
        },
        onClose: function () {
            removeSlider();
        }
    });
    $('.plans').on('click', function () {
        plans.open();
        $('.best').on('click', function () {
            addBest();
        });
    });
});
$$(document).on('page:init', '.page[data-page="slav"]', function (e) {
    $('div:contains("BESbswy")').remove();
    $$('.mailPSK').on('click', showChat);
    var mySwiper = myApp.swiper('.swiper-slav', {
        speed: 400,
        spaceBetween: 10,
        touchEventsTarget: '.swiper-slav',
        pagination: '.swiper-pagination'
    });
    $$('.slav-web').on('click', function () {
        $.ajax('https://www.google.ru', {
            timeout: 1000,
            cache: false,
            success: function () {
                myApp.hideIndicator();
                window.open("http://slavyanka128.ru/kvartiry/?type=fl1?utm_source=mobile_app&utm_medium=cpc&utm_campaign=planirovka","_system", "location=yes");
            },
            error: function () {
                myApp.hideIndicator();
                myApp.alert('<p style="text-transform:none; text-align:center">Проверьте интернет соединение!</p>', '<p style="text-transform:none; text-align:center">Проблемы с сетью</p>');
                return false;
            }
        });
    });
    $$('.call').on('click', function () {
        callPsk();
    });
    $('.show-news').on('click', function () {
        showNews("http://psk-info.ru/files/app-news/slav-news.html")
    });

    function initMap() {
        var point = {
            lat: 59.740079,
            lng: 30.475311
        };
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: point,
            styles: [{
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#444444"
                }]
            }, {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [{
                    "color": "#9adbe8"
                }]
            }, {
                "featureType": "landscape.natural",
                "elementType": "all",
                "stylers": [{
                    "color": "#9adbe8"
                }]
            }, {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road",
                "elementType": "all",
                "stylers": [{
                    "saturation": -100
                }, {
                    "lightness": 45
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [{
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "water",
                "elementType": "all",
                "stylers": [{
                    "color": "#ffbc77"
                }, {
                    "visibility": "on"
                }]
            }]
        });
        var image = 'img/slav_point.png';
        var marker = new google.maps.Marker({
            position: point,
            icon: image,
            map: map
        });
    }
    $$('.open-map').on('click', function () {
        $.ajax('https://www.google.ru', {
            timeout: 1000,
            cache: false,
            success: function () {
                initMap();
                myApp.hideIndicator();
            },
            error: function () {
                myApp.hideIndicator();
                myApp.alert('<p style="text-transform:none; text-align:center">Проверьте интернет соединение!</p>', '<p style="text-transform:none; text-align:center">Проблемы с сетью</p>');
                myApp.closeModal('.popup-map', true);
                return false;
            }
        });
    });
    $$('.popup-slav-map').on('popup:opened', function () {
        google.maps.event.trigger($('#map')[0], 'resize');
    });
    var plans = myApp.photoBrowser({
        lazyLoadingInPrevNext: true,
        ofText: "/",
        photos: [{
            url: 'img/gallery/slav/plans/2r1.png',
            caption: '2-комнатная 51,06 м2</br> Последние квартиры'
        }, {
            url: 'img/gallery/slav/plans/2r4.png',
            caption: '2-комнатная 69,21 м2</br> Последние квартиры'
        }, {
            url: 'img/gallery/slav/plans/3r1.png',
            caption: '3-комнатная 77,51 м2</br> Последние квартиры'
        }, {
            url: 'img/gallery/slav/plans/3r2.png',
            caption: '3-комнатная 77,51 м2</br> Последние квартиры'
        }],
        theme: 'dark',
        type: 'popup',
        onOpen: function () {
            check();
        },
        onSlideChangeStart: function () {
            check();
        },
        onClose: function () {
            removeSlider();
        }
    });
    $('.plans').on('click', function () {
        plans.open();
        $('.best').on('click', function () {
            addBest();
        });
    });
});

/*
function exit() {
    console.log('clicked');
    navigator.app.exitApp();
}
$('.closeApp').on('click', exit);
*/
$('.mailPSK').on('click', showChat);
