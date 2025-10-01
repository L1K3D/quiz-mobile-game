import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0f14",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  principalTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#9be7c4",
    marginBottom: 40,
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#0f1620',
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2dce89',
    shadowColor: '#2dce89',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
  },
  input: {
    fontSize: 16,
    width: '100%',
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#5e60ce",
    backgroundColor: '#0b0f14',
    marginBottom: 20,
    paddingHorizontal: 16,
    color: "#b5c0d0",
  },
  button: {
    width: "100%",
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
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
});

export default styles;