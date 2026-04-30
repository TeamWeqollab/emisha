import Link from "next/link";
import { useRouter } from "next/router";

export default function FooterCTA() {
  const router = useRouter();
  const pathname = router.pathname;

  // Hide FooterCTA on specific pages
  if (pathname === '/contact' || pathname === '/resources') return null;

  // Dynamic CTA content based on current page
  const getCTAContent = () => {




     // Services pages
     if (pathname.startsWith('/services/foundation-services')) {
      return {
       title: (
        <>
          Enabling business growth 
          <br />
          through smarter data strategies. 
        </>
      ),
        //description: 'Join leading enterprises who trust Emisha Interactive Solutions to turn their operational complexity into strategic advantage.',
        buttonText: 'GET IN TOUCH',
        buttonIcon: 'fas fa-code'
      };
    }

    if (pathname.startsWith('/services/data-trust-transformation-services')) {
      return {
       title: (
        <>
          Trusted data. Confident decisions.  
          <br />
          Lasting transformation.
        </>
      ),
        //description: 'Join leading enterprises who trust Emisha Interactive Solutions to turn their operational complexity into strategic advantage.',
        buttonText: 'GET IN TOUCH',
        buttonIcon: 'fas fa-code'
      };
    }

    if (pathname.startsWith('/services/data-and-cyber-security')) {
      return {
       title: (
        <>
          Assuring cyber resilience through 
          <br />
          trusted data protection.
        </>
      ),
        //description: 'Join leading enterprises who trust Emisha Interactive Solutions to turn their operational complexity into strategic advantage.',
        buttonText: 'GET IN TOUCH',
        buttonIcon: 'fas fa-code'
      };
    }



    



    // News pages
    if (pathname.startsWith('/news')) {
      return {
       title: (
        <>
          Building trusted data foundations 
          <br />
          for enterprise performance.
        </>
      ),
        //description: 'Join leading enterprises who trust Emisha Interactive Solutions to turn their operational complexity into strategic advantage.',
        buttonText: 'GET IN TOUCH',
        buttonIcon: 'fas fa-handshake'
      };
    }

    // Company pages
    if (pathname.startsWith('/company')) {
      return {
        title: 'We specialize in guiding enterprises toward data-driven leadership through trusted data and transformative strategy.',
        //description: 'Join leading enterprises who trust Emisha Interactive Solutions to turn their operational complexity into strategic advantage.',
        buttonText: 'GET IN TOUCH',
        buttonIcon: 'fas fa-handshake'
      };
    }

    

    // 404 page
    if (pathname === '/404') {
      return {
        title: (
        <>
          Data you can trust.
          <br />
          Innovation you can scale.
        </>
      ),
        //description: 'Join leading enterprises who trust Emisha Interactive Solutions to turn their operational complexity into strategic advantage.',
        buttonText: 'GET IN TOUCH',
        buttonIcon: 'fas fa-search'
      };
    }

    // Default (Home page and others)
    return {
      title: (
        <>
          Data you can trust.
          <br />
          Innovation you can scale.
        </>
      ),
      // description: 'Data you can trust. Innovation you can scale.',
      buttonText: 'GET IN TOUCH',
      buttonIcon: 'fas fa-calendar-alt'
    };
  };

  const ctaContent = getCTAContent();

  return (
     <section className="sectionWrapper">
      <div className="container">
        <div className="footer-cta align-items-center d-flex">
          <div className="row justify-content-start">
            <div className="col-lg-12">
              <h2 className="sectionHeading">{ctaContent.title}</h2>
              {/* <p className="sectionLead col-lg-8">{ctaContent.description}</p> */}
              {/* <button 
                type="button"
                onClick={() => typeof window !== 'undefined' && window.openContactModal && window.openContactModal()}
                className="btn btn-primary"
              >
                {ctaContent.buttonText}
              </button> */}
              <Link href="/contact" className="btn btn-primary" aria-label="Get started by contacting us">GET IN TOUCH</Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
