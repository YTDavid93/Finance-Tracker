import { ExpenseIncome } from './../components/IncomeExpenseList/IncomeExpenseList';
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "./Firebase";

const FINANCE_COLLECTION = "finance";

export const addFinance = async (
  uid: string | undefined,
  name: string,
  amount: number,
  date: string,
  tag: string,
  type: string
) => {
  try {
    await addDoc(collection(db, FINANCE_COLLECTION), {
      uid,
      name,
      amount,
      date,
      tag,
      type,
    });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export const getFinance= async (uid: string | undefined) => {
  try {
    const q = query(
      collection(db, FINANCE_COLLECTION),
      where("uid", "==", uid)
    );
    const querySnapshot = await getDocs(q);

    const allReceipts = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as ExpenseIncome[];

    return allReceipts;
  } catch (error) {
    console.error("Error getting documents: ", error);
    return [];
  }
};
