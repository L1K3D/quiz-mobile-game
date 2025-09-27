import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    Alert,
    Keyboard
} from 'react-native';
import styles from './styles-create-quiz/styles_create_quiz';

import * as tbThemes from '../../services/themes_table_database_services';

export default function CreateQuiz({ navigation, route }) {
    const { getAllThemes: getThemes } = tbThemes;

    const [themes, setThemes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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

    useEffect(() => {
        loadThemes();
    }, [route.params?.themeAdded]);

    function removeTheme(identifier) {
        Alert.alert(
            'CAUTION',
            'Are you sure you want to exclude this theme?',
            [
                {
                    text: 'Yes',
                    onPress: () => effectiveThemeExclusion(identifier),
                },
                {
                    text: 'No',
                    style: 'cancel',
                },
            ]
        );
    }

    async function effectiveThemeExclusion(identifier) {
        try {
            await tbThemes.deleteTheme(identifier);
            Keyboard.dismiss();
            await loadThemes();
            Alert.alert('Success', 'Theme deleted successfully!');
        } catch (e) {
            Alert.alert('Error', e.message ?? 'Could not delete theme');
        }
    }

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
            <Text style={styles.principalTitle}>Theme List!</Text>

            <ScrollView style={{ width: '92%', marginTop: 12 }}>
                {themes.map((theme, index) => (
                    <View key={theme.id ?? index.toString()} style={{ marginBottom: 10 }}>
                        <View
                            style={[
                                styles.card,
                                {
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                },
                            ]}
                        >
                            <View>
                                <Text style={{ color: '#b5c0d0', fontWeight: '700' }}>
                                    {theme.name}
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                {/* Edit agora navega para CreateNewTheme com params */}
                                <TouchableOpacity
                                    style={[
                                        styles.button,
                                        {
                                            width: 90,
                                            height: 36,
                                            justifyContent: 'center',
                                            marginRight: 8,
                                        },
                                    ]}
                                    onPress={() =>
                                        navigation.navigate('CreateNewTheme', {
                                            themeId: theme.id,
                                            themeName: theme.name,
                                            isEditing: true,
                                        })
                                    }
                                >
                                    <Text style={styles.buttonText}>Edit</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.buttonSecondary,
                                        { width: 90, height: 36, justifyContent: 'center' },
                                    ]}
                                    onPress={() => removeTheme(theme.id)}
                                >
                                    <Text style={styles.buttonText}>Delete</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.button,
                                        { width: 110, height: 36, justifyContent: 'center' },
                                    ]}
                                    onPress={() =>
                                        navigation.navigate('VisualizeQuestions', {
                                            themeId: theme.id,
                                            themeName: theme.name,
                                        })
                                    }
                                >
                                    <Text style={styles.buttonText}>Questions</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('CreateNewTheme')}
            >
                <Text style={styles.buttonText}>Create a new Theme</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Home')}
            >
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
        </View>
    );
}