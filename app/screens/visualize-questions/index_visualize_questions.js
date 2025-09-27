import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, FlatList, Alert, ScrollView } from "react-native";
import styles from "./styles-visualize-questions/styles_visualize_questions";

import * as tbQuestions from '../../services/questions_table_database_services';
import * as tbAnswers from '../../services/answers_table_database_services';

export default function VisualizeQuestions({ navigation }) {

    const [questions, setQuestions] = useState([]);
    const [idQuestion, setIdQuestion] = useState("");
    const [descriptionQuestion, setDescriptionQuestion] = useState("");
    const [idThemeQuestion, setIdThemeQuestion] = useState("");

    const [answers, setAnswers] = useState([]);
    const [idAnswer, setIdAnswer] = useState("");
    const [statusCorrectAnswer, setStatusCorrectAnswer] = useState("");
    const [idQuestionAnswer, setIdQuestionAnswer] = useState("");

    async function processingUseEffect() {
        try {
            await tbQuestions.createQuestionsTable();
            await tbAnswers.createAnswersTable();
            await loadData();
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(
        () => {
            processingUseEffect();
        }, []
    );

    async function loadQuestionsAndAnswersByTheme(id_theme) {
        try {
            const questionsByTheme = await tbQuestions.getQuestionsByTheme(id_theme);
            setQuestions(questionsByTheme);

            const answersByTheme = await tbAnswers.getAnswersByQuestion(id_theme);
            setAnswers(answersByTheme);
        } catch (e) {
            Alert.alert(e.toString());
        }
    }
    async function loadData() {
        try {
            const allQuestions = await tbQuestions.getQuestionsByTheme(idThemeQuestion);
            setQuestions(allQuestions);
        } catch (e) {
            Alert.alert(e.toString());
        }
    }
    function clearFields() {
        setIdQuestion("");
        setDescriptionQuestion("");
        setIdThemeQuestion("");
    }

    function editQuestion(identifier) {
        const question = questions.find(question => question.id == identifier);

        if (question != undefined) {
            setIdQuestion(question.id);
            setDescriptionQuestion(question.description);
            setIdThemeQuestion(question.id_theme);
        }

        console.log(question);
    }

    function editAnswer(identifier) {
        const answer = answers.find(answer => answer.id == identifier);

        if (answer != undefined) {
            setIdAnswer(answer.id);
            setStatusCorrectAnswer(answer.status_correct);
            setIdQuestionAnswer(answer.id_question);
        }

        console.log(answer);
    }


    async function effectiveExclusionQuestionByTheme() {
        try {
            await tbQuestions.deleteQuestionsByTheme(idThemeQuestion);
        } catch (e) {
            Alert.alert(e);
        }
    }

    function excludeAllQuestionsByTheme() {
        if (Alert.alert('Please, this step requires atention!', 'Do you confirm the EXCLUSION OF ALL QUESTIONS AND ANSWERSOF THIS THEME?',
            [
                {
                    text: 'Yes, confirm!',
                    onPress: () => {
                        effectiveExclusionQuestionByTheme();
                    }
                },
                {
                    text: 'No!',
                    style: 'cancel'
                }
            ]));
    }

    async function effectiveRegisterExclusion(identifier) {
        try {
            await DbService.deleteRegister(identifier);
            Keyboard.dismiss();
            clearFields();
            await loadData();
            Alert.alert('Register deleted sucessfully!');
        } catch (e) {
            Alert.alert(e);
        }
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={questions}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.description}</Text>
                        <TouchableOpacity onPress={() => editQuestion(item.id)}>
                            <Text>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => removeQuestion(item.id)}>
                            <Text>Remove</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
    
}