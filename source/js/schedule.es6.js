"use strict";

import $ from 'jquery';
import './Interactions';
//import 'fullcalendar';
//import 'fullcalendar-scheduler';

import AssetBuilder from './components/AssetBuilder';
import ClassManager from './components/ClassManager';

$(function() {

    let ab = new AssetBuilder('#schedule1', {
        resourceText: "Classes",
        multiView: false, //multiView: ['agenda', 'month'],
        viewType: 'teacher/classEvents',
        defaultView: 'timelineDay'
    });
    ab.on('eventRender', function(event, element) {
        console.log("Event Created");
    }).on('eventDestroy', function(event, element, view) {
        console.log("Event Destroyed");
    });
    console.log(ab);
    console.log(ab.build());

    //console.log(ab);


    /*let calendar = $('#schedule1').fullCalendar({
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
    });
    //calendar.fullCalendar()*/
    
});