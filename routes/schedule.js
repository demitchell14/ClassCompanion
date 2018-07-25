const express = require('express');
const router = express.Router();

const loremIpsum    = require('lorem-ipsum');
const moment        = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('schedule', {
      local: true,
      pageTitle: 'Project Andes',
      list: [
          "line 1",
          "line 2",
          "line 3"
      ]
  });
});

router.get(['/load', '/load/:type'], function(req, res, next) {
    const MAX_CLASSES = 8;

    let classList = [
        "Accounting",
        "Business law",
        "Business management",
        "Consumer education",
        "Entrepreneurial skills",
        "Introduction to business",
        "Marketing",
        "Personal finance",

        "Animation",
        "App development",
        "Audio production",
        "Computer programming",
        "Computer repair",
        "Film production",
        "Graphic design",
        "Media technology",
        "Music production",
        "Typing",
        "Video game development",
        "Web design",
        "Web programming",
        "Word processing",
    ];


    let response = {
        query: req.query,
        type: req.params.type,
        events: [],
        classes: [],
    };

    switch (req.params.type) {
        case "events.json":
        case "classevents.json":
            let today = moment().startOf("day").add(6, 'hours');

            for (let i = 0; i < 50; i++) {
                response.events.push({
                    //id: i,
                    resourceId: `a${Math.floor(Math.random() * MAX_CLASSES)}`,
                    title: loremIpsum({
                        count: 4,
                        units: 'words',
                        suffix: ''
                    }),
                    start: today.format(),
                    end: moment(today).add(Math.floor(Math.random() * 8), 'hours').format()
                });
            }

            res.json(response.events);
            break;

        case "classlist.json":

            for (let i = 0; i < MAX_CLASSES; i++) {
                response.classes.push({
                    id: `a${i}`,
                    title: classList[Math.floor(Math.random() * classList.length)]
                });
            }

            res.json(response.classes);
            break;
        default:
            res.status(501);
            res.contentType("text/plain");
            res.send("Invalid type.");
    }

});



module.exports = router;
