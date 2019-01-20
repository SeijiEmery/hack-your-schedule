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

const CategorySchema = mongoose.Schema({
    id: ObjectId,
    name: String,
    color: String,
});

const UserDataSchema = mongoose.Schema({
    id: ObjectId,
    tasks: [TaskSchema],
    tags: [CategorySchema],
});
const TimeBock = mongoose.model('TimeBlock', TimeBlockSchema);
const Task = mongoose.model('Task', TaskSchema);
const Category = mongoose.model('Category', CategorySchema);
const UserData = mongoose.model('UserData', UserDataSchema);

module.exports = {
    UserData: UserData,
    Category: Category,
    Task: Task,
    TimeBlock: TimeBlock
};