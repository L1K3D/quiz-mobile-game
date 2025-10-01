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
    marginBottom: 20,
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
    borderWidth: 1,
    borderColor: '#2dce89',
    shadowColor: '#2dce89',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0b0f14',
  },
  themeName: {
    color: '#b5c0d0',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    height: 36,
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#5e60ce',
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
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  deleteButton: {
    backgroundColor: '#f5365c',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#b5c0d0',
    fontSize: 16,
  },
});

export default styles;