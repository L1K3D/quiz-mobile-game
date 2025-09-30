import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import styles from './styles-edit-question/styles_edit_question';
import * as tbQuestions from '../../services/questions_table_database_services';
import * as tbAnswers from '../../services/answers_table_database_services';

export default function EditQuestion({ navigation, route }) {
  const { questionId, onGoBack } = route.params;
  const [description, setDescription] = useState('');
  const [answers, setAnswers] = useState([]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadQuestionData() {
      try {
        const question = await tbQuestions.getQuestionById(questionId);
        const questionAnswers = await tbAnswers.getAnswersByQuestion(questionId);
        
        setDescription(question.description.split(': ').slice(1).join(': '));
        setAnswers(questionAnswers.map(a => a.answer));
        setCorrectAnswerIndex(questionAnswers.findIndex(a => a.status_correct === 1));
      } catch (error) {
        Alert.alert('Error', 'Failed to load question data.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadQuestionData();
  }, [questionId]);

  const handleAnswerChange = (text, index) => {
    const newAnswers = [...answers];
    newAnswers[index] = text;
    setAnswers(newAnswers);
  };

  async function handleSave() {
    if (!description.trim()) {
      Alert.alert('Attention', 'Please fill in the question description.');
      return;
    }

    if (answers.some(answer => !answer.trim()) || correctAnswerIndex === null) {
      Alert.alert('Attention', 'Please fill in all 4 alternatives and select the correct one.');
      return;
    }

    try {
        const question = await tbQuestions.getQuestionById(questionId);
        const questionNumber = question.description.split(':')[0];
        const newDescription = `${questionNumber}: ${description.trim()}`;

      await tbQuestions.changeQuestion({
        id: questionId,
        description: newDescription,
        id_theme: question.id_theme
      });

      const existingAnswers = await tbAnswers.getAnswersByQuestion(questionId);
      for (let i = 0; i < answers.length; i++) {
        const answerData = {
          id: existingAnswers[i].id,
          answer: answers[i].trim(),
          status_correct: i === correctAnswerIndex ? 1 : 0,
          id_question: questionId
        };
        await tbAnswers.changeAnswer(answerData);
      }

      Alert.alert('Success', 'Question updated successfully!');
      if (onGoBack) {
        onGoBack();
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Could not save question.');
      console.error(error);
    }
  }

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Loading question data...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.principalTitle}>Edit Question!</Text>

      <Text style={styles.label}>Question description:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the question statement"
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Alternatives:</Text>
      {answers.map((answer, index) => (
        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <TextInput
            style={[styles.input, { flex: 1, marginRight: 10 }]}
            placeholder={`Alternative ${index + 1}`}
            value={answer}
            onChangeText={(text) => handleAnswerChange(text, index)}
          />
          <TouchableOpacity onPress={() => setCorrectAnswerIndex(index)} style={{padding: 8}}>
            <View style={[
              styles.radio,
              correctAnswerIndex === index && styles.radioSelected
            ]} />
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#888' }]} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
