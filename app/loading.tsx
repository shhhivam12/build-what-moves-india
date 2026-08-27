import styles from "./loading.module.css";

export default function Loading() {
  return <main aria-label="Loading the citizen service" className={styles.loading} id="main-content">
    <div className={styles.mark} aria-hidden="true">
      <svg fill="none" viewBox="0 0 100 100"><circle cx="50" cy="50" r="34" /><circle cx="50" cy="50" r="4" />{Array.from({ length: 12 }, (_, index) => <path d="M50 16v29" key={index} transform={`rotate(${index * 30} 50 50)`} />)}</svg>
    </div>
    <p>नागरिक सेवा तैयार हो रही है</p>
    <strong>Preparing your citizen service</strong>
    <div className={styles.line} aria-hidden="true"><span /></div>
  </main>;
}
