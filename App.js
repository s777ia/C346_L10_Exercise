import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, StatusBar, Text, TextInput, View } from 'react-native';

let originalData = [];

const App = () => {
  const [mydata, setMydata] = useState([]);

  // Add useEffect - Exercise 1B
  // So that it only runs once on first render.
  useEffect(() => {
    // Add fetch() - Exercise 1A
    fetch("https://mysafeinfo.com/api/data?list=alcoholicbeverages&format=json&case=default")
      // Here, the response is received and the JSON is extracted
      .then((response) => {
        return response.json();
      })
      // Then, the value of myData is set as the value of the received JSON
      .then((myJson) => {
        // setMydata(myJson);
        if (originalData.length < 1) {
          setMydata(myJson);
          originalData = myJson;
        }
      })
  }, []);

  const FilterData = (text) => {
    // If the typed in text is not an empty string
    if (text != '') {
      // Filter each list item based on the typed in text,
      // Then set the value of this filtered list to the temporary variable.
      let myFilteredData = originalData.filter((item) =>
        item.BeverageName.toLowerCase().includes(text));
      setMydata(myFilteredData);
    } else {
      setMydata(originalData);
    }
  }


  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.beverageList}>
        <Text style={styles.idText}>{item.ID}</Text>
        <View>
          <Text style={styles.nameText}>{item.BeverageName}</Text>
          <Text style={styles.categoryText}>{item.Category}</Text>
          <Text style={styles.ingredientText}>
            {item.IngredientsAddnInfo
              ? `Ingredients/Add On: ${item.IngredientsAddnInfo}`
              : "No additional ingredients provided"}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <StatusBar />
        <Text style={styles.titleText}>Alcoholic Beverages</Text>
        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => { FilterData(text) }}
          placeholder='Search...'
          placeholderTextColor="#EDEDED"
        />
        <FlatList
          data={mydata} renderItem={renderItem} showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContainer} />
      </View>
    </View>
  );
}
export default App;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#1A1A1D", 
  },
  container: {
    margin: 20,
    gap: 20,
    backgroundColor: "#282C34",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 10,
  },
  titleText: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    color: "#F4A261", 
    marginBottom: 15,
  },
  beverageList: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#3B3F45", 
    borderRadius: 8,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#F4A261",
  },
  idText: {
    color: "#FFB37E",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#EDEDED",
    marginBottom: 4,
  },
  categoryText: {
    color: "#F7D488",
    fontSize: 15,
    marginBottom: 2,
    fontStyle: "italic",
  },
  ingredientText: {
    color: "#B0B3B8",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
  inputBox: {
    borderWidth: 1.5,
    borderRadius: 8,
    borderColor: "#3B3F45",
    backgroundColor: "#3B3F45",
    paddingHorizontal: 20,
    height: 40,
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 15,
  },
  listContainer: {
    paddingBottom: 200
  }
});


