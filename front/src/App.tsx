import "./App.css";
import Wilder from "./components/Wilder";
import AddWilderForm from "./components/AddWilderForm";
import { useQuery } from "@apollo/client";
import { GET_ALL_WILDERS_AND_SKILLS } from "./graphQL/queries";

function App() {
  const dataManipulation = (dataFromApi: any) => {
    const newData = dataFromApi.map((wilder: { grades: []; name: string }) => {
      const cleanSkills = wilder.grades.map(
        (grade: { grade: number; skill: { name: string } }) => {
          return { title: grade.skill.name, votes: grade.grade };
        }
      );
      return { name: wilder.name, skills: cleanSkills };
    });
    return newData;
  };

  const { loading, error, data} =useQuery(GET_ALL_WILDERS_AND_SKILLS)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log(data);
  const wilders = dataManipulation(data.getAllWildersAndSkills);
  console.debug(wilders, "wilders");


  return (
    <div>
      <header>
        <div className="container">
          <h1>Wilders Book</h1>
        </div>
      </header>
      <main className="container">
        <AddWilderForm />
        <h2>Wilders</h2>
        <section className="card-row">
          {wilders.map((el:any, index:number) => (
            <Wilder
              key={index}
              name={el.name}
              city={el.city}
              skills={el.skills}
            />
          ))}
        </section>
      </main>
      <footer>
        <div className="container">
          <p>&copy; 2022 Wild Code School</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
