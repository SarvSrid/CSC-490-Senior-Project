select  * from main_question;
select * from question_option;




--Main questions (Easy)

--Topic 1: "Intro to python"
-- Question 1
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (1, 'What is Python?', 'Choose the correct definition.', 1, 1, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(1, 1, 'A programming language', true),
(2, 1, 'A type of snake', false),
(3, 1, 'A car brand', false),
(4, 1, 'A cooking ingredient', false);

-- Question 2
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (2, 'How do you declare a variable in Python?', 'Choose the correct syntax.', 1, 1, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(5, 2, 'var x = 10;', false),
(6, 2, 'int x = 10;', false),
(7, 2, 'x = 10', true),
(8, 2, 'declare x = 10;', false);

-- Question 3
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (3, 'What are Python''s basic data types?', 'Choose the correct option.', 1, 1, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(9, 3, 'Integers, floats, strings, lists, tuples', true),
(10, 3, 'Numbers, characters, arrays, and structures', false),
(11, 3, 'Classes, objects, methods, and attributes', false),
(12, 3, 'Files, directories, and paths', false);

-- Question 4
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (4, 'How do you create a function in Python?', 'Choose the correct syntax.', 1, 1, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(13, 4, 'function myFunction() {}', false),
(14, 4, 'def my_function():', true),
(15, 4, 'create function my_function()', false),
(16, 4, 'function: my_function()', false);

-- Question 5
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (5, 'What is a list comprehension?', 'Choose the correct definition.', 1, 1, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(17, 5, 'A way to create lists using a for loop', false),
(18, 5, 'A concise way to create lists', true),
(19, 5, 'A method to sort lists', false),
(20, 5, 'A function to filter lists', false);







--Topic 2: "Variables and Data Types"

-- Question 1
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (6, 'How do you assign a value to a variable in Python?', 'Select the correct syntax.', 1, 2, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(21, 6, 'variable = value', true),
(22, 6, 'value = variable', false),
(23, 6, 'set variable to value', false),
(24, 6, 'assign(value, variable)', false);

-- Question 2
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (7, 'Which of these is NOT a basic Python data type?', 'Choose the incorrect option.', 1, 2, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(25, 7, 'int', false),
(26, 7, 'str', false),
(27, 7, 'array', true),
(28, 7, 'bool', false);

-- Question 3
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (8, 'How would you create a string variable containing "Hello"?', 'Select the proper syntax.', 1, 2, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(29, 8, 'greeting = "Hello"', true),
(30, 8, 'greeting = Hello', false),
(31, 8, 'string greeting = "Hello"', false),
(32, 8, 'greeting: str = "Hello"', false);

-- Question 4
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (9, 'What will be the data type of result after: result = 5 + 3.2?', 'Consider implicit type conversion.', 1, 2, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(33, 9, 'int', false),
(34, 9, 'float', true),
(35, 9, 'str', false),
(36, 9, 'bool', false);

-- Question 5
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (10, 'Which of these is a valid boolean value in Python?', 'Select all that apply (but only one option is correct here).', 1, 2, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(37, 10, 'True', true),
(38, 10, 'true', false),
(39, 10, 'TRUE', false),
(40, 10, '1', false);






--Topic 3: "Basic Data Structures"

-- Question 1
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (11, 'Consider these Python list creation methods. Which one is both memory efficient and prevents modification of the list contents?',
'Think about both performance and immutability.', 1, 3, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
-- (43, 11, 'my_list = list()', false),
(41, 11, 'my_list = list()', false),
(42, 11, 'my_list = []', false),
(43, 11, 'my_list = tuple()', true),
(44, 11, 'my_list = [x for x in ()]', false);

-- Question 2
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (12, 'What will be the output of: print(len({"a": 1, "b": 2, "c": 3}))?',
'Consider how length is calculated for dictionaries.', 1, 3, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(45, 12, '1', false),
(46, 12, '6', false),
(47, 12, '3', true),
(48, 12, 'An error will occur', false);

-- Question 3
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (13, 'Which operation would convert the list [1, 2, 2, 3, 4, 4, 4] to contain only unique values?',
'Consider which data structure automatically handles duplicates.', 1, 3, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(49, 13, 'list(set([1, 2, 2, 3, 4, 4, 4]))', true),
(50, 13, 'tuple([1, 2, 2, 3, 4, 4, 4])', false),
(51, 13, 'dict([1, 2, 2, 3, 4, 4, 4])', false),
(52, 13, 'sorted([1, 2, 2, 3, 4, 4, 4])', false);

-- Question 4
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (14, 'What is the main advantage of using a set?', 'Consider set properties.', 1, 3, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES

(53, 14, 'Faster indexing of elements', false),
(54, 14, 'Maintaining insertion order', false),
(55, 14, 'Allowing multiple data types', false),
(56, 14, 'Automatic removal of duplicate', true);

-- Question 5
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (15, 'How do you access the last element of a list called "my_list"?', 'Select the correct method.', 1, 3, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(57, 15, 'my_list[-1]', true),
(58, 15, 'my_list[len(my_list)]', false),
(59, 15, 'my_list.last()', false),
(60, 15, 'my_list(end)', false);




-- Intermediate difficulty





-- Topic "Control Structures (if/else, loops)"

-- Question 1
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (16, 'What is the output of this nested if/else structure when x=12 and y=7?', 'x = 12\ny = 7\nif x > 10:\n
if y > 5 and x % y == 5:\n        print("Case 1")\n    elif y < 10 or x // y > 1:\n        print("Case 2")\n    else:\n
print("Case 3")\nelse:\n    print("Case 4")', 1, 4, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(61, 16, 'Case 1', false),
(62, 16, 'Case 2', true),
(63, 16, 'Case 3', false),
(64, 16, 'Case 4', false);

-- Question 2
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (17, 'What is the final value of x after this loop executes?', 'x = 0\nfor i in range(1, 10):\n
if i % 3 == 0:\n        continue\n    elif i % 5 == 0:\n        break\n    x += i', 1, 4, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(65, 17, '12', false),
(66, 17, '17', false),
(67, 17, '7', true),
(68, 17, 'The loop never completes', false);

-- Question 3
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (18, 'How many times will "Processing" be printed in this while-else structure?', 'count = 5\nwhile count > 0:\n
print("Processing")\n    count -= 1\n    if count == 2:\n
break\nelse:\n    print("Completed")', 1, 4, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(69, 18, '3 times', false),
(70, 18, '4 times', false),
(71, 18, '5 times', false),
(72, 18, '3 times and "Completed" is not printed', true);

-- Question 4
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (19, 'What does this nested if/else print when x=10?', 'x = 10\nif x > 5:\n    if x < 15:\n        print("A")\n    else:\n        print("B")\nelse:\n    print("C")', 1, 4, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(73, 19, 'Prints "A"', true),
(74, 19, 'Prints "B"', false),
(75, 19, 'Prints "C"', false),
(76, 19, 'Prints nothing', false);

-- Question 5
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (20, 'What does process([1,2,3,4]) return?', 'def process(x):\n    match x:\n        case [1,2,*rest] if len(rest)>1: return "A"\n
case [1,*_,y] if y%2==0: return "B"\n        case [1,2,3]: return "C"\n
case _: return "Default"\nprint(process([1,2,3,4]))', 1, 4, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(77, 20, 'Returns "Case A" because the list has more than 3 elements', false),
(78, 20, 'Returns "Case B" because the last element is even', true),
(79, 20, 'Returns "Case C" because the first three elements match', false),
(80, 20, 'Returns "Default" because no cases match', false);






-- Topic "Error Exception Handling"

-- Question 1
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (21, 'What is printed when this code runs with input "0"?', 'try:\n
num = int(input("Enter number: "))\n    print(10/num)\nexcept ValueError:\n
print("Invalid input")\nexcept ZeroDivisionError:\n    print("Cannot divide by zero")\nelse:\n
print("Successful operation")\nfinally:\n    print("Execution complete")', 1, 5, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(81, 21, '"Cannot divide by zero" \n "Execution complete"', true),
(82, 21, '"Invalid input"\n"Execution complete"', false),
(83, 21, '"Successful operation" \n "Execution complete"', false),
(84, 21, 'Only "Execution complete"', false);

-- Question 2
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (22, 'What does this exception hierarchy output when dividing by zero?', 'try:\n    print(10/0)\nexcept ArithmeticError:\n
print("Math error")\nexcept ZeroDivisionError:\n    print("Division by zero")\nexcept Exception:\n
print("General error")', 1, 5, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(85, 22, '"General error"', false),
(86, 22, '"Division by zero"', false),
(87, 22, '"Math error"', true),
(88, 22, 'No output (crashes)', false);

-- Question 3
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (23, 'What is the output of this nested try-except structure?', 'def risky_op(x):\n    try:\n        return 10/x\n    except:\n
print("Inner caught")\n        raise\n\ntry:\n    print(risky_op(0))\nexcept ZeroDivisionError:\n
print("Outer caught")', 1, 5, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(89, 23, 'No output (crashes)', false),
(90, 23, 'Just "Outer caught"', false),
(91, 23, 'Just "Inner caught"', false),
(92, 23, '"Inner caught" \n "Outer caught"', true);

-- Question 4
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (24, 'What happens when this code runs?', 'try:\n    print(10/"2")\nexcept Exception:\n    print("General error")\nexcept TypeError:\n    print("Type error")', 1, 5, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(93, 24, '"General error"', true),
(94, 24, '"Type error"', false),
(95, 24, '5.0', false),
(96, 24, 'Crashes with no output', false);

-- Question 5
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (25, 'What is the output of this context manager implementation?', 'class ValueChecker:\n
def __enter__(self):\n        print("Entering")\n        return self\n    \n    def __exit__(self, exc_type, exc_val, exc_tb):\n
print(f"Exiting: {exc_type.__name__ if exc_type else None}")\n        return True\n\nwith ValueChecker() as v:\n
print(10/0)\nprint("After")', 1, 5, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(97, 25, 'Entering \n Exiting: None \n After', false),
(98, 25, 'Entering \n Exiting: ZeroDivisionError \n After', true),
(99, 25, 'Entering \n [Traceback] \n ZeroDivisionError', false),
(100, 25, 'Entering \n After', false);





-- Topic "Intermediate Data Structures"

-- Question 1
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (26, 'What does this nested list comprehension create?', 'matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\n
result = [x for row in matrix if len(row) > 2 \n         for x in row if x % 3 == 0]', 1, 6, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(101, 26, '[3, 6, 9]', true),
(102, 26, '[1, 2, 3, 4, 5, 6, 7, 8, 9]', false),
(103, 26, '[[3], [6], [9]]', false),
(104, 26, 'Raises a ValueError', false);

-- Question 2
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (27, 'What is the output of this dictionary comprehension with condition?', 'data = {"a": 1, "b": 2, "c": 3, "d": 4}\n
result = {k: v*2 for k, v in data.items() \n         if v % 2 == 0 or k == "a"}', 1, 6, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(105, 27, '{"a": 2, "b": 4, "d": 8}', false),
(106, 27, '{"b": 4, "d": 8}', false),
(107, 27, '{"a": 2, "b": 4}', true),
(108, 27, '{"a": 1, "b": 2, "d": 4}', false);

-- Question 3
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (28, 'What does this complex set operation return?', 'set1 = {1, 2, 3, 4}\nset2 = {3, 4, 5, 6}\nset3 = {4, 5, 7}\n
result = set1.difference(set2).union(set3)', 1, 6, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(109, 28, '{1, 2, 4, 5, 7}', true),
(110, 28, '{1, 2, 3, 5, 6, 7}', false),
(111, 28, '{4, 5, 7}', false),
(112, 28, '{1, 2, 5, 7}', false);

-- Question 4
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (29, 'What values do the variables get after unpacking?', 'coordinates = (4, 5, 2)\nx, y, _ = coordinates', 1, 6, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(113, 29, 'x=4, y=5', true),
(114, 29, 'x=4, y=5, _=2', false),
(115, 29, 'x=5, y=2', false),
(116, 29, 'Error - too many values to unpack', false);

-- Question 5
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (30, 'What does this defaultdict of lists code output?', 'from collections import defaultdict\nd = defaultdict(list)\n
for i, letter in enumerate(["a", "b", "a", "c"]):\n    d[letter].append(i)\nprint(d["a"] + d["b"])', 1, 6, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(117, 30, '[0, 2, 1]', true),
(118, 30, '["a", "a", "b"]', false),
(119, 30, '[0, 1, 2]', false),
(120, 30, '[[0, 2], [1]]', false);




-- Advanced Difficulty





-- Topics "Object-Oriented Programming (OOP)"

-- Question 1
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (31, 'What is the output of this multiple inheritance example?', 'class A:\n    def __init__(self):\n
print("A init")\n    def method(self):\n        print("A method")\n\nclass B(A):\n    def __init__(self):\n
super().__init__()\n        print("B init")\n    def method(self):\n        print("B method")\n\nclass C(A):\n
def __init__(self):\n        super().__init__()\n        print("C init")\n\nclass D(B, C):\n    def __init__(self):\n
super().__init__()\n        print("D init")\n\nobj = D()\nobj.method()', 1, 7, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(121, 31, 'A init \n C init \n B init \n D init \n B method', true),
(122, 31, 'A init \n B init \n D init \n B method', false),
(123, 31, 'A init \n C init \n B init \n D init \n A method', false),
(124, 31, 'B init \n D init \n B method', false);

-- Question 2
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (32, 'What does this metaclass example demonstrate?', 'class Meta(type):\n    def __new__(cls, name, bases, namespace):\n
namespace["version"] = 1.0\n        return super().__new__(cls, name, bases, namespace)\n\nclass MyClass(metaclass=Meta):\n
pass\n\nprint(MyClass.version)', 1, 7, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(125, 32, 'Metaclass adding class attributes', true),
(126, 32, 'Method overriding', false),
(127, 32, 'Multiple inheritance', false),
(128, 32, 'Instance attribute creation', false);

-- Question 3
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (33, 'What is the output of this descriptor example?', 'class Descriptor:\n    def __get__(self, obj, objtype=None):\n
return "Descriptor get"\n    def __set__(self, obj, value):\n        print("Descriptor set")\n\nclass MyClass:\n
attr = Descriptor()\n\nobj = MyClass()\nobj.attr = 10\nprint(obj.attr)', 1, 7, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
-- Descriptor get\nDescriptor set
(129, 33, 'Descriptor get \n Descriptor set', false),
(130, 33, '10', false),
(131, 33, 'Descriptor set \n Descriptor get', true),
(132, 33, 'Error - cannot set attribute', false);

-- Question 4
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (34, 'What OOP concept is shown here?', 'class Dog:\n    def speak(self):\n        return "Woof!"\n\nclass Cat:\n    def speak(self):\n        return "Meow!"', 1, 7, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(133, 34, 'Polymorphism through method overriding', true),
(134, 34, 'Inheritance', false),
(135, 34, 'Encapsulation', false),
(136, 34, 'Abstract base class', false);

-- Question 5
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (35, 'What is the output of this property decorator example?', 'class Temperature:\n    def __init__(self, celsius):\n
self._celsius = celsius\n    \n    @property\n    def celsius(self):\n        return self._celsius\n    \n    @celsius.setter\n
def celsius(self, value):\n        if value < -273.15:\n            raise ValueError("Too cold")\n        self._celsius = value\n
\n    @property\n    def fahrenheit(self):\n        return self._celsius * 9/5 + 32\n\ntemp =
Temperature(0)\ntemp.celsius = -300\nprint(temp.fahrenheit)', 1, 7, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
-- Raises ValueError: Too cold
(137, 35, 'None', false),
(138, 35, '-148.0', false),
(139, 35, '32.0', false),
(140, 35, 'Raises ValueError: Too cold', true);




-- Topic "Networking and API Databases"

-- Question 1
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (36, 'Which HTTP method should be used to retrieve data from a REST API?', 'Consider REST API best practices.', 1, 8, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(141, 36, 'GET', true),
(142, 36, 'POST', false),
(143, 36, 'PUT', false),
(144, 36, 'DELETE', false);

-- Question 2
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (37, 'What does this SQLAlchemy model definition include?', 'from sqlalchemy import Column, Integer, String,
ForeignKey\nfrom sqlalchemy.orm import relationship\n\nclass User(Base):\n    __tablename__ = "users"\n
id = Column(Integer, primary_key=True)\n    name = Column(String(50), nullable=False)\n
posts = relationship("Post", back_populates="author")\n\nclass Post(Base):\n    __tablename__ = "posts"\n
id = Column(Integer, primary_key=True)\n    title = Column(String(100))\n    user_id = Column(Integer, ForeignKey("users.id"))\n
author = relationship("User", back_populates="posts")', 1, 8, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(145, 37, 'Composite primary key in Post model', false),
(146, 37, 'Many-to-many relationship with join table', false),
(147, 37, 'One-to-many relationship between User and Post', true),
(148, 37, 'No actual database constraints', false);

-- Question 3
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (38, 'What is the purpose of this FastAPI endpoint?', 'from fastapi import FastAPI, HTTPException\n\napp =
FastAPI()\n\n@app.post("/items/", status_code=201)\nasync def create_item(item: Item):\n
if item.name in existing_items:\n        raise HTTPException(status_code=400,\n
detail="Item already exists")\n    db_add(item)\n    return {"message": "Item created"}', 1, 8, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(149, 38, 'Creates new items with validation', false),
(150, 38, 'Handles duplicate item prevention', false),
(151, 38, 'Returns 201 on success or 400 for duplicates', true),
(152, 38, 'All of the above', true);

-- Question 4
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (39, 'What is the main advantage of WebSockets over HTTP for real-time applications?', 'Understand real-time communication protocols.', 1, 8, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(153, 39, 'Persistent two-way communication', true),
(154, 39, 'Better for one-time requests', false),
(155, 39, 'Higher security by default', false),
(156, 39, 'Smaller packet sizes', false);

-- Question 5
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (40, 'What is the primary purpose of an ORM (Object-Relational Mapping) tool?', 'Consider database abstraction layers.', 1, 8, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(157, 40, 'To interact with databases using object-oriented paradigms', true),
(158, 40, 'To optimize SQL query performance', false),
(159, 40, 'To replace database administrators', false),
(160, 40, 'To encrypt database connections', false);






-- Topic "File Handling"

-- Question 1
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (41, 'What is the output of this file mode comparison code?', 'def test_mode(mode):\n
with open("test.txt", "w") as f:\n        f.write("Initial content")\n    try:\n
with open("test.txt", mode) as f:\n            f.write("New ")\n            return f.read()\n
finally:\n        os.remove("test.txt")\n\nprint(test_mode("r+"))\nprint(test_mode("w+"))', 1, 9, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(161, 41, 'For r+: "Initial content" \n For w+: ""', false),
(162, 41, 'For r+: "New content" \n For w+: "New "', false),
(163, 41, 'For r+: "New itial content" \n For w+: "New "', true),
(164, 41, 'Both raise IOError', false);

-- Question 2
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (42, 'What is the advantage of using a context manager for files?', 'with open("file.txt") as f:\n    content = f.read()', 1, 9, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(165, 42, 'Automatically handles file closing', true),
(166, 42, 'Makes file operations faster', false),
(167, 42, 'Allows concurrent file access', false),
(168, 42, 'Encrypts the file contents', false);

-- Question 3
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (43, 'What is the result of this file position manipulation?', 'with open("data.txt", "w+") as f:\n
f.write("ABCDEFGHIJ")\n    f.seek(3)\n    print(f.tell(), end="-")\n    f.write("XYZ")\n
f.seek(0)\n    print(f.read())', 1, 9, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(169, 43, '3-ABCXYZGHIJ', false),
(170, 43, '3-ABCXYZIJ', false),
(171, 43, '3-ABCDXYZIJ', true),
(172, 43, '0-ABCDXYZGHIJ', false);

-- Question 4
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (44, 'What does this JSON file handling code demonstrate?', 'import json\nimport tempfile\n\ndef process_json():\n
data = {"a": 1, "b": [2, 3]}\n    with tempfile.NamedTemporaryFile(mode="w+", delete=False) as tf:\n
json.dump(data, tf, indent=2)\n        tf.seek(0)\n        modified = json.load(tf)\n
modified["b"].append(4)\n        tf.seek(0)\n        tf.truncate()\n        json.dump(modified, tf)\n
return tf.name\n\nfilename = process_json()\nwith open(filename) as f:\n
print(json.load(f)["b"])', 1, 9, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(173, 44, 'Safe JSON file modification pattern', true),
(174, 44, 'Memory-efficient JSON streaming', false),
(175, 44, 'JSON schema validation', false),
(176, 44, 'Insecure temporary file handling', false);

-- Question 5
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (45, 'What is the output of this binary file operation?', 'import struct\n\nwith open("data.bin", "wb") as f:\n
f.write(struct.pack(">iif", 10, 20, 3.14))\n\nwith open("data.bin", "rb") as f:\n    a, b, c = struct.unpack(">iif", f.read())\n
print(f"{a}-{b}-{c:.2f}")', 1, 9, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(177, 45, '10-20-3.14', true),
(178, 45, '20-10-3.14', false),
(179, 45, '3.14-10-20', false),
(180, 45, 'Binary data representation', false);





-- This helps order all questions for the user
-- Order questions based on id
SELECT * FROM main_question
WHERE topic_id = 18
ORDER BY id;

UPDATE progress
SET completed_questions = 0
WHERE topic_id = 1 AND user_id = 1;

UPDATE progress
SET completed_questions = 0
WHERE topic_id = 1;

-- Delete all questions to insert questions properly if issues arise
-- Delete the question options first
-- DELETE FROM question_option WHERE question_id = 16;
--
-- Delete the question from the main_question table
-- DELETE FROM main_question WHERE id = 16;