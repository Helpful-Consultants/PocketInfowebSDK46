<Overlay isVisible={isModalVisible} animationType={'fade'}>
  <View>
    <Text>Book tool XXXXXX to job 9999, job 222, 3333 </Text>
    <Text>{selectedItem}</Text>
    <View style={styles.buttonContainer}>
      <View style={styles.buttonView}>
        <Button
          title=' Confirm'
          onPress={() => {
            setIsModalVisible(false);
          }}
          titleStyle={{ fontSize: 10 }}
          buttonStyle={{
            height: 30,
            marginBottom: 2,
            marginTop: 2,
            marginLeft: 15,
            marginRight: 15,
            borderRadius: 20,
            backgroundColor: Colors.vwgDeepBlue
          }}
          icon={
            <Icon
              name={
                Platform.OS === 'ios'
                  ? 'ios-checkmark-circle-outline'
                  : 'md-checkmark-circle-outline'
              }
              type='ionicon'
              size={15}
              color='white'
            />
          }
        />
      </View>

      <View style={styles.buttonView}>
        <Button
          title=' Create new job'
          onPress={() => {}}
          titleStyle={{ fontSize: 10 }}
          buttonStyle={{
            height: 30,
            marginBottom: 2,
            marginTop: 2,
            marginLeft: 15,
            marginRight: 15,
            borderRadius: 20,
            backgroundColor: Colors.vwgDeepBlue
          }}
          icon={
            <Icon
              name={
                Platform.OS === 'ios'
                  ? 'ios-checkmark-circle-outline'
                  : 'md-checkmark-circle-outline'
              }
              type='ionicon'
              size={15}
              color='white'
            />
          }
        />
      </View>
      <View style={styles.buttonView}>
        <Button
          title=' Close'
          onPress={() => {
            setIsModalVisible(false);
          }}
          titleStyle={{ fontSize: 10 }}
          buttonStyle={{
            height: 30,
            marginBottom: 2,
            marginTop: 2,
            marginLeft: 15,
            marginRight: 15,
            borderRadius: 20,
            backgroundColor: Colors.vwgBlack
          }}
          icon={
            <Icon
              name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'}
              type='ionicon'
              size={15}
              color='white'
            />
          }
        />
      </View>
    </View>
  </View>
</Overlay>;
