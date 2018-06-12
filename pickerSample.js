<View>
<Text>get Changed: {this.state.language}</Text>
<Picker
  selectedValue={this.state.language}
  style={{ position:'absolute',bottom:0,left:0,right:0 }}
  onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
  <Picker.Item label="Java" value="java" />
  <Picker.Item label="JavaScript" value="js" />
</Picker>
</View>
