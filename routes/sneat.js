const express = require("express");
const router = express.Router();

router.use(function (req, res, next) {
 const openPath = req.path.split('/')[1];
  const pageModel = {
    pageOption: {
        title : 'JinOh-Express',
        menu : true,
        navbar: true,
    },
    menuOption: {
      activeUrl: req.originalUrl,
      openPath: openPath,
    },
  };

  res.pageModel = pageModel;

  next();
});

/* GET home page. */
router.get("/", function (req, res, next) {
    console.log(res.pageModel);
  res.render("sneat/index", res.pageModel);
});

//layouts...
router.get("/layouts/without-menu", function (req, res, next) {
  res.pageModel.pageOption.menu = false;
  console.log(res.pageModel);
  res.render("sneat/layouts/without-menu", res.pageModel);
});
router.get("/layouts/without-navbar", function (req, res, next) {
    res.pageModel.pageOption.navbar = false;
    console.log(res.pageModel);
  res.render("sneat/layouts/without-navbar", res.pageModel);
});

module.exports = router;
