import Image from "next/image";
import styles from "./page.module.css";
import { getDay01Part1, getDay01Part2 } from "@/lib/day-01";

export default function Home() {
  //const solution = getDay01Part1();
  const solutionPart2 = getDay01Part2();
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        {/* <p>Day 1 Part 1 solution: {solution}</p> */}
        <p>Day 1 Part 2 solution: {solutionPart2}</p>
      </div>
    </main>
  );
}
