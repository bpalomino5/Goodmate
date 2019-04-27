import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Overlay, Text, Button, Input, Icon } from "react-native-elements";
import { Dropdown } from "react-native-material-dropdown";

const groups = [{ value: "main" }, { value: "utilities" }];

const AddOverlay = ({
  isEditing,
  isVisible,
  onRemove,
  onAdd,
  onClose,
  dataItem,
  onChangeText,
  group
}) => (
  <Overlay
    overlayStyle={{
      padding: 15,
      paddingTop: Platform.OS === "ios" ? 40 : 30,
      paddingBottom: 30
    }}
    isVisible={isVisible}
    fullScreen
  >
    <>
      <View>
        <Text style={styles.title}>
          {isEditing ? "Edit Bill Item" : "Add Bill Item"}
        </Text>
        <Text style={styles.subtitle}>
          Either main or utility bills, also create a section to specify group
          items for payment splitting.
        </Text>
        <Input
          label="Section"
          placeholder="Section"
          returnKeyType="next"
          containerStyle={styles.inputContainer}
          value={dataItem.section}
          onChangeText={text => onChangeText(text, "section")}
          onSubmitEditing={() => this.nameInput.focus()}
        />
        <Input
          label="Bill Name"
          placeholder="Name"
          returnKeyType="next"
          containerStyle={styles.inputContainer}
          value={dataItem.type}
          onChangeText={text => onChangeText(text, "type")}
          onSubmitEditing={() => this.valueInput.focus()}
          ref={input => {
            this.nameInput = input;
          }}
        />
        <Input
          label="Bill Value"
          placeholder="value"
          leftIcon={<Icon name="dollar" type="font-awesome" size={18} />}
          leftIconContainerStyle={{ marginLeft: 0, marginRight: 2 }}
          returnKeyType="next"
          keyboardType="numeric"
          containerStyle={styles.inputContainer}
          value={dataItem.value}
          onChangeText={text => onChangeText(text, "value")}
          ref={input => {
            this.valueInput = input;
          }}
        />
      </View>
      <Dropdown
        containerStyle={styles.dropdownStyle}
        label="Group"
        data={groups}
        value={group}
        animationDuration={150}
        onChangeText={text => onChangeText(text, "group")}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.buttonBar}>
          <Button
            title={isEditing ? "Remove" : "Add"}
            buttonStyle={{ backgroundColor: "red" }}
            onPress={isEditing ? onRemove : onAdd}
          />
          <Button
            title={isEditing ? "Done" : "Close"}
            onPress={onClose}
            // buttonStyle={{ paddingLeft: 20, paddingRight: 20 }}
            containerStyle={{
              marginLeft: 10
            }}
          />
        </View>
      </View>
    </>
  </Overlay>
);

const styles = StyleSheet.create({
  dropdownStyle: {
    width: 85,
    marginLeft: 10
  },
  title: { fontSize: 24, marginBottom: 5 },
  subtitle: { fontSize: 16, color: "gray", marginBottom: 10 },
  inputContainer: { marginBottom: 10, marginTop: 15 },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  buttonBar: { flex: 0, flexDirection: "row", justifyContent: "flex-end" }
});

export default AddOverlay;
