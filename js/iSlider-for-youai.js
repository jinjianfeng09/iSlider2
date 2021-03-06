/**
 * @fileOverview This is a swipe for youai
 * @author jinjianfeng
 * @version 0.1
 * @requires zepto@1.0.0
 */
/*
 * Swipe 1.0
 *
 * Brad Birdsall, Prime
 * Copyright 2011, Licensed GPL & MIT
 *
 */
window.Swipe = function (element, options) {

    // return immediately if element doesn't exist
    if (!element) return null;

    var _this = this;

    // retreive options
    this.options = options || {};
    this.index = this.options.startSlide || 0;
    this.speed = this.options.speed || 300;
    this.callback = this.options.callback || function () {
    };
    this.delay = this.options.auto || 0;

    // reference dom elements
    this.container = element;
    this.element = this.container.children[0]; // the slide panel

    // static css
    this.container.style.overflow = 'hidden';
    this.element.style.listStyle = 'none';


    //每个li之间的空隙
    this.MARGIN_GRAP = 2;
    //*** 图片堆栈数组
    this.imgWidthStick = [];

    // trigger slider initialization
    this.setup();


    //自动autoplay
    this.begin();

    // add event listeners
    if (this.element.addEventListener) {
        this.element.addEventListener('touchstart', this, false);
        this.element.addEventListener('touchmove', this, false);
        this.element.addEventListener('touchend', this, false);
        this.element.addEventListener('webkitTransitionEnd', this, false);
        this.element.addEventListener('msTransitionEnd', this, false);
        this.element.addEventListener('oTransitionEnd', this, false);
        this.element.addEventListener('transitionend', this, false);
        window.addEventListener('resize', this, false);
    }

};

