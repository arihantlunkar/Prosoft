import React, { Component } from "react";
import { Text, StyleSheet, StatusBar, ImageBackground, View, ActivityIndicator, FlatList } from "react-native";
import { useTheme } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import { TextInput, Button, Card, Snackbar } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const PROSOFT_DATA_URL = "https://www.chemtronicsindia.in/MobileApp/data.json";
const HOME_SCREEN_BKG_URL = "https://www.chemtronicsindia.in/assets/img/welcomeMsgBg.jpg";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSolution: false,
      solutions: [],
      selectedSolution: null,
      openType: false,
      types: [],
      selectedType: null,
      openPurpose: false,
      purposes: [],
      selectedPurpose: null,
      openEsp: false,
      esp: null,
      selectedESP: null,
      minCFMValue: null,
      maxCFMValue: null,
      cfm: null,
      isCFMValid: false,
      invalidMsg: "CFM cannot be empty.",
      isSearchButtonClicked: false,
      prosoftData: null,
      isProsoftDataAvailable: false,
      requiredResultData: null,
      unit: "cfm",
    };
    this.getDataJSON();
  }
  getDataJSON() {
    fetch(PROSOFT_DATA_URL, {}).then((response) => {
      return response.json().then((data) => {
        this.setState({ prosoftData: data });
        this.getSolutions();
        this.getTypes();
        this.getPurposes();
        this.getCFMRange();
        this.setState({ isProsoftDataAvailable: true });
      });
    });
  }
  getSolutions() {
    let solutions = [];
    this.state.prosoftData.solutions.map((element) => {
      solutions.push({
        label: element.name,
        value: element.name,
        disabled: element.disabled,
      });
    });
    this.setState({
      solutions: solutions,
      selectedSolution: solutions[0]["value"],
    });
  }
  getTypes() {
    let types = [];
    const selectedSolution = this.state.prosoftData.solutions.filter((element) => element.name === this.state.selectedSolution);
    selectedSolution[0].types.map((element) => {
      types.push({
        label: element.name,
        value: element.name,
        disabled: element.disabled,
      });
    });
    this.setState({ types: types, selectedType: types[0]["value"] });
  }
  getPurposes() {
    let purposes = [];
    const selectedSolution = this.state.prosoftData.solutions.filter((element) => element.name === this.state.selectedSolution);
    const selectedType = selectedSolution[0].types.filter((element) => element.name === this.state.selectedType);
    selectedType[0].purposes.map((element) => {
      purposes.push({
        label: element.name,
        value: element.name,
        disabled: element.disabled,
      });
    });
    this.setState({
      purposes: purposes,
      selectedPurpose: purposes[0]["value"],
    });
    this.state.selectedPurpose = purposes[0]["value"];
  }
  getCFMRange() {
    const selectedSolution = this.state.prosoftData.solutions.filter((element) => element.name === this.state.selectedSolution);
    const selectedType = selectedSolution[0].types.filter((element) => element.name === this.state.selectedType);
    const selectedPurpose = selectedType[0].purposes.filter((element) => element.name === this.state.selectedPurpose);
    this.setState({
      minCFMValue: selectedPurpose[0].min,
      maxCFMValue: selectedPurpose[0].max,
      requiredResultData: selectedPurpose,
    });
    this.setState({ unit: selectedPurpose[0].unit });
  }
  isCFMWithinLimit() {
    return this.state.cfm >= this.state.minCFMValue && this.state.cfm <= this.state.maxCFMValue;
  }
  getESP() {
    let esp = [];
    const selectedSolution = this.state.prosoftData.solutions.filter((element) => element.name === this.state.selectedSolution);
    const selectedType = selectedSolution[0].types.filter((element) => element.name === this.state.selectedType);
    const selectedPurpose = selectedType[0].purposes.filter((element) => element.name === this.state.selectedPurpose);
    if (selectedPurpose[0].hasOwnProperty("esp")) {
      selectedPurpose[0].esp.map((element) => {
        esp.push({
          label: element,
          value: element,
          disabled: element.length == 0,
        });
      });
      this.setState({ esp: esp, selectedESP: esp[0]["value"] });
    } else {
      this.setState({ esp: null, selectedESP: null });
    }
  }

  setSolutionOpen = (openSolution) => this.setState({ openSolution });
  setSelectedSolution = (callback) => this.setState({ selectedSolution: callback() });
  setSolutions = (solutions) => this.setState({ solutions });

  setTypeOpen = (openType) => this.setState({ openType });
  setSelectedType = (callback) => this.setState({ selectedType: callback() });
  setTypes = (types) => this.setState({ types });

  setPurposeOpen = (openPurpose) => this.setState({ openPurpose });
  setSelectedPurpose = (callback) => this.setState({ selectedPurpose: callback() });
  setPurposes = (purposes) => this.setState({ purposes });

  setEspOpen = (openEsp) => this.setState({ openEsp });
  setSelectedEsp = (callback) => this.setState({ selectedESP: callback() });
  setEsp = (esp) => this.setState({ esp });

  render() {
    const { theme } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#02b389" barStyle={"light-content"} />
        {!this.state.isProsoftDataAvailable ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <ActivityIndicator size="large" color="#02b389" />
          </View>
        ) : (
          <FlatList
            ListHeaderComponent={
              <ImageBackground source={{ uri: HOME_SCREEN_BKG_URL }} style={styles.bgImg}>
                <View style={styles.overlay}>
                  <Text style={styles.imgHeader}>Model Selection Guide</Text>
                  <Text style={styles.textStyle}> The PROSOFT App will give you most appropriates model on the bases of your submitted data.</Text>
                </View>
              </ImageBackground>
            }
            ListFooterComponent={
              <View style={[{ backgroundColor: theme.colors.background }, styles.cardParent]}>
                <Card style={styles.card}>
                  <Card.Content>
                    <Text
                      style={[
                        styles.textStyle,
                        {
                          color: this.props.theme.colors.text,
                          marginBottom: hp("2%"),
                        },
                      ]}
                    >
                      Let's start with the basic details.
                    </Text>
                    <View>
                      <Text style={[styles.labelStyle, { color: this.props.theme.colors.text }]}>Solution</Text>
                      <DropDownPicker
                        listMode="MODAL"
                        modalTitle="Select a Solution"
                        modalAnimationType="slide"
                        modalTitleStyle={{
                          fontWeight: "bold",
                        }}
                        open={this.state.openSolution}
                        value={this.state.selectedSolution}
                        items={this.state.solutions}
                        setOpen={this.setSolutionOpen}
                        setValue={this.setSelectedSolution}
                        setItems={this.setSolutions}
                        containerStyle={{
                          marginBottom: hp("1%"),
                        }}
                        disabledItemLabelStyle={{
                          opacity: 0.5,
                        }}
                        selectedItemLabelStyle={{
                          fontWeight: "bold",
                        }}
                        onChangeValue={(item) => {
                          this.state.selectedSolution = item;
                          this.getTypes();
                        }}
                      />
                    </View>
                    <View>
                      <Text style={[styles.labelStyle, { color: this.props.theme.colors.text }]}>Type</Text>
                      <DropDownPicker
                        listMode="MODAL"
                        modalTitle="Select a Type"
                        modalAnimationType="slide"
                        modalTitleStyle={{
                          fontWeight: "bold",
                        }}
                        open={this.state.openType}
                        value={this.state.selectedType}
                        items={this.state.types}
                        setOpen={this.setTypeOpen}
                        setValue={this.setSelectedType}
                        setItems={this.setTypes}
                        containerStyle={{
                          marginBottom: hp("1%"),
                        }}
                        selectedItemLabelStyle={{
                          fontWeight: "bold",
                        }}
                        onChangeValue={(item) => {
                          this.state.selectedType = item;
                          this.getPurposes();
                          this.getESP();
                          this.getCFMRange();
                        }}
                      />
                    </View>
                    <View>
                      <Text style={[styles.labelStyle, { color: this.props.theme.colors.text }]}>Purpose</Text>
                      <DropDownPicker
                        listMode="MODAL"
                        modalTitle="Select a Purpose"
                        modalAnimationType="slide"
                        modalTitleStyle={{
                          fontWeight: "bold",
                        }}
                        open={this.state.openPurpose}
                        value={this.state.selectedPurpose}
                        items={this.state.purposes}
                        setOpen={this.setPurposeOpen}
                        setValue={this.setSelectedPurpose}
                        setItems={this.setPurposes}
                        containerStyle={{
                          marginBottom: hp("1.5%"),
                        }}
                        selectedItemLabelStyle={{
                          fontWeight: "bold",
                        }}
                        onChangeValue={(item) => {
                          this.state.selectedPurpose = item;
                          this.getESP();
                          this.getCFMRange();
                        }}
                      />
                    </View>
                    {this.state.esp !== null ? (
                      <View>
                        <Text style={[styles.labelStyle, { color: this.props.theme.colors.text }]}>ESP</Text>
                        <DropDownPicker
                          listMode="MODAL"
                          modalTitle="Select a ESP"
                          modalAnimationType="slide"
                          modalTitleStyle={{
                            fontWeight: "bold",
                          }}
                          open={this.state.openEsp}
                          value={this.state.selectedESP}
                          items={this.state.esp}
                          setOpen={this.setEspOpen}
                          setValue={this.setSelectedEsp}
                          setItems={this.setEsp}
                          containerStyle={{
                            marginBottom: hp("1.5%"),
                          }}
                          disabledItemLabelStyle={{
                            opacity: 0.5,
                          }}
                          selectedItemLabelStyle={{
                            fontWeight: "bold",
                          }}
                          onChangeValue={(item) => {
                            this.state.selectedESP = item;
                          }}
                        />
                      </View>
                    ) : null}
                    <View>
                      <TextInput
                        mode="outlined"
                        label={"Enter Value (in " + this.state.unit + ")"}
                        keyboardType="numeric"
                        style={styles.textInput}
                        onChangeText={(text) => {
                          let numreg = /^[0-9]+$/;
                          if (numreg.test(text)) {
                            this.setState({ cfm: text });
                            this.setState({ isCFMValid: true });
                          } else if (text.trim().length === 0) {
                            this.setState({ invalidMsg: "CFM cannot be empty." });
                            this.setState({ isCFMValid: false });
                          } else {
                            this.setState({
                              invalidMsg: "Only positive integers allowed in cfm.",
                            });
                            this.setState({ isCFMValid: false });
                          }
                        }}
                      />
                    </View>
                  </Card.Content>
                </Card>
              </View>
            }
          />
        )}
        <Button
          icon="database-search"
          mode="contained"
          style={styles.searchBtn}
          disabled={!this.state.isProsoftDataAvailable}
          onPress={() => {
            this.setState({ isSearchButtonClicked: true });
            if (!this.state.isCFMValid) return;
            if (!this.isCFMWithinLimit()) {
              this.setState({
                invalidMsg: "Did not find any product matching your requirement.",
              });
              return;
            }
            this.setState({ isSearchButtonClicked: false });
            this.props.navigation.navigate("Result", {
              solution: this.state.selectedSolution,
              type: this.state.selectedType,
              purpose: this.state.selectedPurpose,
              cfm: this.state.cfm,
              requiredResultData: this.state.requiredResultData,
              esp: this.state.selectedESP,
              unit: this.state.unit,
            });
          }}
        >
          Search
        </Button>
        <Snackbar
          visible={this.state.isSearchButtonClicked && (!this.state.isCFMValid || !this.isCFMWithinLimit())}
          onDismiss={() => {
            this.setState({ isSearchButtonClicked: false });
          }}
          action={{
            label: "Ok",
            onPress: () => {
              this.setState({ isSearchButtonClicked: false });
            },
          }}
        >
          {this.state.invalidMsg}
        </Snackbar>
      </View>
    );
  }
}

