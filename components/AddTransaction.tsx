import * as React from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Card from "./ui/Card";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { Transaction } from "../types";

export default function AddTransaction({
  insertTransaction,
}: {
  insertTransaction(transaction: Transaction): Promise<void>;
}) {
  const [isAddingTransaction, setIsAddingTransaction] =
    React.useState<boolean>(false);

  const [currentTab, setCurrentTab] = React.useState<number>(0);
  const [amount, setAmount] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");

  const type = currentTab === 0 ? "Expense" : "Income";

  async function handleSave() {
    await insertTransaction({
      amount: Number(amount),
      description,
      date: new Date().getTime() / 1000,
      type: type as "Expense" | "Income",
      id: 0,
      category_id: 0,
    });

    // reset
    setAmount("");
    setDescription("");
    setCurrentTab(0);
    setIsAddingTransaction(false);
  }

  return (
    <View style={{ marginBottom: 15 }}>
      {isAddingTransaction ? (
        <View>
          <Card>
            <TextInput
              placeholder="$Amount"
              style={{ fontSize: 32, marginBottom: 15, fontWeight: "bold" }}
              keyboardType="numeric"
              value={amount}
              onChangeText={(text) => {
                const numericValue = text.replace(/[^0-9.]/g, "");
                setAmount(numericValue);
              }}
            />

            <TextInput
              placeholder="Description"
              style={{ marginBottom: 15 }}
              value={description}
              onChangeText={setDescription}
            />

            <Text style={{ marginBottom: 6 }}>Select type</Text>

            <SegmentedControl
              values={["Expense", "Income"]}
              selectedIndex={currentTab}
              onChange={(event) => {
                setCurrentTab(event.nativeEvent.selectedSegmentIndex);
              }}
            />
          </Card>

          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Button
              title="Cancel"
              color="red"
              onPress={() => setIsAddingTransaction(false)}
            />
            <Button title="Save" onPress={handleSave} />
          </View>
        </View>
      ) : (
        <AddButton setIsAddingTransaction={setIsAddingTransaction} />
      )}
    </View>
  );
}

function AddButton({
  setIsAddingTransaction,
}: {
  setIsAddingTransaction: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <TouchableOpacity
      onPress={() => setIsAddingTransaction(true)}
      activeOpacity={0.6}
      style={{
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#007BFF20",
        borderRadius: 15,
      }}
    >
      <MaterialIcons name="add-circle-outline" size={24} color="#007BFF" />
      <Text style={{ fontWeight: "700", color: "#007BFF", marginLeft: 5 }}>
        New Entry
      </Text>
    </TouchableOpacity>
  );
}
