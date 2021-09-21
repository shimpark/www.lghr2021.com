var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
var agent = navigator.userAgent.toLowerCase();
var trident = navigator.userAgent.match(/Trident\/(\d.\d)/i);

var _w;
var _breakpoint = 720;
var _breakpointDesktop = 1100;
var _wrap;
var _navHei;
var _wid;

var _gnb;
var _menu;
var _menuIcon;
var _dim;


var _header;

$(function(){
    init();
});

function init(){
    create();
    addEvent();
}

function create(){
    _w = $(window);
    _wrap = $('#wrap');
    _wid = _w.width();
    
    _gnb = $("#gnb");
    _menu = $(".menu");
    _menuIcon = $(".menu-icon");
    _dim = $( ".dim" );

    _header = $("header");
    _navHei = _header.height();

}

function addEvent(){
    _w.on("resize", resizeEvent);
    resizeEvent();

    _w.on("scroll", scrollEvent);
    scrollEvent();

    _menuIcon.on("click", menuEvent);

    tabEvent('.section-event');
    faqClickEvent();

    sliderPC();
    sliderMobile();

    $(".btn-calender").on("click",function(){
        popupOpen('.dimmed', 'popupOpen');
    });
 
    if(_wid > _breakpoint){
      pageMove('.page-move');
    }else{
      pageMove('.page-move', -(_navHei/2));
    }

  
    var sdate= new Date("2021/08/24 11:00:00");
    if(Date.now() >= sdate){
      $("#sectionVisual .notice").empty();
    }
}

function sliderMobile() {
    $('.mobile-slider').slick({
        arrows: false,
        autoplay: true,
        speed: 300,
        pauseOnFocus: true,
        slidesToScroll: 1,
        slidesToShow: 1,
        centerMode: true,
        cssEase: 'linear',
        centerPadding: '0px'
    });
}


function faqClickEvent(){
    $('.fag-toggle').on('click', function(){
        var $this = $(this);

        $this.parents('dl').toggleClass('unfold').siblings().removeClass('unfold');

    });
}

function tabEvent($selector){
    $($selector).find('.tab-list').children('li').on('click', function(){
        var idx = $(this).index(),
            tabList = $($selector).find('.tab-list').children('li');

        tabList.removeClass("active");
        $(this).addClass("active");

        $($selector).find('.tab-view').hide();
        $($selector).find('.tab-view').eq(idx).show();
    });
}

function scrollEvent(){
    var st = $(window).scrollTop();
    var sh = $(window).height() / 1.2;
    var section = $('.section');

    section.each(function(i){
        if( st > section.eq(i).offset().top - sh){
            $(this).addClass('active');
        }
        //  else {
        //     $(this).removeClass('active');
        // }
    });

    if(st > _navHei){
        _header.addClass("fixed");
    }else{
        _header.removeClass("fixed");
    }

    if( st > $("#sectionTimeTable").offset().top-100 &&  st < $("#sectionSpeaker").offset().top-200){
      $(".floating-1-a, .floating-2-a").addClass("fixed");
      $(".floating-1-a, .floating-2-a").css({opacity:1});
      $(".floating-1-b, .floating-2-b").css({opacity:0});
    }else{
      $(".floating-1-a, .floating-2-a").css({opacity:0});
      $(".floating-1-a, .floating-2-a").removeClass("fixed");
      $(".floating-1-b, .floating-2-b").css({opacity:1});
    }


    if( st > $("#sectionIssue").offset().top &&  st < $("#sectionGuide").offset().top-200){
      $(".floating-3-a, .floating-4-a").addClass("fixed");
      $(".floating-3-a, .floating-4-a").css({opacity:1});
      $(".floating-3-b, .floating-4-b").css({opacity:0});
    }else{
      $(".floating-3-a, .floating-4-a").css({opacity:0});
      $(".floating-3-a, .floating-4-a").removeClass("fixed");
      $(".floating-3-b, .floating-4-b").css({opacity:1});
    }


    



    // $(".floating-3")
    // $(".floating-4")

    
}


function resizeEvent(){
    _wid = _w.width();
    _navHei = _header.height();

    $('.responsive').each(function() {
        var $src = $(this).attr("src");
        var val = (_wid > _breakpoint) ? $src.replace('mobile', 'pc') : $src.replace('pc', 'mobile');

        $(this).attr("src", val);
    });

    $("#sectionLogin").css({height: _w.height()});

    if(_wid > _breakpoint){
        _gnb.show();
        _menu.hide();
       
    }else{
        _gnb.hide();
        _menu.show();
        
    }
}


