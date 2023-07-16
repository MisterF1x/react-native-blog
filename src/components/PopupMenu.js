import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import PropTypes from "prop-types";

export const PopupMenu = ({ pos, visible, onClose, removeComment }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <Pressable style={{ flex: 1 }} onPress={onClose}>
        <View style={[styles.modalView, { top: pos.y, right: pos.x }]}>
          <Pressable
            style={[
              styles.button,
              { borderBottomColor: "#606060", borderBottomWidth: 1 },
            ]}
            onPress={removeComment}
          >
            <Text style={styles.text}>Remove</Text>
            <Icon name="trash" color="#F8F6F4" size={20} />
          </Pressable>
          <Pressable style={styles.button} onPress={onClose}>
            <Text style={styles.text}>Cancel</Text>
            <Icon name="close-circle-outline" color="#F8F6F4" size={20} />
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    width: 150,
    padding: 10,
    backgroundColor: "#282A3A",
    borderRadius: 10,
    position: "absolute",
  },
  text: {
    fontSize: 16,
    fontWeight: 500,
    color: "#F8F6F4",
    margin: 5,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

PopupMenu.propTypes = {
  pos: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  removeComment: PropTypes.func.isRequired,
};
