import { Session } from "inspector";
import styles from "./page.module.css";
import { getSession } from "./utils/getSession";
import { redirect } from "next/navigation";

export default  async function Home():Promise<JSX.Element> {

  const session: Session | null  = await getSession()
  if (!session) {
    redirect('/login')
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
