import { Session } from "inspector";
import styles from "./page.module.css";
import { getSession } from "./utils/getSession";
import { redirect } from "next/navigation";

export default function Home() {

  const session: Promise<Session | null> = getSession()
  if (!session) {
    redirect('/')
  }

  return (
    <main className={styles.main}>
      <div>
        <pre>
          {JSON.stringify(session)}
        </pre>
     </div>
    </main>
  );
}
