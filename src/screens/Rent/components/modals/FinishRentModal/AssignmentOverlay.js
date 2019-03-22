import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Button, Text, Overlay, CheckBox,
} from 'react-native-elements';

const CloseButton = ({ onPress }) => (
  <View style={styles.closeButton}>
    <Button title="Close " onPress={onPress} buttonStyle={styles.closeStyle} />
  </View>
);

const RoommateList = ({ roommates, uids, onCheckPress }) => (
  <>
    {roommates.map((item, i) => (
      <View key={i} style={styles.mateItem}>
        <CheckBox
          title={item.first}
          textStyle={{ fontSize: 16 }}
          onPress={() => onCheckPress(item)}
          checked={uids !== undefined ? item.first in uids : null}
        />
      </View>
    ))}
  </>
);

const AssignmentOverlay = ({
  isVisible, toggleOverlay, roommates, onCheckPress, dataItem,
}) => (
  <Overlay borderRadius={5} overlayStyle={styles.container} isVisible={isVisible} height="auto">
    <>
      <Text style={styles.title}>Assign to Roommates</Text>
      <Text style={styles.subtitle}>Select the roommates you want to divide this item by</Text>
      <RoommateList roommates={roommates} uids={dataItem.uids} onCheckPress={onCheckPress} />
      <CloseButton onPress={() => toggleOverlay(false)} />
    </>
  </Overlay>
);

const styles = StyleSheet.create({
  container: { padding: 15 },
  title: { fontSize: 24, marginBottom: 5 },
  subtitle: { fontSize: 16, color: 'gray', marginBottom: 10 },
  mateItem: { flexDirection: 'row', alignItems: 'center' },
  mateName: { fontSize: 20 },
  closeButton: { flex: 0, flexDirection: 'row', justifyContent: 'flex-end' },
  closeStyle: {
    backgroundColor: 'rgba(92, 99,216, 1)',
  },
});

export default AssignmentOverlay;
