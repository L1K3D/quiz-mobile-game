import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, TouchableOpacity, TextInput, ActivityIndicator, Alert, FlatList } from 'react-native';
import styles from './styles-create-questions/styles-create-questions';
import * as tbThemes from '../../services/themes_table_database_services';
import * as tbQuestions from '../../services/questions_table_database_services';
import * as tbAnswers from '../../services/answers_table_database_services';

export default function CreateQuestions({ navigation, route }) {
  const themeId = route.params?.themeId;
  const [description, setDescription] = useState('');
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
  const [themes, setThemes] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [loading, setLoading] = useState(!themeId);

  useEffect(() => {
    async function loadThemes() {
      if (!themeId) {
        try {
          const data = await tbThemes.getAllThemes();
          setThemes(data);
        } catch (error) {
          Alert.alert('Error', 'Failed to load themes.');
        } finally {
          setLoading(false);
        }
      }
    }
    loadThemes();
  }, [themeId]);

  const handleAnswerChange = (text, index) => {
    const newAnswers = [...answers];
    newAnswers[index] = text;
    setAnswers(newAnswers);
  };

  async function handleSave() {
    const finalThemeId = themeId || selectedTheme;
    if (!description.trim() || !finalThemeId) {
      Alert.alert('Attention', 'Please fill in the description and select a theme.');
      return;
    }

    if (answers.some(answer => !answer.trim()) || correctAnswerIndex === null) {
      Alert.alert('Attention', 'Please fill in all 4 alternatives and select the correct one.');
      return;
    }

    try {
      const questionsInTheme = await tbQuestions.getQuestionsByTheme(finalThemeId);
      const questionNumber = questionsInTheme.length + 1;
      const newDescription = `Question ${questionNumber}: ${description.trim()}`;

      const questionId = await tbQuestions.addQuestion({
        description: newDescription,
        id_theme: finalThemeId
      });

      for (let i = 0; i < answers.length; i++) {
        await tbAnswers.addAnswer({
          answer: answers[i].trim(),
          status_correct: i === correctAnswerIndex ? 1 : 0,
          id_question: questionId
        });
      }

      Alert.alert('Success', 'Question added successfully!');
      setDescription('');
      setAnswers(['', '', '', '']);
      setCorrectAnswerIndex(null);
      setSelectedTheme(null);
      // Go back to the previous screen (VisualizeQuestions). The previous
      // screen already listens to focus events and will reload questions,
      // so we should NOT navigate to it without params (that caused
      // `route.params` to be undefined and the crash).
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
        <Text>Loading themes...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />

      <Text style={styles.principalTitle}>Create Questions!</Text>

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
          <TouchableOpacity onPress={() => setCorrectAnswerIndex(index)} style={{ padding: 8 }}>
            <View style={[
              styles.radio,
              correctAnswerIndex === index && styles.radioSelected
            ]} />
          </TouchableOpacity>
        </View>
      ))}

      {!themeId && (
        <>
          <Text style={styles.label}>Select the theme:</Text>
          <FlatList
            data={themes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.themeItem,
                  selectedTheme === item.id && styles.themeSelected
                ]}
                onPress={() => setSelectedTheme(item.id)}
              >
                <Text
                  style={[
                    styles.themeText,
                    selectedTheme === item.id && styles.themeTextSelected
                  ]}
                >
                  {item.description}
                </Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Question</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#888' }]} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
