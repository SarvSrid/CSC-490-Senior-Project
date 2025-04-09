CREATE TABLE "user" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "username" VARCHAR(255) NOT NULL,
    "date_created" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);

CREATE TABLE "user_profile" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "date_created" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);

CREATE INDEX "user_profile_email_index" ON "user_profile"("email");

CREATE TABLE "subject" (
    "id" SMALLINT NOT NULL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL
);

CREATE TABLE "topic" (
    "id" INTEGER NOT NULL PRIMARY KEY,
    "subject_id" SMALLINT NOT NULL REFERENCES "subject"("id"),
    "name" VARCHAR(255) NOT NULL,
    "difficulty_level" SMALLINT NOT NULL DEFAULT 1
);

CREATE TABLE "main_question" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "header" VARCHAR(255) NOT NULL,
    "subtext" VARCHAR(255) NOT NULL,
    "user_id" BIGINT NOT NULL REFERENCES "user_profile"("id"),
    "topic_id" INTEGER NOT NULL REFERENCES "topic"("id"),
    "difficulty_level" SMALLINT NOT NULL,
    "progress" BIGINT NOT NULL
);

CREATE TABLE "branch_question" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "header" VARCHAR(255) NOT NULL,
    "subtext" VARCHAR(255) NOT NULL,
    "question_id" BIGINT NOT NULL REFERENCES "main_question"("id"),
    "difficulty_level" SMALLINT NOT NULL
);

CREATE TABLE "chatbot" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "question_id" BIGINT NOT NULL REFERENCES "main_question"("id"),
    "date_opened" DATE NOT NULL,
    "date_closed" DATE NULL,
    "status" BOOLEAN NOT NULL
);

CREATE TABLE "message" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "chatbot_id" BIGINT NOT NULL REFERENCES "chatbot"("id"),
    "sender" BOOLEAN NOT NULL, -- '0' for AI, '1' for user
    "text" TEXT NOT NULL,
    "sent_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL
);

CREATE TABLE "progress" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "topic_id" INTEGER NOT NULL REFERENCES "topic"("id"),
    "user_id" BIGINT NOT NULL REFERENCES "user_profile"("id"),
    "active_questions" SMALLINT NOT NULL,
    "completed_questions" SMALLINT NOT NULL,
    "percentage" DECIMAL(5, 2) GENERATED ALWAYS AS (
        (completed_questions::DECIMAL / NULLIF(active_questions, 0)) * 100
    ) STORED
);

