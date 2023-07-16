import Icon from "react-native-vector-icons/Ionicons";
import PropTypes from "prop-types";
import {
  Pressable,
  Modal,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from "react-native";

export const BottomModal = ({ onClose, select, deletePost }) => {
  return (
    <>
      <StatusBar />
      <Modal animationType="fade" transparent={true} visible={select}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[
                styles.button,
                { borderBottomColor: "#e0e0e0", borderBottomWidth: 1 },
              ]}
              onPress={deletePost}
            >
              <Text style={styles.text}>Remove</Text>
              <Icon name="trash" color="#182e44" size={25} />
            </Pressable>
            <Pressable style={styles.button} onPress={onClose}>
              <Text style={styles.text}>Cancel</Text>
              <Icon name="close-circle-outline" color="#182e44" size={25} />
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#000000AA",
  },
  modalView: {
    marginTop: "auto",
    width: "100%",
    padding: 15,
    backgroundColor: "white",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  line: {
    height: 3,
    borderRadius: 3,
    width: 30,
    backgroundColor: "#666",
    alignSelf: "center",
    marginBottom: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: 500,
    color: "#182E44",
    margin: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

BottomModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  select: PropTypes.bool.isRequired,
  deletePost: PropTypes.func.isRequired,
};
