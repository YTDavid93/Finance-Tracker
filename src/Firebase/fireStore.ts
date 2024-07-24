import { ExpenseIncome } from "./../components/IncomeExpenseList/IncomeExpenseList";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "./Firebase";

const FINANCE_COLLECTIONS = "finance";

export const addFinance = async (
  uid: string | undefined,
  name: string,
  amount: number,
  date: string,
  tag: string,
  type: string
) => {
  try {
    const docRef = await addDoc(collection(db, FINANCE_COLLECTIONS), {
      uid,
      name,
      amount,
      date,
      tag,
      type,
    });
    
    return docRef;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export const getFinance = async (uid: string | undefined) => {
  try {
    const q = query(
      collection(db, FINANCE_COLLECTIONS),
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

export const updateReceipt = (
  uid: string | undefined,
  id: string,
  name: string,
  amount: number,
  date: string,
  tag: string,
  type: string
) => {
  setDoc(doc(db, FINANCE_COLLECTIONS, id), {
    uid,
    name,
    amount,
    date,
    tag,
    type,
  });
};

export const fetchDatForEditId = async (editId: string) => {
  const docRef = doc(db, FINANCE_COLLECTIONS, editId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("No such Document!");
  }
};

export const deleteReceipt = (id: string) => {
  deleteDoc(doc(db, FINANCE_COLLECTIONS, id));
};