export default function (props) {
  const theme = useTheme();
  return <HomeScreen {...props} theme={theme} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  cardParent: {
    marginRight: hp("2%"),
    marginLeft: hp("2%"),
    position: "relative",
    top: hp("-3%"),
    height: "100%",
    borderRadius: 0,
    paddingBottom: hp("3%"),
    backgroundColor: "transparent",
  },
  card: {
    elevation: 1,
    borderRadius: 10,
  },
  bgImg: {
    width: wp("100%"),
    height: hp("20%"),
  },
  overlay: {
    backgroundColor: "rgba(2,177,136,.6)",
    height: hp("20%"),
    justifyContent: "center",
    alignItems: "center",
  },
  imgHeader: {
    fontSize: wp("5%"),
    color: "#FFFFFF",
    alignSelf: "center",
    textAlign: "center",
  },
  textStyle: {
    marginTop: hp("0.75%"),
    fontSize: wp("3.5%"),
    color: "#FFFFFF",
    fontWeight: "700",
    alignSelf: "center",
    textAlign: "center",
    marginRight: hp("2%"),
    marginLeft: hp("2%"),
  },
  labelStyle: {
    fontSize: wp("3.5%"),
    fontWeight: "700",
    marginBottom: hp("0.5%"),
  },
  textInput: {
    height: hp("6%"),
    borderColor: "green",
    elevation: 0,
  },
  searchBtn: {
    height: hp("7%"),
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderRadius: 0,
    fontSize: wp("5%"),
  },
});
