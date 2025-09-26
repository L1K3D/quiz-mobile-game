import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import styles from './styles-create-new-theme/styles-create-new-theme';
import * as tbThemes from '../../services/themes_table_database_services';

export default function CreateNewTheme({ navigation, route }) {
    const [themeName, setThemeName] = useState('');

    const handleSave = async () => {
        if (themeName.trim() === '') {
            Alert.alert('Validation error', 'Please enter a theme name.');
            return;
        }
        try {
            const success = await tbThemes.addTheme({ name: themeName });
            if (success) {
                Alert.alert('Success', 'Theme saved successfully!');
                setThemeName('');
                navigation.navigate({ name: 'CreateQuiz', params: { themeAdded: new Date().getTime() }, merge: true });
            } else {
                Alert.alert('Error', 'Failed to save theme. The theme may already exist.');
            }
        } catch (error) {
            console.error('Error saving theme:', error);
            Alert.alert('Error', 'An error occurred while saving the theme.');
        }
    };

    return (

        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.principalTitle}>Screen to create a new Theme!</Text>

            {/*Formulário para criar novo tema*/}

            <TextInput
                style={styles.input}
                placeholder="Enter the new theme name"
                placeholderTextColor="#888"
                value={themeName}
                onChangeText={setThemeName}
            />

            {/*Ao clicar no botão, salvat no SQLite */}
            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>

            {/*Voltar*/}

            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>

        </View>
    );
}