import Image from "next/image";
import styles from "./page.module.css";
import { getDay01Part1, getDay01Part2 } from "@/lib/day-01";
import { getDay02Part1, getDay02Part2 } from "@/lib/day-02";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        {/* <p>Day 1 Part 1 solution: {getDay01Part1()}</p> */}
        {/* <p>Day 1 Part 2 solution: {getDay01Part2()}</p> */}
        {/* <p>Day 2 Part 1 solution: {getDay02Part1()}</p> */}
        <p>Day 2 Part 2 solution: {getDay02Part2()}</p>
      </div>
    </main>
  );
}
