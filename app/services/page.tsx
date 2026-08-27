import type { Metadata } from "next";
import Link from "next/link";
import { CivicShell } from "@/src/design-system/components/civic-shell";
import { getCitizenSession } from "@/src/infrastructure/auth/citizen-session";
import styles from "./service-directory.module.css";

export const metadata: Metadata = { title: "Citizen services and information" };

const serviceCards = [
  { number: "01", title: "Lodge public grievance", description: "Describe the service issue, confirm the concerned organisation and retain the registration number.", href: "/grievances/new", action: "Start grievance" },
  { number: "02", title: "View grievance status", description: "Open the latest action, timeline and Action Taken Report for a registered grievance.", href: "/track", action: "View status" },
  { number: "03", title: "Appeal and further review", description: "Review pending outcomes and file a focused appeal where the grievance is eligible.", href: "/dashboard#appeals", action: "Open appeal dashboard" },
  { number: "04", title: "Pension grievance", description: "Pension matters use the dedicated CPENGRAMS service on the official portal.", href: "https://pgportal.gov.in/Pension/", action: "Open official pension service", external: true },
  { number: "05", title: "Reminder and clarification", description: "Check when a reminder, clarification or follow-up is appropriate and use the official route for real cases.", href: "#reminders", action: "Read guidance" },
  { number: "06", title: "Feedback and rating", description: "After disposal, review the response before rating it or proceeding to an available appeal.", href: "#appeals", action: "Understand the process" },
] as const;

