import { useEffect } from "react";
import Features from "./Features";
import Hero from "./Hero";
import JoinUs from "./JoinUs";
import QnA from "./QnA";
import Testimonials from "./Testimonials";

export default function LandingPage() {
  useEffect(() => {
    document.title = "Home | Tutors Street"
  
  }, [])
  
  
  return (
    <>
      <Hero />
      <Features />
      <Testimonials />
      <JoinUs />
      <QnA />
    </>
  );
}
