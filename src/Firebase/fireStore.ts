import { addDoc, collection } from "firebase/firestore";
import { db } from "./Firebase";

const FINANCE_COLLECTION = "finance";

export const addFinance = (uid: string | undefined, name: string, amount: number, date: string, tag: string) => {
  addDoc(collection(db, FINANCE_COLLECTION), {
    uid,
    name,
    amount,
    date,
    tag,
  });
};
