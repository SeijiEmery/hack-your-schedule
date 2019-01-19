const mongoose = require('mongoose');

const TimeBlockSchema = mongoose.Schema({
    id: ObjectId,
    start: Date,
    end:   Date,
});

const TaskSchema = mongoose.Schema({
    id: ObjectId,
    descrip: String,
    completed: Boolean,
    timeblocks: [TimeBlockSchema],
    nextScheduled: { type: Date, required: false },
    categoryIds: [ObjectId],
});
