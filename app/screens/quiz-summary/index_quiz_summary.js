// screens/play-quiz/quiz_summary.js
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from "./styles-quiz-summary/styles_quiz_summary";

export default function QuizSummary({ route, navigation }) {
    const { finalAnswers, percent } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.principalTitle}>Quiz Summary</Text>
                <Text style={styles.scoreLabel}>Your Score: <Text style={styles.scorePercent}>{percent}%</Text></Text>
            </View>

            <FlatList
                data={finalAnswers}
                keyExtractor={(item, index) => index.toString()}
                style={{ width: '100%' }}
                contentContainerStyle={{ paddingHorizontal: 16 }}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.label}>{item.question.description}</Text>
                        <Text style={[styles.answerText, { color: item.correct ? styles.correctText.color : styles.incorrectText.color }]}>
                            {item.correct
                                ? "✅ Correct"
                                : `❌ Incorrect (Correct: ${
                                    item.question.correctAnswerText || "N/A"
                                })`}
                        </Text>
                    </View>
                )}
            />

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.replace("PlayQuiz")}
                >
                    <Text style={styles.buttonText}>Play Again</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.buttonSecondary]}
                    onPress={() => navigation.popToTop()}
                >
                    <Text style={styles.buttonText}>Back to Home</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}