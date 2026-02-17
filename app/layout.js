export const metadata = {
  title: "RAG Chat UI",
  description: "Databricks RAG Chatbot",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Arial" }}>
        {children}
      </body>
    </html>
  );
}