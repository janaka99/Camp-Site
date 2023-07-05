const express = require('express')
const router = express.Router();
const campgrounds = require('../controllers/campgrounds')
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const {isLoggedIn, validatesCampground, isAuthor} = require('../middleware');
const { Router } = require('express');
var multer  = require('multer');
const {storage} = require('../cloudinary')
var upload = multer({storage});

router.route('/')
        .get(catchAsync (campgrounds.index))
        .post(isLoggedIn, upload.array('image'), validatesCampground, catchAsync (campgrounds.createCampground));

router.get('/new',isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
        .get(catchAsync(campgrounds.showCampground))
        .put(isLoggedIn, isAuthor, upload.array('image'), validatesCampground,catchAsync(campgrounds.updateCampground))
        .delete(isLoggedIn,isAuthor, catchAsync (campgrounds.deleteCampground));



router.get('/:id/edit',isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));


module.exports = router