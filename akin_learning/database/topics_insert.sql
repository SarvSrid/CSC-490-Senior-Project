

INSERT INTO subject (id, name)
VALUES (1, 'Python'), (2, 'C++'), (3, 'Java'), (4, 'Assembly');

--Python topics
INSERT INTO topic (id, subject_id, name, difficulty_level) VALUES
(1, 1, 'Intro to Python', 1),
(2, 1, 'Variables and Data Types', 1),
(3, 1, 'Basic Data Structures', 1),
(4, 1, 'Control Structures (if/else, loops)', 2),
(5, 1, 'Error Exception Handling', 2),
(6, 1, 'Intermediate Data Structures', 2),
(7, 1, 'Object-Oriented Programming (OOP)', 3),
(8, 1, 'Networking and API Databases', 3),
(9, 1, 'File Handling', 3);

-- C++ topics
INSERT INTO topic (id, subject_id, name, difficulty_level) VALUES
-- Beginner (Difficulty Level 1)
(10, 2, 'Intro to C++', 1),
(11, 2, 'Variables and Data Types', 1),
(12, 2, 'Basic Input/Output', 1),

-- Intermediate (Difficulty Level 2)
(13, 2, 'Control Structures (if/else, loops)', 2),
(14, 2, 'Functions and Classes', 2),
(15, 2, 'Operator Overloading', 2),

-- Advanced (Difficulty Level 3)
(16, 2, 'Pointers and Memory Management', 3),
(17, 2, 'Templates and STL', 3),
(18, 2, 'Multithreading', 3);

-- Java topics
INSERT INTO topic (id, subject_id, name, difficulty_level) VALUES
-- Beginner (Difficulty Level 1)
(28, 3, 'Intro to Java', 1),
(29, 3, 'Variables and Data Types', 1),
(30, 3, 'Basic Input/Output', 1),

-- Intermediate (Difficulty Level 2)
(31, 3, 'Control Structures (if/else, loops)', 2),
(32, 3, 'Classes and Objects', 2),
(33, 3, 'Inheritance', 2),

-- Advanced (Difficulty Level 3)
(34, 3, 'Polymorphism', 3),
(35, 3, 'Exception Handling', 3),
(36, 3, 'Multithreading', 3);

-- Assembly Topics
INSERT INTO topic (id, subject_id, name, difficulty_level) VALUES
-- Beginner (Difficulty Level 1)
(19, 4, 'Intro to Assembly', 1),
(20, 4, 'Registers and Memory Addressing', 1),
(21, 4, 'Basic Instructions (MOV, ADD, SUB)', 1),

-- Intermediate (Difficulty Level 2)
(22, 4, 'Control Flow (Jumps and Loops)', 2),
(23, 4, 'Stack and Procedures', 2),
(24, 4, 'Interrupts', 2),

-- Advanced (Difficulty Level 3)
(25, 4, 'System Calls', 3),
(26, 4, 'Optimization Techniques', 3),
(27, 4, 'Advanced Memory Management', 3);

INSERT INTO progress (id, topic_id, user_id, active_questions, completed_questions)
VALUES
-- Python (Topics 1-9)
(1, 1, 1, 5, 1),
(2, 2, 1, 5, 1),
(3, 3, 1, 5, 1),
(4, 4, 1, 5, 1),
(5, 5, 1, 5, 1),
(6, 6, 1, 5, 1),
(7, 7, 1, 5, 1),
(8, 8, 1, 5, 1),
(9, 9, 1, 5, 1),

-- C++ (Topics 10-18)
(10, 10, 1, 5, 1),
(11, 11, 1, 5, 1),
(12, 12, 1, 5, 1),
(13, 13, 1, 5, 1),
(14, 14, 1, 5, 1),
(15, 15, 1, 5, 1),
(16, 16, 1, 5, 1),
(17, 17, 1, 5, 1),
(18, 18, 1, 5, 1),

-- Assembly (Topics 19-27)
(19, 19, 1, 5, 1),
(20, 20, 1, 5, 1),
(21, 21, 1, 5, 1),
(22, 22, 1, 5, 1),
(23, 23, 1, 5, 1),
(24, 24, 1, 5, 1),
(25, 25, 1, 5, 1),
(26, 26, 1, 5, 1),
(27, 27, 1, 5, 1),

-- Java (Topics 28-36)
(28, 28, 1, 5, 1),
(29, 29, 1, 5, 1),
(30, 30, 1, 5, 1),
(31, 31, 1, 5, 1),
(32, 32, 1, 5, 1),
(33, 33, 1, 5, 1),
(34, 34, 1, 5, 1),
(35, 35, 1, 5, 1),
(36, 36, 1, 5, 1);




-- Check all tables in topic
SELECT * FROM topic;

select  * from main_question;

select * from question_option;

SELECT * FROM topic ORDER BY id;

select * from progress;

-- Reset progress for a certain topic
UPDATE progress
SET completed_questions = 0
WHERE user_id = 1 AND topic_id = 1;

-- Reset all progress for user
UPDATE progress
SET completed_questions = 0
WHERE user_id = 1;


-- Updating questions to show progress
UPDATE progress
SET completed_questions = CASE id
    WHEN 28 THEN 2
    WHEN 29 THEN 3
    WHEN 30 THEN 2
    WHEN 31 THEN 3
    WHEN 32 THEN 4
    WHEN 33 THEN 3
    WHEN 34 THEN 2
    WHEN 35 THEN 3
    WHEN 36 THEN 3
END
WHERE id BETWEEN 28 AND 36;

ALTER TABLE main_question ALTER COLUMN subtext TYPE VARCHAR(1000);

SELECT * FROM user_topic_progress WHERE user_id = 1;


-- Check if table exists
SELECT * FROM information_schema.tables
WHERE table_name = 'user_topic_progress';

-- Check table structure
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'user_topic_progress';

INSERT INTO user_topic_progress (user_id, topic_id, last_visited_question_id, created_at, updated_at)
VALUES
    (1, 1, 5, NOW(), NOW()),
    (1, 2, 8, NOW(), NOW());

SELECT
    utp.user_id,
    t.id AS topic_id,
    t.name AS topic_name,
    utp.last_visited_question_id,
    utp.updated_at
FROM user_topic_progress utp
JOIN topic t ON utp.topic_id = t.id
WHERE utp.user_id = 1  -- Replace with your test user ID
ORDER BY utp.updated_at DESC
LIMIT 3;