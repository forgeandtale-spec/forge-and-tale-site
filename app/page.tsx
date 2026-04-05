export default function Home() {
  return (
    <main style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center"
    }}>
      <div>
        <h1>FORGE & TALE</h1>
        <p>14mm Necklace — Limited to 200 pieces</p>
        <p>Ships in 4–5 weeks</p>

        <button style={{
          marginTop: "20px",
          padding: "10px 20px",
          border: "1px solid white",
          background: "transparent",
          color: "white"
        }}>
          Pre-order now
        </button>
      </div>
    </main>
  );
}