select  * from main_question;
select * from question_option;


-- Assembly questions

--Beginner Difficulty


-- Topic 19: "Intro to Assembly"

-- Question 1

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (136, 'What is the final value in AX after this stack operation sequence?', 'section .text
global _start
_start:
    mov ax, 0x1234
    push ax
    mov bx, 0x5678
    push bx
    pop ax
    pop bx
    add ax, bx', 1, 19, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(581, 136, '0x1234', false),
(582, 136, '0x5678', false),
(583, 136, '0x68AC', true),
(584, 136, '0x2468', false);


-- Question 2

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (137, 'Which statement about x86 registers is FALSE?', '', 1, 19, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(585, 137, 'EAX is a 32-bit register', false),
(586, 137, 'ESP points to the top of the stack', false),
(587, 137, 'EBP is used for floating-point operations', true),
(588, 137, 'ESI and EDI are index registers', false);


-- Question 3

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (138, 'What value is stored in memory at [0x1000] after execution?', 'section .data
    array dw 0x1111, 0x2222, 0x3333, 0x4444
section .text
global _start
_start:
    mov esi, array
    mov ax, [esi+2]
    mov [esi+6], ax
    mov ax, [esi]
    mov [esi+4], ax', 1, 19, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(589, 138, '0x1111', true),
(590, 138, '0x2222', false),
(591, 138, '0x3333', false),
(592, 138, '0x4444', false);


-- Question 4

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (139, 'Which flag would be set after "CMP AX, BX" where AX=0x8000, BX=0x0001?', '', 1, 19, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(593, 139, 'Carry Flag', false),
(594, 139, 'Zero Flag', false),
(595, 139, 'Sign Flag', true),
(596, 139, 'Overflow Flag', false);


-- Question 5

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (140, 'How many times will this loop execute?', 'section .text
global _start
_start:
    mov ecx, 5
    mov eax, 0
loop_start:
    add eax, 2
    dec ecx
    jnz loop_start', 1, 19, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(597, 140, '4', false),
(598, 140, '5', true),
(599, 140, '6', false),
(600, 140, 'Infinite loop', false);




-- Topic 20: Registers and Memory Addressing

-- Question 1

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (141, 'What is the final value in AX after this sequence?', 'section .data
    values dw 0x1234, 0x5678, 0x9ABC
section .text
global _start
_start:
    mov si, values
    mov ax, [si+2]
    add ax, [si]
    mov [si+4], ax', 1, 20, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(601, 141, '0x1234', false),
(602, 141, '0x68AC', true),
(603, 141, '0x5678', false),
(604, 141, '0x9ABC', false);


-- Question 2

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (142, 'Which segment register is typically used for stack operations?', '', 1, 20, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(605, 142, 'CS (Code Segment)', false),
(606, 142, 'DS (Data Segment)', false),
(607, 142, 'SS (Stack Segment)', true),
(608, 142, 'ES (Extra Segment)', false);


-- Question 3

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (143, 'What value is stored in DX after execution?', 'section .data
    table dw 10, 20, 30, 40, 50
    index db 2
section .text
global _start
_start:
    mov bx, table
    mov al, [index]
    mov ah, 0
    add bx, ax
    add bx, ax
    mov dx, [bx]', 1, 20, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(609, 143, '20', false),
(610, 143, '30', false),
(611, 143, '40', false),
(612, 143, '50', true);


-- Question 4

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (144, 'Which addressing mode is used in "MOV AX, [BX+SI+10h]"?', '', 1, 20, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(613, 144, 'Direct addressing', false),
(614, 144, 'Register indirect', false),
(615, 144, 'Based indexed with displacement', true),
(616, 144, 'Immediate addressing', false);


-- Question 5

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (145, 'What is the value in CX after these operations?', 'section .text
global _start
_start:
    mov ax, 0xF0F0
    mov bx, 0x0F0F
    mov cx, 0xAAAA
    and cx, ax
    or cx, bx
    xor cx, 0xFFFF', 1, 20, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(617, 145, '0x0000', true),
(618, 145, '0xFFFF', false),
(619, 145, '0xF0F0', false),
(620, 145, '0x0F0F', false);





-- Topic 21: Basic Instructions (MOV, ADD, SUB)

-- Question 1

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (146, 'What is the final value of AX after executing this code?', 'section .text
global _start
_start:
    mov ax, 0x1234
    mov bx, 0x5678
    sub ax, bx
    add ax, 0x1000
    mov cx, ax
    add ax, cx
    sub ax, 0x2000', 1, 21, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(621, 146, '0x1234', false),
(622, 146, '0x5678', false),
(623, 146, '0x2CF0', false),
(624, 146, '0x0CF0', true);


-- Question 2

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (147, 'Which of the following MOV operations is INVALID in 16-bit x86 assembly?', '', 1, 21, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(625, 147, 'mov [bx], ax', false),
(626, 147, 'mov ds, 0x1234', false),
(627, 147, 'mov es, dsl', false),
(628, 147, 'mov ax, [si+di]', true);


-- Question 3

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (148, 'What is the value of AX after this stack manipulation?', 'section .text
global _start
_start:
    mov ax, 0x1111
    push ax
    mov ax, 0x2222
    push ax
    pop bx
    pop ax
    add ax, bx', 1, 21, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(629, 148, '0x1111', false),
(630, 148, '0x2222', false),
(631, 148, '0x3333', true),
(632, 148, '0x4444', false);


-- Question 4

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (149, 'Which flags are affected by the SUB instruction?', '', 1, 21, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(633, 149, 'Carry Flag (CF)', true),
(634, 149, 'Zero None (ZF)', false),
(635, 149, 'First Flag (FF)', false),
(636, 149, 'All of the above', false);


-- Question 5

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (150, 'What is the value stored at [0x2000] after execution?', 'section .data
    addr dw 0x2000
    value db 0x42
section .text
global _start
_start:
    mov si, addr
    mov di, [si]
    mov al, [value]
    mov [di], al
    add byte [di], 0x10', 1, 21, 1, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(637, 150, '0x42', false),
(638, 150, '0x52', true),
(639, 150, '0x2000', false),
(640, 150, '0x10', false);





-- Intermediate difficulty


-- Topic 22: "Control Flow (Jumps and Loops)"


-- Question 1

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (151, 'What is the final value of AX after this nested loop?', 'section .text
global _start
_start:
    mov ax, 0
    mov cx, 3
outer_loop:
    mov bx, 2
inner_loop:
    add ax, bx
    dec bx
    jnz inner_loop
    loop outer_loop', 1, 22, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(641, 151, '6', false),
(642, 151, '15', false),
(643, 151, '12', false),
(644, 151,  '9', true);


-- Question 2

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (152, 'Which jump instruction would execute if ZF=0 and SF=1 after CMP AX, BX?', '', 1, 22, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(645, 152, 'JG (Jump if Greater)', false),
(646, 152, 'JL (Jump if Less)', true),
(647, 152, 'JE (Jump if Equal)', false),
(648, 152, 'JGE (Jump if Greater or Equal)', false);


-- Question 3

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (153, 'What is the value of DX after this branching code?', 'section .text
global _start
_start:
    mov ax, 0x8000
    mov bx, 0x0001
    cmp ax, bx
    jg greater
    jl less
    mov dx, 0x1111
    jmp end
greater:
    mov dx, 0x2222
    jmp end
less:
    mov dx, 0x3333
end:', 1, 22, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(649, 153, '0x1111', false),
(650, 153, '0x2222', false),
(651, 153, '0x3333', true),
(652, 153, '0x8000', false);


-- Question 4

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (154, 'What happens when LOOP is executed with CX=0?', '', 1, 22, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(653, 154, 'Infinite loop', false),
(654, 154, 'Jumps to label', false),
(655, 154, 'Continues to next instruction', true),
(656, 154, 'Throws exception', false);


-- Question 5

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (155, 'How many times is "Action" executed?', 'section .text
global _start
_start:
    mov cx, 5
    mov ax, 0
repeat:
    inc ax
    test ax, 1
    jz even
    jmp odd
even:
    ; Action executed here
odd:
    loop repeat', 1, 22, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(657, 155, '2', true),
(658, 155, '0', false),
(659, 155, '3', false),
(660, 155, '5', false);




-- Topic 23: "Stack and Procedures"



-- Question 1

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (156, 'What is the final value in AX after these nested calls?', 'section .text
global _start

proc1:
    push bp
    mov bp, sp
    mov ax, [bp+4]
    add ax, 10
    pop bp
    ret 2

proc2:
    push bp
    mov bp, sp
    push word [bp+4]
    call proc1
    sub ax, 5
    pop bp
    ret 2

_start:
    push 20
    call proc2
    hlt', 1, 23, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(661, 156, '15', false),
(662, 156, '20', false),
(663, 156, '25', true),
(664, 156, '30', false);


-- Question 2

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (157, 'When entering a procedure, what is the correct order of stack operations?', '', 1, 23, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(665, 157, 'Push BP, Push registers, Push parameters', false),
(666, 157, 'Push parameters, Push BP, Push registers', false),
(667, 157, 'Push parameters, Call, Push BP', true),
(668, 157, 'Call, Push BP, Push parameters', false);


-- Question 3

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (158, 'How many stack words are used when factorial(4) returns?', 'section .text
global factorial
factorial:
    push bp
    mov bp, sp
    cmp word [bp+4], 1
    jle base_case
    dec word [bp+4]
    push word [bp+4]
    call factorial
    imul ax, [bp+4]
    jmp end
base_case:
    mov ax, 1
end:
    pop bp
    ret 2', 1, 23, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(669, 158, '4', false),
(670, 158, '8', false),
(671, 158, '12', false),
(672, 158, '16', true);


-- Question 4

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (159, 'Which register is typically NOT preserved across procedure calls in standard calling conventions?', '', 1, 23, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(673, 159, 'BX', false),
(674, 159, 'SI', false),
(675, 159, 'DI', false),
(676, 159, 'AX', true);


-- Question 5

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (160, 'What is printed after this string manipulation?', 'section .data
    str db ''ABCDEF'',0
section .text
global _start

reverse:
    push bp
    mov bp, sp
    mov si, [bp+6]  ; length
    mov di, [bp+4]  ; string
    shr si, 1
reverse_loop:
    dec si
    jl done
    mov al, [di+si]
    xchg al, [di]
    mov [di], al
    inc di
    jmp reverse_loop
done:
    pop bp
    ret 4

_start:
    push str
    push 6
    call reverse
    ; Print would show:', 1, 23, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(677, 160, 'ABCDEF', false),
(678, 160, 'FEDCBA', false),
(679, 160, 'AFECDB', true),
(680, 160, 'DEFABC', false);





-- Topic 24: "Interrupts"

-- Question 1

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (161, 'What will be the value in AX after this interrupt sequence?', 'section .text
global _start
org 0x100

setup:
    cli
    mov ax, 0
    mov es, ax
    mov word [es:0x20*4], timer_isr
    mov [es:0x20*4+2], cs
    mov ax, 0xFFFF
    sti
    hlt

timer_isr:
    mov ax, 0x1234
    iret

_start:
    jmp setup', 1, 24, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(681, 161, '0x0000', false),
(682, 161, '0x1234', true),
(683, 161, '0xFFFF', false),
(684, 161, 'Undefined', false);


-- Question 2

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (162, 'In real mode, what is stored at memory location 0x0000:0x0024?', '', 1, 24, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(685, 162, 'IRQ1 handler address', false),
(686, 162, 'INT 9h handler address', true),
(687, 162, 'INT 24h handler address', false),
(688, 162, 'IRQ0 handler address', false);


-- Question 3

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (163, 'What will be in BX after this DOS interrupt call?', 'section .text
global _start

_start:
    mov ah, 0x30
    mov bx, 0x1111
    mov cx, 0x2222
    int 0x21
    hlt', 1, 24, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(689, 163, '0x1111', false),
(690, 163, '0x2222', false),
(691, 163, 'DOS version number', true),
(692, 163, 'Undefined', false);


-- Question 4

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (164, 'Which interrupt has the highest priority in x86 architecture?', '', 1, 24, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(693, 164, 'NMI (Non-Maskable Interrupt)', true),
(694, 164, 'IRQ0 (Timer Interrupt)', false),
(695, 164, 'INT 0 (Divide Error)', false),
(696, 164, 'IRQ1 (Keyboard Interrupt)', false);


-- Question 5

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (165, 'How many times will this ISR execute before the program ends?', 'section .text
global _start
org 0x100

counter db 0

setup:
    cli
    xor ax, ax
    mov es, ax
    mov word [es:0x08*4], custom_isr
    mov [es:0x08*4+2], cs
    mov al, 0x36
    out 0x43, al
    mov ax, 11932
    out 0x40, al
    mov al, ah
    out 0x40, al
    sti
    mov cx, 100
delay:
    loop delay
    hlt

custom_isr:
    inc byte [cs:counter]
    mov al, 0x20
    out 0x20, al
    iret

_start:
    jmp setup', 1, 24, 2, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(697, 165, '1', false),
(698, 165, '10', false),
(699, 165, '18', true),
(700, 165, '100', false);



-- Advanced Difficulty

-- Topic 25: "System Calls"

-- Question 1

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (166, 'What will this Linux x86 assembly program output?', 'section .data
    timeval:
        tv_sec  dd 0
        tv_usec dd 0
    buffer db "Time: XXXX",0

section .text
global _start

_start:
    ; Get time
    mov eax, 78      ; sys_gettimeofday
    mov ebx, timeval
    mov ecx, 0
    int 0x80

    ; Convert seconds to string
    mov eax, [tv_sec]
    mov edi, buffer+6
    mov ecx, 10
    call itoa

    ; Write output
    mov eax, 4       ; sys_write
    mov ebx, 1       ; stdout
    mov ecx, buffer
    mov edx, 11
    int 0x80

    ; Exit
    mov eax, 1
    int 0x80

itoa:
    xor edx, edx
    div ecx
    add dl, ''0''
    mov [edi], dl
    dec edi
    test eax, eax
    jnz itoa
    ret', 1, 25, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(701, 166, 'Time: 0', false),
(702, 166, 'Current Unix timestamp', true),
(703, 166, 'Time: XXXX', false),
(704, 166, 'Segmentation fault', false);


-- Question 2

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (167, 'In x86-64 Linux syscalls, which register holds the syscall number?', '', 1, 25, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(705, 167, 'RAX', true),
(706, 167, 'RDI', false),
(707, 167, 'RSI', false),
(708, 167, 'RDX', false);


-- Question 3

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (168, 'What will happen when this Windows x64 assembly executes?', 'section .data
    msg db ''Hello Windows!'',0
    caption db ''Syscall Demo'',0

section .text
global main
extern ExitProcess
extern MessageBoxA

main:
    sub rsp, 40
    xor r9d, r9d
    lea r8, [rel caption]
    lea rdx, [rel msg]
    xor rcx, rcx
    call MessageBoxA
    xor ecx, ecx
    call ExitProcess', 1, 25, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(709, 168, 'Message box with "Hello Windows!"', true),
(710, 168, 'Console prints "Hello Windows!"', false),
(711, 168, 'Program crashes', false),
(712, 168, 'Nothing happens', false);


-- Question 4

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (169, 'What is the main advantage of direct syscalls over library calls?', '', 1, 25, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(713, 169, 'Better performance', false),
(714, 169, 'Smaller binary size', false),
(715, 169, 'Avoids library hooking/detection', true),
(716, 169, 'Easier to debug', false);


-- Question 5

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (170, 'What will this direct syscall implementation do?', 'section .data
    filename db ''/tmp/test'',0
    content db ''Syscall!'',0

section .text
global _start

_start:
    ; Open file
    mov eax, 5        ; sys_open
    mov ebx, filename
    mov ecx, 65       ; O_WRONLY|O_CREAT
    mov edx, 0644o    ; permissions
    int 0x80

    ; Write content
    mov ebx, eax      ; file descriptor
    mov eax, 4        ; sys_write
    mov ecx, content
    mov edx, 8        ; length
    int 0x80

    ; Close file
    mov eax, 6        ; sys_close
    int 0x80

    ; Exit
    mov eax, 1
    int 0x80', 1, 25, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(717, 170, 'Creates /tmp/test with "Syscall!"', true),
(718, 170, 'Prints "Syscall!" to console', false),
(719, 170, 'Deletes /tmp/test', false),
(720, 170, 'Does nothing', false);





-- Topic 26: "Optimization Techniques"

-- Question 1


INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (171, 'What is the speedup factor of this unrolled loop versus original?', 'section .text
; Original loop:
; mov ecx, 1000
; loop_start:
;   add eax, [esi]
;   add esi, 4
;   dec ecx
;   jnz loop_start

; Unrolled version:
mov ecx, 250
unrolled_loop:
    add eax, [esi]
    add eax, [esi+4]
    add eax, [esi+8]
    add eax, [esi+12]
    add esi, 16
    dec ecx
    jnz unrolled_loop', 1, 26, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(721, 171, '1.5x', false),
(722, 171, '2.0x', false),
(723, 171, '2.7x', true),
(724, 171, '4.0x', false);


-- Question 2

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (172, 'Which of these eliminates RAW (Read-After-Write) hazards?', '', 1, 26, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(725, 172, 'Loop unrolling', false),
(726, 172, 'Register renaming', true),
(727, 172, 'Branch prediction', false),
(728, 172, 'Cache prefetching', false);


-- Question 3

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (173, 'How many iterations does this AVX2-optimized loop perform?', 'section .data
    array dd 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0
    count equ ($ - array) / 4

section .text
global _start
_start:
    mov ecx, count / 8
    vxorps ymm0, ymm0, ymm0
    mov esi, array

simd_loop:
    vaddps ymm0, ymm0, [esi]
    add esi, 32
    dec ecx
    jnz simd_loop', 1, 26, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(729, 173, '1', true),
(730, 173, '4', false),
(731, 173, '8', false),
(732, 173, '16', false);


-- Question 4

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (174, 'What is the primary benefit of cache blocking?', '', 1, 26, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(733, 174, 'Reduces branch mispredictions', false),
(734, 174, 'Minimizes cache misses', true),
(735, 174, 'Eliminates pipeline stalls', false),
(736, 174, 'Decreases register pressure', false);


-- Question 5

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (175, 'What is the purpose of this branchless optimization?', 'section .text
; Original:
; cmp eax, ebx
; jle less
; mov ecx, edx
; jmp end
; less:
; mov ecx, esi
; end:

; Optimized:
xor ecx, ecx
cmp eax, ebx
setg cl
dec ecx
and ecx, edx
not ecx
and ecx, esi
or ecx, edx', 1, 26, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(737, 175, 'Minimizes cache misses', false),
(738, 175, 'Reduces memory accesses', false),
(739, 175, 'Improves SIMD utilization', false),
(740, 175, 'Eliminates conditional jump', true);



-- Topic 27: "Advanced Memory Management"


-- Question 1

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (176, 'What is the maximum block size this allocator can handle?', 'section .data
    heap_start dd 0x10000000
    heap_end dd 0x10010000
    free_list dd heap_start
    block_size equ 16

section .text
global malloc
malloc:
    mov eax, [free_list]
    mov edx, [eax]    ; Load next pointer
    mov [free_list], edx
    ret

global free
free:
    mov edx, [esp+4]  ; Get block address
    mov eax, [free_list]
    mov [edx], eax    ; Store next pointer in freed block
    mov [free_list], edx
    ret', 1, 27, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(741, 176, '16 bytes', false),
(742, 176, '256 bytes', false),
(743, 176, 'Depends on heap usage', false),
(744, 176,  '64KB', true);


-- Question 2

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (177, 'Which memory management scheme allows non-contiguous physical memory allocation?', '', 1, 27, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(745, 177, 'Segmentation only', false),
(746, 177, 'Paging only', false),
(747, 177, 'Both paging and segmentation', true),
(748, 177, 'Neither paging nor segmentation', false);


-- Question 3

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (178, 'How many 64-byte blocks can this pool allocate before needing to expand?', 'section .data
    pool_start dd 0x20000000
    pool_size dd 0x00001000
    block_size equ 64
    free_bitmap dd 0xFFFFFFFF

section .text
global pool_alloc
pool_alloc:
    bsf ecx, [free_bitmap]   ; Find first set bit
    jz expand_pool
    btr [free_bitmap], ecx   ; Clear the bit
    mov eax, ecx
    imul eax, block_size
    add eax, pool_start
    ret
expand_pool:
    ; Expansion code omitted
    xor eax, eax
    ret', 1, 27, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(749, 178, '16', false),
(750, 178, '32', true),
(751, 178, '64', false),
(752, 178, '128', false);


-- Question 4

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (179, 'What is the primary benefit of superpages in TLB management?', '', 1, 27, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(753, 179, 'Reduce TLB misses', true),
(754, 179, 'Increase page size flexibility', false),
(755, 179, 'Simplify page table walks', false),
(756, 179, 'Decrease memory fragmentation', false);


-- Question 5

INSERT INTO main_question (id, header, subtext, user_id, topic_id, difficulty_level, progress)
VALUES (180, 'What virtual address range does this page table setup create?', 'section .text
global setup_paging
setup_paging:
    mov eax, cr3
    mov edi, eax
    mov ecx, 1024
    xor eax, eax
    rep stosd          ; Clear page directory

    ; Map first 4MB identity
    mov eax, 0x83      ; Present, RW, PS (4MB page)
    mov [edi-4096], eax ; First PDE

    ; Map 0xC0000000-0xC03FFFFF to 0x00000000-0x003FFFFF
    mov eax, 0x03      ; Present, RW
    mov [edi-4096+768*4], eax ; 768th PDE (0xC0000000)
    mov edi, 0x1000    ; PT base
    mov ecx, 1024
    xor eax, eax
map_pt:
    stosd
    add eax, 0x1000
    loop map_pt

    mov eax, 0x1000
    mov cr3, eax
    ret', 1, 27, 3, 0);

INSERT INTO question_option (id, question_id, option_text, is_correct)
VALUES
(757, 180, '0x00000000-0x003FFFFF and 0xC0000000-0xC03FFFFF', true),
(758, 180, '0x00000000-0xFFFFFFFF', false),
(759, 180, '0xC0000000-0xC03FFFFF only', false),
(760, 180, '0x00000000-0x003FFFFF only', false);





-- This helps order all questions for the user
-- Order questions based on id
SELECT * FROM main_question
WHERE topic_id = 27
ORDER BY id;