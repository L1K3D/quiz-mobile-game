// screens/play-quiz/quiz_summary.js
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from "./styles-play-quiz/styles_play_quiz";

export default function QuizSummary({ route, navigation }) {
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
                            {item.correct
                                ? "✅ Correto"
                                : `❌ Errado (Correta: ${
                                // Busca a alternativa correta
                                item.question.correctAnswer ||
                                "verifique no banco de respostas"
                                })`}
                        </Text>
                    </View>
                )}
            />

            {/* Botão Jogar Novamente */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.replace("PlayQuiz")}
            >
                <Text style={styles.buttonText}>Jogar Novamente</Text>
            </TouchableOpacity>

            {/* Botão Voltar ao Menu */}
            <TouchableOpacity
                style={[styles.button, { backgroundColor: "gray" }]}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.buttonText}>Voltar ao Menu</Text>
            </TouchableOpacity>
        </View>
    );
}