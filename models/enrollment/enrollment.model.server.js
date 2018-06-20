var mongoose = require('mongoose');
var enrollmentSchema = require('./enrollment.schema.server');
var enrollmentModel = mongoose.model(
    'EnrollmentModel',
    enrollmentSchema
);

function enrollStudentInSection(enrollment) {
    return enrollmentModel.create(enrollment);
}
function unenrollStudentInSection(enrollment) {
    return enrollmentModel.deleteOne(enrollment);
}

function findSectionsForStudent(studentId) {
    return enrollmentModel
        .find({student: studentId})
        .populate('section')
        .exec();
}
function deleteEnrollmentsForSection(sectionId){
    return enrollmentModel.deleteMany({section: sectionId})
}

module.exports = {
    enrollStudentInSection: enrollStudentInSection,
    findSectionsForStudent: findSectionsForStudent,
    unenrollStudentInSection: unenrollStudentInSection,
    deleteEnrollmentsForSection: deleteEnrollmentsForSection
};