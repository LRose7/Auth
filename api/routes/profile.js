const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Profile = require('../models/Profile');
const User = require('../models/User');

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
    .then(profile => {
        if (!profile) {
            return res.status(404).json({ profile: 'There is no profile for this user' });
        }
        res.json(profile);
     })
     .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
    Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
        if (!profiles) { 
            return res.status(404).json({ profiles: 'There are no profiles' });
        }
        res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
});

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/handle/:handle', (req, res) => {
    const errors = {};
    Profile.findOne({ handle: req.params.handle })
    .then(profile => {
        if(!profile) {
            return res.status(404).json({ profile: 'There is no profile for this user' });
        }
        res.json(profile);
    }) 
    .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', (req, res) => {
    Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if(!profile) {
            return res.status(404).json({ profile: 'There is no profile for this user' });
        }
        res.json(profile);
    }) 
    .catch(err => res.status(404).json({ profile: 'There is no profile for this user' }));
});

// @route   POST api/profile
// @desc    Create user profile
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id; // includes avatar, name and email
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.handle = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    
    // Skills - Split into and array
    if(typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',');
    }

    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;

    Profile.findOne({ user: req.user.id })
    .then(profile => {
        if (profile) {
            // update
            Profile.findOneAndUpdate(
                { user: req.user.id }, 
                { $set: profileFields }, 
                { new: true }
            )
            .then(profile => res.json(profile));
        } else {
            // create

            // Check if handle exists
            Profile.findOne({ handle: profileFields.handle }).then(profile => {
                if(profile) {
                    res.status(400).json({ handle: 'That handle already exists' });
                }

                // Save Profile
                new Profile(profileFields).save().then(profile => res.json(profile));
            });
        }
    })
});

// @route   POST api/profile/experience
// @desc    Add an experience to profile
// @access  Private
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
    .then(profile => {
        const newExp = {
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
        }

        // Add to experience array
        profile.experience.unshift(newExp); // ushift adds it to the beginning of the array
        profile.save().then(profile => res.json(profile));
    });
});

// @route   POST api/profile/education
// @desc    Add an education to profile
// @access  Private
router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
    .then(profile => {
        const newEdu = {
            school: req.body.school,
            degree: req.body.degree,
            fieldofstudy: req.body.fieldofstudy,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
        }

        // Add to experience array
        profile.education.unshift(newEdu); // ushift adds it to the beginning of the array
        profile.save().then(profile => res.json(profile));
    });
});

// @route   DELETE api/profile/experience/:exp_id
// @desc    delete experience from profile
// @access  Private
router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
    .then(profile => {
        // Find the experience we want to delete
        // Get remove index
        const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);

        // Splice out of array
        profile.experience.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
});

// @route   DELETE api/profile/education/:edu_id
// @desc    delete education from profile
// @access  Private
router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
    .then(profile => {
        // Find the education we want to delete
        // Get remove index
        const removeIndex = profile.education // profile.education is the array
        .map(item => item.id)
        .indexOf(req.params.edu_id);

        // Splice out of array
        profile.education.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
});

// @route   DELETE api/profile/
// @desc    delete user and profile | Delete your account
// @access  Private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id })
    .then(() => {
        User.findByIdAndRemove({ _id: req.user.id})
        .then(() => res.json({ success: true }));
    });
});

module.exports = router;