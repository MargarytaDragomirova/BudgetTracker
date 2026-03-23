import { Text, TouchableOpacity, View } from "react-native";
import { Transaction } from "../types";
import TransactionListItem from "./TransactionListItem";

export default function TransactionsList({
  transactions,
  deleteTransaction,
}: {
  transactions: Transaction[];
  deleteTransaction: (id: number) => Promise<void>;
}) {
  if (transactions.length === 0) {
    return (
      <View style={{ padding: 20, alignItems: "center" }}>
        <Text style={{ color: "gray" }}>No transactions yet</Text>
      </View>
    );
  }

  return (
    <View style={{ gap: 15 }}>
      {transactions.map((transaction) => (
        <TouchableOpacity
          key={transaction.id}
          activeOpacity={0.7}
          onLongPress={() => deleteTransaction(transaction.id)}
        >
          <TransactionListItem transaction={transaction} />
        </TouchableOpacity>
      ))}
    </View>
  );
}
