// import { getDocs, collection } from "firebase/firestore";
// import { auth, db } from "./firebase";
// import { GetServerSideProps } from "next";

// export const getServerSideProps: GetServerSideProps = async() => {
//   const datas = await getDocs(
//     collection(db, `users`, `${auth.current?.uid}`, "todos")
//   );

//   return {
//     props: {datas}
//   }
// }
