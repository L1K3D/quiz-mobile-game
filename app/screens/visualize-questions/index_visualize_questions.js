import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import styles from "./styles-visualize-questions/styles_visualize_questions";

import * as tbQuestions from '../../services/questions_table_database_services';

export default function VisualizeQuestions({ navigation, route }) {
    const { themeId, refresh: refreshParam } = route.params;
    const [questions, setQuestions] = useState([]);
    const [refresh, setRefresh] = useState(false);

    async function loadQuestions() {
        try {
            const questions = await tbQuestions.getQuestionsByTheme(themeId);
            setQuestions(questions);
        } catch (e) {
            Alert.alert(e.toString());
        }
    }

    useEffect(() => {
        loadQuestions();
    }, [refreshParam, refresh]);

    function removeElement(identifier) {
        Alert.alert('CAUTION', 'Are you sure you want to delete this record?',
            [
                {
                    text: 'Yes',
                    onPress: () => effectiveRegisterExclusion(identifier),
                },
                {
                    text: 'No',
                    style: 'cancel',
                }
            ]
        );
    }

    async function effectiveRegisterExclusion(identifier) {
        try {
            await tbQuestions.deleteQuestion(identifier);
            setRefresh(!refresh);
            Alert.alert('Record deleted successfully!');
        } catch (e) {
            Alert.alert(e.toString());
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.principalTitle}>Visualize Questions!</Text>

            {/* List of questions */}
            <ScrollView style={{ width: '92%', marginTop: 12 }}>
                {questions.map((question) => (
                    <View key={question.id.toString()} style={{ marginBottom: 10 }}>
                        <View style={[styles.card, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                            <View>
                                <Text style={{ color: '#b5c0d0', fontWeight: '700' }}>{question.description}</Text>
                            </View>

                            <View >
                                <TouchableOpacity style={[styles.button, { width: 90, height: 36, justifyContent: 'center', marginRight: 8,  }]} onPress={() => navigation.navigate('EditQuestion', { questionId: question.id, onGoBack: () => setRefresh(!refresh) })}>
                                    <Text style={styles.buttonText}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.button, { width: 90, height: 36, justifyContent: 'center', marginRight: 8 }]} onPress={() => removeElement(question.id)}>
                                    <Text style={styles.buttonText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateQuestions', { themeId: themeId })}>
                <Text style={styles.buttonText}>Create Question</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateQuiz')}>
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
        </View>
    );
}
