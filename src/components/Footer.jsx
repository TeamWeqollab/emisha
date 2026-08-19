import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import FooterCTA from "./FooterCTA.jsx";

const SERVICES_SECTION_ID = "homeOurServices";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const router = useRouter();

  const handleServicesClick = (e) => {
    e.preventDefault();
    if (router.pathname === "/") {
      document.getElementById(SERVICES_SECTION_ID)?.scrollIntoView({ behavior: "smooth" });
    } else {
      if (typeof window !== "undefined") window.sessionStorage.setItem("scrollTo", SERVICES_SECTION_ID);
      router.push("/");
    }
  };

  return (
    <>


      <FooterCTA />

      <div id="mainFooter">

        {/* Footer */}
        <footer>
          <div className="container">
            <div className="row" id="footerRw">
              <div className="col-lg-2 mb-4">
                <Image src="/images/logo-footer.svg" width={124} height={72} alt="Emisha" className="img-fluid me-4" />
              </div>

              <div className="col-lg-2 col-md-4 footer-nav pe-5 mb-lg-4 mb-2" >
                <p className="footer-nav-heading">Australia</p>
                <p>Level 35, Tower One
                    100 Barangaroo Ave,
                    Sydney, NSW 2000
                    Australia
                </p>
              </div>

              <div className="col-lg-2 col-md-4 footer-nav mb-lg-4 mb-2">
                <p className="footer-nav-heading">India</p>
                <p>WeWork Galaxy, 43, Residency Rd, 
                  Shanthala Nagar, Ashok Nagar, 
                  Museum Road, Bangalore,
                  Karnataka, India, 560025
                  </p>
              </div>
               <div className="col-lg-2 col-md-4 footer-nav pe-5 mb-lg-4 mb-2">
                <p className="footer-nav-heading">UAE</p>
                <p>SF3133, C1-1F Ajman Free Zone, Ajman, United Arab Emirates</p>
              </div>

              {/* <div className="col-lg-2 col-md-4 footer-nav pe-2 mb-lg-4 mb-2">
                <p className="footer-nav-heading">EMISHA</p>
                <div className="row">
                  <div className="col-md-6">
                    <ul className="list-unstyled">
                      <li><Link href="/company">About Us</Link></li>
                      <li><Link href="/" onClick={handleServicesClick}>Services</Link></li>
                      <li><Link href="/news">News</Link></li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <ul className="list-unstyled">
                      <li><Link href="/resources">Resources</Link></li>
                      <li><Link href="/contact">Contact</Link></li>
                    </ul>
                  </div>
                </div>

              </div> */}

              <div className="col-lg-2 col-md-4 footer-nav ps-lg-5 ps-3 mt-2 mt-lg-0 mb-lg-4 mb-2">
                <p className="footer-nav-heading2">LET&apos;S GET SOCIAL</p>
                <div className="d-flex justify-content-md-start gap-3" id="footer-social">
                  <a href="https://www.facebook.com/EmishaANZ/" target="_blank" rel="noopener noreferrer" className="social-link facebook" aria-label="Visit Emisha on Facebook"><i className="fa-brands fa-facebook-f"></i></a>
                  <a href="https://www.linkedin.com/company/emishaglobal/" target="_blank" rel="noopener noreferrer" className="social-link linkedin" aria-label="Visit Emisha on LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
                  {/* <Link href="#" className="social-link twitter" aria-label="Read more twitter"><i className="fab fa-twitter"></i></Link>
                  <Link href="#" className="social-link instagram" aria-label="Read more instagram"><i className="fab fa-instagram"></i></Link> */}
                </div>
              </div>
            </div>

            <div className="row" id="copyright">
              {/* <div className="gradient-line" /> */}
              <div className="col-md-8 col-lg-6">
                <ul className="list-unstyled list-inline">
                  <li className="list-inline-item"><Link href="/privacy-policy">Privacy Policy</Link></li>
                  <li className="list-inline-item"><Link href="/terms-of-service">Terms of Service</Link></li>
                  <li className="list-inline-item"><Link href="/cookie-policy">Cookie Settings</Link></li>
                  {/* <li className="list-inline-item"><Link href="/sitemap">Sitemap</Link></li> */}
                </ul>
              </div>
              <div className="col-md-4 col-lg-6 text-center text-lg-end">
                <p className="copytext mb-3 mb-lg-0">&copy; {currentYear} Emisha 2026</p>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
