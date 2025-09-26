import { StatusBar } from 'expo-status-bar';
import { use, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, ActivityIndicator } from 'react-native';
import styles from './styles-create-quiz/styles_create_quiz';
import { useEffect } from 'react';

import * as tbThemes from '../../services/themes_table_database_services';


export default function CreateQuiz({ navigation, route }) {

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
        <TouchableOpacity
            style={styles.listItem}
            onPress={() => alert('You select the Theme ID: ' + item.id + ', Nome: ' + item.name)}
        >
            <Text style={styles.listText}>{item.name}</Text>
        </TouchableOpacity>
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
            <Text style={styles.principalTitle}>Screen to Theme List!</Text>

            {/*Lista dos temas*/}
            <FlatList
                data={themes}
                renderItem={renderThemeItem}
                keyExtractor={item => item.id.toString()}
                style={styles.list}
                ListEmptyComponent={<Text>No themes found. Create a new one!</Text>}
            />


            {/*Dentro dos temas tem as perguntas*/}


            {/*Crear novo tema*/}

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateNewTheme')}>
                <Text style={styles.buttonText}>Create a new Theme</Text>
            </TouchableOpacity>

            {/*Dentro do criar tema, criar as perguntas*/}

            {/*Voltar*/}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>

        </View>
    );
}
