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
            qtd = themeQuestions.length;
            setNumQuestions(String(qtd));
        }

        const shuffled = themeQuestions.sort(() => 0.5 - Math.random());
        setQuizQuestions(shuffled.slice(0, parseInt(numQuestions)));
        setQuizStarted(true);
        setCurrentIndex(0);
        setUserAnswers([]);
    };

    // Answer question
    const handleAnswer = (answer) => {
        const correct = answer.status_correct === 1;
        const updatedAnswers = [
            ...userAnswers,
            { question: quizQuestions[currentIndex], chosen: answer, correct }
        ];
        setUserAnswers(updatedAnswers);

        if (currentIndex + 1 < quizQuestions.length) {
            setCurrentIndex(currentIndex + 1);
        } else {
            finishQuiz(updatedAnswers);
        }
    };

    // Finish quiz
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
                    renderItem={({ item }) => {
                        const count = allQuestions.filter(q => q.id_theme === item.id).length;
                        return (
                            <TouchableOpacity
                                onPress={() => setSelectedTheme(item)}
                                style={[
                                    styles.card,
                                    selectedTheme?.id === item.id && { backgroundColor: "#ddd" }
                                ]}
                            >
                                <Text style={styles.label}>
                                    {item.name} ({count} questions)
                                </Text>
                            </TouchableOpacity>
                        );
                    }}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Number of questions"
                    keyboardType="numeric"
                    value={numQuestions}
                    onChangeText={setNumQuestions}
                />

                <TouchableOpacity style={styles.button} onPress={startQuiz}>
                    <Text style={styles.buttonText}>Start Quiz</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
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

    const currentQuestion = quizQuestions[currentIndex];
    const currentAnswers = answers.filter(a => a.id_question === currentQuestion.id);

    return (
        <View style={styles.container}>
            <Text style={styles.principalTitle}>
                Question {currentIndex + 1}/{quizQuestions.length}
            </Text>
            <Text style={styles.label}>{currentQuestion.description}</Text>

            {currentAnswers.map((ans) => (
                <TouchableOpacity
                    key={ans.id}
                    style={styles.button}
                    onPress={() => handleAnswer(ans)}
                >
                    <Text style={styles.buttonText}>{ans.answer}</Text>
                </TouchableOpacity>
            ))}

            {/* Quit button */}
            <TouchableOpacity
                style={[styles.button, { backgroundColor: "red", marginTop: 20 }]}
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
    );
}