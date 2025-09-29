import { StatusBar } from 'expo-status-bar';
<<<<<<< HEAD
import { use, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, ActivityIndicator, ScrollView, Alert, Keyboard } from 'react-native';
=======
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
>>>>>>> de93ae30fdf5cdcc4128e2cf3d74fe726e4c936b
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

<<<<<<< HEAD
    const [nameTheme, setNameTheme] = useState("");
    const [editingThemeId, setEditingThemeId] = useState(null);

    const [refresh, setRefresh] = useState(false);

    async function loadThemes() {
        try {
            const storedThemes = await getThemes();
            setThemes(storedThemes);
        } catch (error) {
            console.error('Error loading themes:', error);
        } finally {
            setIsLoading(false);
        }
    }

    // UseEffect to search data when a component needs
    useEffect(() => {
        loadThemes();
    }, [route.params?.themeAdded, refresh]); // Reload when a new theme is added or refresh is true
=======
    useEffect(() => {
        loadThemes();
    }, [route.params?.themeAdded]);
>>>>>>> de93ae30fdf5cdcc4128e2cf3d74fe726e4c936b

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

<<<<<<< HEAD
    function clearFields() {
        setIdTheme("");
        setNameTheme("");
        setEditingThemeId(null);
    }

    function editTheme(identifier) {
        const theme = themes.find(theme => theme.id == identifier);

        if (theme != undefined) {
            setEditingThemeId(theme.id);
            setNameTheme(theme.name);
        }
    }

    async function saveTheme() {
        if (!nameTheme.trim()) {
            Alert.alert('Attention', 'The theme name cannot be empty.');
            return;
        }
        try {
            await tbThemes.changeTheme({ id: editingThemeId, name: nameTheme });
            clearFields();
            setRefresh(!refresh);
            Alert.alert('Success', 'Theme updated successfully!');
        } catch (error) {
            Alert.alert('Error', 'Could not update theme.');
            console.error(error);
        }
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
            await tbThemes.deleteTheme(identifier);
            Keyboard.dismiss();
            clearFields();
            setRefresh(!refresh);
            Alert.alert('Theme deleted sucessfully!');
        } catch (e) {
            Alert.alert(e.toString());
        }
    }

=======
>>>>>>> de93ae30fdf5cdcc4128e2cf3d74fe726e4c936b
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.principalTitle}>Theme List!</Text>

            <ScrollView style={{ width: '92%', marginTop: 12 }}>
<<<<<<< HEAD
                {themes.map((theme) => (
                    <View key={theme.id.toString()} style={{ marginBottom: 10 }}>
                        <View style={[styles.card, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                            {
                                editingThemeId === theme.id ? (
                                    <TextInput
                                        style={[styles.input, { flex: 1, marginRight: 10 }]}
                                        value={nameTheme}
                                        onChangeText={setNameTheme}
                                        autoFocus
                                    />
                                ) : (
                                    <View>
                                        <Text style={{ color: '#b5c0d0', fontWeight: '700' }}>{theme.name}</Text>
                                    </View>
                                )
                            }

                            <View>
                                {
                                    editingThemeId === theme.id ? (
                                        <TouchableOpacity style={[styles.button, { width: 90, height: 36, justifyContent: 'center', marginRight: 8 }]} onPress={saveTheme}>
                                            <Text style={styles.buttonText}>Save</Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity style={[styles.button, { width: 90, height: 36, justifyContent: 'center', marginRight: 8 }]} onPress={() => editTheme(theme.id)}>
                                            <Text style={styles.buttonText}>Edit</Text>
                                        </TouchableOpacity>
                                    )
                                }

                                <TouchableOpacity style={[styles.button, { width: 90, height: 36, justifyContent: 'center', marginRight: 8 }]} onPress={() => removeTheme(theme.id)}>
                                    <Text style={styles.buttonText}>Delete</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.button, { width: 90, height: 36, justifyContent: 'center', marginRight: 8 }]} onPress={() => navigation.navigate('VisualizeQuestions', { themeId: theme.id })}>
=======
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
>>>>>>> de93ae30fdf5cdcc4128e2cf3d74fe726e4c936b
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