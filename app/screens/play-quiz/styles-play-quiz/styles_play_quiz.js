import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0f14",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingBottom: 30,
  },
  principalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#9be7c4",
    marginBottom: 18,
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  card: {
    width: Math.min(width * 0.92, 760),
    backgroundColor: '#0f1620',
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2dce89',
    shadowColor: '#2dce89',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 10,
  },
  selectedCard: {
    backgroundColor: '#2dce89',
    borderColor: '#9be7c4',
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
    color: "#b5c0d0",
    textAlign: 'center',
  },
  button: {
    width: "92%",
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2dce89",
    marginTop: 10,
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#5e60ce',
  },
  input: {
    fontSize: 16,
    width: "92%",
    height: 50,
    borderRadius: 12,
    backgroundColor: '#0f1620',
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#5e60ce",
    color: "#b5c0d0",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  rodape: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 10,
  },

  // Quiz Question Screen Styles
  quizContainer: {
    flex: 1,
    backgroundColor: "#0b0f14",
    justifyContent: 'space-between',
    padding: 20,
  },
  quizHeader: {
    alignItems: 'center',
  },
  progressText: {
    color: '#b5c0d0',
    fontSize: 16,
    marginBottom: 10,
  },
  progressBarContainer: {
    width: '100%',
    height: 12,
    backgroundColor: '#0f1620',
    borderRadius: 6,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#5e60ce',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2dce89',
    borderRadius: 6,
  },
  questionText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  answersContainer: {
    width: '100%',
    gap: 15,
  },
  answerButton: {
    backgroundColor: '#0f1620',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#5e60ce',
    alignItems: 'center',
  },
  quizFooter: {
    alignItems: 'center',
  },
  quitButton: {
    backgroundColor: '#f5365c', // Red color for quit
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
});

export default styles;