select  * from main_question;
select * from question_option;


-- Java topics


-- Beginner difficulty


-- Topic 28: Intro to Java


-- Question 1
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (91, 'What is the output of this string operation?', 'String s1 = "Hello";
String s2 = new String("Hello");
String s3 = s1.intern();
System.out.println((s1 == s2) + " " + (s1 == s3));', 1, 28, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(401, 91, 'false true', true),
(402, 91, 'true true', false),
(403, 91, 'false false', false),
(404, 91, 'true false', false);

-- Question 2

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (92, 'How many times does this loop execute?', 'int count = 0;
for(int i = 1; i < 10; i *= 2) {
    for(int j = 0; j < i; j++) {
        count++;
    }
}
System.out.println(count);', 1, 28, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(405, 92, '15', false),
(406, 92, '7', false),
(407, 92, '31', true),
(408, 92, '10', false);

-- Question 3

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (93, 'What does this array code output?', 'int[] a = {1,2,3};
int[] b = a;
b[0] = 5;
System.out.println(a[0] + b[0]);', 1, 28, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(409, 93, '10', true),
(410, 93, '6', false),
(411, 93, '2', false),
(412, 93, 'Compile error', false);

-- Question 4

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (94, 'Which method is called?', 'void process(int x) { System.out.print("int"); }
void process(double x) { System.out.print("double"); }
void process(Integer x) { System.out.print("Integer"); }

public static void main(String[] args) {
    process(5);
}', 1, 28, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(413, 94, 'Compile error', false),
(414, 94, 'double', false),
(415, 94, 'Integer', false),
(416, 94, 'int', true);

-- Question 5

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (95, 'What is the result of this comparison?', 'String s1 = new String("Java");
String s2 = new String("Java");
System.out.println(s1.equals(s2) + " " + (s1 == s2));', 1, 28, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(417, 95, 'true false', true),
(418, 95, 'false false', false),
(419, 95, 'true true', false),
(420, 95, 'false true', false);




-- Topic 29: Variables and Data Types



-- Question 1

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (96, 'What is the result of this compound assignment?', 'byte b = 10;
b = b + 10;
System.out.println(b);', 1, 29, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(421, 96, 'Compile error', true),
(422, 96, '20', false),
(423, 96, '30', false),
(424, 96, '10', false);

-- Question 2

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (97, 'What does this floating-point calculation output?', 'double d1 = 0.1;
double d2 = 0.2;
System.out.println(d1 + d2 == 0.3);', 1, 29, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(425, 97, 'true', false),
(426, 97, '0.30000000000000004', false),
(427, 97, 'false', true),
(428, 97, 'Compile error', false);

-- Question 3

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (98, 'What is the output of this mixed-type division?', 'int x = 5;
int y = 2;
double result = x / y;
System.out.println(result);', 1, 29, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(429, 98, '2.5', false),
(430, 98, '2.0', true),
(431, 98, '2', false),
(432, 98, '2.50', false);

--  Question 4
INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (99, 'What does this character arithmetic produce?', 'char c = ''A'';
c += 32;
System.out.println(c);', 1, 29, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(433, 99, 'A', false),
(434, 99, 'a', true),
(435, 99, '97', false),
(436, 99, 'Compile error', false);

-- Question 5

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (100, 'What happens when this code runs?', 'final int x;
x = 10;
x = 20;
System.out.println(x);', 1, 29, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(437, 100, 'Prints 10', false),
(438, 100, 'Prints 20', false),
(439, 100, 'Compile error', true),
(440, 100, 'Runtime exception', false);



-- Topic 30: Basic Input/Output





-- Question 1

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (101, 'What does this Scanner code output for input "10 20 30"?', 'Scanner sc = new Scanner(System.in);
int sum = sc.nextInt() + sc.nextInt();
System.out.println(sum + " " + sc.nextLine());', 1, 30, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(441, 101, '30 30', true),
(442, 101, '30', false),
(443, 101, '30 20 30', false),
(444, 101, 'Compile error', false);

-- Question 2

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (102, 'What happens when reading empty input with this code?', 'BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
String line = br.readLine();
System.out.println(line.length());', 1, 30, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(445, 102, 'Prints 0', false),
(446, 102, 'NullPointerException', true),
(447, 102, 'IOException', false),
(448, 102, 'Infinite loop', false);

-- Question 3

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (103, 'What does this printf statement display?', 'System.out.printf("%-6.2f%04d", 12.3456, 42);', 1, 30, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(449, 103, '12.35 0042', false),
(450, 103, '12.35 0042', false),
(451, 103, '12.35 042', false),
(452, 103, '12.35 0042', true);

-- Question 4

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (104, 'What is wrong with this file reading approach?', 'try (FileReader fr = new FileReader("data.txt")) {
    int c;
    while ((c = fr.read()) != -1) {
        System.out.print((char)c);
    }
} // File contains multi-byte Unicode characters', 1, 30, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(453, 104, 'May corrupt multi-byte characters', true),
(454, 104, 'Too slow for large files', false),
(455, 104, 'Missing buffering', false),
(456, 104, 'Should use FileInputStream', false);

-- Question 5

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (105, 'Why might this password input code fail?', 'Console console = System.console();
char[] password = console.readPassword("Password:");', 1, 30, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(457, 105, 'Console may be null in IDEs', true),
(458, 105, 'Missing flush() call', false),
(459, 105, 'Should use Scanner instead', false),
(460, 105, 'Need to cast to String', false);



-- Intermediate Difficulty



-- Topic 31: Control Structures (if/else, loops)



-- Question 1

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (106, 'What does this PL/pgSQL function return?', 'CREATE OR REPLACE FUNCTION complex_loop()
RETURNS INTEGER AS $$
DECLARE
    i INTEGER := 0;
    j INTEGER := 0;
    result INTEGER := 0;
BEGIN
    FOR i IN 1..10 LOOP
        IF i % 3 = 0 THEN
            CONTINUE;
        END IF;

        FOR j IN 10..1 BY -2 LOOP
            result := result + (i * j);
            EXIT WHEN j < 5;
        END LOOP;

        EXIT WHEN i > 7;
    END LOOP;
    RETURN result;
END;
$$ LANGUAGE plpgsql;', 1, 31, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(461, 106, '648', false),
(462, 106, '732', true),
(463, 106, '840', false),
(464, 106, '576', false);

-- Question 2

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (107, 'What happens when this function is called with (15, 3)?', 'CREATE OR REPLACE FUNCTION nested_control(a INTEGER, b INTEGER)
RETURNS TEXT AS $$
DECLARE
    result TEXT;
BEGIN
    BEGIN
        IF a > 10 THEN
            IF b < 5 THEN
                result := ''Case 1'';
                RAISE EXCEPTION ''Forced Error'';
            ELSIF b > 8 THEN
                result := ''Case 2'';
            ELSE
                result := ''Case 3'';
            END IF;
        ELSE
            result := ''Case 4'';
        END IF;
    EXCEPTION
        WHEN OTHERS THEN
            result := result || '' - Handled'';
    END;
    RETURN result;
END;
$$ LANGUAGE plpgsql;', 1, 31, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(465, 107, 'Case 1 - Handled', true),
(466, 107, 'Case 2', false),
(467, 107, 'Case 3', false),
(468, 107, 'NULL', false);

-- Question 3

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (108, 'What is the final value of result after execution?', 'CREATE OR REPLACE FUNCTION array_processor()
RETURNS INTEGER AS $$
DECLARE
    numbers INTEGER[] := ARRAY[5,8,3,9,12,7,15,4];
    i INTEGER := 1;
    result INTEGER := 0;
BEGIN
    WHILE i <= array_length(numbers, 1) LOOP
        IF numbers[i] % 2 = 0 THEN
            result := result + numbers[i];
            i := i + 2;
        ELSE
            IF numbers[i] > 10 THEN
                EXIT;
            END IF;
            result := result - numbers[i];
            i := i + 1;
        END IF;
    END LOOP;
    RETURN result;
END;
$$ LANGUAGE plpgsql;', 1, 31, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(469, 108, '-5', false),
(470, 108, '12', true),
(471, 108, '20', false),
(472, 108, '7', false);

-- Question 4

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (109, 'How many times is helper() called when main(12) is executed?', 'CREATE OR REPLACE FUNCTION helper(n INTEGER, depth INTEGER)
RETURNS INTEGER AS $$
BEGIN
    IF n <= 0 THEN RETURN depth; END IF;
    IF n % 2 = 0 THEN
        RETURN helper(n / 2, depth + 1);
    ELSE
        RETURN helper(3 * n + 1, depth + 1);
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION main(start INTEGER)
RETURNS INTEGER AS $$
BEGIN
    RETURN helper(start, 0);
END;
$$ LANGUAGE plpgsql;', 1, 31, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(473, 109, '7', false),
(474, 109, '9', true),
(475, 109, '5', false),
(476, 109, '12', false);

-- Question 5

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (110, 'What is the output of this function when called with (3, 5)?', 'CREATE OR REPLACE FUNCTION dynamic_loop(x INTEGER, y INTEGER)
RETURNS TEXT AS $$
DECLARE
    i INTEGER;
    query TEXT;
    result TEXT := '''';
BEGIN
    FOR i IN 1..LEAST(x, y) LOOP
        query := ''SELECT '' || i::TEXT || '' + '' ||
                 CASE WHEN i % 2 = 0 THEN x::TEXT ELSE y::TEXT END;
        EXECUTE query INTO i;
        result := result || i::TEXT || '', '';

        IF i > 10 THEN
            result := result || ''Exit'';
            EXIT;
        END IF;
    END LOOP;
    RETURN result;
END;
$$ LANGUAGE plpgsql;', 1, 31, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(477, 110, '8, 7, 10, ', false),
(478, 110, '6, 7, 8, ', true),
(479, 110, '6, 8, 10, ', false),
(480, 110, '6, 7, 8, Exit', false);




-- Topic 32: "Classes and Objects"




-- Question 1


INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (111, 'What is the output of this object-oriented PL/pgSQL code?', 'CREATE TYPE ParentType AS (
    id INTEGER,
    name TEXT
) WITH OIDS;

CREATE TYPE ChildType UNDER ParentType AS (
    parent_ref REF ParentType,
    value NUMERIC
) WITH OIDS;

CREATE OR REPLACE FUNCTION process_objects()
RETURNS TEXT AS $$
DECLARE
    p ParentType := (1, ''Parent'')::ParentType;
    c ChildType := (2, ''Child'', REF(p), 100.5)::ChildType;
    result TEXT := '''';
BEGIN
    result := result || p.name || '' -> '';

    IF (c.parent_ref).name = ''Parent'' THEN
        result := result || c.name || '': '';
        result := result || (c.parent_ref).id || ''/'';
        result := result || c.value::TEXT;
    END IF;

    RETURN result;
END;
$$ LANGUAGE plpgsql;', 1, 32, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(481, 111, 'Parent -> Child: 1/100.5', true),
(482, 111, 'Parent -> Child: 2/100.5', false),
(483, 111, 'Child -> Parent: 1/100.5', false),
(484, 111, 'Runtime error', false);


-- Question 2


INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (112, 'What does this polymorphic function return when called with both types?', 'CREATE TYPE Account AS (
    id INTEGER,
    balance NUMERIC
);

CREATE TYPE PremiumAccount UNDER Account AS (
    bonus_points INTEGER
);

CREATE OR REPLACE FUNCTION process_account(a ANYELEMENT)
RETURNS TEXT AS $$
DECLARE
    result TEXT;
BEGIN
    result := ''ID: '' || a.id::TEXT || '', Balance: '' || a.balance::TEXT;

    IF pg_typeof(a) = ''premiumaccount''::regtype THEN
        result := result || '', Bonus: '' || a.bonus_points::TEXT;
    END IF;

    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Called with:
-- SELECT process_account((1, 500.0)::Account);
-- SELECT process_account((2, 1000.0, 50)::PremiumAccount);', 1, 32, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(485, 112, 'ID: 1, Balance: 500.0 and ID: 2, Balance: 1000.0, Bonus: 50', true),
(486, 112, 'ID: 1, Balance: 500.0, Bonus: NULL and ID: 2, Balance: 1000.0', false),
(487, 112, 'Error: cannot handle multiple types', false),
(488, 112, 'ID: 1, Balance: 500.0 and ID: 2, Balance: 1000.0', false);


-- Question 3


INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (113, 'What is the final state after these object operations?', 'CREATE TYPE Node AS (
    id INTEGER,
    next REF Node,
    data TEXT
);

CREATE OR REPLACE FUNCTION complex_object_chains()
RETURNS TEXT AS $$
DECLARE
    n1 Node := (1, NULL, ''First'')::Node;
    n2 Node := (2, REF(n1), ''Second'')::Node;
    n3 Node := (3, REF(n2), ''Third'')::Node;
    current REF Node := REF(n3);
BEGIN
    -- Mutate through references
    (current).data := ''Updated'';
    current := (current).next;
    (current).data := ''Changed'';

    RETURN n3.data || '' -> '' || n2.data || '' -> '' || n1.data;
END;
$$ LANGUAGE plpgsql;', 1, 32, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(489, 113, 'Updated -> Changed -> First', true),
(490, 113, 'Third -> Second -> First', false),
(491, 113, 'Updated -> Second -> First', false),
(492, 113, 'Third -> Changed -> First', false);


-- Question 4


INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (114, 'What does this composite object structure return?', 'CREATE TYPE Item AS (
    id INTEGER,
    price NUMERIC
);

CREATE TYPE Order AS (
    items Item[],
    discount NUMERIC
);

CREATE OR REPLACE FUNCTION calculate_total()
RETURNS NUMERIC AS $$
DECLARE
    i1 Item := (1, 10.99)::Item;
    i2 Item := (2, 24.50)::Item;
    i3 Item := (3, 5.75)::Item;
    o Order := (ARRAY[i1, i2, i3], 0.1)::Order;
    total NUMERIC := 0;
    i INTEGER;
BEGIN
    FOR i IN 1..array_length(o.items, 1) LOOP
        total := total + o.items[i].price;
    END LOOP;

    RETURN total * (1 - o.discount);
END;
$$ LANGUAGE plpgsql;', 1, 32, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(493, 114, '36.916', false),
(494, 114, '41.24', true),
(495, 114, '37.116', false),
(496, 114, '40.24', false);


-- Question 5


INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (115, 'What is the output of this polymorphic method invocation?', 'CREATE TYPE Shape AS (
    name TEXT
) WITH OIDS;

CREATE FUNCTION area(s Shape) RETURNS NUMERIC AS $$
BEGIN
    RETURN 0;
END;
$$ LANGUAGE plpgsql;

CREATE TYPE Circle UNDER Shape AS (
    radius NUMERIC
) WITH OIDS;

CREATE FUNCTION area(c Circle) RETURNS NUMERIC AS $$
BEGIN
    RETURN 3.14159 * c.radius * c.radius;
END;
$$ LANGUAGE plpgsql;

CREATE TYPE Square UNDER Shape AS (
    side NUMERIC
) WITH OIDS;

CREATE FUNCTION area(s Square) RETURNS NUMERIC AS $$
BEGIN
    RETURN s.side * s.side;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION process_shapes()
RETURNS TEXT AS $$
DECLARE
    s Shape := ''(''Shape'')''::Shape;
    c Circle := (''Circle'', 2.0)::Circle;
    sq Square := (''Square'', 3.0)::Square;
    result TEXT := '''';
BEGIN
    result := result || area(s)::TEXT || '' '';
    result := result || area(c)::TEXT || '' '';
    result := result || area(sq)::TEXT;
    RETURN result;
END;
$$ LANGUAGE plpgsql;', 1, 32, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(497, 115, '0 12.56636 9', true),
(498, 115, '0 0 0', false),
(499, 115, 'Runtime error', false),
(500, 115, 'NULL NULL NULL', false);




-- Topic 33: "Inheritance"



-- Question 1

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (116, 'What is the output of this multiple inheritance simulation?', 'interface Flyer { default void act() { System.out.print("Takeoff "); } }
interface Swimmer { default void act() { System.out.print("Dive "); } }

class Amphibian implements Flyer, Swimmer {
    public void act() {
        Flyer.super.act();
        Swimmer.super.act();
        System.out.print("Migrate ");
    }

    public static void main(String[] args) {
        Amphibian a = new Amphibian();
        a.act();
    }
}', 1, 33, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(501, 116, 'Takeoff Dive Migrate', true),
(502, 116, 'Dive Takeoff Migrate', false),
(503, 116, 'Compile error due to conflicting defaults', false),
(504, 116, 'Takeoff Dive', false);


-- Question 2

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (117, 'When creating an instance of a subclass, what is the constructor invocation order?', 'Consider this hierarchy:
class A { A() { System.out.print("A "); } }
class B extends A { B() { System.out.print("B "); } }
class C extends B { C() { System.out.print("C "); } }

new C();', 1, 33, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(505, 117, 'C B A', false),
(506, 117, 'A B C', true),
(507, 117, 'A only', false),
(508, 117, 'Depends on super() calls', false);


-- Question 3

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (118, 'What is the output of this polymorphic hierarchy?', 'class Alpha {
    void process() { System.out.print("A"); }
    void work() { process(); }
}
class Beta extends Alpha {
    void process() { System.out.print("B"); }
}
class Gamma extends Beta {
    void work() { super.process(); }
    void run() { super.work(); }
}

public class Main {
    public static void main(String[] args) {
        Gamma g = new Gamma();
        g.run();
        g.work();
    }
}', 1, 33, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(509, 118, 'A B', false),
(510, 118, 'B A', true),
(511, 118, 'B B', false),
(512, 118, 'A A', false);


-- Question 4

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (119, 'Which statement about inheritance is FALSE?', '', 1, 33, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(513, 119, 'A subclass inherits all non-private members of its parent', false),
(514, 119, 'final classes cannot be extended', false),
(515, 119, 'Static methods don''t participate in polymorphism', false),
(516, 119, 'Constructors can be inherited if not marked private', true);


-- Question 5

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (120, 'What does this Java 8+ diamond problem solution output?', 'interface First {
    default void conflict() { System.out.print("1"); }
}
interface Second {
    default void conflict() { System.out.print("2"); }
}
class Resolver implements First, Second {
    public void conflict() {
        First.super.conflict();
        Second.super.conflict();
        System.out.print("3");
    }

    public static void main(String[] args) {
        new Resolver().conflict();
    }
}', 1, 33, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(517, 120, '1', false),
(518, 120, '2', false),
(519, 120, '123', true),
(520, 120, 'Compile error', false);




-- Advanced Topics


-- Topic 34: "Polymorphism"


-- Question 1

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (121, 'What is the output of this interface-based polymorphic code?', 'interface Processor {
    default void process() { System.out.print("A"); }
    static void analyze() { System.out.print("S"); }
}

class AdvancedProcessor implements Processor {
    public void process() { System.out.print("B"); }
    void analyze() { System.out.print("D"); }
}

public class Main {
    public static void main(String[] args) {
        Processor p = new AdvancedProcessor();
        p.process();
        // p.analyze();  // Line X
        ((AdvancedProcessor)p).analyze();
        Processor.analyze();
    }
}', 1, 34, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(521, 121, 'B D S', true),
(522, 121, 'A D S', false),
(523, 121, 'Compile error at Line X', false),
(524, 121, 'B S D', false);


-- Question 2

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (122, 'Which statement about Java polymorphism is CORRECT?', '', 1, 34, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(525, 122, 'Instance variables are polymorphic', false),
(526, 122, 'Static methods can be overridden', false),
(527, 122, 'Method overriding is resolved at runtime', true),
(528, 122, 'Constructors participate in polymorphism', false);


-- Question 3

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (123, 'What does this polymorphic hierarchy output?', 'class Alpha {
    String process() { return "A"; }
    Alpha work() { System.out.print(process()); return this; }
}

class Beta extends Alpha {
    String process() { return "B"; }
    Beta work() { System.out.print(process()); return this; }
}

class Gamma extends Beta {
    String process() { return "C"; }
    Gamma work() {
        super.work();
        System.out.print(process());
        return this;
    }
}

public class Main {
    public static void main(String[] args) {
        new Gamma().work().work();
    }
}', 1, 34, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(529, 123, 'BCCBCC', false),
(530, 123, 'BCCCBC', true),
(531, 123, 'CCCCCC', false),
(532, 123, 'BBCBCC', false);


-- Question 4

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (124, 'Which scenario demonstrates method overloading rather than overriding?', '', 1, 34, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(533, 124, 'Subclass method with same name and parameters as superclass', false),
(534, 124, 'Subclass method with same name but different return type', false),
(535, 124, 'Subclass method with same name but different parameters', true),
(536, 124, 'Subclass method with covariant return type', false);


-- Question 5

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (125, 'What is the result of this exception-handling polymorphic code?', 'class BaseException extends Exception {}
class DerivedException extends BaseException {}

class Thrower {
    void thrower() throws BaseException { throw new BaseException(); }
}

class AdvancedThrower extends Thrower {
    void thrower() throws DerivedException { throw new DerivedException(); }
}

public class Main {
    public static void main(String[] args) {
        Thrower t = new AdvancedThrower();
        try {
            t.thrower();
        } catch (BaseException e) {
            System.out.print(e.getClass().getSimpleName());
        }
    }
}', 1, 34, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(537, 125, 'BaseException', false),
(538, 125, 'DerivedException', true),
(539, 125, 'Compile error', false),
(540, 125, 'RuntimeException', false);



-- Topic 35: "Exception Handling"

-- Question 1

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (126, 'What is the output of this nested exception handling code?', 'public class Main {
    public static void main(String[] args) {
        try {
            try {
                throw new IllegalArgumentException("Inner");
            } catch (RuntimeException e) {
                System.out.print(e.getMessage() + "|");
                throw new IllegalStateException("Middle");
            } finally {
                System.out.print("Finally|");
            }
        } catch (Exception e) {
            System.out.print(e.getMessage() + "|");
        } finally {
            System.out.print("OuterFinally");
        }
    }
}', 1, 35, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(541, 126, 'Inner|Finally|Middle|OuterFinally', true),
(542, 126, 'Inner|Middle|Finally|OuterFinally', false),
(543, 126, 'Inner|Finally|OuterFinally', false),
(544, 126, 'Inner|Middle|OuterFinally', false);


-- Questionm 2

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (127, 'Which statement about Java exception hierarchy is FALSE?', '', 1, 35, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(545, 127, 'Error and Exception both extend Throwable', false),
(546, 127, 'RuntimeException extends Exception', false),
(547, 127, 'Checked exceptions must be caught or declared', false),
(548, 127, 'All Throwables must be caught at compile time', true);


-- Question 3

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (128, 'What is the result of this exception propagation code?', 'class Processor {
    void process() throws IOException {
        throw new IOException("IO");
    }
}

class AdvancedProcessor extends Processor {
    void process() throws FileNotFoundException {
        try {
            super.process();
        } catch (IOException e) {
            throw new FileNotFoundException("File");
        }
    }
}

public class Main {
    public static void main(String[] args) {
        try {
            new AdvancedProcessor().process();
        } catch (Exception e) {
            System.out.print(e.getClass().getSimpleName() + ":" + e.getMessage());
        }
    }
}', 1, 35, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(549, 128, 'IOException:IO', false),
(550, 128, 'FileNotFoundException:File', true),
(551, 128, 'Exception:File', false),
(552, 128, 'Compile error', false);


-- Question 4

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (129, 'Which statement about try-with-resources is TRUE?', '', 1, 35, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(553, 129, 'Resources are closed in random order', false),
(554, 129, 'Resources must implement AutoCloseable', true),
(555, 129, 'Suppressed exceptions override primary exceptions', false),
(556, 129, 'Finally blocks execute before resources close', false);


-- Question 5

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (130, 'What does this multi-catch exception code output?', 'public class Main {
    static void thrower(int x) throws Exception {
        if (x > 0) throw new IOException("IO");
        else throw new SQLException("SQL");
    }

    public static void main(String[] args) {
        try {
            thrower(1);
            thrower(0);
        } catch (IOException | SQLException e) {
            System.out.print(e.getClass().getSimpleName() + ":" + e.getMessage());
        } catch (Exception e) {
            System.out.print("General:" + e.getMessage());
        }
    }
}', 1, 35, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(557, 130, 'IOException:IO', true),
(558, 130, 'SQLException:SQL', false),
(559, 130, 'General:IO', false),
(560, 130, 'Compile error', false);




-- Topic 36: "Multithreading"


-- Question 1

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (131, 'What is the most likely outcome of this deadlock-prone code?', 'public class DeadlockDemo {
    private static final Object lock1 = new Object();
    private static final Object lock2 = new Object();

    public static void main(String[] args) {
        Thread t1 = new Thread(() -> {
            synchronized(lock1) {
                try { Thread.sleep(100); }
                catch (InterruptedException e) {}
                synchronized(lock2) {
                    System.out.print("A");
                }
            }
        });

        Thread t2 = new Thread(() -> {
            synchronized(lock2) {
                try { Thread.sleep(100); }
                catch (InterruptedException e) {}
                synchronized(lock1) {
                    System.out.print("B");
                }
            }
        });

        t1.start();
        t2.start();
    }
}', 1, 36, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(561, 131, 'Prints "AB" or "BA" randomly', false),
(562, 131, 'Prints nothing (deadlock)', true),
(563, 131, 'Throws IllegalMonitorStateException', false),
(564, 131, 'Prints "A" or "B" randomly', false);


-- Question 2

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (132, 'Which statement about thread safety is FALSE?', '', 1, 36, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(565, 132, 'volatile guarantees atomicity for compound operations', true),
(566, 132, 'final fields are thread-safe if properly constructed', false),
(567, 132, 'synchronized blocks create memory barriers', false),
(568, 132, 'Atomic classes use CAS operations', false);


-- Question 3

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (133, 'What is the possible output of this ConcurrentHashMap code?', 'public class CHMDemo {
    public static void main(String[] args) {
        ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();
        map.put("A", 1);
        map.put("B", 2);

        new Thread(() -> {
            for (String k : map.keySet()) {
                map.put(k+"_new", 3);
                map.remove(k);
            }
        }).start();

        new Thread(() -> {
            try { Thread.sleep(10); }
            catch (InterruptedException e) {}
            System.out.print(map.values());
        }).start();
    }
}', 1, 36, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(569, 133, '[1, 2]', false),
(570, 133, '[3, 3]', true),
(571, 133, 'Throws ConcurrentModificationException', false),
(572, 133, 'Result is unpredictable', false);


-- Question 4

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (134, 'Which ExecutorService method provides most control?', '', 1, 36, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(573, 134, 'Executors.newCachedThreadPool()', false),
(574, 134, 'Executors.newFixedThreadPool(4)', false),
(575, 134, 'new ThreadPoolExecutor() constructor', true),
(576, 134, 'Executors.newSingleThreadExecutor()', false);


-- Question 5

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (135, 'What does this ReentrantReadWriteLock code output?', 'public class RWLockDemo {
    private static final ReentrantReadWriteLock rwl = new ReentrantReadWriteLock();
    private static int count = 0;

    public static void main(String[] args) throws InterruptedException {
        Thread writer = new Thread(() -> {
            rwl.writeLock().lock();
            try {
                count += 5;
                Thread.sleep(200);
            } catch (Exception e) {}
            finally { rwl.writeLock().unlock(); }
        });

        Thread reader = new Thread(() -> {
            rwl.readLock().lock();
            try { System.out.print(count); }
            finally { rwl.readLock().unlock(); }
        });

        writer.start();
        Thread.sleep(100);
        reader.start();
    }
}', 1, 36, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(577, 135, '0', true),
(578, 135, '5', false),
(579, 135, 'Result is unpredictable', false),
(580, 135, 'Throws IllegalMonitorStateException', false);







-- This helps order all questions for the user
-- Order questions based on id
SELECT * FROM main_question
WHERE topic_id = 36
ORDER BY id;