

import $ from 'jquery';

const AssetBuilder1 = {
    timelineCalendarOpts: function() {
        let startpoint = {
            defaultView: 'timelineDay',
            schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',

            header: {
                //center: 'month,timelineFourDays,agenda'
            },
            //eventLimit: 4,

            views: {
                timelineFourDays: {
                    type: 'timeline',
                    duration: { days: 4 }
                }
            },

            resourceLabelText: "Classes",
            resources: '/schedule/load/classlist.json',
            events: '/schedule/load/events.json',
        };
        return startpoint;
    }
};

//         resourceText: "Classes",
//         multiView: false, //multiView: ['agenda', 'month'],
//         viewType: 'teacher/classEvents',
//         defaultView: 'timelineDay'

//        resources: '/schedule/load/classlist.json',
//         events: '/schedule/load/events.json',

const defaultOptions = {
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    eventLimit: 5,
};

const XHR = {
    teacherClasses: '/schedule/load/classlist.json',
    teacher: {
        classes: '/schedule/load/classlist.json',
        classEvents: '/schedule/load/classevents.json'
    }
};

const buildOptions = function(builder) {
    let viewType = builder.viewType.split("/");
    let includedOptions = {};
    switch(viewType[0]) {
        case "teacher":
            builder.events = XHR[viewType[0]][viewType[1]];
            builder.resources = XHR[viewType[0]].classes;
            break;
    }

    return builder;
};

class AssetBuilder {


    constructor(ele, opts) {
        if (typeof opts === "undefined") {
            opts = ele;
            ele = false;
        }
        Object.assign(this, defaultOptions, buildOptions(opts));
        this.state = "init";
        this.targetElement = ele;

        if (this.resourceText)
            this.resourceLabelText = this.resourceText;
        //this.fcOptions = defaultOptions;
        //this.targetElement = ele;
        //this.resourceLabelText = opts.resourceText;
        //this.defaultView = opts.defaultView;
        //this.viewType = opts.viewType;
        //this.multiView = opts.multiView;

        //Object.assign(this.fcOptions, buildOptions(this));
    }

    on(event, callback) {
        if (typeof callback !== 'function') return this;

        if (this.state === "built") {
            //todo
            return this;
        } else {
            if (typeof this[event] === 'function' && 1===2) {
                let tmp = this[event];
                this[event] = function() {
                    let x = callback.apply(this, arguments);
                    console.log(x.defaultPrevented);
                    return tmp.apply(this,arguments);
                }
                //this[event] = callback

            } else this[event] = callback;
            //console.log(typeof this[event]);
            return this;
        }
    }

    build(selector) {
        if (typeof selector === "undefined" && !this.targetElement)
            throw new Error("No Target element given to build asset!");
        if (typeof selector === "undefined")
            selector = this.targetElement;
        let target = $(selector);

        this.state = "built";
        return target.fullCalendar(this);
        //return target;
    }


}

export default AssetBuilder;

//module.exports = AssetBuilder;