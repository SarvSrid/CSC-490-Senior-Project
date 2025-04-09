CREATE TABLE "user_profile" (
    "id" BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "google_id" VARCHAR(255) unique, -- Nullable for traditional accounts, unique for OAuth users
    "email" VARCHAR(255) unique, -- Nullable to allow Google ID to replace it
    "username" VARCHAR(255) NOT NULL unique,
    "password" VARCHAR(255), -- Nullable for Google OAuth accounts (since they won't use a password)
    "date_created" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "user_profile_email_or_google_id" CHECK (
        email IS NOT NULL OR google_id IS NOT NULL -- Ensure at least one identifier is present
    )
);

CREATE INDEX "user_profile_google_id_index" ON "user_profile"("google_id");
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

CREATE TABLE "question_option" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "question_id" BIGINT NOT NULL REFERENCES "main_question"("id"), -- or branch_question
    "option_text" VARCHAR(255) NOT NULL,
    "is_correct" BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE "user_topic_progress" (
    "user_id" BIGINT NOT NULL,
    "topic_id" INTEGER NOT NULL,
    "last_visited_question_id" BIGINT,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NOW(),
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NOW(),
    PRIMARY KEY ("user_id", "topic_id"),
    FOREIGN KEY ("user_id") REFERENCES "user_profile"("id"),
    FOREIGN KEY ("topic_id") REFERENCES "topic"("id"),
    FOREIGN KEY ("last_visited_question_id") REFERENCES "main_question"("id")
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

-- Updated table so it does not go over 100% for any topic
CREATE TABLE "progress" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "topic_id" INTEGER NOT NULL REFERENCES "topic"("id"),
    "user_id" BIGINT NOT NULL REFERENCES "user_profile"("id"),
    "active_questions" SMALLINT NOT NULL,
    "completed_questions" SMALLINT NOT NULL CHECK (completed_questions <= 5),
    "percentage" DECIMAL(5, 2) GENERATED ALWAYS AS (
        LEAST((completed_questions::DECIMAL / NULLIF(active_questions, 0)) * 100, 100)
    ) STORED
);

