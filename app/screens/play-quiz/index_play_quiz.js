// screens/play-quiz/index_play_quiz.js
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, FlatList, Alert } from "react-native";
import styles from "./styles-play-quiz/styles_play_quiz";

import { getAllThemes } from "../../services/themes_table_database_services";
import { getAllQuestions } from "../../services/questions_table_database_services";
import { getAllAnswers } from "../../services/answers_table_database_services";
import { addResult } from "../../services/results_table_database_services";

export default function PlayQuiz({ navigation }) {
    // Main states
    const [themes, setThemes] = useState([]);
    const [allQuestions, setAllQuestions] = useState([]);   // all from the database
    const [answers, setAnswers] = useState([]);
    const [quizQuestions, setQuizQuestions] = useState([]); // only the ones chosen to play

    const [selectedTheme, setSelectedTheme] = useState(null);
    const [numQuestions, setNumQuestions] = useState("");
    const [quizStarted, setQuizStarted] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);

    // Load data from the database
    useEffect(() => {
        const loadData = async () => {
            const t = await getAllThemes();
            const q = await getAllQuestions();
            const a = await getAllAnswers();
            setThemes(t);
            setAllQuestions(q);
            setAnswers(a);
        };
        loadData();
    }, []);

    // Setup and start the quiz
    const start = (quantity, questions) => {
        const shuffled = questions.sort(() => 0.5 - Math.random());
        setQuizQuestions(shuffled.slice(0, quantity));
        setQuizStarted(true);
        setCurrentIndex(0);
        setUserAnswers([]);
    };
    // Start the quiz
    const startQuiz = () => {
        if (!selectedTheme) {
            Alert.alert("Error!", "Select a theme!");
            return;
        }
        const themeQuestions = allQuestions.filter(q => q.id_theme === selectedTheme.id);

        if (themeQuestions.length === 0) {
            Alert.alert("Error!", "This theme doesn't have questions");
            return;
        }

        let qtd = parseInt(numQuestions);
        if (!qtd || isNaN(qtd) || qtd <= 0) {
            Alert.alert("Error!", "Please, select a valid number of questions!");
            return;
        }

        if (qtd > themeQuestions.length) {
            Alert.alert(
                "Invalid Number",
                `The selected theme only has ${themeQuestions.length} questions. Please enter a valid number.`
            );
            return; // Stop the function and let the user correct the number
        }

        start(qtd, themeQuestions);
    };
    const handleAnswer = (answer) => {
        const correct = answer.status_correct === 1;
        const currentQuestion = quizQuestions[currentIndex];

        // If the answer is wrong, find the correct one to display on the summary screen
        if (!correct) {
            const correctAnswer = answers.find(
                (a) => a.id_question === currentQuestion.id && a.status_correct === 1
            );
            currentQuestion.correctAnswerText = correctAnswer ? correctAnswer.answer : 'N/A';
        }

        const updatedAnswers = [
            ...userAnswers,
            { question: currentQuestion, chosen: answer, correct }
        ];
        setUserAnswers(updatedAnswers);

        if (currentIndex + 1 < quizQuestions.length) {
            setCurrentIndex(currentIndex + 1);
        } else {
            finishQuiz(updatedAnswers);
        }
    };

    const finishQuiz = async (finalAnswers) => {
        const correctCount = finalAnswers.filter(a => a.correct).length;
        const percent = ((correctCount / finalAnswers.length) * 100).toFixed(1);

        // Save result to the database
        await addResult({
            id_theme: selectedTheme.id,
            total_questions: finalAnswers.length,
            correct_answers: correctCount
        });

        // Go to summary screen
        navigation.navigate("QuizSummary", { finalAnswers, percent });
    };

    // Initial screen (theme and quantity selection)
    if (!quizStarted) {
        return (
            <View style={styles.container}>
                <Text style={styles.principalTitle}>Choose a theme to play</Text>

                <FlatList
                    data={themes}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ alignItems: 'center' }}
                    style={{ flex: 1, width: '100%' }}
                    renderItem={({ item }) => {
                        const count = allQuestions.filter(q => q.id_theme === item.id).length;
                        return (
                            <TouchableOpacity
                                onPress={() => setSelectedTheme(item)}
                                style={[
                                    styles.card,
                                    selectedTheme?.id === item.id && styles.selectedCard
                                ]}
                            >
                                <Text style={styles.label}>
                                    {item.name} ({count} questions)
                                </Text>
                            </TouchableOpacity>
                        );
                    }}
                />

                <View style={styles.rodape}>
                    <TextInput
                        style={styles.input}
                        placeholder="Number of questions"
                        placeholderTextColor="#8A8F98"
                        keyboardType="numeric"
                        value={numQuestions}
                        onChangeText={setNumQuestions}
                    />

                <TouchableOpacity style={styles.button} onPress={startQuiz}>
                    <Text style={styles.buttonText}>Start Quiz</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
                </View>
            </View>
        );
    }

    // Question screen
    if (!quizQuestions.length || !quizQuestions[currentIndex]) {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>Loading question...</Text>
            </View>
        );
    }

    // --- Question Screen ---

    const currentQuestion = quizQuestions[currentIndex];
    const currentAnswers = answers.filter(a => a.id_question === currentQuestion.id);
    const progress = ((currentIndex + 1) / quizQuestions.length) * 100;

    return (
        <View style={styles.quizContainer}>
            <View style={styles.quizHeader}>
                <Text style={styles.progressText}>
                    Question {currentIndex + 1}/{quizQuestions.length}
                </Text>
                <View style={styles.progressBarContainer}>
                    <View style={[styles.progressBar, { width: `${progress}%` }]} />
                </View>
                <Text style={styles.questionText}>{currentQuestion.description}</Text>
            </View>

            <View style={styles.answersContainer}>
                {currentAnswers.map((ans) => (
                    <TouchableOpacity
                        key={ans.id}
                        style={styles.answerButton}
                        onPress={() => handleAnswer(ans)}
                    >
                        <Text style={styles.buttonText}>{ans.answer}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.quizFooter}>
                <TouchableOpacity
                    style={styles.quitButton}
                    onPress={() => {
                        Alert.alert(
                            "Quit Quiz",
                            "Are you sure you want to quit?",
                            [
                                { text: "Cancel", style: "cancel" },
                                {
                                    text: "Yes",
                                    style: "destructive",
                                    onPress: () => {
                                        setQuizStarted(false);
                                        setQuizQuestions([]);
                                        setUserAnswers([]);
                                        setNumQuestions("");
                                        setSelectedTheme(null);
                                    }
                                }
                            ]
                        );
                    }}
                >
                    <Text style={styles.buttonText}>Quit Quiz</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}