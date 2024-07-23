import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { TableWrapper } from "react-native-table-component";

const CustomTableComponent = () => {
  const [tableData, setTableData] = useState([["", "", "", ""]]);
  const [tableHead, setTableHead] = useState([
    "Head1",
    "Head2",
    "Head3",
    "Head4",
  ]);

  const handleInputChange = (value: any, rowIndex: any, colIndex: any) => {
    const updatedData = tableData.map((row, rIndex) =>
      row.map((col, cIndex) =>
        rIndex === rowIndex && cIndex === colIndex ? value : col
      )
    );
    setTableData(updatedData);
  };

  const handleHeaderChange = (value: any, colIndex: any) => {
    const updatedHead = tableHead.map((col, cIndex) =>
      cIndex === colIndex ? value : col
    );
    setTableHead(updatedHead);
  };

  const addRow = () => {
    setTableData([...tableData, new Array(tableHead.length).fill("")]);
  };

  const deleteRow = () => {
    if (tableData.length > 1) {
      setTableData(tableData.slice(0, -1));
    }
  };

  const addColumn = () => {
    setTableHead([...tableHead, `Head${tableHead.length + 1}`]);
    setTableData(tableData.map((row) => [...row, ""]));
  };

  const deleteColumn = () => {
    if (tableHead.length > 1) {
      setTableHead(tableHead.slice(0, -1));
      setTableData(tableData.map((row) => row.slice(0, -1)));
    }
  };

  const CustomButton = ({ title, onPress }: any) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} nestedScrollEnabled={true}>
      <ScrollView
        contentContainerStyle={styles.buttonContainer}
        nestedScrollEnabled={true}
        horizontal={true}
      >
        <CustomButton title="Add Row" onPress={addRow} />
        <CustomButton title="Delete Row" onPress={deleteRow} />
        <CustomButton title="Add Column" onPress={addColumn} />
        <CustomButton title="Delete Column" onPress={deleteColumn} />
      </ScrollView>
      <ScrollView horizontal={true} nestedScrollEnabled={true}>
        <View>
          <View style={styles.head}>
            {tableHead.map((header, colIndex) => (
              <TextInput
                key={colIndex}
                style={[styles.cell, styles.headCell]}
                onChangeText={(value) => handleHeaderChange(value, colIndex)}
                value={header}
              />
            ))}
          </View>
          <ScrollView nestedScrollEnabled={true}>
            {tableData.map((rowData, rowIndex) => (
              <TableWrapper key={rowIndex} style={styles.row}>
                {rowData.map((cellData, colIndex) => (
                  <TextInput
                    key={colIndex}
                    style={styles.cell}
                    onChangeText={(value) =>
                      handleInputChange(value, rowIndex, colIndex)
                    }
                    value={cellData}
                  />
                ))}
              </TableWrapper>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#000" },
  buttonContainer: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#ffd700",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
  head: { flexDirection: "row", backgroundColor: "#ffd700", height: 40 },
  row: { flexDirection: "row", backgroundColor: "#FFF1C1" },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#C1C0B9",
    textAlign: "center",
    color: "#fff",
    padding: 10,
  },
  headCell: { backgroundColor: "#ffd700", fontWeight: "bold" },
  text: { margin: 6, color: "#fff", textAlign: "center" },
});

export default CustomTableComponent;
