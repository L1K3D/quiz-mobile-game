import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StatusBar } from 'react-native';
import styles from './styles-create-new-theme/styles_create_new_theme';
import * as tbThemes from '../../services/themes_table_database_services';

export default function CreateNewTheme({ navigation, route }) {
    const isEditing = route?.params?.isEditing ?? false;
    const themeId = route?.params?.themeId ?? null;

    const [name, setName] = useState(route?.params?.themeName ?? '');

    async function saveTheme() {
        if (!name.trim()) {
            Alert.alert('Error', 'Please enter a name for the theme!');
            return;
        }

        try {
            if (isEditing) {
                const ok = await tbThemes.changeTheme({ id: themeId, name });
                if (ok) Alert.alert('Success', 'Theme updated successfully!');
                else Alert.alert('Error', 'Could not update theme.');
            } else {
                const ok = await tbThemes.addTheme({ name });
                if (ok) Alert.alert('Success', 'Theme created successfully!');
                else Alert.alert('Error', 'Could not create theme.');
            }

            navigation.navigate('CreateQuiz', { themeAdded: true });
        } catch (e) {
            Alert.alert('Error', e.message ?? 'Failed to save theme');
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.principalTitle}>{isEditing ? 'Edit Theme' : 'Create a New Theme'}</Text>
            
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Theme name"
                    placeholderTextColor="#8A8F98"
                />
                <TouchableOpacity style={styles.button} onPress={saveTheme}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}