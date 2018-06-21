var mongoose = require('mongoose');
var sectionSchema = require('./section.schema.server');
var sectionModel = mongoose.model('SectionModel', sectionSchema);

function createSection(section) {
    return sectionModel.create(section);
}

function findSectionsForCourse(courseId) {
    return sectionModel.find({courseId: courseId});
}

function decrementSectionSeats(sectionId) {
    return sectionModel.update({
        _id: sectionId
    }, {
        $inc: {seats: -1}
    });
}

function incrementSectionSeats(sectionId) {
    return sectionModel.update({
        _id: sectionId
    }, {
        $inc: {seats: +1}
    });
}

function deleteSection(sectionId){
    return sectionModel.deleteOne({_id: sectionId});
}

function updateSection(section){
    return sectionModel.update({
        _id: section.sectionId
    },{
        name: section.name,
        seats: section.seats,
        maxSeats: section.maxSeats
    });
}
function findSectionById(sectionId){
    return sectionModel.findById(sectionId);
}

module.exports = {
    createSection: createSection,
    findSectionsForCourse: findSectionsForCourse,
    decrementSectionSeats: decrementSectionSeats,
    incrementSectionSeats: incrementSectionSeats,
    deleteSection: deleteSection,
    updateSection: updateSection,
    findSectionById: findSectionById
};