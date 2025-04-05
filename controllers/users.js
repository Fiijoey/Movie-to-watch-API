const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection('users').find();
        const users = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving users', details: error.message });
    }
};

const getSingle = async (req, res) => {
    try {
        const userId = req.params.id;

        // Check for invalid ObjectId format
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid User ID format' });
        }

        const result = await mongodb.getDatabase().db().collection('users').find({ _id: new ObjectId(userId) }).toArray();

        if (result.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving the user', details: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const user = {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            major: req.body.major,
            graduationYear: req.body.graduationYear,
            GPA: req.body.GPA,
            attendanceMode: req.body.attendanceMode,
            courses: req.body.courses
        };

        const response = await mongodb.getDatabase().db().collection('Users').insertOne(user);

        if (response.acknowledged) {
            res.status(201).json({ message: 'User created successfully', userId: response.insertedId });
        } else {
            throw new Error('User creation failed');
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the user', details: error.message });
    }
};

const updateUser= async (req, res) => {
    try {
        const userId = req.params.id;

        // Check for invalid ObjectId format
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid User ID format' });
        }

        const user = {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            major: req.body.major,
            graduationYear: req.body.graduationYear,
            GPA: req.body.GPA,
            attendanceMode: req.body.attendanceMode,
            courses: req.body.courses
        };

        const response = await mongodb.getDatabase().db().collection('users').replaceOne({ _id: new ObjectId(userId) }, user);

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'User updated successfully' });
        } else {
            res.status(404).json({ error: 'User not found or no changes made' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the user', details: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Check for invalid ObjectId format
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid USer ID format' });
        }

        const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: new ObjectId(userId) });

        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the user', details: error.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser,
};

