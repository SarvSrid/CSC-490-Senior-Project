select  * from main_question;
select * from question_option;


--Main questions (Easy)

-- Topic 10: "Intro to C++"

-- Question 1
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (46, 'What is the correct syntax to print "Hello World" in C++?', '#include <iostream>\nusing namespace std;', 1, 10, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(221, 46, 'cout << "Hello World";', false),
(222, 46, 'print("Hello World");', false),
(223, 46, 'std::cout << "Hello World";', true),
(224, 46, 'Console.Write("Hello World");', false);


-- Question 2
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (47, 'How do you declare an integer variable in C++?', '// Variable should be named "count"', 1, 10, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(225, 47, 'int count;', true),
(226, 47, 'integer count;', false),
(227, 47, 'var count = 0;', false),
(228, 47, 'let count: int;', false);


-- Question 3
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (48, 'How do you get user input for an integer in C++?', '#include <iostream>\nusing namespace std;', 1, 10, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(229, 48, 'cin >> number;', true),
(230, 48, 'input(number);', false),
(231, 48, 'scanf("%d", &number);', false),
(232, 48, 'number = console.input();', false);


-- Question 4
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (49, 'What is the correct if-else syntax in C++?', 'int x = 5;', 1, 10, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(233, 49, 'if (x > 3) { cout << "Yes"; } else { cout << "No"; }', true),
(234, 49, 'if x > 3 then cout << "Yes" else cout << "No"', false),
(235, 49, 'when x > 3: print("Yes") else: print("No")', false),
(236, 49, 'if x > 3: cout << "Yes" else: cout << "No"', false);


-- Question 5
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (50, 'How do you write a for loop that runs 5 times?', '// Should print numbers 0 through 4', 1, 10, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(237, 50, 'for (int i = 0; i < 5; i++) { cout << i; }', true),
(238, 50, 'for i in range(5): cout << i;', false),
(239, 50, 'for (i = 0; i <= 5; i++) { print(i); }', false),
(240, 50, 'loop (int i = 0; i < 5; i++) { display(i); }', false);






-- Topic 11: "Variables and Data Types"

--Question 1

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (51, 'What happens when you modify a reference variable in C++?', 'int x = 5;\nint &ref = x;\nref = 10;', 1, 11, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(241, 51, 'Only ref changes to 10', false),
(242, 51, 'Both x and ref now equal 10', true),
(243, 51, 'Compile error - references are immutable', false),
(244, 51, 'Creates a new variable ref with value 10', false);


-- Question 2
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (52, 'How do you declare an unchangeable variable in C++?', 'Value should be fixed at 100', 1, 11, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(245, 52, 'let max = 100;', false),
(246, 52, 'const int max = 100;', true),
(247, 52, 'static max = 100;', false),
(248, 52, 'final int max = 100;', false);


-- Question 3

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (53, 'Which is a valid boolean declaration in C++?', 'Should represent true/false state', 1, 11, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(249, 53, 'boolean flag = true;', false),
(250, 53, 'var flag = false;', false),
(251, 53, 'bool flag = true;', true),
(252, 53, 'Bool flag(1);', false);


-- Question 4

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (54, 'What does this pointer operation yield?\nint arr[3] = {10,20,30};\nint *ptr = arr + 2;', 'Assume 4-byte integers', 1, 11, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(253, 54, 'Value 30', false),
(254, 54, 'Pointer to arr[8] (out of bounds)', false),
(255, 54, 'Pointer to arr[1] (value 20)', false),
(256, 54, 'Pointer to arr[2] (value 30)', true);


-- Question 5

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (55, 'Which typically uses more memory in C++?', 'Consider standard implementations', 1, 11, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(257, 55, 'double', true),
(258, 55, 'float', false),
(259, 55, 'int', false),
(260, 55, 'bool', false);







-- Topic 12: "Basic Input/Output"

-- Question 1

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (56, 'What happens with this input statement when entering "10 20.5 ''A''"?', 'int x; double y; char z;\ncin >> x >> y >> z;', 1, 12, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(261, 56, 'x=10, y=20.5, z=''A''', true),
(262, 56, 'x=10, y=20, z=.5', false),
(263, 56, 'Only x gets value 10', false),
(264, 56, 'Compile error', false);


-- Question 2

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (57, 'How can you check if the last input operation failed?', 'int age;\ncin >> age;', 1, 12, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(265, 57, 'if(cin == NULL)', false),
(266, 57, 'if(cin.error())', false),
(267, 57, 'if(!cin)', true),
(268, 57, 'if(cin.failbit)', false);


-- Question 3

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (58, 'What does this output statement display?', 'cout << setw(10) << left << "Hello" << setw(5) << 42;', 1, 12, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(269, 58, 'Hello42', false),
(270, 58,  'Hello     42   ', true),
(271, 58, '     Hello42', false),
(272, 58, 'Hello 42', false);

-- Question 4

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (59, 'What remains in the buffer after this input?', 'int n; char c;\ncin >> n;\n// User enters "123abc"', 1, 12, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
values
(273, 59, '"23abc"', false),
(274, 59, 'Empty buffer', false),
(275, 59, '"123abc"', false),
(276, 59, '"abc"', true);

-- Question 5

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (60, 'What does this input statement expect?', 'int d, m, y;\nchar sep;\ncin >> d >> sep >> m >> sep >> y;', 1, 12, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(277, 60, 'Date format like 25/12/2023', true),
(278, 60, 'Three numbers separated by any whitespace', false),
(279, 60, 'Three numbers with same separator character', false),
(280, 60, 'Will accept any input format', false);



-- Interediate Difficulty



-- Topic 13: "Control Structures (if/else, loops)"

-- Question 1

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (61, 'How many times will "Hello" be printed?', 'for(int i = 0; i < 10; i += 2) {\n    if(i % 3 == 0) continue;\n    cout << "Hello";\n}', 1, 13, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(281, 61, '3 times', false),
(282, 61, '4 times', true),
(283, 61, '5 times', false),
(284, 61, '6 times', false);

-- Question 2

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (62, 'What is the output when x=5 and y=3?', 'if(x > 3 && y++ > 2) {\n    cout << y;\n} else {\n    cout << x;\n}', 1, 13, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(285, 62, '3', false),
(286, 62, '4', true),
(287, 62, '5', false),
(288, 62, '6', false);

-- Question 3

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (63, 'When does this loop terminate?', 'int i = 10;\nwhile(i-- > 5 && ++i < 8) {\n    cout << i;\n}', 1, 13, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(289, 63, 'When i equals 5', false),
(290, 63, 'After first iteration (i=9)', true),
(291, 63, 'Never (infinite loop)', false),
(292, 63, 'When i equals 7', false);

-- Question 4

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (64, 'What is printed when input is 2?', 'switch(input) {\n    case 1: cout << "A";\n    case 2: cout << "B";\n    case 3: cout << "C"; break;\n    default: cout << "D";\n}', 1, 13, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(293, 64, 'B', false),
(294, 64, 'BC', true),
(295, 64, 'BCD', false),
(296, 64, 'Compile error', false);

-- Question 5

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (65, 'What is the final value of x?', 'int x = 0;\nfor(int i = 0; i < 10; i++) {\n    if(i % 3 == 0) continue;\n    if(i == 7) break;\n    x += i;\n}', 1, 13, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(297, 65, '11', false),
(298, 65, '12', false),
(299, 65, '17', true),
(300, 65, '27', false);




-- Topic 14: "Functions and Classes"

-- Question 1

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (66, 'What is the purpose of a const member function?', 'class MyClass {\npublic:\n    int getValue() const;\n};', 1, 14, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(301, 66, 'Returns a const value', false),
(302, 66, 'Can be called on const objects', true),
(303, 66, 'Makes all members const', false),
(304, 66, 'Prevents function from being overridden', false);

-- Question 2

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (67, 'Which is the correct function pointer declaration?', '// Pointer to function taking int and returning double', 1, 14, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(305, 67, 'double (*func)(int);', true),
(306, 67, 'double *func(int);', false),
(307, 67, 'double (int) *func;', false),
(308, 67, 'function<double(int)> func;', false);

-- Question 3

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (68, 'What happens with inherited constructors?', 'class Base {\npublic:\n    Base(int);\n};\nclass Derived : public Base {};', 1, 14, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(309, 68, 'Derived has no constructors', false),
(310, 68, 'Derived must explicitly inherit Base constructors', true),
(311, 68, 'Derived automatically gets Base constructors', false),
(312, 68, 'Only default constructor is inherited', false);

-- Question 4

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (69, 'What does this lambda capture?', 'int x = 1, y = 2;\nauto f = [&x, y]() { /* ... */ };', 1, 14, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(313, 69, 'x by reference, y by value', true),
(314, 69, 'Both by reference', false),
(315, 69, 'Both by value', false),
(316, 69, 'x by value, y by reference', false);

-- Question 5

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (70, 'When is a virtual destructor needed?', 'Base* ptr = new Derived();\ndelete ptr;', 1, 14, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(317, 70, 'Always when using polymorphism', true),
(318, 70, 'Only when Derived has resources', false),
(319, 70, 'When Base has virtual methods', false),
(320, 70, 'Never, delete works correctly', false);




-- Topic 15: "Operator Overloading"

-- Question 1

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (71, 'What is the correct signature for overloading the subscript operator?', 'class MyArray {\n    // Implement [] access\n};', 1, 15, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(321, 71, 'int operator[](int index);', false),
(322, 71, 'int& operator[](int index);', true),
(323, 71, 'int operator[](size_t index) const;', false),
(324, 71, 'int& operator[](size_t index);', false);

-- Question 2

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (72, 'Why would you declare an overloaded operator as a friend function?', '// When implementing operator<<', 1, 15, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(325, 72, 'To access private members when left operand isn''t the class', true),
(326, 72, 'To improve performance', false),
(327, 72, 'Because all operators must be friends', false),
(328, 72, 'To enable virtual operator overloading', false);

-- Question 3

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (73, 'What is critical to include in an assignment operator overload?', 'class MyString {\n    // Implement =\n};', 1, 15, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(329, 73, 'Self-assignment check', true),
(330, 73, 'Virtual keyword', false),
(331, 73, 'Constexpr specifier', false),
(332, 73, 'Noexcept guarantee', false);

-- Question 4

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (74, 'What''s the best way to overload operator+ for a custom Vector class?', '// Implement vector addition', 1, 15, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(333, 74, 'As a member function taking one parameter', false),
(334, 74, 'As a non-member friend function taking two parameters', true),
(335, 74, 'As a static member function', false),
(336, 74, 'Using a lambda expression', false);

-- Question 5

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (75, 'What distinguishes prefix from postfix ++ overloading?', 'class Counter {\n    // Implement ++\n};', 1, 15, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(337, 75, 'Postfix takes a dummy int parameter', true),
(338, 75, 'Prefix returns by value', false),
(339, 75, 'Postfix must be a friend function', false),
(340, 75, 'Prefix cannot return a reference', false);



-- Advanced Difficulty


-- Topic 16: "Pointers and Memory Management"

-- Question 1

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (76, 'What is the critical flaw in this copy constructor?', 'class String {
    char* data;
    size_t size;
public:
    String(const String& other) :
        data(other.data), size(other.size) {}
    ~String() { delete[] data; }
};', 1, 16, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(341, 76, 'Double deletion of data when copies are destroyed', true),
(342, 76, 'Memory leak of original data', false),
(343, 76, 'No null terminator for the string', false),
(344, 76, 'Size should be copied by reference', false);


-- Question 2

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (77, 'What happens when this function is called?', 'void process() {
    auto ptr1 = std::make_unique<int>(42);
    auto ptr2 = ptr1;
    std::cout << *ptr1;
}', 1, 16, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(345, 77, 'Compile error due to unique_ptr copy attempt', true),
(346, 77, 'Prints 42 then safely destroys pointer', false),
(347, 77, 'Runtime crash when dereferencing ptr1', false),
(348, 77, 'Prints garbage value', false);

-- Question 3

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (78, 'What is the output of this complex pointer code?', 'int arr[5] = {10,20,30,40,50};
int* p1 = arr + 3;
int* p2 = &arr[1];
std::cout << *(p1 - p2) << p1[-1];', 1, 16, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(349, 78, '230', false),
(350, 78, 'Runtime error', false),
(351, 78, '240', false),
(352, 78, '23030', true);

-- Question 4

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (79, 'What is wrong with this aligned memory allocation?', 'struct alignas(16) Vec4 {
    float x, y, z, w;
};
Vec4* vectors = new Vec4[100];
// Process vectors
delete[] vectors;', 1, 16, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(353, 79, 'new[] doesn''t guarantee alignment for over-aligned types', true),
(354, 79, 'Missing virtual destructor', false),
(355, 79, 'Should use malloc instead', false),
(356, 79, 'Array delete syntax is incorrect', false);


-- Question 5

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (80, 'What is the critical issue in this inheritance hierarchy?', 'class Base {
public:
    virtual ~Base() = default;
    void operator delete(void* p) { free(p); }
};
class Derived : public Base {
    char buffer[1024];
public:
    void operator delete(void* p) { free(p); }
};
Base* b = new Derived();
delete b;', 1, 16, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(357, 80, 'Derived class delete won''t be called through Base pointer', true),
(358, 80, 'Buffer size is too large', false),
(359, 80, 'Missing virtual before Derived::delete', false),
(360, 80, 'Should use delete[] for arrays', false);




-- Topic 17: "Templates and STL"

-- Question 1

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (81, 'What is the output of this template specialization code?', 'template<typename T>
void process(T val) { cout << "Generic"; }

template<>
void process<int>(int val) { cout << "int"; }

template<>
void process<double>(double val) { cout << "double"; }

int main() {
    process(3.14f);
    process(42);
    process(3.14);
}', 1, 17, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(361, 81, 'Generic int double', true),
(362, 81, 'double int double', false),
(363, 81, 'Generic Generic double', false),
(364, 81, 'Compile error', false);

-- Question 2

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (82, 'Which function is called in this SFINAE example?', 'template<typename T>
typename enable_if<is_integral<T>::value>::type
foo(T) { cout << "integral"; }

template<typename T>
typename enable_if<is_floating_point<T>::value>::type
foo(T) { cout << "floating"; }

int main() {
    foo(42ULL);
}', 1, 17, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(365, 82, 'integral', true),
(366, 82, 'floating', false),
(367, 82, 'Ambiguous call', false),
(368, 82, 'No matching function', false);

-- Question 3

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (83, 'What does this recursive variadic template output?', 'void print() { cout << "end"; }

template<typename T, typename... Args>
void print(T first, Args... args) {
    cout << first << " ";
    print(args...);
}

int main() {
    print(1, 2.5, "three");
}', 1, 17, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(369, 83, '1 2.5 three end', true),
(370, 83, '1 2.5 three', false),
(371, 83, 'three 2.5 1 end', false),
(372, 83, 'Compile error', false);

-- Question 4

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (84, 'What is the time complexity of this STL operation?', 'std::list<int> lst = {5,3,7,1,9};
auto it = std::find(lst.begin(), lst.end(), 7);
std::sort(lst.begin(), lst.end());', 1, 17, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(373, 84, 'O(n) find and O(n²) sort', false),
(374, 84, 'O(n) find and O(n log n) sort', false),
(375, 84, 'O(n) find and compile error for sort', true),
(376, 84, 'O(log n) find and O(n log n) sort', false);

-- Question 5

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (85, 'What is the key issue in this forwarding code?', 'template<typename... Args>
void wrapper(Args&&... args) {
    auto task = [&] {
        target(std::forward<Args>(args)...);
    };
    // Store task for later execution
}', 1, 17, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(377, 85, 'Dangling references if args are temporaries', true),
(378, 85, 'Missing noexcept specification', false),
(379, 85, 'Should use std::move instead of forward', false),
(380, 85, 'Lambda capture should be by value', false);



-- Topic 18: "Multithreading"

-- Question 1

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (86, 'What is the critical flaw in this locking code?', 'std::mutex m1, m2;

void thread1() {
    std::lock_guard<std::mutex> l1(m1);
    std::lock_guard<std::mutex> l2(m2);
    // Critical section
}

void thread2() {
    std::lock_guard<std::mutex> l2(m2);
    std::lock_guard<std::mutex> l1(m1);
    // Critical section
}', 1, 18, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(381, 86, 'Potential deadlock from inconsistent lock ordering', true),
(382, 86, 'Missing unlock calls', false),
(383, 86, 'Mutexes should be atomic', false),
(384, 86, 'No issue - this is safe', false);

-- Question 2

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (87, 'What memory ordering guarantees this operation?', 'std::atomic<int> x, y;
int r1, r2;

void thread1() {
    x.store(1, std::memory_order_relaxed);
    y.store(1, std::memory_order_release);
}

void thread2() {
    r1 = y.load(std::memory_order_acquire);
    r2 = x.load(std::memory_order_relaxed);
}', 1, 18, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(385, 87, 'If r1==1, then r2 must be 1', true),
(386, 87, 'No ordering guarantees', false),
(387, 87, 'x and y will always be consistent', false),
(388, 87, 'r2 will always be 1', false);

-- Question 3

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (88, 'What is wrong with this "thread-safe" singleton?', 'class Singleton {
    static Singleton* instance;
    static std::mutex m;
public:
    static Singleton* get() {
        if (!instance) {
            std::lock_guard<std::mutex> lock(m);
            if (!instance) {
                instance = new Singleton();
            }
        }
        return instance;
    }
};', 1, 18, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(389, 88, 'Potential memory reordering issues', true),
(390, 88, 'Memory leak on destruction', false),
(391, 88, 'Deadlock risk', false),
(392, 88, 'No issues - this is correct', false);

-- Question 4

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (89, 'What is the issue with this condition variable usage?', 'std::mutex m;
std::condition_variable cv;
bool ready = false;

void producer() {
    std::lock_guard<std::mutex> lk(m);
    ready = true;
    cv.notify_one();
}

void consumer() {
    std::unique_lock<std::mutex> lk(m);
    while (!ready) {
        cv.wait(lk);
    }
}', 1, 18, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(393, 89, 'Spurious wakeups not handled', false),
(394, 89, 'Potential lost wakeup', true),
(395, 89, 'Deadlock risk', false),
(396, 89, 'No issues - this is correct', false);

-- Question 5

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (90, 'What happens if the task throws an exception?', 'auto future = std::async(std::launch::async, [] {
    throw std::runtime_error("error");
    return 42;
});

try {
    int result = future.get();
} catch (...) {
    // Handle error
}', 1, 18, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(397, 90, 'Exception is propagated to main thread', true),
(398, 90, 'Program terminates immediately', false),
(399, 90, 'Future becomes invalid', false),
(400, 90, 'Exception is silently ignored', false);







-- This helps order all questions for the user
-- Order questions based on id
SELECT * FROM main_question
WHERE topic_id = 14
ORDER BY id;


-- Delete all questions to insert questions properly if issues arise
-- Delete the question options first
--DELETE FROM question_option WHERE question_id = 16;
--
-- Delete the question from the main_question table
--DELETE FROM main_question WHERE id = 16;