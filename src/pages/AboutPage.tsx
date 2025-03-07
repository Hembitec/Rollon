import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";

const AboutPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About Rollon</h1>

        <Card className="mb-8">
          <CardContent className="p-6">
            <ScrollArea className="h-[600px] pr-4">
              <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-2xl font-semibold mt-2 mb-4">Overview</h2>
                <p>
                  Rollon is an innovative AI-powered web application designed to
                  transform any learning material into personalized quiz
                  questions. Acting as a private tutor, Rollon helps students,
                  educators, and lifelong learners enhance their understanding
                  and retention of information through interactive quizzes
                  tailored to their specific needs.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">
                  Core Features
                </h2>

                <h3 className="text-xl font-medium mt-6 mb-3">
                  1. AI-Powered Quiz Generation
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Intelligent Content Analysis</strong>: Our advanced
                    AI analyzes your content and creates relevant, contextual
                    questions.
                  </li>
                  <li>
                    <strong>Multiple Question Formats</strong>: Generate
                    multiple-choice, true/false, or short-answer questions.
                  </li>
                  <li>
                    <strong>Customizable Difficulty Levels</strong>: Adjust quiz
                    difficulty (easy, medium, hard) based on your proficiency.
                  </li>
                </ul>

                <h3 className="text-xl font-medium mt-6 mb-3">
                  2. Versatile Input Methods
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Text Input</strong>: Simply paste your study
                    material directly into the platform.
                  </li>
                  <li>
                    <strong>File Upload</strong>: Upload documents in PDF, DOCX,
                    or TXT formats for instant quiz generation.
                  </li>
                  <li>
                    <strong>URL Content Extraction</strong>: Provide a URL, and
                    Rollon will extract and analyze the content for quiz
                    creation.
                  </li>
                </ul>

                <h3 className="text-xl font-medium mt-6 mb-3">
                  3. Personalization Options
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Quiz Length Control</strong>: Choose how many
                    questions you want in your quiz.
                  </li>
                  <li>
                    <strong>Format Selection</strong>: Select the question
                    format that best suits your learning style.
                  </li>
                  <li>
                    <strong>Custom Instructions</strong>: Add specific
                    instructions to guide the AI in generating more targeted
                    questions.
                  </li>
                </ul>

                <h3 className="text-xl font-medium mt-6 mb-3">
                  4. Study Tools
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>AI Tutor</strong>: Get personalized help with
                    challenging problems and assignments.
                  </li>
                  <li>
                    <strong>Study Material Generator</strong>: Create
                    flashcards, notes, and summaries from any topic.
                  </li>
                  <li>
                    <strong>Chat with PDF</strong>: Have conversations with your
                    documents and ask specific questions about their content.
                  </li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4">
                  Who Is Rollon For?
                </h2>

                <h3 className="text-xl font-medium mt-6 mb-3">Students</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>High School and College Students</strong>: Prepare
                    for exams more effectively by testing your knowledge.
                  </li>
                  <li>
                    <strong>Language Learners</strong>: Practice vocabulary and
                    grammar through customized quizzes.
                  </li>
                  <li>
                    <strong>Professional Certification Candidates</strong>:
                    Study for certification exams with targeted question sets.
                  </li>
                </ul>

                <h3 className="text-xl font-medium mt-6 mb-3">Educators</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Teachers</strong>: Quickly generate quizzes from
                    lesson plans or textbook chapters.
                  </li>
                  <li>
                    <strong>Professors</strong>: Create assessments that target
                    specific learning objectives.
                  </li>
                  <li>
                    <strong>Tutors</strong>: Provide personalized practice
                    materials for individual students.
                  </li>
                </ul>

                <h3 className="text-xl font-medium mt-6 mb-3">
                  Lifelong Learners
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Self-Directed Learners</strong>: Test your
                    understanding of new subjects or skills.
                  </li>
                  <li>
                    <strong>Professional Development</strong>: Stay sharp in
                    your field by regularly testing your knowledge.
                  </li>
                  <li>
                    <strong>Hobbyists</strong>: Deepen your understanding of
                    topics you're passionate about.
                  </li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4">
                  Benefits of Using Rollon
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Time Efficiency</strong>: Create comprehensive
                    quizzes in seconds instead of hours.
                  </li>
                  <li>
                    <strong>Deeper Learning</strong>: Active recall through
                    quizzing is proven to enhance retention.
                  </li>
                  <li>
                    <strong>Personalized Experience</strong>: Tailor the
                    learning experience to your specific needs and preferences.
                  </li>
                  <li>
                    <strong>Immediate Feedback</strong>: Get instant results to
                    understand your strengths and weaknesses.
                  </li>
                  <li>
                    <strong>Accessibility</strong>: Learn anywhere, anytime with
                    our cloud-based platform.
                  </li>
                </ul>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg">
              At Rollon, we believe that the future of education is
              personalized, interactive, and intelligent. Our mission is to
              transform how people learn by making active recall and
              personalized quizzing accessible to everyone, helping learners of
              all types achieve better results with less time and effort.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;
