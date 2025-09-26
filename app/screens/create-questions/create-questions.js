import { StatusBar } from 'expo-status-bar';
import { use, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, ActivityIndicator } from 'react-native';
import styles from './styles-create-questions/styles-create-questions';
import * as tbThemes from '../../services/themes_table_database_services';
import { useEffect } from 'react';

import * as tbQuestions from '../../services/questions_table_database_services';

export default function CreateQuestions({ navigation, route }) {

    // Database interaction
    const { getAllThemes: getThemes } = tbThemes;

    // Storaged themes comes from DB
    const [themes, setThemes] = useState([]);

    // Loading state
    const [isLoading, setIsLoading] = useState(true);

    // UseEffect to search data when a component needs
    useEffect(() => {
        const loadThemes = async () => {
            try {
                const storedThemes = await getThemes();
                setThemes(storedThemes);
            } catch (error) {
                console.error('Error loading themes:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadThemes();
    }, [route.params?.themeAdded]); // Reload when a new theme is added

    const renderThemeItem = ({ item }) => (
            <Text style={styles.listText}>{item.name}</Text>
    );

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <FlatList
                data={themes}
                renderItem={renderThemeItem}
                keyExtractor={item => item.id.toString()}
                style={styles.teste}
            />

            <Text style={styles.subtitulo}>Create questions</Text>

            <TextInput style={styles.input} placeholder="Question 1" />

            <TextInput style={styles.input} placeholder="Answer" />

            <TextInput style={styles.input} placeholder="Correct answer" />

            <TextInput style={styles.input} placeholder="Wrong answer 1" />

            <TextInput style={styles.input} placeholder="Wrong answer 2" />

            <TextInput style={styles.input} placeholder="Wrong answer 3" />

            <TextInput style={styles.input} placeholder="Question 2" />

            <TextInput style={styles.input} placeholder="Answer" />

            

            

            {/*Voltar*/}
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
        </View>
    );
}