Swipe.prototype = {




    setup:function () {
        var self = this;


        // get and measure amt of slides
        this.slides = this.element.children;


        $.ajax({
            url:"ajax.json",
            success:function (response) {
                if (response.ret[0].indexOf("SUCCESS::") != -1) {
                    var items = response.data.result.itemDetailList;
                    var todo = items.slice(0, 4);
                    items.splice(0,4);
                    self.itemsList = items;
                    self.timedChunk(todo, self._addItem, self, function () {
                    });

                }
            }
        });


        this.length = this.slides.length;

        // return immediately if their are less than two slides
        //    if (this.length < 2) return null;

        // determine width of each slide
        this.width = this.container.getBoundingClientRect().width;

        // return immediately if measurement fails
        // 准备修改this.width
        if (!this.width) return null;

        // hide slider element but keep positioning during setup
        this.container.style.visibility = 'hidden';



        // set start position and force translate to remove initial flickering
        this.slide(this.index, 0);

        // show slider element
        this.container.style.visibility = 'visible';


    },


    makeArray:function (o) {
        var ret = [];
        for (var i = 0, l = o.length; i < l; i++) {
            ret[i] = o[i];
        }
        return ret;
    },

    _addItem:function (item) {
        var self = this;

        self._imgReady(item.imageSmallUrl + '_270x180.jpg', function () {

            $(self.element).append('<li style="width:' + this.width + 'px"><a href="#"><img src="' + item.imageSmallUrl + '_270x180.jpg"><span class="price"><em></em><b>￥'+item.originalPrice+'</b></span></a></li>');

            self.imgWidthStick.push(this.width + self.MARGIN_GRAP);//li空隙
            var imgListArr = self.imgWidthStick,
                totalW = eval(imgListArr.join("+"));

            $(self.element).width(totalW);
        })


    },

    timedChunk:function (todo, process, context, callback) {
        var stopper = {}, timer;
        if (todo.length > 0) {
            timer = setTimeout(function () {
                var start = +new Date();
                do {
                    var item = todo.shift();
                    process.call(context, item);
                } while (todo.length > 0 && (+new Date() - start < 50));

                if (todo.length > 0) {
                    timer = setTimeout(arguments.callee, 25);
                } else {
                    callback && callback.call(context, todo);
                }
            }, 25);
        } else {
            callback;
        }

        stopper.stop = function () {
            if (timer) {
                clearTimeout(timer);
                todo = [];
                items.each(function (item) {
                    item.stop();
                });
            }
        };
        return stopper;
    },


    //图片imgReady预加载
    _imgReady:(function () {
        var list = [], intervalId = null,

            // 用来执行队列
            tick = function () {
                for (var i = 0; i < list.length; i++) {
                    list[i].end ? list.splice(i--, 1) : list[i]();
                }
                !list.length && stop();
            },

            // 停止所有定时器队列
            stop = function () {
                clearInterval(intervalId);
                intervalId = null;
            };

        return function (url, ready, load, error) {
            var onready, width, height, newWidth, newHeight,
                img = new Image();

            var status = {};

            img.src = url;

            // 如果图片被缓存，则直接返回缓存数据
            if (img.complete) {
                ready.call(img);
                load && load.call(img);
                return {
                    ready:true,
                    width:img.width
                }
            }

            width = img.width;
            height = img.height;

            // 加载错误后的事件
            img.onerror = function () {
                error && error.call(img);
                onready.end = true;
                img = img.onload = img.onerror = null;
            };

            // 图片尺寸就绪
            onready = function () {
                newWidth = img.width;
                newHeight = img.height;
                if (newWidth !== width || newHeight !== height ||
                    // 如果图片已经在其他地方加载可使用面积检测
                    newWidth * newHeight > 1024
                    ) {
                    ready.call(img);

                    onready.end = true;
                    status.ready = true;
                    status.width = img.width;
                }
            };
            onready();

            // 完全加载完毕的事件
            img.onload = function () {
                // onload在定时器时间差范围内可能比onready快
                // 这里进行检查并保证onready优先执行
                !onready.end && onready();

                load && load.call(img);

                // IE gif动画会循环执行onload，置空onload即可
                img = img.onload = img.onerror = null;
            };

            // 加入队列中定期执行
            if (!onready.end) {
                list.push(onready);
                // 无论何时只允许出现一个定时器，减少浏览器性能损耗
                if (intervalId === null) intervalId = setInterval(tick, 40);
            }

            return status;
        };
    })(),


    /*
     * 通过推入数组堆栈的元算来计算要平移的距离
     * 传入的index，通过划分 0-index 的数组，即可计算总的宽度
     *
     * */
    _calculateLeft:function (index) {

        var tmp = this.imgWidthStick,
            newArr = tmp.slice(0, index);

        return index ? eval(newArr.join("+")) : 0;
    },


    slide:function (index, duration) {

        //计算当前index相对应的左侧偏移
        var ulLeft = this._calculateLeft(index);

        var style = this.element.style;

        // fallback to default speed
        if (duration == undefined) {
            duration = this.speed;
        }

        // set duration speed (0 represents 1-to-1 scrolling)
        style.webkitTransitionDuration = style.MozTransitionDuration = style.msTransitionDuration = style.OTransitionDuration = style.transitionDuration = duration + 'ms';


        // translate to given index position
        //**** style.MozTransform = style.webkitTransform = 'translate3d(' + -(index * this.width) + 'px,0,0)';

        style.MozTransform = style.webkitTransform = 'translate3d(' + -(ulLeft) + 'px,0,0)';

        //**** style.msTransform = style.OTransform = 'translateX(' + -(index * this.width) + 'px)';
        style.msTransform = style.OTransform = 'translateX(' + -(ulLeft) + 'px)';

        // set new index to allow for expression arguments
        this.index = index;


        /*
         * 判断是否需要预加载
         * */
        this.needPreload();

    },


    needPreload:function () {
        var self = this;
        //当前序列值快到右侧
        if (this.index && (this.index + 2 >= this.imgWidthStick.length)) {

            var todo1 = self.itemsList;
            var todo = todo1.splice(0, 2);

            this.timedChunk(todo, self._addItem, self, function () {
            });
        }

    },


    begin:function () {

        var _this = this;

        this.interval = (this.delay)
            ? setTimeout(function () {
            _this.next(_this.delay);
        }, this.delay)
            : 0;

    },

    stop:function () {
        this.delay = 0;
        clearTimeout(this.interval);
    },

    resume:function () {
        this.delay = this.options.auto || 0;
        this.begin();
    },

    handleEvent:function (e) {
        switch (e.type) {
            case 'touchstart': this.onTouchStart(e); break;
            case 'touchmove': this.onTouchMove(e); break;
            case 'touchend': this.onTouchEnd(e); break;
            case 'webkitTransitionEnd':
            case 'msTransitionEnd':
            case 'oTransitionEnd':
            case 'transitionend': this.transitionEnd(e); break;
            case 'resize': this.setup(); break;
        }
    },

    transitionEnd:function (e) {

        if (this.delay) this.begin();

        this.callback(e, this.index, this.slides[this.index]);

    },

    onTouchStart:function (e) {

        this.start = {

            // get touch coordinates for delta calculations in onTouchMove
            pageX:e.touches[0].pageX,
            pageY:e.touches[0].pageY,

            // set initial timestamp of touch sequence
            time:Number(new Date())

        };

        // used for testing first onTouchMove event
        this.isScrolling = undefined;

        // reset deltaX
        this.deltaX = 0;

        // set transition time to 0 for 1-to-1 touch movement
        this.element.style.MozTransitionDuration = this.element.style.webkitTransitionDuration = 0;


        e.stopPropagation();
    },

    onTouchMove:function (e) {

        // ensure swiping with one touch and not pinching
        if (e.touches.length > 1 || e.scale && e.scale !== 1) return;

        this.deltaX = e.touches[0].pageX - this.start.pageX;

        // determine if scrolling test has run - one time test
        if (typeof this.isScrolling == 'undefined') {
            this.isScrolling = !!( this.isScrolling || Math.abs(this.deltaX) < Math.abs(e.touches[0].pageY - this.start.pageY) );
        }

        // if user is not trying to scroll vertically
        if (!this.isScrolling) {

            // prevent native scrolling
            e.preventDefault();

            // cancel slideshow
            clearTimeout(this.interval);

            //var curWidth = this.imgWidthStick[this.index];


            var curWidth = 180;//大致的图片的宽度来处理


            // increase resistance if first or last slide

            //TODO:修正this.length
            this.deltaX =
                this.deltaX /
                    ( (!this.index && this.deltaX > 0               // if first slide and sliding left
                        || this.index == this.length - 1              // or if last slide and sliding right
                        && this.deltaX < 0                            // and if sliding at all
                        ) ?
                        ( Math.abs(this.deltaX) / curWidth + 1 )      // determine resistance level 回弹
                        : 1 );                                          // no resistance if false

            // translate immediately 1-to-1
            //临时解决方案：将移动都统一放到touchend
            //   this.element.style.MozTransform = this.element.style.webkitTransform = 'translate3d(' + (this.deltaX - this.index * curWidth) + 'px,0,0)';

            e.stopPropagation();
        }


    },

    onTouchEnd:function (e) {

        // determine if slide attempt triggers next/prev slide
        var isValidSlide =
            Number(new Date()) - this.start.time < 250      // if slide duration is less than 250ms
                && Math.abs(this.deltaX) > 20                   // and if slide amt is greater than 20px
                ///******    || Math.abs(this.deltaX) > this.width/2,        // or if slide amt is greater than half the width
                //将this.width修改为可变宽度
                //    || Math.abs(this.deltaX) > this.imgWidthStick[this.index]/2,        // or if slide amt is greater than half the width

                //TODO:经过测试可能滑动定宽距离来滚动更符合体验习惯

                || Math.abs(this.deltaX) > 180 / 2, // or if slide amt is greater than half the width

            // determine if slide attempt is past start and end
            isPastBounds =
                !this.index && this.deltaX > 0                          // if first slide and slide amt is greater than 0
                    || this.index == this.length - 1 && this.deltaX < 0;    // or if last slide and slide amt is less than 0

        // if not scrolling vertically
        if (!this.isScrolling) {

            // call slide function with slide end value based on isValidSlide and isPastBounds tests
            this.slide(this.index + ( isValidSlide && !isPastBounds ? (this.deltaX < 0 ? 1 : -1) : 0 ), this.speed);

        }

    }

};