function menuEvent(){
    $(this).toggleClass("active");

    if(_menuIcon.hasClass("active")){
        _dim.show();
        _gnb.slideDown();
        _header.addClass("change");

    }else{
        _dim.hide();
        _gnb.slideUp();
        _header.removeClass("change");
    }
}


function pageMove($selector, $position){
	if($position == undefined) $position = 0;

	var selector = $selector;
	$(selector).on('click', function (e) {
		e.preventDefault();

		var _top = $($(this).attr('href'));
		var $target = _top.offset().top;

    // 모바일에서 gnb 클릭시 gnb 닫기 
    if(_wid < _breakpoint){
      _menuIcon.removeClass("active");
      _dim.hide();
      _gnb.slideUp();
      _header.removeClass("change");
    }

		$('html,body').animate({
			scrollTop: $target+$position
		}, 500);


	});
}


function popupClose($dimName, $idName){
    var dimName = $dimName;
    var $popupLayer = $("#"+$idName);
    $(dimName).hide();
    $popupLayer.hide();
}

function popupOpen($dimName, $idName){
    var dimName = $dimName;
    var $popupLayer = $("#"+$idName);
    $(dimName).show();
    $popupLayer.show();
    popupPosition($popupLayer);
}


function popupPosition($popupLayer) {
    var st = $(window).scrollTop();
    var winHeight = $(window).height();
    var popupHeight = $popupLayer.outerHeight();

    var topValue = (st + ( winHeight / 2 - popupHeight / 2 ));
    if($(window).height() < popupHeight){
        topValue = st;
    }

    $popupLayer.css({top:topValue});
}

function interveiwRolling(){
    $('#scroller1').simplyScroll({
        speed: 1,
        pauseOnHover: true
    });
    $('#scroller2').simplyScroll({
        speed: 1,
        pauseOnHover: true
    });
}

function getRandomNumber(number) {
    return Math.ceil(Math.random() * number);
}

