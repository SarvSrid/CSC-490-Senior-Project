package com.csc340.crud_api_jpa_demo.student;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * StudentController.java.
 * Includes all REST API endpoint mappings for the Student object.
 */
@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService service;

    /**
     * Get a list of all Students in the database.
     * http://localhost:8080/students/all
     *
     * @return a list of Students  objects.
     */
    @GetMapping("/all")
    public List<Student> getAllStudents() {
        return service.getAllStudents();
    }

    /**
     * Get a specific Student by Id.
     * http://localhost:8080/students/2
     *
     * @param studentId the unique Id for a Student.
     * @return One Student object.
     */
    @GetMapping("/{studentId}")
    public Student getOneStudent(@PathVariable int studentId) {
        return service.getStudentById(studentId);
    }

    /**
     * Get a list of Students based on their major.
     * http://localhost:8080/students?major=csc
     *
     * @param major the search key.
     * @return A list of Student objects matching the search key.
     */
    @GetMapping("")
    public List<Student> getStudentsByMajor(@RequestParam(name = "major", defaultValue = "csc") String major) {
        return service.getStudentsByMajor(major);
    }


    /**
     * Get a list of students with a GPA above a threshold.
     * http://localhost:8080/students/honors?gpa=3.6
     *
     * @param gpa the minimum GPA
     * @return list of Student objects matching the search key.
     */
    @GetMapping("/honors")
    public List<Student> getHonorsStudents(@RequestParam(name = "gpa", defaultValue = "3.0") double gpa) {
        return service.getHonorsStudents(gpa);
    }

    /**
     * Create a new Student entry.
     * http://localhost:8080/students/new --data '{ "studentId": 4, "name": "sample4", "major": "csc", "gpa": 3.55}'
     *
     * @param student the new Student object.
     * @return the updated list of Students.
     */
    @PostMapping("/new")
    public List<Student> addNewStudent(@RequestBody Student student) {
        service.addNewStudent(student);
        return service.getAllStudents();
    }

    /**
     * Update an existing Student object.
     * http://localhost:8080/students/update/2 --data '{ "studentId": 1, "name": "sampleUpdated", "major": "csc", "gpa": 3.92}'
     *
     * @param studentId the unique Student Id.
     * @param student   the new update Student details.
     * @return the updated Student object.
     */
    @PutMapping("/update/{studentId}")
    public Student updateStudent(@PathVariable int studentId, @RequestBody Student student) {
        service.updateStudent(studentId, student);
        return service.getStudentById(studentId);
    }

    /**
     * Delete a Student object.
     * http://localhost:8080/students/delete/2
     *
     * @param studentId the unique Student Id.
     * @return the updated list of Students.
     */
    @DeleteMapping("/delete/{studentId}")
    public List<Student> deleteStudentById(@PathVariable int studentId) {
        service.deleteStudentById(studentId);
        return service.getAllStudents();
    }
}
