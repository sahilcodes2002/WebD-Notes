import { Button } from "@repo/ui/button";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
      <Button appName="web" className={styles.secondary}>hi</Button>
    </div>
  );
}
