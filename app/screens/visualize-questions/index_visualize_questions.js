import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import styles from "./styles-visualize-questions/styles_visualize_questions";

import * as tbQuestions from '../../services/questions_table_database_services';

export default function VisualizeQuestions({ navigation, route }) {
    const { themeId, refresh: refreshParam } = route.params;
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
    const [refresh, setRefresh] = useState(false);

    async function loadQuestions() {
        try {
            console.log('Loading Questions Data...');
            let questions = await tbQuestions.getAllQuestions();
            setRegisters(questions);
        } catch (e) {
            Alert.alert(e.toString());
        }
    }

    async function loadAnswersData() {
        try {
            console.log('Loading Answers Data...');
            let answers = await tbAnswers.getAllAnswers();
            setRegisters(answers);
        } catch (e) {
            Alert.alert(e.toString());
        }
    }    

    function editQuestion(identifier) {
        const question = questions.find(question => question.id == identifier);

        if (question != undefined) {
            setIdQuestion(question.id);
            setDescriptionQuestion(question.description);
            setIdThemeQuestion(question.id_theme)
        }

        console.log(question);
    }

    function editAnswer(identifier) {
        const answer = answers.find(answer => answer.id == identifier);

        if (answer != undefined) {
            setIdAnswer(answer.id);
            setStatusCorrectAnswer(answer.status_correct);
            setIdQuestionAnswer(answer.id_question)
        }

        console.log(question);
    }

    async function effectiveExclusion() {
        try {
            await DbService.deleteAllRegisters();
            await loadData();
        } catch (e) {
            Alert.alert(e)
        }
    }

    function excludeEverything() {
        if (Alert.alert('Please, this step requires atention!', 'Do you confirm the EXCLUSION OF ALL DATA?',
            [
                {
                    text: 'Yes, confirm!',
                    onPress: () => {
                        effectiveExclusion();
                    }
                },
                {
                    text: 'No!',
                    style: 'cancel'
                }
            ]));
    }

    function removeElement(identifier) {
        Alert.alert('CAUTION', 'Are you sure, you want to exclude this register?',
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

}