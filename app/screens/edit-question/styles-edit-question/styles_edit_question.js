import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#707070ff",
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  principalTitle: {
    fontSize: 20,
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
    padding: 24,
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
  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
    color: "#b5c0d0",
    textAlign: 'left',
    width: '100%',
  },
  input: {
    fontSize: 16,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#23263a",
    backgroundColor: '#f7f7d9',
    marginBottom: 14,
    paddingHorizontal: 16,
    color: "#23263a",
    width: '100%',
  },
  button: {
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2dce89",
    marginBottom: 10,
    width: '100%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2dce89',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    backgroundColor: '#2dce89',
  },
  themeItem: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#f7f7d9',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#23263a',
  },
  themeSelected: {
    backgroundColor: '#2dce89',
    borderColor: '#fff',
  },
  themeText: {
    color: '#23263a',
    fontWeight: '600',
  },
  themeTextSelected: {
    color: '#fff',
  },
});

export default styles;