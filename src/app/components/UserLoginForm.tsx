import Login from "./Login";
import { start } from "@/Type";
import { Cancel　} from "@mui/icons-material";

const UserLoginForm = ({ setStart }: start) => {
  return (
    <main className="h-auto w-2/5 min-w-96 mt-16 mx-auto bg-purple-500 px-4 py-3 rounded-md text-center shadow-2xl">
      <button
        className="block ml-auto text-sm text-purple-200 relative top-3 right-3 hover:opacity-70"
        onClick={() => setStart(false)}
      >
        <Cancel></Cancel>
      </button>
      <div className="inline-block text-xl font-bold text-purple-100 mt-10  mb-10 mx-auto cursor-pointer border-b-2">
        LOGIN
      </div>
      <Login />
    </main>
  );
};

export default UserLoginForm;
