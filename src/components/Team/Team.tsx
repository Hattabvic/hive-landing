import styles from "./Team.module.css";

const HEX_CLIP = "polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)";

const MEMBERS = [
  {
    id: 1,name: "Abdalla Hattb",role: "",image: "/assets/abdalla.png",},
  {
    id: 2,
    name: "Abdelrahman Ibrahim",
    role: "",
    image: "/assets/3obd.jpg",
  },
  { id: 4, name: "Mohamed Shabaan", role: "", image: "/assets/shabaan.jpeg" },
  { id: 5, name: "Belal Morsi", role: "", image: "/assets/belal.jpeg" },
  { id: 3, name: "Amr Ossama", role: "", image: "/assets/amr.jpeg" },
  { id: 6, name: "Abelrahman Fawzy 06", role: "", image: "/assets/fawzy.jpeg" },
  { id: 7, name: "Mostafa Ibrahim", role: "", image: "/assets/mostafa.jpeg" },
  { id: 8, name: "Mohamed Othman", role: "", image: "/assets/othman.jpeg" },
  { id: 9, name: "Abdelrahman ahmed", role: "", image: "/assets/roqa.jpeg" },
  { id: 10, name: "Abdelrahman Hossam", role: "", image: "/assets/harpi.jpeg" },
  {
    id: 11,
    name: "Norhan Ossama",
    role: "",
    image: "/assets/norhan.jpeg",
    gender: "female",
  },
];

export function Team() {
  return (
    <section className={styles.team} id="team">
      <div className={styles.inner}>
        <div className={`${styles.hdr} reveal`}>
          <p className="sec-label">The Builders</p>
          <h2 className="sec-title">
            Team <span style={{ color: "var(--amber)" }}>Phoenix</span>
          </h2>
         
        </div>

        <div className={`${styles.grid} reveal`}>
          {MEMBERS.map((m, i) => (
            <div
              key={m.id}
              className={`${styles.member} ${m.gender === "female" ? styles.memberFemale : ""}`}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className={styles.slotWrap}>
                <div className={styles.glowRing} />
                <div
                  className={styles.photo}
                  style={{
                    clipPath: HEX_CLIP,
                    backgroundImage: m.image ? `url(${m.image})` : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </div>
              <div className={styles.name}>{m.name}</div>
              <div className={styles.role}>{m.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
