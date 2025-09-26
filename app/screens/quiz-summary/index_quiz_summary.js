import { View, Text, FlatList } from "react-native";
import styles from "./styles-quiz-summary/styles_quiz_summary"

export default function QuizSummary({ route }) {
    const { finalAnswers, percent } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.principalTitle}>Resumo do Quiz</Text>
            <Text style={styles.label}>Acertos: {percent}%</Text>

            <FlatList
                data={finalAnswers}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.label}>{item.question.description}</Text>
                        <Text style={{ color: item.correct ? "green" : "red" }}>
                            {item.correct ? "✅ Correto" : `❌ Errado (Correta: ${item.question.correctAnswer || "verifique no banco"
                                })`}
                        </Text>
                    </View>
                )}
            />
        </View>
    );

}