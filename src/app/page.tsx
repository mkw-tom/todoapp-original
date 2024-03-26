import AddForm from "./components/AddForm";
import Todolist from "./components/Todolist";

export default function Home() {
  return (
    <>
      <h1 className="text-3xl text-center my-8 font-bold tracking-wide">TodoApp with Next.js/firebase</h1>
      <main className="h-auto w-2/5 min-w-96 mt-5 mx-auto bg-gray-300 px-4 py-3 rounded-md text-center shadow-2xl">
        <div className="flex-col w-11/12 h-auto mx-auto">
          <AddForm />
          <Todolist />
        </div>
      </main>
    </>
  )
}