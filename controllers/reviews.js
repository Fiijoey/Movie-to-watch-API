const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection('reviews').find();
        const users = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving users', details: error.message });
    }
};

const getSingle = async (req, res) => {
    try {
        const reviewId = req.params.id;

        if (!ObjectId.isValid(reviewId)) {
            return res.status(400).json({ error: 'Invalid Review ID format' });
        }

        const result = await mongodb.getDatabase().db().collection('reviews').find({ _id: new ObjectId(reviewId) }).toArray();

        if (result.length === 0) {
            return res.status(404).json({ error: 'reviews not found' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving the user', details: error.message });
    }
};

const createReview = async (req, res) => {
    try {
        const review = {
            user_id: new ObjectId(req.body.user_id),
            movie_id: new ObjectId(req.body.movie_id),
            title: req.body.title,
            rating: req.body.rating,
            comment: req.body.comment
        };

        // ✅ Fixed collection name to lowercase
        const response = await mongodb.getDatabase().db().collection('reviews').insertOne(review);

        if (response.acknowledged) {
            res.status(201).json({ message: 'Review created successfully', reviewId: response.insertedId });
        } else {
            throw new Error('Review creation failed');
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the user', details: error.message });
    }
};

const updateReview = async (req, res) => {
    try {
        const reviewId = req.params.id;

        if (!ObjectId.isValid(reviewId)) {
            return res.status(400).json({ error: 'Invalid Review ID format' });
        }

        const review = {
            user_id: new ObjectId(req.body.user_id),
            movie_id: new ObjectId(req.body.movie_id),
            title: req.body.title,
            rating: req.body.rating,
            comment: req.body.comment
        };

        const response = await mongodb.getDatabase().db().collection('reviews').replaceOne({ _id: new ObjectId(reviewId) }, review);

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Review updated successfully' });
        } else {
            res.status(404).json({ error: 'Review not found or no changes made' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the Review', details: error.message });
    }
};

const deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.id;

        if (!ObjectId.isValid(reviewId)) {
            return res.status(400).json({ error: 'Invalid Review ID format' });
        }

        const response = await mongodb.getDatabase().db().collection('reviews').deleteOne({ _id: new ObjectId(reviewId) });

        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'Review deleted successfully' });
        } else {
            res.status(404).json({ error: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the Review', details: error.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createReview,
    updateReview,
    deleteReview,
};
