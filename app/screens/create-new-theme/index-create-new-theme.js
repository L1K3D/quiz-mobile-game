import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './styles-create-new-theme/styles_create_new_theme';
import * as tbThemes from '../../services/themes_table_database_services';

export default function CreateNewTheme({ navigation, route }) {
    const isEditing = route?.params?.isEditing ?? false;
    const themeId = route?.params?.themeId ?? null;

    const [name, setName] = useState(route?.params?.themeName ?? '');

    async function saveTheme() {
        if (!name.trim()) {
            Alert.alert('Erro', 'Digite um nome para o tema!');
            return;
        }

        try {
            if (isEditing) {
                const ok = await tbThemes.changeTheme({ id: themeId, name });
                if (ok) Alert.alert('Sucesso', 'Tema atualizado com sucesso!');
                else Alert.alert('Erro', 'Não foi possível atualizar o tema.');
            } else {
                const ok = await tbThemes.addTheme({ name });
                if (ok) Alert.alert('Sucesso', 'Tema criado com sucesso!');
                else Alert.alert('Erro', 'Não foi possível criar o tema.');
            }

            navigation.navigate('CreateQuiz', { themeAdded: true });
        } catch (e) {
            Alert.alert('Erro', e.message ?? 'Falha ao salvar tema');
        }
    }

    return (
        <View style={styles.container}>
<<<<<<< HEAD
            <StatusBar style="auto" />
            <Text style={styles.principalTitle}>Screen to create a new Theme!</Text>

            {/*Form to create a new theme*/}
=======
            <Text style={styles.principalTitle}>
                {isEditing ? 'Editar Tema' : 'Criar Novo Tema'}
            </Text>
>>>>>>> de93ae30fdf5cdcc4128e2cf3d74fe726e4c936b

            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Nome do tema"
            />

<<<<<<< HEAD
            {/*When clicking the button, save to SQLite*/}
            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>

            {/*Back*/}

            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Back</Text>
=======
            <TouchableOpacity style={styles.button} onPress={saveTheme}>
                <Text style={styles.buttonText}>
                    {isEditing ? 'Salvar Alterações' : 'Criar Tema'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Cancelar</Text>
>>>>>>> de93ae30fdf5cdcc4128e2cf3d74fe726e4c936b
            </TouchableOpacity>
        </View>
    );
}