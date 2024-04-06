import { collection, doc, getDoc } from "firebase/firestore"
import { auth, db } from "./firebase"

export const getExistingUser = async () => {
    const usersDatas: any = await getDoc(doc(db, 'users'));
    let existDodId: any = "";
    usersDatas.forEach((doc: { id: any; }) => {
      if(doc.id === auth.currentUser?.uid) {
        return existDodId = doc.id;
      }
      return doc;
    });
    if(existDodId !== undefined) {
      auth.signOut();
    }
}