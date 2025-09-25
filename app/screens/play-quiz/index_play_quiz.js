import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, FlatList, Alert } from "react-native";
import styles from "./styles-play-quiz/styles_play_quiz";

import { getAllThemes } from "../../services/themes_table_database_services";
import { getAllQuestions } from "../../services/questions_table_database_services";
import { getAllAnswers } from "../../services/answers_table_database_services";
import { addResult } from "../../services/results_table_database_services";

export default function PlayQuiz({ navigation }) {

    const [themes, setThemes] = useState([]);
    const [question, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [selectedTheme, setSelectedThheme] = useState([]);
    const [numQuestions, setNumQuestions] = useState("");
    const [quizStarted, setQuizStarted] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);

    useEffect(() => {
        const loadData = async () => {
        const t = await getAllThemes();
        const q = await getAllQuestions();
        const a = await getAllAnswers();
        setThemes(t);
        setQuestions(q);
        setAnswers(a);
        };
        loadData();
    }, []);

    //Start Quiz
    const startQuiz = () => {
        if (!selectedTheme) {
            Alert.alert("Error!", "Please, select a theme!");
            return;
        }

        const themeQuestions = questions.filter(q => q.id_theme === selectedTheme.id);
        if (themeQuestions.lenght < parseInt(numQuestions)) {
            Alert.alert("Error!", "This theme doesn't have enough questions!");
            return;
        }

        const shuffled = themeQuestions.sort(() => 0.5 - Math.random());
        setQuestions(shuffled.slice(0, parseInt(numQuestions)));
        setQuizStarted(true);
        setCurrentIndex(0);
        setUserAnswers([]);

    };

    const handleAnswer = (answer) => {
        const correct = answer.status_correct === 1;
        setUserAnswers([...userAnswers, {
            question: questions[currentIndex],
            chosen: answer,
            correct
        }]);

        if (currentIndex + 1 < questions.lenght) {
            setCurrentIndex(currentIndex + 1);
        }
        else {
            finishQuiz([...userAnswers, { questions: questions[currentIndex], chosen: answer, correct }]);
        }

    };

    const finishQuiz = async (finalAnswers) => {
        const correctCount = finalAnswers.filter(a => a.correct).lenght;
        const percent = ((correctCount / finalAnswers.lenght) * 100).toFixed(1);

        await addResult({
            id_theme: selectedTheme.id,
            total_questions: finalAnswers.lenght,
            correct_answers: correctCount
        });

        Alert.alert(
            "Result",
            `You got correct ${correctCount}/${finalAnswers.lenght} (${percent}%)`
        );

        navigation.navigate("QuizSummary", { finalAnswers, percent });

    }

    if (!quizStarted) {
        return (
        <View style={styles.container}>
            <Text style={styles.principalTitle}>Escolha um tema e jogue!</Text>

            <FlatList
            data={themes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
                const count = questions.filter(q => q.id_theme === item.id).length;
                return (
                <TouchableOpacity onPress={() => setSelectedTheme(item)} style={styles.card}>
                    <Text style={styles.label}>{item.name} ({count} questions)</Text>
                </TouchableOpacity>
                );
            }}
            />

            <TextInput
            style={styles.input}
            placeholder="Number of questions:"
            keyboardType="numeric"
            value={numQuestions}
            onChangeText={setNumQuestions}
            />

            <TouchableOpacity style={styles.button} onPress={startQuiz}>
            <Text style={styles.buttonText}>Start Quiz</Text>
            </TouchableOpacity>
        </View>
        );
    }

    const currentQuestion = questions[currentIndex];
    const currentAnswers = answers.filter(a => a.id_question === currentQuestion.id);

    return (
        <View style={styles.container}>
            <Text style={styles.principalTitle}>
                Question {currentIndex + 1}/{questions.length}
            </Text>
        </View>
    )

}