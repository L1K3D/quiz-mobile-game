import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import styles from './styles-create-quiz/styles_play_quiz';

export default function PlayQuiz({ navigation, route }) {

    return (

        <View style={styles.container}>
            <Text style={styles.principalTitle}>Screen to play a quiz Works!</Text>
            <Text></Text><Text></Text>

            <StatusBar style="auto" />
        </View>
    );
}