import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Account help" };

export default function HelpPage() {
  return <main style={{maxWidth:"48rem",margin:"0 auto",padding:"clamp(2rem,7vw,5rem) 1rem",color:"#172741"}}>
    <p style={{color:"#0b5a52",fontWeight:800,textTransform:"uppercase",letterSpacing:".08em",fontSize:".76rem"}}>Citizen help</p>
    <h1 style={{fontSize:"clamp(2.2rem,6vw,4rem)",letterSpacing:"-.045em",margin:"0 0 1rem"}}>Account and access help</h1>
    <p style={{lineHeight:1.7,color:"#5f6d82"}}>This concept environment supports fictional demonstration accounts only. Never enter a real password, OTP, identity number or personal document.</p>
    <section id="account-recovery" style={{marginTop:"2rem",padding:"1.5rem",background:"#fff",border:"1px solid #dce3ed",borderRadius:"1rem"}}><h2 style={{marginTop:0}}>Cannot sign in?</h2><p style={{lineHeight:1.7}}>Return to citizen sign in and choose <strong>Enter as demo citizen</strong>. The service will securely prepare the fictional account and sign you in. Password recovery through email or OTP is intentionally not connected in this concept environment.</p><Link href="/signin">Return to citizen sign in</Link></section>
    <p style={{marginTop:"2rem",fontSize:".75rem",color:"#788599"}}>Concept redesign · Not connected to live government systems</p>
  </main>;
}
