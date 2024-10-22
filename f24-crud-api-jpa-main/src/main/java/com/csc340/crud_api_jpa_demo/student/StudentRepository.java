package com.csc340.crud_api_jpa_demo.student;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Provides the actual database transactions.
 */
@Repository
public interface StudentRepository  extends JpaRepository<Student, Integer> {

    List<Student> getStudentsByMajor(String major);

    @Query(value = "select * from students s where s.gpa > ?1", nativeQuery = true)
    List<Student> getHonorsStudents(double gpa);
}
