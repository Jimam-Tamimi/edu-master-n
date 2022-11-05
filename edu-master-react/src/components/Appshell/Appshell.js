import { AppShell as AS } from "@mantine/core";
import Footer from "./Footer";
import Header from "./Header";

export default function Appshell({ children }) {
  return (
    <AS padding={"0"} footer={<Footer />} header={<Header />}>
      {children}
    </AS>
  );
}