export default async function ServicesPage() {
  const session = await getCitizenSession();
  const user = session ? { name: session.user.name, email: session.user.email } : null;

  return <CivicShell user={user}>
    <main className={styles.page} id="main-content">
      <header className={styles.hero}>
        <div><p>Citizen service directory</p><h1>Services, process and official contacts</h1><span>Direct routes for lodging, tracking, appeals, pension matters, officer information and support.</span></div>
        <aside><strong>No fee is charged by CPGRAMS</strong><p>Do not send grievances by email. Lodge the matter through the portal so a registration number is issued.</p></aside>
      </header>

      <section className={styles.services} aria-labelledby="services-heading">
        <div className={styles.sectionHeading}><div><p>Online services</p><h2 id="services-heading">Choose the required service</h2></div><Link href="/help">Read eligibility guidance →</Link></div>
        <div className={styles.serviceGrid}>{serviceCards.map((service) => "external" in service && service.external ? <a href={service.href} key={service.title} rel="noreferrer" target="_blank"><span>{service.number}</span><h3>{service.title}</h3><p>{service.description}</p><b>{service.action} ↗</b></a> : <Link href={service.href} key={service.title}><span>{service.number}</span><h3>{service.title}</h3><p>{service.description}</p><b>{service.action} →</b></Link>)}</div>
      </section>

      <div className={styles.informationLayout}>
        <nav aria-label="Information sections">
          <a href="#about">About CPGRAMS</a>
          <a href="#process">Redressal process</a>
          <a href="#reminders">Reminder and clarification</a>
          <a href="#appeals">Feedback and appeal</a>
          <a href="#officers">Nodal officers</a>
          <a href="#pension">Pension grievance</a>
          <a href="#mobile">Mobile access</a>
          <a href="#faq">FAQs</a>
          <a href="#contact">Contact</a>
          <a href="#site-map">Site map</a>
        </nav>

        <div className={styles.information}>
          <section id="about"><p>About the service</p><h2>What CPGRAMS is for</h2><div className={styles.twoColumn}><p>CPGRAMS is the Government of India&apos;s online platform for citizens to lodge grievances concerning public-service delivery with Central and State Government organisations. A unique registration number is issued for status tracking.</p><p>This demonstration keeps the same citizen-service scope while showing clearer continuity from the grievance description to the Action Taken Report and appeal.</p></div><div className={styles.factRow}><span><strong>24 × 7</strong>Online access</span><span><strong>One reference</strong>Status and appeal continuity</span><span><strong>No fee</strong>Charged by CPGRAMS</span></div></section>

          <section id="process"><p>Redressal process</p><h2>From registration to further review</h2><ol className={styles.process}><li><span>01</span><div><strong>Register</strong><p>Enter the public-service issue and the action requested.</p></div></li><li><span>02</span><div><strong>Forwarded</strong><p>The grievance is routed to the concerned organisation.</p></div></li><li><span>03</span><div><strong>Action taken</strong><p>Review the response, evidence and outcome status.</p></div></li><li><span>04</span><div><strong>Feedback</strong><p>Assess whether the disposal addresses the grievance.</p></div></li><li><span>05</span><div><strong>Appeal</strong><p>Where eligible, request further review of the unresolved outcome.</p></div></li></ol><a className={styles.officialLink} href="https://pgportal.gov.in/Home/Preview/Q29tcHJlaGVuc2l2ZUd1aWRlbGluZXNGb3JIYW5kbGluZ1RoZVB1YmxpY0dyaWV2YW5jZXMucGRm" rel="noreferrer" target="_blank">Read the official grievance-handling guidelines ↗</a></section>

          <section id="reminders"><p>Reminder and clarification</p><h2>Use the grievance record before following up</h2><div className={styles.guidanceGrid}><article><strong>Check the latest action</strong><p>Open the timeline and Action Taken Report before sending a reminder. The record may already contain a response or a next step.</p><Link href="/track">View grievance status →</Link></article><article><strong>Reminder for a real grievance</strong><p>This prototype does not send messages to government systems. Use the official CPGRAMS reminder route for an actual registered grievance.</p><a href="https://pgportal.gov.in/" rel="noreferrer" target="_blank">Open official CPGRAMS ↗</a></article><article><strong>Clarification</strong><p>Respond through the official case channel when the concerned organisation requests missing or clearer information.</p><a href="https://pgportal.gov.in/" rel="noreferrer" target="_blank">Open official case access ↗</a></article></div></section>

          <section id="appeals"><p>Feedback and appeal</p><h2>Review the disposal before escalating</h2><div className={styles.appealSteps}><article><span>1</span><div><strong>Read the Action Taken Report</strong><p>Compare each requested action with the recorded response and supporting information.</p></div></article><article><span>2</span><div><strong>Identify what remains unresolved</strong><p>Keep the appeal focused on a specific pending outcome rather than repeating the full grievance.</p></div></article><article><span>3</span><div><strong>Submit an eligible appeal</strong><p>The original grievance context and disposal report should remain attached to the review.</p></div></article></div><Link className={styles.internalAction} href="/dashboard#appeals">Open appeal dashboard →</Link></section>

          <section id="officers"><p>Officer information</p><h2>Official nodal officer directories</h2><span className={styles.sectionIntro}>Officer assignments can change. These links open the current official CPGRAMS directories rather than copying potentially stale contact data into this demonstration.</span><div className={styles.officerGrid}><a href="https://pgportal.gov.in/Home/NodalPgOfficers" rel="noreferrer" target="_blank"><strong>Central Government</strong><span>Nodal Public Grievance Officers</span><b>Open official directory ↗</b></a><a href="https://pgportal.gov.in/Home/NodalPgOfficersState" rel="noreferrer" target="_blank"><strong>State Governments</strong><span>State nodal grievance officers</span><b>Open official directory ↗</b></a><a href="https://pgportal.gov.in/Home/NodalAuthorityForAppeal" rel="noreferrer" target="_blank"><strong>Appeal authorities</strong><span>Nodal Authorities for Appeal</span><b>Open official directory ↗</b></a></div></section>

          <section id="pension"><p>Dedicated service</p><h2>Pension grievances use CPENGRAMS</h2><div className={styles.handoff}><div><strong>Do not lodge a pension matter in the general route</strong><p>Use the dedicated pension grievance service so the matter reaches the correct workflow.</p></div><a href="https://pgportal.gov.in/Pension/" rel="noreferrer" target="_blank">Open official pension service ↗</a></div></section>

          <section id="mobile"><p>Mobile access</p><h2>Use CPGRAMS on the device available to you</h2><div className={styles.twoColumn}><p>The official service is available through its mobile application and through UMANG. This demonstration remains browser-first and responsive, with no app download required for the prototype journey.</p><p>For an actual grievance, confirm the publisher and download route from the official CPGRAMS website.</p></div><a className={styles.officialLink} href="https://pgportal.gov.in/" rel="noreferrer" target="_blank">View official mobile access information ↗</a></section>

          <section id="faq"><p>FAQs</p><h2>Frequently asked questions</h2><div className={styles.faq}><details><summary>What matters can be lodged?</summary><p>Public-service delivery matters involving Central or State Government organisations. RTI, court or subjudice, religious, emergency, pension and specified employee-service matters may require another channel.</p></details><details><summary>How do I track a grievance?</summary><p>Use the registration number issued at submission. Signed-in users can also open records from the citizen dashboard.</p></details><details><summary>When can I file an appeal?</summary><p>Appeal availability depends on the disposal and feedback process. Review the Action Taken Report first and focus on the outcome that remains unresolved.</p></details><details><summary>Can I send a grievance by email?</summary><p>No. Lodge the grievance through the portal so it enters the workflow and receives a registration number.</p></details><details><summary>Does filing cost money?</summary><p>CPGRAMS does not charge a government fee for filing a grievance.</p></details></div></section>

          <section id="contact"><p>Contact and support</p><h2>Use the correct support channel</h2><div className={styles.contactGrid}><article><strong>Grievance content or status</strong><p>Use the registered grievance record, concerned organisation response and official reminder or appeal route.</p><Link href="/track">View status →</Link></article><article><strong>Technical portal support</strong><p>The official portal lists <span>cpgrams-darpg[at]nic[dot]in</span> for technical support. Do not email the grievance itself.</p><a href="https://pgportal.gov.in/" rel="noreferrer" target="_blank">Verify on official portal ↗</a></article><article><strong>Prototype help</strong><p>Read guidance for eligibility, safe demonstration data, accessibility and account access.</p><Link href="/help">Open Help Centre →</Link></article></div></section>

          <section id="site-map"><p>Site map</p><h2>Find a page</h2><div className={styles.siteMap}><div><strong>Public services</strong><Link href="/">Home</Link><Link href="/grievances/new">Lodge grievance</Link><Link href="/track">View status</Link><Link href="/services">Service directory</Link></div><div><strong>Citizen account</strong><Link href="/signin">Sign in</Link><Link href="/signup">Register</Link><Link href="/dashboard">Dashboard</Link><Link href="/dashboard#appeals">Appeal dashboard</Link></div><div><strong>Information</strong><Link href="/help">Help and eligibility</Link><a href="#process">Redressal process</a><a href="#officers">Nodal officers</a><a href="#contact">Contact</a></div><div><strong>Official sources</strong><a href="https://pgportal.gov.in/" rel="noreferrer" target="_blank">Official CPGRAMS ↗</a><a href="https://pgportal.gov.in/Sitemap" rel="noreferrer" target="_blank">Official site map ↗</a><a href="https://pgportal.gov.in/Pension/" rel="noreferrer" target="_blank">Pension service ↗</a></div></div></section>
        </div>
      </div>
    </main>
  </CivicShell>;
}
