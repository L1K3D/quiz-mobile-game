import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from "react-native";
import styles from "./styles-visualize-questions/styles_visualize_questions";

import * as tbQuestions from '../../services/questions_table_database_services';

export default function VisualizeQuestions({ navigation, route }) {
    const { themeId, themeName } = route.params;
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(
        () => {
            const unsubscribe = navigation.addListener('focus', () => {
                loadQuestions();
            });

            return unsubscribe;
        }, [navigation, themeId]
    );

    async function loadQuestions() {
        setIsLoading(true);
        try {
            const fetchedQuestions = await tbQuestions.getQuestionsByTheme(themeId);
            setQuestions(fetchedQuestions);
        } catch (e) {
            Alert.alert("Error", "Could not load questions.");
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }

    function removeQuestion(questionId) {
        Alert.alert('CAUTION', 'Are you sure you want to delete this question?',
            [
                {
                    text: 'Yes',
                    onPress: () => effectiveQuestionDeletion(questionId),
                },
                {
                    text: 'No',
                    style: 'cancel',
                }
            ]
        );
    }

    async function effectiveQuestionDeletion(questionId) {
        try {
            await tbQuestions.deleteQuestion(questionId);
            await loadQuestions(); // Reload questions after deletion
            Alert.alert('Success', 'Question deleted successfully!');
        } catch (e) {
            Alert.alert("Error", "Could not delete the question.");
            console.error(e);
        }
    }

    if (isLoading) {
        return <View style={styles.container}><ActivityIndicator size="large" color="#0000ff" /></View>;
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.principalTitle}>Questions for: {themeName}</Text>

            <ScrollView style={{ width: '92%', marginTop: 12 }}>
                {questions.map((question) => (
                    <View key={question.id} style={styles.card}>
                        <Text style={styles.label}>{question.description}</Text>
                        <View style={styles.cardButtonContainer}>
                            <TouchableOpacity style={styles.cardButton} onPress={() => navigation.navigate('EditQuestion', { questionId: question.id })}>
                                <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.cardButton]} onPress={() => removeQuestion(question.id)}>
                                <Text style={styles.buttonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateQuestions', { themeId: themeId })}>
                <Text style={styles.buttonText}>Add New Question</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.buttonBack]} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
        </View>
    );
}