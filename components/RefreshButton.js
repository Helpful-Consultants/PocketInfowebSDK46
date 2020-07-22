<Button
  title=' Refresh list'
  onPress={() => {
    refreshRequestHandler();
  }}
  titleStyle={{ fontSize: 10 }}
  buttonStyle={{
    height: 30,
    marginBottom: 2,
    marginTop: 2,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 20,
    backgroundColor: Colors.vwgDeepBlue,
  }}
  icon={
    <Icon
      name={Platform.OS === 'ios' ? 'ios-refresh' : 'md-refresh'}
      type='ionicon'
      size={15}
      color='white'
    />
  }
/>;
