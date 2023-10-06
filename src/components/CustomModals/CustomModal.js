import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import CustomButton from '../CustomButton/CustomButton';

const CustomModal = ({
  isUpdate,
  visible,
  setVisible,
  animationType,
  childrenView,
  headerText,
  onRequestClose,
  transparent,
  loading,
  onConfirm,
  modalIcon,
}) => {
  return (
    <Modal
      animationType={animationType}
      visible={visible}
      transparent={transparent}
      onRequestClose={onRequestClose}
    >
      <Pressable
        style={styles.container}
        onPress={() => {
          setVisible(false);
        }}
      >
        <Pressable style={[styles.modalView]} onPress={() => {}}>
          {modalIcon && <View style={styles.modalIcon}>{modalIcon}</View>}
          <View style={styles.contentWrapper}>
            {headerText && <Text style={styles.headerText}>{headerText}</Text>}
            <ScrollView contentContainerStyle={styles.modalContent}>
              {childrenView}
              {!loading && (
                <View style={styles.decisionRow}>
                  <CustomButton
                    onPress={onConfirm}
                    style={styles.buyBtnStyle}
                    title={isUpdate ? 'Update' : 'Add'}
                  />
                  <CustomButton
                    onPress={() => {
                      setVisible(false);
                    }}
                    style={styles.buyBtnStyle}
                    title="Cancel"
                  />
                </View>
              )}
            </ScrollView>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalView: {
    backgroundColor: '#ccdff7',
    width: '100%',
    alignItems: 'center',
    borderRadius: 15,
    shadowColor: '#000',
    elevation: 5,
  },
  modalIcon: {
    backgroundColor: '#0A4191',
    height: 100,
    width: 100,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -50,
    shadowColor: '#000',
    elevation: 5,
    zIndex: 1000,
  },
  contentWrapper: {
    width: '100%',
    maxHeight: 700,
  },
  modalContent: {
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  headerText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 28,
    fontFamily: 'Sora',
    fontWeight: '800',
    paddingTop: 45,
  },
  messageText: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  decisionRow: {
    width: '100%',
    justifyContent: 'center',
    gap: 10,
  },
  buyBtnStyle: {},
});

export default CustomModal;
