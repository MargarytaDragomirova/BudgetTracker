import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { Transaction } from "../types";
import Card from "./ui/Card";

interface TransactionListItemProps {
  transaction: Transaction;
}

export default function TransactionListItem({
  transaction,
}: TransactionListItemProps) {
  const isExpense = transaction.type === "Expense";

  return (
    <Card>
      <View style={styles.row}>
        <View style={{ width: "40%", gap: 3 }}>
          <Amount
            amount={transaction.amount}
            color={isExpense ? "red" : "green"}
            iconName={isExpense ? "minuscircle" : "pluscircle"}
          />
        </View>

        <TransactionInfo
          date={transaction.date}
          description={transaction.description}
          id={transaction.id ?? 0}
        />
      </View>
    </Card>
  );
}

function TransactionInfo({
  id,
  date,
  description,
}: {
  id: number;
  date: number;
  description: string;
}) {
  return (
    <View style={{ flexGrow: 1, gap: 6 }}>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>
        {description || "No description"}
      </Text>

      <Text>Transaction #{id}</Text>

      <Text style={{ fontSize: 12, color: "gray" }}>
        {new Date(date * 1000).toLocaleString()}
      </Text>
    </View>
  );
}

function Amount({
  iconName,
  color,
  amount,
}: {
  iconName: "minuscircle" | "pluscircle";
  color: string;
  amount: number;
}) {
  return (
    <View style={styles.row}>
      <AntDesign name={iconName} size={18} color={color} />
      <Text style={[styles.amount, { color }]}>${amount.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  amount: {
    fontSize: 24,
    fontWeight: "800",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});
