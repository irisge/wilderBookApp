import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Wilder, { IWilderProps } from "./components/Wilder";
import AddWilderForm from "./components/AddWilderForm";

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
  const [wilders, setWilders] = useState<IWilderProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const wildersFromApi = await axios.get(
        "http://localhost:5000/api/wilder"
      );
      const formattedWilders = dataManipulation(wildersFromApi.data);
      setWilders(formattedWilders);
    };
    fetchData();
  }, []);
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
          {wilders.map((el, index) => (
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