function sliderPC() {
    var arr = [];
    var randomNumber;
    var flag = false;
    for (var i = 0; i < interviewList.length; i++) {
      randomNumber = getRandomNumber(interviewList.length) - 1;
      if (arr.indexOf(randomNumber) === -1) {
        arr.push(randomNumber);
        var imgName = interviewList[randomNumber].imgName;
        var interview = interviewList[randomNumber].interview;
        if (i < 12) {
          setTag('scroller1', imgName, interview);
        } else {
          setTag('scroller2', imgName, interview);
        }
        //setTag('interivewSlider', imgName, userName, job, interview);
        flag = true;
      } else {
        i--;
      }
    }
  
    var setTimeHandler1 = null;
    var setTimeHandler2 = null;
    if (flag) {
      setTimeHandler1 = setTimeout(function () {
        interveiwRolling();
        clearTimeout(setTimeHandler1);
      }, 500);
  
      setTimeHandler2 = setTimeout(function () {
        clearTimeout(setTimeHandler2);
      }, 700);
    }

    function setTag(id, imgName, interview) {
      $('#' + id).append(
        '<div class="list-item">' +
          '<div class="slider-image">' +'<img src="../../Content/img/common/' + imgName + '.png" alt="" />' + '</div>' + 
          '<div class="slider-text">' + interview +'</div>' +
        '</div>'
      );
    }
  }
  

  var interviewList = [
    {
      imgName: 'photoA01',
      interview:
        '개발자가 경험할 수 있는 가장 큰 조직이에요!  그러는 동시에 체계가 엄청나게 잘 잡혀 있기도 한 곳이구요. 하루하루 새로운걸 배우고 느끼고 있어 항상 너무 좋은 조직이라 생각합니다.'
    },
    {
        imgName: 'photoA02',
        interview:
          '형식적이 아닌, 정.말.로 수평적이고 자유로운 문화가 개발자로서 너무 행복합니다!'
    },
    {
        imgName: 'photoA03',
        interview:
          '좋은 개발자가 되기 위해서는 좋은 회사에서 좋은 동료들과 팀워크를 발휘하는게 중요합니다. LINE에서는 그것이 가능합니다!'
    },
    {
        imgName: 'photoA04',
        interview:
          '코드 리뷰, 새로운 기술, 어마어마한 인프라.. 배울게 엄청나게 많은 곳입니다!'
    },
    {
        imgName: 'photoA05',
        interview:
          '자유롭게 자신이 하고 싶은 업무를 찾고, 이를 책임감있게 수행해나가는 문화가 정말 좋은 것 같습니다!'
    },
    {
        imgName: 'photoA06',
        interview:
          '매일 세계 각국의 우수한 개발자들과 협업하면서 성장해가고 있음을 느끼고 있습니다. 자유로운 분위기 속에서 높은 서비스 기준을 달성하기 위해 끊임없이 도전하고 성장하고 싶으시다면 LINE을 추천드립니다.'
    },
    {
        imgName: 'photoA07',
        interview:
          '성장을 원하는 분들에게 가장 적합한 회사! 도전적인 업무, 글로벌한 협업을 원하시는 분들 환영합니다.'
    },
    {
        imgName: 'photoA08',
        interview:
          '내가 추가한 코드가 전 세계 사람들이 사용하는 글로벌 서비스에 기여할 수 있다는 뿌듯함과 끝없는 기술 공유와 적극적인 코드 리뷰로 성장하고 있음을 느낄 수 있습니다.'
    },
    {
        imgName: 'photoA09',
        interview:
          '신뢰와 존중, 자유와 책임의 문화로! LINE에 어서 오세요 :)'
    },
    {
        imgName: 'photoA10',
        interview:
          '같이 일하고 싶은 선배가 되기 위해 노력하며 기다리고 있겠습니다!'
    },
    {
        imgName: 'photoA11',
        interview:
          '우리나라뿐만 아니라 전 세계적으로 사용되기에 생각해야 할 부분들이 많은 것 같아요. 그렇기에 어디서든 볼 수 없는 다양한 기술들을 배우고 활용할 수 있다는 게 LINE의 장점인 것 같습니다!'
    },
    {
        imgName: 'photoB01',
        interview:
          '적어도 주니어에게는 이만한 회사가 없습니다.행복하게 성장하고 싶은 분은 오세요.'
    },
    {
        imgName: 'photoB02',
        interview:
          '저도 잘 못하는 일이긴 하지만 조급해하지 않고 꾸준히 자신만의 속도로 나아간다면, LINE이라는 환경에서 개발자로서 성장하실 수 있으실거라 믿어 의심치 않습니다 :)'
    },
    {
        imgName: 'photoB03',
        interview:
          'LINE에서는 어떤 일이든 자신있게 할 수 있고, 자신의 실력을 멋있게 뽐낼 수 있는 곳이라고 생각해요. 신입도 존중받는 느낌으로 일할 수 있는 곳 입니다!'
    },
    {
        imgName: 'photoB04',
        interview:
          'LINE에서는 개발자의 발전을 위해 많은 지원을 해줍니다. 발전과 성장을 하고 개발의 프로세스를 체계적으로 배우고 싶다면 LINE으로 오시는 것을 추천합니다.'
    },
    {
        imgName: 'photoB05',
        interview:
          '실력있는 동료들로부터 많은 것을 배우고, 자극받는 것 같아요. 좋은 개발 문화와 동료로부터 함께 성장하고 나아갔으면 합니다.'
    },
    {
        imgName: 'photoB06',
        interview:
          '이제까지 개발에 관한 지식이 왜 필요했는지 알 수 있는곳 본인 프로덕트에 진심인 사람들이 많아 개발자로서의 자세를 배울수있어 좋습니다.'
    },
    {
        imgName: 'photoB07',
        interview:
          '대학생활 동안 꿈꾸던 업무를 꿈꿔온 회사에서 할 수 있어 즐겁습니다. 좋은 동료들과 좋은 개발문화를 가꿔가며 성장할 수 있는 회사입니다!'
    },
    {
        imgName: 'photoB08',
        interview:
          '글로벌 서비스와 실력있는 팀원분들이 기다리고 있습니다!'
    },
    {
        imgName: 'photoB09',
        interview:
          'LINE이라는 곳에서 좋은 동료로 만나길 바라요~'
    },
    {
        imgName: 'photoB10',
        interview:
          '자유로운 분위기 속 각자에게 주어진 업무를 최선을 다해 수행한다는 것이 LINE의 가장 큰 장점인 것 같아요!'
     }
  ];

