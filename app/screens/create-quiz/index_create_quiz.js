import { StatusBar } from 'expo-status-bar';
import { use, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, ActivityIndicator, ScrollView, Alert } from 'react-native';
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

    const [idTheme, setIdTheme] = useState("");

    const [nameTheme, setNameTheme] = useState("");

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
            onPress={() => navigation.navigate('CreateQuestions')}
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

    function editTheme(identifier) {
        const theme = themes.find(theme => theme.id == identifier);

        if (theme != undefined) {
            setIdTheme(theme.id);
            setNameTheme(theme.name);
        }

        console.log(theme);
    }

    function removeTheme(identifier) {
        Alert.alert('CAUTION', 'Are you sure, you want to exclude this theme?',
            [
                {
                    text: 'Yes',
                    onPress: () => effectiveThemeExclusion(identifier),
                },
                {
                    text: 'No',
                    style: 'cancel',
                }
            ]
        );
    }

    async function effectiveThemeExclusion(identifier) {
        try {
            identifier = identifier.toString();
            await tbThemes.deleteTheme(identifier);
            Keyboard.dismiss();
            clearFields();
            await loadData();
            Alert.alert('Theme deleted sucessfully!');
        } catch (e) {
            Alert.alert(e);
        }
    }

    return (

        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.principalTitle}>Theme List!</Text>

            {/* Lista os temas */}
            <ScrollView style={{ width: '92%', marginTop: 12 }}>
                {themes.map((theme, index) => (
                    <View key={theme.name ?? index.toString()} style={{ marginBottom: 10 }}>
                        <View style={[styles.card, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                            <View>
                                <Text style={{ color: '#b5c0d0', fontWeight: '700' }}>{theme.name}</Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={[styles.button, { width: 90, height: 36, justifyContent: 'center', marginRight: 8 }]} onPress={() => editTheme(theme.name)}>
                                    <Text style={styles.buttonText}>Edit</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.buttonSecondary, { width: 90, height: 36, justifyContent: 'center' }]} onPress={() => removeTheme(theme.id)}>
                                    <Text style={styles.buttonText}>Delete</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.button, { width: 90, height: 36, justifyContent: 'center' }]} onPress={() => navigation.navigate('VisualizeQuestions')}>
                                    <Text style={styles.buttonText}>Questions</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/*Crear novo tema*/}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateNewTheme')}>
                <Text style={styles.buttonText}>Create a new Theme</Text>
            </TouchableOpacity>

            {/*Voltar*/}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>

        </View>
    );
}
